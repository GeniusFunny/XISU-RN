import React, {Component} from 'react';
import {Platform, View, Image, Text, Animated, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {COLOR, ThemeContext, getTheme, Drawer, Button, Divider, Toolbar, Avatar} from 'react-native-material-ui'
import Score from './containers/Score'
import {createDrawerNavigator} from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}
type Props = {};

class App extends Component<Props> {
  state = {
    active: '我的课表'
  }
  static navigationOptions = {
    drawerLabel: '我的课表',
    drawerIcon: <Icon name={'signal'} size={24}/>
  }
  _openDrawer = () => {
    this.props.navigation.openDrawer()
  }
  _closeDrawer = () => {
    this.props.navigation.closeDrawer()
  }
  changeDrawerStatus = () => {
    if (this.state.showDrawer) {
      this._closeDrawer()
    } else {
      this._openDrawer()
    }
  }
  navigate = (route) => {
    this.setState({
      active: route
    })
    this._closeDrawer()
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={{flex: 1}}>
          <Toolbar
            leftElement='menu'
            centerElement={this.state.active}
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            onLeftElementPress={this.changeDrawerStatus}
          />
          <Animated.View style={{flex: 1}}>
            <Drawer>
              <Drawer.Header
                image={<Image source={require('./assets/imgs/bg.png')}/>}
              >
                <Drawer.Header.Account
                  avatar={<Avatar image={<Image source={require('./assets/imgs/avatar.png')} style={{width: 50, height: 50}}/>} size={120}/>}
                  footer={{
                    dense: true,
                    centerElement: {
                      primaryText: '李雨静',
                      secondaryText: '107242016001049',
                    },
                    rightElement: 'arrow-drop-down',
                  }}
                />
              </Drawer.Header>
              <Drawer.Section
                divider
                items={[
                  { icon: <Icon name={'tasks'} size={20}/>, value: '我的课表', active: this.state.active === '我的课表', onPress: () => this.navigate('我的课表')  },
                  { icon: <Icon name={'signal'} size={20}/>, value: '我的成绩', active: this.state.active === '我的成绩', onPress: () => this.navigate('我的成绩') },
                  { icon: <Icon name={'calendar'} size={20}/>, value: '自习室', active: this.state.active === '自习室', onPress: () => this.navigate('自习室')  }
                ]}
              />
              <Drawer.Section
                title="Personal"
                items={[
                  { icon: <Icon name={'gear'} size={20}/>, value: '设置' },
                  { icon: <Icon name={'question'} size={20}/>, value: '帮助' },
                  { icon: <Icon name={'exclamation-circle'} size={20}/>, value: '关于XISU' },
                ]}
              />
            </Drawer>
          </Animated.View>
        </View>
      </ThemeContext.Provider>
    );
  }
}
export default createDrawerNavigator({
  Home: {
    screen: App,
  },
  Score: {
    screen: Score,
  }
}, {
  drawerWidth: 250,
  contentOptions: {
    activeTintColor: COLOR.green500,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
})
