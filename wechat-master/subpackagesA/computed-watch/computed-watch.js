// pages/pages-list/computed-watch/computed-watch.js
import initComputed from '../../utils/wxComputed.min'
import watch from '../../utils/wxWatch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '张三',
    age: 3,
    num: 100,
    auto: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    initComputed(this)//初始化计算属性
    watch.setWatcher(this)//初始化监听
    this.data.auto = setInterval(() => {
      this.setData({ num: this.data.num += 10})
    }, 2000)
  },
  //计算属性
  computed: {
    order() {
      return `${this.data.name}今年${this.data.age * 10}岁`
    }
  },
  //监听
  watch: {
    num(newVal, oldVal) {
      console.log("原值-->", oldVal)
      console.log("新值-->", newVal)
      console.log("----------------")
    }
  },
  onUnload() {
    clearInterval(this.data.auto)
  }
})