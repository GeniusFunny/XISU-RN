import API_URLS from '../api/API_URLS'
import {requestBegin, requestFailed, requestSuccess} from './request'
import {RECEIVE_COURSE_TABLE} from '../actions'

export function fetchCourseTable() {
  return dispatch => {
    dispatch(requestBegin())
    fetch(API_URLS.courseTable)
      .then(res => {
        console.log(res)
        return JSON.parse(res._bodyInit)
      })
      .then(list => {
        dispatch(requestSuccess())
        dispatch(receiveCourseTable(list))
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

