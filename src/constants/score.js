import API_URLS from '../api/API_URLS'
import {requestBegin, requestFailed, requestSuccess} from './request'
import {UPDATE_SCORE_LIST, RECEIVE_SCORE_LIST, CHANGE_SCORE_OPTIONS_YEAR, CHANGE_SCORE_OPTIONS_TERM} from '../actions/index'
import {receiveCourseTable} from './courseTable'

export function updateYear(year) {
  return {
    type: CHANGE_SCORE_OPTIONS_YEAR,
    selectedYear: year,
  }
}
export function updateTerm(term) {
  return {
    type: CHANGE_SCORE_OPTIONS_TERM,
    selectedTerm: term
  }
}
export function receiveScore(data) {
  return {
    type: RECEIVE_SCORE_LIST,
    scoreList: data
  }
}
export function fetchScore() {
  return dispatch => {
    dispatch(requestBegin())
    return fetch(API_URLS.score)
      .then(res => JSON.parse(res._bodyInit))
      .then(res => {
        if (res.status === 0) {
          dispatch(requestSuccess())
          dispatch(receiveScore(res.data.items))
        } else {
          dispatch(requestFailed('服务器错误'))
        }
      })
      .catch(err => {
        dispatch(requestFailed(err.message))
      })
  }
}
export function updateScore() {
  return {
    type: UPDATE_SCORE_LIST
  }
}
