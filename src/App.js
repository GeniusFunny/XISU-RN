import {StackNavigator, SwitchNavigator} from 'react-navigation'
import Auth from './containers/Auth'
import RouteStack from './Route'
import AuthLoadingScreen from './containers/AuthLoading'

const AuthStack = StackNavigator({
  SignIn: Auth
}, {
  headerMode: 'none'
})

export default SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: RouteStack
}, {
  initRouteName: 'AuthLoading',
  headerMode: 'none'
})
