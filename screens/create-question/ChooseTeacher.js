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
  Picker,
  List,
  ListItem,
  Thumbnail,
  ActionSheet
} from 'native-base';

import PlatformIcon from '../../components/PlatformIcon';

import { StackActions } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import uploadFile from '../../repository/FileUploader';

const answerTypes = ['Only answer', 'Only answer', 'Only answer'];


@connect(({ teacher, question }) => ({
  teachers: teacher.teachers,
  state: teacher.state,
  message: teacher.message,
  addQuestionState: question.addQuestionState,
  messageQuestion: question.message
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class ChooseTeacher extends React.Component {
  static navigationOptions = {
    title: "Chọn gia sư",
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      answerType: 0
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
    this.props.getTeachers()
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

  createQuestion = async (answerType) => {
    const { navigation } = this.props;
    this.showAlert();
    const image = navigation.getParam('image', null)
    try {
      const imageURL = await uploadFile(new Date().getTime().toString(), image);
      console.log(imageURL)
      const question = navigation.getParam('detail', "")
      const type = answerTypes[answerType]
      const level = navigation.getParam('level', null)
      const subject = navigation.getParam('subject', null)
      this.props.createQuestion({
        images: [imageURL],
        question,
        type,
        level,
        subject
      })
      this.showAlert()
    } catch (e) {
      console.log(e)
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

  componentDidUpdate() {

  }

  onSelectTeacher = (teacher) => {
    console.log(teacher);
    this.showTypePickerActionSheet();
  }

  goBack() {
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { teachers, state, message } = this.props;
    const { showAlert } = this.state;
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
              <Title>{ChooseTeacher.navigationOptions.title}</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            {state == 2 && <List
              dataArray={teachers}
              renderRow={(teacher) =>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={{ uri: teacher.avatar }} />
                  </Left>
                  <Body>
                    <Text>{teacher.name}</Text>
                    <Text note numberOfLines={1}>*****</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => { this.onSelectTeacher(teacher) }}>
                      <Text>Chọn</Text>
                    </Button>
                  </Right>
                </ListItem>
              }>
            </List>}
            {state == 3 && <Text>{message}</Text>}
          </Content>
          <AwesomeAlert
            show={showAlert}
            showProgress={true}
            title="Đang gửi câu hỏi"
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
