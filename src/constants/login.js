import {LOGIN_SUCCESS, LOGIN_FAILED} from '../actions'
import {requestFailed, requestSuccess, requestBegin} from './request'
import API_URLS from '../api/API_URLS'
import request from '../api/request'
const loginFailed = (errMessage) => {
  return {
    type: LOGIN_FAILED,
    errMessage: errMessage
  }
}

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data
  }
}
export function login(username, password) {
  return dispatch => {
    dispatch(requestBegin())
    request(API_URLS.login, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => JSON.parse(res._bodyInit))
      .then(res => {
        if (res.status === 1) {
          dispatch(requestFailed('登录失败'))
          dispatch(loginFailed(res.data.errMessage))
        } else {
          dispatch(requestSuccess())
          dispatch(loginSuccess(res.data))
        }
      })
      .catch(err => {
        let errMessage = err.errMessage || '服务器宕机'
        dispatch(requestFailed(errMessage))
        if (err.errMessage) {
          dispatch(loginFailed(errMessage))
        }
      })
  }
}
