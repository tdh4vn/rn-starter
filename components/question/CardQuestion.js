import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Content, Container } from 'native-base';
const moment = require('moment');
moment.locale('vi')

export default class CardQuestion extends Component {
  render() {
    const { question, onAnswer, teacherMode, onOpenAnswer, onConfirm, dialogMode, onShowToast } = this.props
    if (dialogMode) console.log(question.images[0])
    return (
      <View style={{ flex: 0, width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Thumbnail source={{ uri: question.student.avatar }} />
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text>{question.student.name}</Text>
              <Text note>{moment(question.created_at).locale('vi').fromNow()}</Text>
            </View>
          </View>
          <View>
            {teacherMode && <Button style={{ height: 36 }} onPress={() => {
              if (dialogMode) {
                return;
              }
              if (question.status == 0 || question.status == 2) {
                onConfirm(question);
              } else if (question.status == 3) {
                onAnswer(question);
              }
            }}>
              {!dialogMode && (question.status == 0 || question.status == 2) && <Text style={{ fontSize: 12 }}>Nhận câu hỏi</Text>}
              {!dialogMode && question.status == 3 && <Text style={{ fontSize: 12 }}>Trả lời</Text>}
              {dialogMode && <Text style={{ fontSize: 12 }}>{question.type}</Text>}
            </Button>}
            {!teacherMode && <Button style={{ height: 36 }} onPress={() => {
              if (question.status == 4) {
                onOpenAnswer(question);
              } else if (question.status == 3) {
                if (question.answer && (question.answer.images.length > 0 || question.answer.content != "")) {
                  onOpenAnswer(question);
                } else {
                  onShowToast("Gia sư chưa trả lời câu hỏi của bạn");
                }
              }
            }}>
              {(question.status == 4 || question.status == 3) && <Text style={{ fontSize: 12 }}>Xem câu trả lời</Text>}
            </Button>}
          </View>
        </View>
        <View
          style={{ background: '#000', marginTop: 16, marginBottom: 16 }}
        >
          <Text style={{ width: '100%' }}>
            {question.question}
          </Text>
          {question.images.length > 0 && <Image source={{ uri: question.images[0] }} style={{ height: 200, width: '100%' }} />}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={styles.tagSubject}>
            {question.subject ? question.subject.name : ""}
          </Text>
          <Text
            style={styles.tagClass}>
            {question.level ? question.level.name : ""}
          </Text>
        </View>
        {(question.status == 4 || question.status == 3) && <View>
          <Button transparent textStyle={{ color: '#87838B' }} onPress={() => {
            onOpenAnswer(question)
          }}>
            <Thumbnail small source={{ uri: question.teacher.avatar }} />
            <Text>{`Đã trả lời thông qua ${question.type}`}</Text>
          </Button>
        </View>}
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
