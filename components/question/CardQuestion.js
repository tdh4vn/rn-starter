import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Content, Container } from 'native-base';
import moment from 'moment';

export default class CardQuestion extends Component {
  render() {
    const { question } = this.props
    return (
      <View style={{ flex: 0, width: '100%' }}>

        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Thumbnail source={{ uri: question.student.avatar }} />
          <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center' }}>
            <Text>{question.student.name}</Text>
            <Text note>2 </Text>
          </View>
        </View>

        <View
          style={{ background: '#000', marginTop: 16, marginBottom: 16 }}
        >
          <Text style={{ width: '100%' }}>
            {question.question}
          </Text>
          <Image source={{ uri: question.images[0] }} style={{ height: 200, width: '100%', flex: 1, background: '#000' }} />

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={styles.tagSubject}>
            {question.subject.name}
          </Text>
          <Text
            style={styles.tagClass}>
            {question.level.name}
          </Text>
        </View>

        <View>
          <Button transparent textStyle={{ color: '#87838B' }}>
            <Thumbnail small source={{ uri: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' }} />
            <Text>Đã trả lời thông qua ChatBox</Text>
          </Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagClass: {
    marginLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#FF5722',
    borderWidth: 1,
    fontSize: 12,
    backgroundColor: '#FFCCBC',
    color: '#FF5722',
  },
  tagSubject: {
    marginLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#2196F3',
    borderWidth: 1,
    fontSize: 12,
    backgroundColor: '#BBDEFB',
    color: '#2196F3',
  }
});
