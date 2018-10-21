import {StackNavigator, SwitchNavigator} from 'react-navigation'
import Auth from './containers/Auth'
import App from './App'
import AuthLoadingScreen from './containers/AuthLoading'

const AuthStack = StackNavigator({
  SignIn: Auth
}, {
  headerMode: 'none'
})

export default SwitchNavigator({
  AuthLoading: AuthLoadingScreen,oo
  Auth: AuthStack,
  App: App,
}, {
  initRouteName: 'AuthLoading',
  headerMode: 'none'
})

