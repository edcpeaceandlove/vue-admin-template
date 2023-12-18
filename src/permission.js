// 权限拦截流程
/*
                              没有                   不在
访问权限拦截-->判断是否有token------->判断是否在白名单-------->跳到登录页
                    |                     |
                    |有                   |
                    |       不是          |
                是否登录页------------>放过通行
                    |
                    |是
                    |
                  跳到主页
 */

//导航拦截在路由跳转，路由守卫
import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
// 前置守卫
// next是前置守卫中必须执行的钩子，next必须执行，如果不执行，页面就死了
// next()是放过
// next(false)是跳转终止3
// next(地址)是跳转到某个地址
const whiteList = ['/login', '/404']//定义白名单
router.beforeEach((to, from, next) => {
  NProgress.start()//打开进度条
  if (store.getters.token) {
    // 如果有token
    // console.log(store.getters.token);
    if (to.path === '/login') {
      // 如果要访问的是登陆页
      next('/')//跳转到主页
    } else {
      next()
    }
  } else {
    // console.log('111');
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      //要去到地址在白名单内
      next()
    } else {
      // 跳转到登录页
      next('/login')
    }
  }
  NProgress.done()//解决手动切换地址时，进度条不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  NProgress.done()//关闭进度条
})
