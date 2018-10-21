import React from 'react'
import {Title} from 'react-native-paper'
import {View} from 'react-native'
import {createStackNavigator, TabNavigator} from 'react-navigation'

const styles = {
  root: {
    padding: 5
  }
}
class Home extends React.Component {
  render() {
    return(
      <View style={styles.root}>
        <Title>123</Title>
      </View>
    )
  }
}

export default Home
