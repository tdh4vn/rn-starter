import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PlatformIcon from '../../components/PlatformIcon';
import ImagePicker from 'react-native-image-crop-picker';
import { StackActions } from 'react-navigation';
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
  View,
  Item,
  ActionSheet
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';

@connect(({ app }) => ({
  token: app.token
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class ShowAnswer extends React.Component {
  static navigationOptions = {
    title: 'Xem lại câu trả lời',
    header: null,
  };

  componentWillMount() {
  }

  goBack() {
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  doneQuestionAndRatingTeacher = () => {
    this.setState({
      showRating: true
    })
  }

  render() {
    const question = this.props.navigation.getParam("question", null);
    console.log(question)
    let showAnswer = false;
    if (question.answer && (question.answer.images.length > 0 || question.answer.content != "")) {
      showAnswer = true;
    }
    const isTeacher = this.props.profile.type == "teacher";
   
    const isDone = question.status == 4
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ShowAnswer.navigationOptions.title}</Title>
          </Body>
          <Right>{!isTeacher && <Button transparent onPress={this.doneQuestionAndRatingTeacher}>
            <Text>Hoàn tất</Text>
          </Button>}</Right>
        </Header>
        <Content style={{ flexDirection: "row" }}>
          {showAnswer &&
            <View>
              <Text>
                {question.answer.content}
              </Text>
              <Image
                source={{ uri: question.answer.images[0] }} />
            </View>}
          {!showAnswer && <Text>Gia sư chưa trả lời</Text>}
        </Content>
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
