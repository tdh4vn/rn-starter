import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import robotDev from '../../assets/images/robot-dev.png';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Đăng nhập',
  };

  componentDidMount() {

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

      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      console.info(JSON.stringify(currentUser.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
            primary>
            <Text>Đăng nhập bằng SĐT</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

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
