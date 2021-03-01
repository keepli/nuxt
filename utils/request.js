import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import cookie from 'js-cookie'//引入cookie组件
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: store().state.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    // 判断cookie中是否中token
    if (cookie.get('guli_token')) {
      config.headers['X-Token'] = cookie.get('guli_token') // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }else{
      return response.data
    }
  },
  // 用于处理axios自身的异常
  error => {
    console.log('err' + error) // for debug
    // 设置错误提示信息
    if (error.message.indexOf('timeout') !== -1) {
      // 如果是超时错误，单独设置提示信息
      Message({
        message: '超时错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service