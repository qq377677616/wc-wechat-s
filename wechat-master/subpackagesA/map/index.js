// pages/pages-list/map/index.js
import tool from '../../utils/publics/tool.js'
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

  },
  jumps(e) {
    var page = e.currentTarget.dataset.page
    tool.jump_nav(`/subpackagesA/map/${page}`)
  }
})