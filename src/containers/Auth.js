import React from 'react'
import {View, Image} from 'react-native'
import {connect} from 'react-redux'
import {TextInput, Button, Snackbar} from 'react-native-paper'
import {login} from '../constants/login'
import {withNavigation} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import WithStore from './WithStore'
import store from '../stores/login'

class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    snackBarVisible: false
  }
  _handleTextChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  _login = () => {
    const {dispatch} = this.props
    dispatch(login(this.state.username, this.state.password))
  }
  render() {
    const {login} = this.props
    if (login) {
      this.props.navigation.navigate('Home')
    }
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Spinner
          textContent={'login...'}
          visible={this.props.loading}
        />
        <Snackbar visible={this.props.error} onDismiss={() => this.setState({snackBarVisible: false})}>
          {this.props.errMessage}
        </Snackbar>
        <Image source={require('../../assets/imgs/material-10.png')} style={{width: 375, height: 200}}/>
        <View style={{padding: 20, backgroundColor: '#fff', marginBottom: 15}}>
          <TextInput
            label={'学号'}
            keyboardType={'numeric'}
            maxLength={18}
            value={this.state.username}
            onChangeText={text => this._handleTextChange('username', text)}
          />
          <TextInput
            label={'密码'}
            secureTextEntry={true}
            maxLength={16}
            value={this.state.password}
            onChangeText={text => this._handleTextChange('password', text)}
          />
        </View>
        <Button onPress={() => this._login()} style={{paddingLeft: 100, paddingRight: 100}}>
          Login
        </Button>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const {loading, error, errMessage, login} = state
  return {
    loading: loading,
    error: error,
    errMessage: errMessage,
    login: login
  }
}
export default WithStore(connect(mapStateToProps)(withNavigation(Auth)), store)
