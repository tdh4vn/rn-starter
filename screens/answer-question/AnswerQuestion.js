import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
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
  Root,
  Input,
  Content,
  Text,
  Form,
  Item,
  ActionSheet
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import PlatformIcon from '../../components/PlatformIcon';

import { StackActions } from 'react-navigation';
import QuestionRepository from '../../repository/QuestionRepository';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import uploadFile from '../../repository/FileUploader';

const answerTypes = ['Only answer', 'Detail answer', 'Chatbox'];


@connect(({ teacher, question }) => ({
  teachers: teacher.teachers,
  state: teacher.state,
  message: teacher.message,
  addQuestionState: question.addQuestionState,
  messageQuestion: question.message
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class AnswerQuestion extends React.Component {
  static navigationOptions = {
    title: "Trả lời câu hỏi",
    header: null,
  };

  constructor(props) {
    super(props)
    this.teacher = null
    this.state = {
      showAlert: false,
      answerType: 0,
      image: null,
      detailValidate: undefined
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  componentDidMount() {

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.debug('willFocus', payload);
        this.props.getTeachers()
      }
    );
  }

  showTypePickerActionSheet = () => {
    ActionSheet.show(
      {
        options: ["Đáp án - 30 xu", "Lời giải - 50 xu", "ChatBox - 100 xu", "Hủy"],
        cancelButtonIndex: 3,
        title: "Chọn kiểu trả lời"
      },
      buttonIndex => {
        if (buttonIndex != 3) {
          this.createQuestion()
        }
      }
    )
  }

  createAnswer = async () => {
    this.showAlert();
    try {
      const { detail, image } = this.state;
      const { navigation } = this.props;
      const question = this.props.navigation.getParam("question", null);
      if (question == null) throw new Error("Không tìm thấy câu hỏi");
      if (image) {
        const imageURL = await uploadFile(new Date().getTime().toString(), image);
        const answer = {
          answer: detail,
          images: [imageURL]
        }
        const result = QuestionRepository.getInstance().answerQuestion(question._id, answer);
        console.log(result)
      } else {
        const answer = {
          answer: detail,
        }
        const result = QuestionRepository.getInstance().answerQuestion(question._id, answer);
      }

      Toast.show({
        text: "Gửi câu trả lời thành công",
        duration: 2000,
        type: "danger"
      })


      navigation.dismiss()

    } catch (e) {
      Toast.show({
        text: e.tostring(),
        duration: 2000,
        type: "danger"
      })
      this.hideAlert();
    }

  }

  onDetailChange(value) {
    if (value.length > 0) {
      this.setState({
        detailValidate: true,
        detail: value
      })
    } else {
      this.setState({
        detail: value,
        detailValidate: false
      })
    }
  }

  onValidateData() {
    const { detailValidate } = this.state
    if (detailValidate) {
      this.createAnswer()
    } else {
      Toast.show({
        text: "Vui lòng hoàn thành đủ thông tin",
        duration: 2000,
        type: "danger"
      })
      this.setState({
        detailValidate: detailValidate === undefined ? false : detailValidate,
      })
    }
  }

  componentWillReceiveProps(newProps) {
    const { addQuestionState, messageQuestion } = newProps;
    const { navigation } = this.props;

    if (addQuestionState == 2) {
      this.hideAlert()
      Toast.show({
        text: "Thành công",
        duration: 1000,
        type: "success"
      })

      setTimeout(() => {
        navigation.dismiss()
      }, 1000)

    } else if (addQuestionState == 3) {
      this.hideAlert()
      Toast.show({
        text: messageQuestion,
        duration: 1500,
        type: "danger"
      })

    }
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async (image) => {
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
      })
    });
  }

  componentDidUpdate() {

  }

  onSelectTeacher = (teacher) => {
    this.teacher = teacher;
    this.showTypePickerActionSheet();
  }

  goBack() {
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { showAlert } = this.state;
    const { image, detail, detailValidate } = this.state;
    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.goBack.bind(this)}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{AnswerQuestion.navigationOptions.title}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => { this.onValidateData() }}>
                <Text>Trả lời</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Form>
              <Text style={{ marginTop: 8, marginBottom: 8, marginLeft: 8 }}>Hình ảnh</Text>
              <TouchableOpacity
                onPress={this.openImagePicker}>
                <Image
                  style={{ width: '100%', height: 200 }}
                  source={image != null ? image : require('../../assets/images/no-image-box.png')} />
              </TouchableOpacity>

              <Item floatingLabel error={detailValidate === false} success={detailValidate === true}>
                <Label>Mô tả</Label>
                <Input multiline={true} onChangeText={this.onDetailChange.bind(this)} value={detail} />
              </Item>
            </Form>
          </Content>
          <AwesomeAlert
            show={showAlert}
            showProgress={true}
            title="Đang gửi câu trả lời"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  rowContainer: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === 'ios' ? undefined : 120,
  },
});
