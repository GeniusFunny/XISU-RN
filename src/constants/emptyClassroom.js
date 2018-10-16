import API_URLS from '../api/API_URLS'
import {requestSuccess, requestFailed, requestBegin} from './request'
import {
  CHANGE_CLASSROOM_OPTIONS_DATE,
  CHANGE_CLASSROOM_OPTIONS_TIME,
  RECEIVE_EMPTY_CLASSROOM_LIST
} from '../actions'

export function updateDate(date) {
  return {
    type: CHANGE_CLASSROOM_OPTIONS_DATE,
    date: date
  }
}
export function updateTime(time) {
  return {
    type: CHANGE_CLASSROOM_OPTIONS_TIME,
    time: time
  }
}
export function receiveEmptyClassroom(list) {
  return {
    type: RECEIVE_EMPTY_CLASSROOM_LIST,
    list: list
  }
}
function queryInfo(date, time) {
  date = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
  let beginTime = time.split('-')[0]
  let endTime = time.split('-')[1]
  return {
    cycleTime: {
      dateBegin: date,
      dateEnd: date,
      cycleCount: 1,
      cycleType: 1,
      roomApplyTimeType: 0
    },
    timeBegin: beginTime,
    timeEnd: endTime
  }
}
export function fetchEmptyClassroom(date, time) {
  return dispatch => {
    dispatch(requestBegin())
    let data = queryInfo(date, time)
    fetch(API_URLS.emptyClassroom, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        dispatch(requestSuccess())
        return JSON.parse(res._bodyInit)
      })
      .then(list => dispatch(receiveEmptyClassroom(list)))
      .catch(err => {
        dispatch(requestFailed(err.message))
      })
  }
}
