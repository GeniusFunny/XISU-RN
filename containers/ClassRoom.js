import {View, FlatList, Text, Modal, DatePickerIOS, Picker, TouchableHighlight, ScrollView, Button} from 'react-native'
import React from 'react'
import {getTheme, ThemeContext} from 'react-native-material-ui'
import {List, Divider, Snackbar} from 'react-native-paper'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {createStackNavigator} from 'react-navigation'
import API_URL from '../api'
import uiTheme from '../config'
import AppText from '../components/AppText'
import {SubTitle} from '../components/AppTitle'
import AppIcon from '../components/AppIcon'
const styles = {
  listItem: {
    leftElementContainer: {
      borderRadius: 25,
      width: 50,
      height: 50,
      backgroundColor: uiTheme.palette.primaryColor,
      justifyContent: 'center',
      alignItems: 'center'
    },
    leftElement: {
      color: uiTheme.palette.FontColor
    }
  },
  floatingWindow: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: uiTheme.palette.SecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 999
  },
  modalContentContainer: {
    marginTop: 22,
    padding: 10
  }
}
const ClassRoomItem = (props) => {
  return (
    <View>
      <List.Item
        title={<AppText text={`${props.location} ${props.roomName} ${props.type}`}/>}
        description={<AppText text={`${props.date} ${props.time}`} style={{fontSize: uiTheme.fontSize.subText, color: uiTheme.palette.infoColor}}/>}
        left={() => <View style={styles.listItem.leftElementContainer}>
          <Text style={styles.listItem.leftElement}>{props.size}</Text>
        </View>}
      />
      <Divider/>
    </View>
  )
}
class ClassRoom extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '空闲自习室',
    headerLeft: <AppIcon name={'menu'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: uiTheme.palette.primaryColor
    },
    headerTintColor: uiTheme.palette.FontColor
  })
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
      .catch(err => {
        console.log(err)
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
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Snackbar
          onDismiss={() => this.setState({snackBarVisible: false})}
          visible={this.state.snackBarVisible}
        >
          获取数据失败，网络异常
        </Snackbar>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
          style={styles.floatingWindow}>
          <AppIcon name={'edit'}/>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ScrollView style={styles.modalContentContainer}>
            <View>
              <SubTitle title={'选择日期'}/>
              <DatePickerIOS
                onDateChange={this.setDate}
                date={this.state.date}
                mode={'date'}
                minimumDate={new Date()}
              />
              <SubTitle title={'选择时间区间'}/>
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
          keyExtractor={item => item.roomName}
        />
      </ThemeContext.Provider>
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
