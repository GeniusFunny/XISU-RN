import * as React from 'react'
import {Colors} from 'react-native-paper'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Explore from './containers/Explore'
import Person from './containers/Person'
import Score from './containers/Score'
import EmptyClassroom from './containers/EmptyClassroom'
import CourseTable from './containers/CourseTable'

Explore.navigationOptions = {
  tabBarColor: '#009688',
  tabBarIcon: <Icon name={'explore'} size={25} color={'#fff'}/>,
}
Person.navigationOptions = {
  shifting: true,
  tabBarColor: Colors.deepPurple500,
  tabBarIcon: <Icon name={'person'} size={25} color={'#fff'}/>
}
const TabStack = createMaterialBottomTabNavigator({
  Explore: Explore,
  Profile: Person
}, {
  shifting: true,
  initRouteName: 'Profile',
  activeColor: '#fff',
  inactiveColor: '#000'
})
const AppStack = createStackNavigator({
  Tabs: TabStack,
  Score: Score,
  EmptyClassroom: EmptyClassroom,
  CourseTable: CourseTable
}, {
  headerMode: 'none'
})

export default AppStack
