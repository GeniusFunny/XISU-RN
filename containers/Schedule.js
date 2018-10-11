import {View, FlatList, Text} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from 'react-native-material-ui/src/styles/colors'
import {createStackNavigator} from 'react-navigation'

class Schedule extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '我的课表',
    headerLeft: <Icon name={'menu'} size={25} color={'#fff'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: COLOR.blue500
    },
    headerTintColor: '#fff'
  })
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>123</Text>
      </View>
    )
  }
}
const ScheduleStatck = createStackNavigator({
  Home: {
    screen: Schedule
  }
})
ScheduleStatck.navigationOptions = {
  drawerLabel: '我的课表',
  drawerIcon: <FontAwesomeIcon name={'tasks'} size={24}/>
}
export default ScheduleStatck
