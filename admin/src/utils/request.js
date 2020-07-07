import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 完整url = baseUrl + requestUrl
  timeout: 8000  // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(

  config => {
    // 携带token, 设置请求头
    config.headers['Authorization'] = localStorage.getItem('token') || ''
    return config
  },

  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }

)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data
    // 未登录
    if (res.status == 10) {
      Message.error(res.msg)
      router.push('/login')
      return Promise.reject(res)
    }
    return res
  },

  error => {
    Message.error(error.response.data)
    // 对响应错误做些什么
    return Promise.reject(error)
  }

)

export default service
