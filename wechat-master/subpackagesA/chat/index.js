// pages/pages-list/chat/index.js
import tool from '../../utils/publics/tool.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jumps(e) {
    var page = e.currentTarget.dataset.page
    tool.jump_nav(`/subpackagesA/${page}`)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})