import {combineReducers} from 'redux'
import {
  UPDATE_SCORE_LIST,
  RECEIVE_SCORE_LIST,
  REQUEST_FAILED,
  REQUEST_BEGIN,
  REQUEST_SUCCESS,
  CHANGE_SCORE_OPTIONS_TERM,
  CHANGE_SCORE_OPTIONS_YEAR
} from '../actions/index'

function score(state = {
  loading: false,
  items: [],
  store: [],
  term: '全部',
  year: '全部',
  error: false
}, action) {
  switch (action.type) {
    case REQUEST_BEGIN:
      return Object.assign({}, state, {
        loading: true
      })
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loading: action.loading,
        error: false
      })
    case REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: action.loading,
        errMessage: action.errMessage,
        error: true
      })
    case RECEIVE_SCORE_LIST:
      return Object.assign({}, state, {
        items: action.scoreList,
        store: action.scoreList
      })
    case CHANGE_SCORE_OPTIONS_YEAR:
      return Object.assign({}, state, {
        year: action.selectedYear
      })
    case CHANGE_SCORE_OPTIONS_TERM:
      return Object.assign({}, state, {
        term: action.selectedTerm
      })
    case UPDATE_SCORE_LIST:
      return Object.assign({}, state, {
        items: state.store.filter(item => {
          if (state.year === '全部') {
            return true
          } else if (state.year === item.year) {
            return true
          }
          return false
        }).filter(item => {
          if (state.term === '全部') {
            return true
          } else if (state.term === item.term) {
            return true
          }
          return false
        })
      })
    default:
      return state
  }
}
export default combineReducers({
  score
})
