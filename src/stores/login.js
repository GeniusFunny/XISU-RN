import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import loginReducer from '../reducers/login'
const loggerMiddleware = createLogger()

export default function configStore(preloadedState) {
  return createStore(loginReducer, preloadedState, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
}
