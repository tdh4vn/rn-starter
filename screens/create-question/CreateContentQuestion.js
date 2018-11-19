import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import {
  Container, Left, Right, Toast, Header, Title, Label, Body, Button, Icon, Root, Input, Content, Text, Form, Item, Picker
} from 'native-base';
import PlatformIcon from '../../components/PlatformIcon';
import { StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import uploadFile from '../../repository/FileUploader';


@connect(({ question }) => ({
  levels: question.levels,
  subjects: question.subjects,
  getLevelState: question.getLevelState,
  getSubjectState: question.getSubjectState,
  message: question.message
}), dispatch => (bindActionCreators(Actions, dispatch)))
export default class CreateContentQuestion extends React.Component {
  static navigationOptions = {
    title: "Tạo câu hỏi",
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      level: undefined,
      subject: undefined,
      detail: "",
      detailValidate: undefined,
      subjectValidate: undefined,
      levelValidate: undefined
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getLevels()
    this.props.getSubjects()
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async (image) => {
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
      })
      // try {

      //   const downloadURL = await uploadFile("hihhi", image)
      //   console.log(downloadURL)

      // } catch (e) {
      //   console.log(e)
      // }
    });
  }

  onLevelChange(value) {
    this.setState({
      level: value,
      levelValidate: true
    });
  }

  onSubjectChange(value) {
    this.setState({
      subject: value,
      subjectValidate: true
    });
  }

  onValidateData() {
    const { levelValidate, subjectValidate, detailValidate } = this.state
    if (levelValidate && subjectValidate && detailValidate) {
      const { navigation } = this.props;
      const {
        image,
        level,
        subject,
        detail
      } = this.state;
      const pushAction = StackActions.push({
        routeName: 'ChooseTeacher',
        params: {
          detail,
          subject,
          level,
          image
        }
      });
      navigation.dispatch(pushAction);
    } else {
      Toast.show({
        text: "Vui lòng hoàn thành đủ thông tin",
        duration: 2000,
        type: "danger"
      })
      this.setState({
        detailValidate: detailValidate === undefined ? false : detailValidate,
        subjectValidate: subjectValidate === undefined ? false : subjectValidate,
        levelValidate: levelValidate === undefined ? false : levelValidate,
      })
    }
  }

  onDetailChange(value) {
    if (value.length > 0) {
      this.setState({
        detailValidate: true,
        detail: value
      })
    } else {
      this.setState({
        detail: value,
        detailValidate: false
      })
    }
  }


  render() {
    const { goBack } = this.props.navigation;
    const { levels, subjects, getLevelState, getSubjectState } = this.props;
    const { image, levelValidate, subjectValidate, detailValidate } = this.state
    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => {
                goBack(null)
              }}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{CreateContentQuestion.navigationOptions.title}</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.onValidateData.bind(this)}>
                <Text>Tiếp tục</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Form>
              <Text style={{ marginTop: 8, marginBottom: 8, marginLeft: 8 }}>Hình ảnh mô tả</Text>
              <TouchableOpacity
                onPress={this.openImagePicker}>
                <Image
                  style={{ width: '100%', height: 200 }}
                  source={image != null ? image : require('../../assets/images/no-image-box.png')} />
              </TouchableOpacity>

              <Item floatingLabel error={detailValidate === false} success={detailValidate === true}>
                <Label>Mô tả</Label>
                <Input multiline={true} onChangeText={this.onDetailChange.bind(this)} value={this.state.detail} />
              </Item>
              <Item style={styles.rowContainer} error={levelValidate === false} success={levelValidate === true}>
                <Label>Cấp độ</Label>
                {getLevelState == 2 && <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={styles.internalPickerContainer}
                  placeholder="Chọn cấp độ"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.level}
                  onValueChange={this.onLevelChange.bind(this)}
                >
                  {
                    levels.map((item) => {
                      console.log(item)
                      return <Picker.Item label={item.name} value={item._id} />
                    })
                  }
                </Picker>}
              </Item>
              <Item style={styles.rowContainer} error={subjectValidate === false} success={subjectValidate === true}>
                <Label>Môn học</Label>
                {getSubjectState == 2 && <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={styles.internalPickerContainer}
                  placeholder="Chọn môn học"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.subject}
                  onValueChange={this.onSubjectChange.bind(this)}
                >
                  {
                    subjects.map((item) => (
                      <Picker.Item label={item.name} value={item._id} />
                    ))
                  }
                </Picker>}
              </Item>
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  rowContainer: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === 'ios' ? undefined : 120,
  },
});
