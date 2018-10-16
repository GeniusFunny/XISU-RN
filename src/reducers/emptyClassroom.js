import {combineReducers} from 'redux'
import {
  CHANGE_CLASSROOM_OPTIONS_TIME,
  CHANGE_CLASSROOM_OPTIONS_DATE,
  RECEIVE_EMPTY_CLASSROOM_LIST,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  REQUEST_BEGIN
} from '../actions'
function emptyClassroom(state = {
  loading: false,
  list: [],
  date: new Date(),
  time: '14:00-18:00'
}, action) {
  switch (action.type) {
    case REQUEST_BEGIN:
      return Object.assign({}, state, {
        loading: true
      })
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loading: action.loading
      })
    case REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: action.loading,
        errMessage: action.errMessage
      })
    case RECEIVE_EMPTY_CLASSROOM_LIST:
      return Object.assign({}, state, {
        list: action.list
      })
    case CHANGE_CLASSROOM_OPTIONS_DATE:
      return Object.assign({}, state, {
        date: action.date
      })
    case CHANGE_CLASSROOM_OPTIONS_TIME:
      return Object.assign({}, state, {
        time: action.time
      })
    default:
      return state
  }
}
export default combineReducers({
  emptyClassroom
})
