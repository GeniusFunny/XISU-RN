import API_URLS from '../api/API_URLS'
import {requestBegin, requestFailed, requestSuccess} from './request'
import {RECEIVE_COURSE_TABLE} from '../actions'
import {receiveScore} from './score'

export function fetchCourseTable() {
  return dispatch => {
    dispatch(requestBegin())
    fetch(API_URLS.courseTable)
      .then(res => JSON.parse(res._bodyInit))
      .then(res => {
        if (res.status === 0) {
          dispatch(requestSuccess())
          dispatch(receiveCourseTable(res.data.items))
        } else if (res.status === 1) {
          dispatch(requestFailed('服务器错误'))
        } else {
          dispatch(requestFailed('认证失效，请重新登陆'))
        }
      })
      .catch(err => {
        dispatch(requestFailed(err.message))
      })
  }
}

export function receiveCourseTable(list) {
  return {
    type: RECEIVE_COURSE_TABLE,
    list: list
  }
}

