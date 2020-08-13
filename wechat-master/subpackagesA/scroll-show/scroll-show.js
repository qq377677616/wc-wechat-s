// pages/pages-list/scroll-show/scroll-show.js
import tool from '../../utils/publics/tool.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tool.getSystemInfo().then(res => {
      this.setData({ windowHeight: res.windowHeight })
      this.scrollShowInit()
    })
  },
  //滚动监听
  onPageScroll(e) {
    this.setData({ scrollTop: e.scrollTop })
  },
  //效果初始化
  scrollShowInit(){
    Promise.all([tool.getDom("#con-two"), tool.getDom("#con-three"), tool.getDom("#con-four"), tool.getDom("#con-five")]).then(res => {
      let _scrollTopList = []
      for (let i = 0; i < res.length; i++) { 
        _scrollTopList.push(res[i][0].top - 100)
      }
      this.setData({ scrollTopList: _scrollTopList })
    })
  }
})