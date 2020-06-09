import axios from 'axios';

const instance = axios({
  timeout: 5000,
  baseURL: '/api'
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    throw err;
  }
)

//相应拦截器
instance.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    throw err;
  }
)

export default instance;