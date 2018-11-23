import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Container, Left, Right, Header, Title, Body, Button, Fab, Segment, Spinner, Icon, Text, List, ListItem
} from 'native-base';
import PlatformIcon from '../../components/PlatformIcon';
import CardQuestion from '../../components/question/CardQuestion';
import QuestionRepository from '../../repository/QuestionRepository';
import { StackActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import Dialog, { DialogContent, DialogButton } from 'react-native-popup-dialog';
import Config from '../../constants/Config';
import io from 'socket.io-client';

@connect(({ token, profile, question }) => ({
  token,
  profile,
  questions: question.questions,
  getQuestionState: question.getQuestionState,
  newQuestion: question.requestQuestion,
  onNewRequest: question.onNewRequest
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class HomeScreenForTeacher extends React.Component {
  static navigationOptions = {
    header: <Header
      style={{ backgroundColor: '#ebfbdf' }}
      androidStatusBarColor="#23a649">
      <Left>
        <Button transparent onPress={() => { console.log(this) }}>
          <PlatformIcon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Câu hỏi(Teacher)</Title>
      </Body>
      <Right>
      </Right>
    </Header>
  };

  constructor(props) {
    super(props);
    this.state = {
      currentQuestionTypeView: 11,
      showProcessing: false,
    }
    this.props.listenQuestionSocket()
  }

  componentWillReceiveProps() {
    console.log("11")
  }

  componentDidMount() {
    const { currentQuestionTypeView } = this.state;
    this.props.getQuestions(currentQuestionTypeView)
  }

  _handleSegmentTypeQuestionPress = (type) => {
    this.setState({
      currentQuestionTypeView: type,
    })
    this.props.getQuestions(type)
  }

  _openCreateQuestionScreen = () => {
    const pushAction = StackActions.push({
      routeName: 'CreateQuestion',
      params: {
      },
    });
    this.props.navigation.dispatch(pushAction)
  }

  _showCancelQuestionAlert = (question) => {
    Alert.alert(
      'Hủy bỏ yêu cầu',
      'Khi hủy bỏ yêu cầu, câu hỏi này sẽ được chuyển cho những người khác',
      [
        { text: 'Hủy', onPress: () => { }, style: 'cancel' },
        {
          text: 'Đồng ý', onPress: async () => {
            this.props.cancelNewQuestion(question._id)
          }
        },
      ],
      { cancelable: false }
    )
  }

  _showComfirmQuestionAlert = (question) => {

    let answerType = 'Chỉ câu trả lời';

    if (question.type == 'Detail answer') {
      answerType = 'Lời giải chi tiết'
    } else if (question.type == 'Chatbox') {
      answerType = 'Trò chuyện trực tiếp'
    }
    Alert.alert(
      'Xác nhận trả lời',
      `Hình thức trả lời: ${answerType}`,
      [
        { text: 'Hủy', onPress: () => { }, style: 'cancel' },
        {
          text: 'Đồng ý', onPress: async () => {
            // this.setState({ showProcessing: true });
            const { navigation } = this.props;

            try {
              await QuestionRepository.getInstance().confirmGetQuestion(question._id);
              this.setState({ showProcessing: false }, () => {
                const { currentQuestionTypeView } = this.state;
                this.props.getQuestions(currentQuestionTypeView)
              });
              this.props.cancelNewQuestion(question._id)
              var pushAction = null
              if (question.type == 'Chatbox') {
                pushAction = StackActions.push({
                  routeName: 'ChatBox',
                  params: {
                    question
                  },
                });
              } else {
                pushAction = StackActions.push({
                  routeName: 'AnswerQuestion',
                  params: {
                    question
                  },
                });
              }
              navigation.dispatch(pushAction)

            } catch (e) {
              console.log(e)
              this.setState({ showProcessing: false });
            }
          }
        },
      ],
      { cancelable: false }
    )
  }

  _onOpenAnswer = (question) => {
    var pushAction = null
    if (question.type == 'Chatbox') {
      pushAction = StackActions.push({
        routeName: 'ChatBox',
        params: {
          question
        },
      });
    } else {
      pushAction = StackActions.push({
        routeName: 'AnswerQuestion',
        params: {
          question
        },
      });
    }
    this.props.navigation.dispatch(pushAction)
  }

  render() {
    const { currentQuestionTypeView, showProcessing } = this.state;
    const { getQuestionState, questions, onNewRequest, newQuestion } = this.props;

    return (
      <Container>
        <Segment>
          <Button
            first
            active={currentQuestionTypeView == 11}
            onPress={() => this._handleSegmentTypeQuestionPress(11)}>
            <Text>Có thể nhận</Text>
          </Button>
          <Button
            active={currentQuestionTypeView == 3}
            onPress={() => this._handleSegmentTypeQuestionPress(3)}>
            <Text>Đang trả lời</Text>
          </Button>
          <Button
            last
            active={currentQuestionTypeView == 4}
            onPress={() => this._handleSegmentTypeQuestionPress(4)}>
            <Text>Đã trả lời</Text>
          </Button>
        </Segment>
        <View style={{ flex: 1 }}>
          {getQuestionState == 2 && <List
            dataArray={questions}
            renderRow={(question) =>
              <ListItem noIndent style={{ flex: 0, width: '100%' }}>
                <CardQuestion
                  question={question}
                  teacherMode
                  onAnswer={this._onOpenAnswer}
                  onOpenAnswer={this._onOpenAnswer}
                  onConfirm={this._showComfirmQuestionAlert}
                />
              </ListItem>
            }>
          </List>}
          {getQuestionState == 1 && <Spinner />}
        </View>
        <Dialog
          visible={onNewRequest}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          width={0.9}
          actions={[
            <DialogButton
              text="Hủy"
              onPress={() => {
                this._showCancelQuestionAlert(newQuestion)
              }}
            />,
            <DialogButton
              text="Nhận câu hỏi"
              onPress={() => {
                this._showComfirmQuestionAlert(newQuestion)
              }}
            />,
          ]}
        >
          <DialogContent style={{ paddingTop: 16 }}>
            {newQuestion && <CardQuestion
              question={newQuestion}
              teacherMode
              dialogMode={true}
              onConfirm={this._showComfirmQuestionAlert}
            />}
          </DialogContent>
        </Dialog>
        <AwesomeAlert
          show={showProcessing}
          showProgress={true}
          title="Đang thực hiện"
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
    );
  }
}

const styles = StyleSheet.create({

});
