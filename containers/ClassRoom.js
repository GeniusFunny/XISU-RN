import {View, FlatList, Text, Modal, DatePickerIOS, Picker, TouchableHighlight, ScrollView, Button} from 'react-native'
import React from 'react'
import {ListItem} from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from 'react-native-material-ui/src/styles/colors'
import {createStackNavigator} from 'react-navigation'
import API_URL from '../api'
const ClassRoomItem = (props) => {
  return (
    <ListItem
      divider
      centerElement={{
        primaryText: `${props.roomName}`,
        secondaryText:`${props.date} ${props.time}`
      }}
      rightElement={
        <View style={{ borderRadius: 25, width: 50, height: 50, backgroundColor: COLOR.blue500, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>{props.size}</Text>
        </View>
      }
    />
  )
}
class ClassRoom extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '空闲自习室',
    headerLeft: <Icon name={'menu'} size={25} color={'#fff'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: COLOR.blue500
    },
    headerTintColor: '#fff'
  })
  state = {
    data: [],
    modalVisible: false,
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
    fetch(API_URL.classroom, {
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
      <View style={{flex: 1}}>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
          style={{height: 50, width: 50, borderRadius: 25, backgroundColor: COLOR.pink500, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 50, bottom: 50, zIndex: 999 }}        >
          <Icon name={'edit'} size={25} color={'#fff'} />
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ScrollView style={{ marginTop: 22, padding: 10 }}>
            <View>
              <Text style={{fontSize: 18}}>选择日期</Text>
              <DatePickerIOS
                onDateChange={this.setDate}
                date={this.state.date}
                mode={'date'}
                minimumDate={new Date()}
              />
              <Text style={{fontSize: 18}}>选择时间区间</Text>
              <Picker
                selectedValue={this.state.time}
                onValueChange={this.setTime}
              >
                <Picker.Item label="全天" value="8:00-22:00"/>
                <Picker.Item label="上午(8:00~12:00)" value="8:00-12:00" />
                <Picker.Item label="下午(14:00~18:00)" value="14:00-18:00" />
                <Picker.Item label="晚上(19:00~22:00)" value="19:00-22:00" />
              </Picker>
              <Button
                title={'确认'}
                onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}/>
            </View>
          </ScrollView>
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ClassRoomItem {...item}/>}
        />
      </View>
    )
  }
}
const ClassRoomStatck = createStackNavigator({
  Home: {
    screen: ClassRoom
  }
})
ClassRoomStatck.navigationOptions = {
  drawerLabel: '自习室',
  drawerIcon: <FontAwesomeIcon name={'calendar'} size={24}/>
}
export default ClassRoomStatck
