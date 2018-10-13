import React, {Component} from 'react';
import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {ThemeContext, getTheme, Snackbar } from 'react-native-material-ui'
import Score from './containers/Score'
import {createDrawerNavigator, createStackNavigator, SafeAreaView, DrawerItems} from 'react-navigation'
import ClassRoom from './containers/ClassRoom'
import Schedule from './containers/Schedule'
import API_URL from './api'
import uiTheme from './config'
import AppIcon from './components/AppIcon'
const styles = {
  drawer: {
    background: {
      height: 140,
      flex: 1,
      padding: 15
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30
    },
    personalInfoContainer: {
      fontSize: 20,
      marginTop: 15
    },
    user: {
      marginBottom: 5,
      color: uiTheme.palette.FontColor
    },
    id: {
      color: uiTheme.palette.FontColor
    }
  }
}
class App extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '主要',
    headerLeft: <AppIcon name={'menu'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: uiTheme.palette.primaryColor
    },
    headerRight: <AppIcon name={'person'}/>,
    headerTintColor: uiTheme.palette.FontColor
  })
  state = {
    snackBarVisible: false
  }
  // componentDidMount() {
  //   fetch(API_URL.login, {
  //     method: 'POST',
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         username: 'test',
  //         password: '123'
  //       })
  //   })
  //   .then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //     this.setState({
  //       visible: true
  //     })
  //   })
  // }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Snackbar message={'登陆失败，网络异常'} onRequestClose={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
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
  drawerIcon: <AppIcon name={'home'}/>
}
const DrawerContent = (props) => {
  return (
    <ScrollView>
      <ImageBackground style={styles.drawer.background} source={require('./assets/imgs/material-2.png')}>
        <Image source={require('./assets/imgs/avatar.png')} style={styles.drawer.avatar}/>
        <View style={styles.drawer.personalInfoContainer}>
          <Text style={styles.drawer.user}>{props.user || 'GeniusFunny'}</Text>
          <Text style={styles.drawer.id}>{props.id || 'geniusfunnyyh@gmail'}</Text>
        </View>
      </ImageBackground>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
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
    activeTintColor: uiTheme.palette.primaryColor,
    itemsContainerStyle: {
      marginVertical: 0,
    }
  }
})
