import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions'

@connect(({ app }) => ({ checkLoginState: app.checkLoginState, profile: app.profile }), dispatch => (bindActionCreators(Actions, dispatch)))
export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  componentDidUpdate() {
    const { checkLoginState, navigation, profile } = this.props;
    if (checkLoginState == 3) {
      navigation.navigate('Auth')
    } else if (checkLoginState == 2) {
      if (profile.isStaff) {
        navigation.navigate('MainTeacher')
      } else {
        navigation.navigate('Main')
      }
    }
  }

  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Gia Sư Minh Phương</Text>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
