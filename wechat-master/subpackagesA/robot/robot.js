// pages/pages-list/get-phone/get-phone.js
import tool from '../../utils/publics/tool.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad() {

  },
  // getQueryCallback回调 返回query与结果
  getQueryCallback: function (e) {
    console.log("e.detail", e.detail)
  },
  // goBackHome回调 返回上一级页面
  goBackHome: function () {
    // tool.alert("回到首页")
    tool.jump_back()
  }
})