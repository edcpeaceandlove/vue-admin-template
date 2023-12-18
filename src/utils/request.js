import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(

)

// 响应拦截器
service.interceptors.response.use(
  // 两个参数：响应成功函数，响应失败函数
  response => {
    const { success, message, data } = response.data//axios默认加了一层data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data//返回响应数据中的data
    } else {
      console.log(response);
      //此时业务已经错误，不能进入then，应该进入catch
      Message.error(message)//提示错误消息，Message.error()是element-ui里提示错误消息
      return Promise.reject(new Error(message))//Promise.reject()里面应该传入一个错误对象，如果没有，就new一个
    }
  },
  error => {
    Message.error(error.message)//提示错误消息
    return Promise.reject(error)//返回执行错误，让当前的执行链跳出成功，直接进入catch
  }
)

export default service
