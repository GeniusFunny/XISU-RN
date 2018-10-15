import API_URLS from '../api/API_URLS'
import {requestBegin, requestFailed, requestSuccess} from './request'
import {UPDATE_SCORE_LIST, RECEIVE_SCORE_LIST, CHANGE_SCORE_OPTIONS_YEAR, CHANGE_SCORE_OPTIONS_TERM} from '../actions/index'

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
      .then(res => {
        dispatch(requestSuccess())
        return JSON.parse(res._bodyInit)
      })
      .then(items => {
        dispatch(receiveScore(items))
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
