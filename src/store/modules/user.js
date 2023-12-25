import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(),//设置token为共享状态，初始化vuex时，就先从缓存中读取
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token//将数据设置给vuex
    setToken(token)//同步给缓存
  },
  removeToken(state) {
    state.token = null//将vuex的数据置空
    removeToken()//同步到缓存
  },
  // 设置对象信息
  setUserInfo(state, result) {
    state.userInfo = result//这样是响应式
  },
  // 删除对象信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    // 拿到token说明登录成功
    // 设置时间戳
    setTimeStamp()
  },

  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  },

  // 登出操作
  logout(context) {
    // 删除token
    // 删除用户信息
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

