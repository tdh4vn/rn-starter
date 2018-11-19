import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Root, Toast } from 'native-base';
import robotDev from '../../assets/images/robot-dev.png';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation';

@connect(({ app }) => ({ loginState: app.loginState, message: app.message }), dispatch => (bindActionCreators(Actions, dispatch)))
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Đăng nhập',
  };

  state = {

  };

  componentDidMount() {

  }

  componentDidUpdate() {
    const { loginState, navigation, message } = this.props;

    if (loginState == 2) {
      navigation.navigate('Main')
    } else if (loginState == 3) {
      Toast.show({
        text: message,
        duration: 1500,
        type: "danger"
      })
    }
  }

  onLoginFacebookClicked = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      // login with credential
      const token = await firebase.auth().currentUser.getIdToken()
      console.log(token)
      this.props.loginAsFacebook(token)
    } catch (e) {
      console.log(e)
    }
  }

  onPhoneLoginClicked = async () => {
    try {
      const pushAction = StackActions.push({
        routeName: 'PhoneAuthen',
      });

      this.props.navigation.dispatch(pushAction);
    } catch (e) {

    }
  }

  render() {

    const { loginState } = this.props;

    return (
      <Root>
        <View style={styles.container}>
          <Spinner
            visible={loginState == 1}
            textContent={"Đang đăng nhập"}
            textStyle={styles.spinnerTextStyle}
          />
          <Image style={styles.logo} source={robotDev} />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              primary
              onPress={this.onLoginFacebookClicked}>
              <Text>Đăng nhập bằng Facebook</Text>
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPhoneLoginClicked}
              primary>
              <Text>Đăng nhập bằng SĐT</Text>
            </Button>
          </View>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 100,
    marginBottom: 100,
  },
  button: {
    marginTop: 8,
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 360,
    marginBottom: 80,
  }
});
