import axios from 'axios'

const config = {
  // baseURL:process.env.NODE_ENV=='development'?'http://192.168.122.1:8000/api/':'http://kermitdyes.pythonanywhere.com/api/',
  baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.8.117:8000/api/' : 'http://clarknull.pythonanywhere.com/api/',
  withCredentials: false,
  timeout: 30 * 1000
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

window.axios = _axios
