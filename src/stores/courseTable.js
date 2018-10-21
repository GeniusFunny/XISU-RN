import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import courseTable from '../reducers/courseTable'

const loggerMiddleware = createLogger()
export default function configStore(preloadedState) {
  return createStore(
    courseTable,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
