import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';

import SplashScreen from '../screens/splash/SplashScreen';

import MainTabNavigator from './MainTabNavigator';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
})

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Splash: SplashScreen,
  Auth: AuthNavigator,
  Main: MainTabNavigator,
}, {
    initialRouteName: 'Splash',
  });