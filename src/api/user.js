import request from '@/utils/request'

//登录接口封装 
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}

export function logout() {

}
