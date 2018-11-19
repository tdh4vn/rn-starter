import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Container, Left, Right, Header, Title, Body, Button, Fab, Segment, Content, Icon, Text, List, ListItem
} from 'native-base';

import PlatformIcon from '../../components/PlatformIcon';

import CardQuestion from '../../components/question/CardQuestion';

import { StackActions } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';

@connect(({ app, question }) => ({
  token: app.token,
  profile: app.token,
  questions: question.questions
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header hasSegment>
      <Left>
        <Button transparent onPress={() => { console.log(this) }}>
          <PlatformIcon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Câu hỏi</Title>
      </Body>
      <Right>
      </Right>
    </Header>
  };

  constructor(props) {
    super(props);
    this.state = {
      currentQuestionTypeView: 1,//1 tat ca, 2 chua tra loi, 3 da tra loi
    }
  }

  componentDidMount() {
    this.props.getQuestions();
  }


  _handleSegmentTypeQuestionPress = (type) => {
    this.setState({
      currentQuestionTypeView: type,
    })
  }

  _openCreateQuestionScreen = () => {
    const pushAction = StackActions.push({
      routeName: 'CreateQuestion',
      params: {

      },
    });
    this.props.navigation.dispatch(pushAction)
  }


  render() {
    const { currentQuestionTypeView } = this.state;
    const { questions } = this.props;
    return (
      <Container>
        <Segment>
          <Button
            first
            active={currentQuestionTypeView == 1}
            onPress={() => this._handleSegmentTypeQuestionPress(1)}>
            <Text>Tất cả</Text>
          </Button>
          <Button
            active={currentQuestionTypeView == 2}
            onPress={() => this._handleSegmentTypeQuestionPress(2)}>
            <Text>Chưa trả lời</Text>
          </Button>
          <Button
            last
            active={currentQuestionTypeView == 3}
            onPress={() => this._handleSegmentTypeQuestionPress(3)}>
            <Text>Đã trả lời</Text>
          </Button>
        </Segment>
        <View style={{ flex: 1 }}>
          <List
            dataArray={questions}
            renderRow={(question) =>
              <ListItem noIndent style={{ flex: 0, width: '100%' }}>
                <CardQuestion question={question} />
              </ListItem>
            }>
          </List>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => { this._openCreateQuestionScreen() }}>
            <Icon name={Platform.OS == 'ios' ? 'ios-school' : 'md-school'} />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
