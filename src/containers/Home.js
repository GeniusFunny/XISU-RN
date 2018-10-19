import React from 'react'
import {Title} from 'react-native-paper'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation'

const styles = {
  root: {
    padding: 5
  }
}
class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  render() {
    return(
      <View style={styles.root}>
        <Title>123</Title>
      </View>
    )
  }
}

export default createStackNavigator({
  Home: Home
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#3F51B5',
    },
    headerTintColor: '#fff'
  }
})
