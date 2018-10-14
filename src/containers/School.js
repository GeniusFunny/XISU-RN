import React from 'react'
import {Colors, List} from 'react-native-paper'
import {createStackNavigator} from 'react-navigation'
import Score from './Score'
import EmptyClassroom from './EmptyClassroom'
import CourseTable from './CourseTable'

const NavigateIcon = (props) => {
  return (
    <List.Icon color={Colors.teal200} {...props}/>
  )
}
class School extends React.Component {
  static navigationOptions = {
    title: 'School'
  }
  navigate = (key) => {
    this.props.navigation.navigate(key)
  }
  render() {
    return (
      <>
        <List.Item
          title={'查询成绩'}
          left={() => <NavigateIcon icon="assessment"/>}
          onPress={() => this.navigate('Score')}
        />
        <List.Item
          title={'查询课程'}
          left={() => <NavigateIcon icon="class"/>}
          onPress={() => this.navigate('CourseTable')}
        />
        <List.Item
          title={'查询空教室'}
          left={() => <NavigateIcon icon="location-city"/>}
          onPress={() => this.navigate('EmptyClassroom')}
        />
      </>
    )
  }
}
export default createStackNavigator(
  {
    Home: School,
    Score: Score,
    EmptyClassroom: EmptyClassroom,
    CourseTable: CourseTable
  },
  {
    initRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.deepPurple500
      },
      headerTintColor: '#fff'
    }
  }
)
