import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PlatformIcon from '../../components/PlatformIcon';
import { Button, View } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: 'Thông báo',
  };

  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onAttachClicked() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      console.log(image);
    });
  }

  async onOpenCamera() {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
      })
    } catch (e) {
      console.log(e)
    }

  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderActions={() => <View style={styles.actionsContainer}>
          <Button transparent style={styles.actionStyle} onPress={this.onOpenCamera.bind(this)}><PlatformIcon name='camera' style={styles.icon} /></Button>
          <Button transparent style={styles.actionStyle} onPress={this.onAttachClicked.bind(this)}><PlatformIcon name='image' style={styles.icon} /></Button>
        </View>}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 8,
    marginRight: 8
  },
  actionStyle: {
    //flexGrow: 1
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
