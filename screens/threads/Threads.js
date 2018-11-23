import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Container, Content, Thumbnail, Left, Right, Header, Title, Body, Button, Fab, Segment, Spinner, Icon, Text, List, ListItem
} from 'native-base';
import { StackActions } from 'react-navigation';
import PlatformIcon from '../../components/PlatformIcon';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import QuestionRepository from '../../repository/QuestionRepository';

@connect(({ app }) => ({
  token: app.token,
  profile: app.profile,
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class Threads extends React.Component {
  static navigationOptions = {
    title: 'Chatbox',
    header: <Header hasSegment>
      <Left>
        <Button transparent onPress={() => { console.log(this) }}>
          <PlatformIcon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Chatbox</Title>
      </Body>
      <Right>
      </Right>
    </Header>
  };

  state = {
    questions: [],
  }

  async componentDidMount() {
    try {
      const questions = await QuestionRepository.getInstance().getQuestionsChatbox();
      this.setState({
        questions
      })
    } catch (e) {
      console.log(e)
    }

  }

  render() {
    const { profile } = this.props;
    const isTeacher = profile.type == "teacher";
    const { questions } = this.state;
    return <Container>
      <Content>
        {questions.length > 0 && <List dataArray={questions}
          renderRow={(item) =>
            <ListItem avatar button onPress={() => {
              const pushAction = StackActions.push({
                routeName: 'ChatBox',
                params: {
                  question: item
                },
              });
              this.props.navigation.dispatch(pushAction);
            }}>
              <Left>
                <Thumbnail small source={{ uri: isTeacher ? item.teacher.avatar : item.studient.avatar }} />
              </Left>
              <Body>
                <Text>{isTeacher ? item.teacher.name : item.studient.name}</Text>
                <Text note>{item.question}</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          }>
        </List>}
      </Content>
    </Container>
  }
}
