import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'


const TimeOut = 3600//设置超时时间
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {//config 是请求配置的信息
    // 注入token
    if (store.getters.token) {
      // 只有在有token的情况下才会去判断token是否超时
      if (IfTimeOut()) {
        // 如果为真，说明超时
        store.dispatch('user/logout')// 清除token,登出
        router.push('/login')// 跳转到登录页面
        return Promise.reject(new Error('token超时了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config//一定要return config
  },
  error => {
    return Promise.reject(error)
  }
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
    // error信息里面有response的对象
    // token失效的被动处理
    if (error.response && error.response.data && error.response.code === 10002) {
      // 等于10002的时候表示后端告诉我超时了
      store.dispatch('user.logout')
      router.push('/login')
    } else {
      Message.error(error.message)//提示错误消息
    }
    return Promise.reject(error)//返回执行错误，让当前的执行链跳出成功，直接进入catch
  }
)

// 判断是否超时
// 超时逻辑(当前时间-缓存中的时间) 是否大于时间差
function IfTimeOut() {
  var currentTime = Date.now()//当前时间戳
  var timeStamp = getTimeStamp()//缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
