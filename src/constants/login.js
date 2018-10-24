import {LOGIN_SUCCESS, LOGIN_FAILED} from '../actions'
import {requestFailed, requestSuccess, requestBegin} from './request'
import API_URLS from '../api/API_URLS'
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
    fetch(API_URLS.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
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
        dispatch(requestFailed(err.errMessage))
        dispatch(loginFailed(err.errMessage))
      })
  }
}
