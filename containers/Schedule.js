import {View, FlatList} from 'react-native'
import React from 'react'
import {getTheme, ThemeContext} from 'react-native-material-ui'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AppText from '../components/AppText'
import {MainTitle} from '../components/AppTitle'
import {Card, Snackbar} from 'react-native-paper'
import {createStackNavigator} from 'react-navigation'
import API_URL from '../api'
import uiTheme from '../config'
import AppIcon from '../components/AppIcon'
const ScheduleItem = (props) => {
  let icon = require('../assets/imgs/material-10.png')
  let iconIndex = props.index % 8
  // switch (iconIndex) {
  //   case 1:
  //     icon = require('../assets/imgs/1.png')
  //     break
  //   case 2:
  //     icon = require('../assets/imgs/2.png')
  //     break
  //   case 3:
  //     icon = require('../assets/imgs/3.png')
  //     break
  //   case 4:
  //     icon = require('../assets/imgs/4.png')
  //     break
  //   case 5:
  //     icon = require('../assets/imgs/5.png')
  //     break
  //   case 6:
  //     icon = require('../assets/imgs/6.png')
  //     break
  //   case 7:
  //     icon = require('../assets/imgs/7.png')
  //     break
  //   case 8:
  //     icon = require('../assets/imgs/8.png')
  //     break
  //   default:
  //     break
  // }
  switch (iconIndex) {
    case 1:
      icon = require('../assets/imgs/material-1.png')
      break
    case 2:
      icon = require('../assets/imgs/material-2.png')
      break
    case 3:
      icon = require('../assets/imgs/material-3.png')
      break
    case 4:
      icon = require('../assets/imgs/material-4.png')
      break
    case 5:
      icon = require('../assets/imgs/material-5.png')
      break
    case 6:
      icon = require('../assets/imgs/material-7.png')
      break
    case 7:
      icon = require('../assets/imgs/material-8.png')
      break
    case 8:
      icon = require('../assets/imgs/material-9.png')
      break
    default:
      break
  }
  return (
    <Card elevation={5} style={{marginBottom: 10}}>
      <Card.Cover source={icon}/>
      <Card.Content>
        <MainTitle title={props.courseName}/>
        <AppText text={`授课教师：${props.teacher}`}/>
        <AppText text={`课程安排：第${props.plan}周`}/>
        <AppText text={`教室：${props.classroom}`}/>
      </Card.Content>
    </Card>
  )
}
class Schedule extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '课程信息',
    headerLeft: <AppIcon name={'menu'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: uiTheme.palette.primaryColor
    },
    headerTintColor: uiTheme.palette.FontColor
  })
  state = {
    snackBarVisible: false,
    data: []
  }
  componentDidMount() {
    fetch(API_URL.schedule)
      .then(res => {
        let data = JSON.parse(res._bodyInit).map((item, index) => ({
          ...item,
          index: index
        }))
        this.setState({
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          snackBarVisible: true
        })
      })
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={{backgroundColor: '#fff'}}>
          <Snackbar
            onDismiss={() => this.setState({snackBarVisible: false})}
            visible={this.state.snackBarVisible}
          >
            获取数据失败，网络异常
          </Snackbar>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <ScheduleItem {...item}/>}
            keyExtractor={item => item.id}
          />
        </View>
      </ThemeContext.Provider>
    )
  }
}
const ScheduleStatck = createStackNavigator({
  Home: {
    screen: Schedule
  }
})
ScheduleStatck.navigationOptions = {
  drawerLabel: '课程信息',
  drawerIcon: <FontAwesomeIcon name={'tasks'} size={24}/>
}
export default ScheduleStatck
