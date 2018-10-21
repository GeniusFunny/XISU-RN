import {REQUEST_BEGIN, REQUEST_FAILED, REQUEST_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions'

export default function login(state = {
  loading: false,
  data: {},
  error: false,
  errMessage: ''
}, action) {
  switch(action.type) {
    case REQUEST_BEGIN:
      return Object.assign({}, state, {loading: true})
    case REQUEST_FAILED:
      return Object.assign({}, state, {loading: true, error: true, errMessage: action.errMessage})
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {loading: true})
    case LOGIN_FAILED:
      return Object.assign({}, state, {errMessage: action.measure})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {data: action.data})
    default:
      return state
  }
}
