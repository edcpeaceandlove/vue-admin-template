import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'//设置一个独一无二的Key
const TimeKey = 'vue_admin_template_timeStamp'//设置一个独一无二的Key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

// 设置时间戳
export function setTimeStamp() {
  Cookies.set(TimeKey, Date.now())
}

