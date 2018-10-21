import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import scoreReducer from '../reducers/score'
const loggerMiddleware = createLogger()
export default function configStore(preloadedState) {
  return createStore(
    scoreReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
