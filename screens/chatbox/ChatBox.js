import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PlatformIcon from '../../components/PlatformIcon';
import ImagePicker from 'react-native-image-crop-picker';
import uploadFile from '../../repository/FileUploader';
import QuestionReposiotry from '../../repository/QuestionRepository';
import StarRating from 'react-native-star-rating';
import {
  Container,
  Left,
  Right,
  Toast,
  Header,
  Title,
  Label,
  Body,
  Button,
  Icon,
  Subtitle,
  Root,
  Input,
  Content,
  Text,
  Form,
  View,
  Item,
  Textarea,
  ActionSheet
} from 'native-base';
import { StackActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import firebase from 'react-native-firebase';
import RatingDialog from '../rating/Rating';
import Dialog, { DialogContent, DialogButton, DialogTitle } from 'react-native-popup-dialog';

@connect(({ app }) => ({
  token: app.token,
  profile: app.profile,
  userType: app.profile.type
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: 'Trò chuyện',
    header: null,
  };

  constructor(props) {
    super(props);
    const question = this.props.navigation.getParam('question', null)
    this.database = firebase.database().ref(`thread/${question._id}/messages`);
    if (this.props.userType == "teacher") {
      this.currentUser = {
        _id: question.teacher._id,
        name: question.teacher.name,
        avatar: question.teacher.avatar
      }
      this.otherUser = {
        _id: question.student._id,
        name: question.student.name,
        avatar: question.student.avatar
      }
    } else {
      this.currentUser = {
        _id: question.student._id,
        name: question.student.name,
        avatar: question.student.avatar
      }
      this.otherUser = {
        _id: question.teacher._id,
        name: question.teacher.name,
        avatar: question.teacher.avatar
      }
    }

  }

  componentDidMount() {
    this.database.on('child_added', (data) => {
      const messages = [{
        _id: data.key,
        text: data.val().text,
        image: data.val().image,
        createdAt: data.val().createdAt,
        user: data.val().user,
      }]
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    })
  }

  state = {
    messages: [],
    showRating: false,
    starCount: 3,
    comment: ""
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  componentWillMount() {
    this.setState({
      messages: [
      ],
    })
  }

  sendImage = async (image) => {
    try {
      const imageURL = await uploadFile(new Date().getTime().toString(), {
        uri: image.path, width: image.width, height: image.height, mime: image.mime,
      })
      this.database.push({
        image: imageURL,
        messageType: "image",
        createdAt: new Date(),
        user: this.currentUser
      })
    } catch (e) {
      console.log(e)
    }
  }

  onSend(messages = []) {
    messages.forEach((item) => {
      this.database.push({
        text: item.text,
        createdAt: item.createdAt,
        user: this.currentUser
      })
    })
  }

  onAttachClicked() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      this.sendImage(image)
    });
  }

  async onOpenCamera() {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
      })
      this.sendImage(image)
    } catch (e) {
      console.log(e)
    }

  }

  goBack() {
    this.props.navigation.dismiss()
  }

  doneQuestionAndRatingTeacher = () => {
    this.setState({
      showRating: true
    })
  }

  render() {
    const isTeacher = this.props.profile.type == "teacher";
    const question = this.props.navigation.getParam('question', null)
    const isDone = question.status == 4
    const { comment } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ChatBox.navigationOptions.title}</Title>
            {isDone && <Subtitle>Đã hoàn tất</Subtitle>}
          </Body>
          <Right>{(!isTeacher && !isDone) && <Button transparent onPress={this.doneQuestionAndRatingTeacher}>
            <Text>Hoàn tất</Text>
          </Button>}</Right>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          imageProps={(data) => { console.log(data) }}
          onSend={messages => this.onSend(messages)}
          renderActions={() => <View style={styles.actionsContainer}>
            <Button transparent style={styles.actionStyle} onPress={this.onOpenCamera.bind(this)}><PlatformIcon name='camera' style={styles.icon} /></Button>
            <Button transparent style={styles.actionStyle} onPress={this.onAttachClicked.bind(this)}><PlatformIcon name='image' style={styles.icon} /></Button>
          </View>}
          user={{
            _id: this.currentUser._id,
          }}
        />
        <Dialog
          dialogTitle={<DialogTitle title="Đánh giá câu trả lời" />}
          visible={this.state.showRating}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          width={0.9}
          actions={[
            <DialogButton
              text="Hủy"
              onPress={() => {
                onCancel()
              }}
            />,
            <DialogButton
              text="Gửi đánh giá"
              onPress={async () => {
                const rs = await QuestionReposiotry.getInstance().ratingAnswer(question._id, this.state.starCount, this.state.comment)
                await QuestionReposiotry.getInstance().markDoneQuestion(question._id)
                this.props.navigation.dismiss()
                this.setState({
                  showRating: false
                })
              }}
            />,
          ]}
        >
          <DialogContent style={{ paddingTop: 16 }}>
            <View style={{ flexDirection: 'column' }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => {
                  this.setState({
                    starCount: rating
                  });
                }}
              />
              <Textarea
                onChangeText={(value) => {
                  this.setState({
                    comment: value
                  })
                }}
                value={comment}
                bordered
                rowSpan={5}
                placeholder='Bạn nhận xét như thế nào về câu trả lời này' />
            </View>
          </DialogContent>
        </Dialog>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 8,
    marginRight: 8
  },
  actionStyle: {
    //flexGrow: 1
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
