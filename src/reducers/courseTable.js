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
