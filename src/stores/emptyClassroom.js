import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import emptyClassroomReducer from '../reducers/emptyClassroom'
const loggerMiddleware = createLogger()
export default function configStore(preloadedState) {
  return createStore(
    emptyClassroomReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
