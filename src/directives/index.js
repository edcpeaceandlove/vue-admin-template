// 负责管理所有的自定义指令
export const imageerror = {
  // 指令对象会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令中变量的解释  其中有一个属性叫做value
    // dom表示当前指令作用的dom对象
    // dom此时就是图片
    // 当图片有地址但是没有加载成功的时候,会报错,触发图片的一个事件=>onerror
    dom.onerror = function () {
      // 当图片出现异常时,会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value
    }
  }
}

// <img  v-imagerrror='img' />
// data(){return {img:'a.png'}}  options.value就是a.png