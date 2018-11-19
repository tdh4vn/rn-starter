import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../constants/Colors';

export default class PlatformIcon extends React.Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name={Platform.OS === 'ios' ? `ios-${this.props.name}` : `md-${this.props.name}`}
        color={this.props.color}
      />
    );
  }
}