import React from 'react'
import {View, Image, ImageBackground} from 'react-native'
import {List, Colors} from 'react-native-paper'
import {createStackNavigator, createSwitchNavigator} from 'react-navigation'
import Score from './Score'
import EmptyClassroom from './EmptyClassroom'
import CourseTable from './CourseTable'

const styles = {
  avatarContainer: {
    height: 200,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
}
const NavigateIcon = (props) => {
  return (
    <List.Icon color={Colors.teal200} {...props}/>
  )
}
export default class Person extends React.Component {
  navigate = (key) => {
    this.props.navigation.navigate(key)
  }
  render() {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../assets/imgs/material-19.png')} style={styles.avatarContainer}>
          <Image source={require('../../assets/imgs/avatar.png')} style={styles.avatar}/>
        </ImageBackground>
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
      </View>
    )
  }
}
