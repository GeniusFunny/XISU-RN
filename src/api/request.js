async function request(url, config = {}) {
  config = Object.assign({}, config, {
    ...config,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    }
  })
  return fetch(url, config)
}
export default request
