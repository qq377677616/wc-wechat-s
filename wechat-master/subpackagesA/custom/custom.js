// pages/pages-list/custom/custom.js
import tool from '../../utils/publics/tool.js'
import tabbar from '../../components/my-tabbar/tabbar.js'
import nav from '../../components/my-nav/nav.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: 1,
    navType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    getCurrentPages().length <= 1 ? this.setData({ types: 0 }) : this.setData({ types: 1 })
  },
  navBack(e) {
    // nav.navJump(e.detail.types)
  },
  bindmytab(e) {
    if (e.detail.e.currentTarget.dataset.index == 1) {
      tool.alert("点击了加号导航")
    }
    // tabbar.tabJump(e.detail.e.currentTarget.dataset.index, this.route)
  },
  switchBack(){
    this.setData({ types: this.data.types == 1 ? 2 : (this.data.types == 2 ? 0 : 1) })
  },
  switchTab() {
    this.setData({ navType: this.data.navType == 0 ? 1 : 0 })
  }
})