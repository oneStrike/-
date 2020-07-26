import axios from 'axios';

const instance = axios.create({
  timeout: 50000,
  baseURL: 'http://49.234.125.167:3000/',
  withCredentials: true
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.url === '/logout' || config.url === '/login/status') {
      config.params = config.params || {};
      config.params.t = Date.parse(new Date())
    }
    return config
  },
  err => {
    throw err;
  }
)

//响应拦截器
instance.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    throw err;
  }
)

export default instance;