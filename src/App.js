import * as React from 'react'
import { BottomNavigation, Text, Colors} from 'react-native-paper'
import Home from './containers/Home'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createStackNavigator, createSwitchNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Explore from './containers/Explore'
import Person from './containers/Person'
import Score from './containers/Score'
import EmptyClassroom from './containers/EmptyClassroom'
import CourseTable from './containers/CourseTable'

Home.navigationOptions = {
  headerTitle: <Text>123</Text>,
  tabBarIcon: <Icon name={'home'} size={25} color={'#fff'}/>,
  tabBarColor: '#3F51B5'
}
Explore.navigationOptions = {
  tabBarColor: '#009688',
  tabBarIcon: <Icon name={'explore'} size={25} color={'#fff'}/>
}
Person.navigationOptions = {
  tabBarColor: Colors.deepPurple500,
  tabBarIcon: <Icon name={'person'} size={25} color={'#fff'}/>
}
const TabStack = createMaterialBottomTabNavigator({
  Home: Home,
  Explore: Explore,
  School: Person,
  Person: Person
}, {
  initialRouteName: 'Home',
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
