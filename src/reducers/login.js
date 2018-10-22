import {REQUEST_BEGIN, REQUEST_FAILED, REQUEST_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions'

export default function login(state = {
  loading: false,
  data: {},
  error: false,
  errMessage: '',
  login: false
}, action) {
  switch(action.type) {
    case REQUEST_BEGIN:
      return Object.assign({}, state, {loading: true})
    case REQUEST_FAILED:
      return Object.assign({}, state, {loading: false, error: true, errMessage: action.errMessage})
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {loading: false})
    case LOGIN_FAILED:
      return Object.assign({}, state, {errMessage: action.measure, login: false})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {data: action.data, login: true})
    default:
      return state
  }
}
