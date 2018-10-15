import {REQUEST_SUCCESS, REQUEST_FAILED, REQUEST_BEGIN} from '../actions/index'
export function requestBegin() {
  return {
    type: REQUEST_BEGIN,
    loading: true
  }
}
export function requestFailed(errMessage) {
  return {
    type: REQUEST_FAILED,
    loading: false,
    errMessage: errMessage
  }
}
export function requestSuccess() {
  return {
    type: REQUEST_SUCCESS,
    loading: false
  }
}
