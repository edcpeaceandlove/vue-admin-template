// 员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/attendances',//路由地址
  name: 'attendances',//给模块的一级路由加一个name属性  后面权限会用到
  component: Layout,
  children: [{
    // 二级路由的path什么都不用写的时候，表示它是二级路由的默认路由
    path: '',//这里不用写 什么都不用写表示 /attendances 不但有布局layout=>员工主页
    component: () => import('@/views/attendances'),
    meta: {//路由元信息  其实就是一个存储数据的地方 可以放任何内容
      title: '考勤',//这样用title是因为左侧导航读取了这里的title属性
      icon: 'skill'
    }

  }]

}