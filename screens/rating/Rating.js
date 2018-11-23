import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Input, Container, Textarea, Left, Right, Header, Title, Body, Button, Fab, Segment, Spinner, Icon, Text, List, ListItem
} from 'native-base';
import PlatformIcon from '../../components/PlatformIcon';
import Dialog, { DialogContent, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';

export default class RaingDialog extends React.Component {
  state = {
    starCount: 3,
    comment: ""
  }

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  }


  render() {

    const { visible, onCancel, onComplete } = this.props;

    console.log(this.props)

    const { starCount, comment } = this.state;

    return (<Dialog
      dialogTitle={<DialogTitle title="Đánh giá câu trả lời" />}
      visible={visible}
      onTouchOutside={() => {
        this.setState({ visible: false });
      }}
      width={0.9}
      actions={[
        <DialogButton
          text="Hủy"
          onPress={() => {
            onCancel()
          }}
        />,
        <DialogButton
          text="Gửi đánh giá"
          onPress={() => {
            onComplete(starCount, value)
          }}
        />,
      ]}
    >
      <DialogContent style={{ paddingTop: 16 }}>
        <View style={{ flexDirection: 'column' }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Textarea
            onChangeText={(value) => {
              this.setState({
                comment: value
              })
            }}
            value={comment}
            bordered
            rowSpan={5}
            placeholder='Bạn nhận xét như thế nào về câu trả lời này' />
        </View>
      </DialogContent>
    </Dialog>)
  }
}