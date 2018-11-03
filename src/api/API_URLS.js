const DEBUG = false
const baseUrl = DEBUG ? 'http://localhost:1338' : 'http://193.112.73.165:1338'
export default {
  login: baseUrl + '/login',
  score: baseUrl + '/score',
  emptyClassroom: baseUrl + '/classroom',
  courseTable: baseUrl + '/courseTable'
}
