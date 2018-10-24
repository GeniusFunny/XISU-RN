import React from 'react'
import {View, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import {TextInput, Button, Snackbar, Title, Colors} from 'react-native-paper'
import {login} from '../constants/login'
import {withNavigation} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import WithStore from './WithStore'
import store from '../stores/login'

const styles = {
  root: {
    width: 375,
    height: 672,
    justifyContent: 'center'
  },
  form: {
    title: {
      alignItems: 'center',
      paddingBottom: 30
    },
    body: {
      padding: 20,
      marginBottom: 15
    },
    firstInput: {
      backgroundColor: 'transparent',
      marginBottom: 20
    },
    input: {
      backgroundColor: 'transparent',
    }
  },
  buttonContainer: {
    paddingLeft: 100,
    paddingRight: 100
  }
}
class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    snackBarVisible: false,
    visible: false
  }
  _handleTextChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.login) {
      nextProps.navigation.navigate('Profile')
    }
    return true
  }
  _login = () => {
    const {dispatch} = this.props
    const {password, username} = this.state
    if (password.length && username.length) {
      dispatch(login(this.state.username, this.state.password))
    } else {
      this.setState({
        visible: true
      })
    }
  }
  render() {
    return (
      <ImageBackground source={{uri: 'http://img.hb.aicdn.com/de1470abfd62e4ac954037320a954469fb6266d94dec3-q0jKuC_fw658'}} style={styles.root}>
        <Spinner
          textContent={'login...'}
          visible={this.props.loading}
        />
        <Snackbar visible={this.props.error} onDismiss={() => this.setState({snackBarVisible: false})}>
          {this.props.errMessage}
        </Snackbar>
        <Snackbar visible={this.state.visible} onDismiss={() => this.setState({visible: false})}>
          请输入正确的用户名及密码
        </Snackbar>
        <View style={styles.form.title}>
          <Title>
            Hi, Welcome back.
          </Title>
        </View>
        <View style={styles.form.body}>
          <TextInput
            label={'ID'}
            keyboardType={'numeric'}
            maxLength={18}
            value={this.state.username}
            onChangeText={text => this._handleTextChange('username', text)}
            style={styles.form.firstInput}
          />
          <TextInput
            label={'Password'}
            secureTextEntry={true}
            maxLength={16}
            value={this.state.password}
            onChangeText={text => this._handleTextChange('password', text)}
            style={styles.form.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this._login()}
            mode={'contained'}
          >
            Login
          </Button>
        </View>
      </ImageBackground>
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
