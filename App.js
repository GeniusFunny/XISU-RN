import React, {Component} from 'react';
import {View, Button, Text, ScrollView, Image, ImageBackground, DatePickerIOS, Slider, Picker, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {COLOR, ThemeContext, getTheme, Divider } from 'react-native-material-ui'
import Score from './containers/Score'
import {createDrawerNavigator, createStackNavigator, SafeAreaView, DrawerItems} from 'react-navigation'
import ClassRoom from './containers/ClassRoom'
import Schedule from './containers/Schedule'
import API_URL from './api'

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}

class App extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '主要',
    headerLeft: <Icon name={'menu'} size={25} color={'#fff'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: COLOR.blue500
    },
    headerRight: <Icon name={'person'} size={25} color={'#fff'} />,
    headerTintColor: '#fff'
  })
  componentDidMount() {
    fetch(API_URL.login, {
      method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: '123456',
          password: '123456n'
        })
    })
    .then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Text>123</Text>
      </ThemeContext.Provider>
    );
  }
}
const AppStatck = createStackNavigator({
  Home: {
    screen: App
  }
})
AppStatck.navigationOptions = {
  drawerLabel: '主要',
  drawerIcon: <Icon name={'home'} size={24}/>
}
const DrawerContent = (props) => {
  return (
    <ScrollView>
      <ImageBackground style={{height: 140, flex: 1, padding: 15}} source={require('./assets/imgs/material-8.png')}>
        <Image source={require('./assets/imgs/avatar.png')} style={{width: 60, height: 60, borderRadius: 30}}/>
        <View style={{fontSize: 20, marginTop: 15}}>
          <Text style={{marginBottom: 5, color: '#fff'}}>李雨静</Text>
          <Text style={{color: '#fff'}}>107242016001049</Text>
        </View>
      </ImageBackground>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
}
export default createDrawerNavigator({
  Home: {
    screen: AppStatck,
    path: '/'
  },
  ClassRoom: {
    screen: ClassRoom,
    path: '/classroom'
  },
  Score: {
    screen: Score,
    path: '/score'
  },
  Schedule: {
    screen: Schedule,
    path: '/schedule'
  }
}, {
  initialRouteName: 'Home',
  drawerWidth: 250,
  contentComponent: DrawerContent,
  contentOptions: {
    activeTintColor: COLOR.blue500,
    itemsContainerStyle: {
      marginVertical: 0,
    }
  }
})
