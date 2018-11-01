import React from 'react'
import {
  AsyncStorage,
  Image,
} from 'react-native'
import {WIDTH, HEIGHT} from '../config/index'

const styles = {
  root: {
    height: HEIGHT,
    width: WIDTH
  }
}
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this._bootstrapAsync()
    }, 3000)
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user');
    console.log(123)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Image source={require('../../assets/imgs/cover.png')} style={styles.root}/>
    );
  }
}
