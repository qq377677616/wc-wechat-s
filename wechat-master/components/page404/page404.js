// components/page404/page404.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow404: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    IMGSERVICE: app.globalData.IMGSERVICE
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reload() {
      this.setData({
        isShow404: false
      })
      this.triggerEvent("reload", {})
    }
  }
})
