import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions'

@connect(({ checkLoginState }) => ({ checkLoginState }), dispatch => (bindActionCreators(Actions, dispatch)))
export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  componentDidUpdate() {
    const { checkLoginState, navigation } = this.props;
    if (checkLoginState == 2) {
      navigation.navigate('Auth')
    } else if (checkLoginState == 3) {
      navigation.navigate('Main')
    }
  }

  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Gia Sư Minh Phương</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
