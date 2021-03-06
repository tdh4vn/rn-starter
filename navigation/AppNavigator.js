import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';

import SplashScreen from '../screens/splash/SplashScreen';

import SideBar from '../screens/navigation-drawer/SideBar';

import ChooseTeacher from '../screens/create-question/ChooseTeacher';
import AnswerQuestion from '../screens/answer-question/AnswerQuestion';

import ShowAnswer from '../screens/show-answer/ShowAnswer';

import ChatBox from '../screens/chatbox/ChatBox';

import MainTabNavigator from './MainTabNavigator';
import MainTeacherTabNavigator from './TeacherMainNavigator';
import PhoneAuthen from '../../rn-starter/screens/login/PhoneAuthen';

import CreateContentQuestion from '../screens/create-question/CreateContentQuestion';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  PhoneAuthen: PhoneAuthen,
})

const CreateQuestionStackNavigator = createStackNavigator({
  CreateContent: CreateContentQuestion,
  ChooseTeacher: ChooseTeacher,
}, {
    initialRouteName: "CreateContent",
  })

const ChatBoxStackNavigator = createStackNavigator({
  ChatBox: ChatBox,
}, {
    initialRouteName: "ChatBox",
  })

const DrawerNavigation = createDrawerNavigator(
  {
    Splash: { screen: SplashScreen },
  },
  {
    initialRouteName: "Splash",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const TeacherMainNavigation = createStackNavigator({
  Tab: MainTeacherTabNavigator,
  AnswerQuestion: AnswerQuestion,
  ChatBox: ChatBoxStackNavigator,
  ShowAnswer: ShowAnswer,
}, {
    initialRouteName: 'Tab',
    headerMode: 'none',
  })

const AppNavigator = createStackNavigator({
  Drawer: DrawerNavigation,
  TabBar: MainTabNavigator,
  CreateQuestion: CreateQuestionStackNavigator,
  ChatBox: ChatBoxStackNavigator,
  ShowAnswer: ShowAnswer,
}, {
    initialRouteName: 'TabBar',
    headerMode: 'none',
  })

export default createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthNavigator,
  Main: AppNavigator,
  MainTeacher: TeacherMainNavigation
}, {
    initialRouteName: 'Splash',
    backBehavior: 'initialRoute',
  });