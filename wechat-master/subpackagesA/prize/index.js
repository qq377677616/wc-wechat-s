// pages/pages-list/prize/index.js
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jump(e) {
    tool.jump_nav(e.currentTarget.dataset.page)
  }
})