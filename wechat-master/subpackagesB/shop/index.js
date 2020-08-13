// subpackages/shop/index.js
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
  onLoad(options) {
    
  },
  //跳转
  jump(e) {
    tool.jump_nav(e.currentTarget.dataset.page)
  }
})