import API_URLS from '../api/API_URLS'
import {requestBegin, requestFailed, requestSuccess} from './request'
import {RECEIVE_COURSE_TABLE} from '../actions'
import {receiveScore} from './score'

export function fetchCourseTable() {
  return dispatch => {
    dispatch(requestBegin())
    fetch(API_URLS.courseTable, {
      credentials: 'include'
    })
      .then(res => {
        return JSON.parse(res._bodyInit)
      })
      .then(res => {
        console.log(res)
        if (res.status === 0) {
          dispatch(requestSuccess())
          dispatch(receiveCourseTable(res.data.items))
        } else {
          dispatch(requestFailed('服务器错误'))
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

