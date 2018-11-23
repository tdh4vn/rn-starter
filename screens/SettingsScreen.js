import React from 'react';
import { View } from 'react-native';
import {
  Container, Thumbnail, Left, Right, Toast, Header, Title, Label, Body, Button, Icon, Root, Input, Content, Text, Form, Item, Picker
} from 'native-base';
import { StackActions } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions';

@connect(({ app, question }) => ({
  token: app.token,
  profile: app.profile,
}), dispatch => (bindActionCreators(Actions, dispatch))) export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Cài đặt',
  };

  render() {
    const { profile } = this.props;
    return <View style={{ flexDirection: 'column', alignItems: 'center', padding: 16 }}>
      <Thumbnail large source={{ uri: profile.avatar }} />
      <Text>{profile.name}</Text>
    </View>;
  }
}
