import {combineReducers} from 'redux'
import {
  REQUEST_BEGIN,
  REQUEST_FAILED,
  REQUEST_SUCCESS,
  RECEIVE_COURSE_TABLE
} from '../actions'
function courseTable(state = {
  loading: false,
  items: [],
  err: false
}, action) {
  switch (action.type) {
    case REQUEST_BEGIN:
      return Object.assign({}, state, {
        loading: true
      })
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loading: action.loading,
        error: false
      })
    case REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: action.loading,
        error: true,
        errMessage: action.errMessage
      })
    case RECEIVE_COURSE_TABLE:
      return Object.assign({}, state, {
        items: action.list,
      })
    default:
      return state
  }
}
export default combineReducers({
  courseTable
})
