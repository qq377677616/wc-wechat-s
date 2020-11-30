// subpackagesA/ar/index.js
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },
  //页面跳转
  jump(e) {
    tool.jump_nav(e.currentTarget.dataset.page)
  }
})