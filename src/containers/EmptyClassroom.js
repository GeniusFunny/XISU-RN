import React from 'react'
import API_URLS from '../api/API_URLS'
import {Snackbar, Button, TouchableRipple, Subheading, Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Picker, FlatList, View, Modal, DatePickerIOS} from 'react-native'
import EmptyClassroomItem from '../components/EmptyClassroomItem'

const styles = {
  modalContainer: {
    padding: 10,
    paddingTop: 20
  },
  floatingWindow: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: Colors.teal200,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 999
  },
  modalContentContainer: {
    marginTop: 22,
    padding: 10
  },
  buttonContainer: {
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: 50
  }
}
export default class Score extends React.Component {
  static navigationOptions = {
    headerTitle: '空教室',
  }
  state = {
    data: [],
    modalVisible: false,
    snackBarVisible: false,
    date: new Date(),
    time: '14:00-18:00'
  }
  componentDidMount() {
    this.fetchClassroom()
  }
  setModalVisible = (visible) => {
    if (!visible) {
      this.fetchClassroom()
    }
    this.setState({
      modalVisible: visible
    })
  }
  fetchClassroom = () => {
    let data = this.queryInfo()
    fetch(API_URLS.emptyClassroom, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        this.setState({
          data: JSON.parse(res._bodyInit)
        })
      })
      .catch(err => {
        console.warn(err)
        this.setState({
          snackBarVisible: true
        })
      })
  }
  setDate = date => {
    this.setState({
      date: date
    })
  }
  setTime = (itemValue) => {
    this.setState({
      time: itemValue
    })
  }
  queryInfo = () => {
    let date = this.state.date
    date = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
    let time = this.state.time
    let beginTime = time.split('-')[0]
    let endTime = time.split('-')[1]
    return {
      cycleTime: {
        dateBegin: date,
        dateEnd: date,
        cycleCount: 1,
        cycleType: 1,
        roomApplyTimeType: 0
      },
      timeBegin: beginTime,
      timeEnd: endTime
    }
  }
  render() {
    return (
      <View>
        <Snackbar message={'获取数据失败，网络异常'} onDismiss={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <TouchableRipple
          onPress={() => {
            this.setModalVisible(true)
          }}
          rippleColor='rgba(0, 0, 0, .32)'
          style={styles.floatingWindow}>
          <Icon name={'edit'} size={22}/>
        </TouchableRipple>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <Subheading>选择日期</Subheading>
            <DatePickerIOS
              onDateChange={this.setDate}
              date={this.state.date}
              mode={'date'}
              minimumDate={new Date()}
            />
            <Subheading>选择时间区间</Subheading>
            <Picker
              selectedValue={this.state.time}
              onValueChange={this.setTime}
            >
              <Picker.Item label="全天" value="8:00-22:00"/>
              <Picker.Item label="上午(8:00~12:00)" value="8:00-12:00" />
              <Picker.Item label="下午(14:00~18:00)" value="14:00-18:00" />
              <Picker.Item label="晚上(19:00~22:00)" value="19:00-22:00" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                color={Colors.grey300}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                确认
              </Button>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <EmptyClassroomItem {...item}/>}
          keyExtractor={item => item.roomName}
        />
      </View>
    )
  }
}
