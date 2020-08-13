// pages/pages-list/shake/shake.js
import util from '../../utils/util'
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.shake_one_shake2(true, 100, 2000, false, res => {
      if (res.status == 1) {
        tool.alert("摇一摇成功")
        console.log("摇一摇返回-->", res)
      }
    })
  }
})