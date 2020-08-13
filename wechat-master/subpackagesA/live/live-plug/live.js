// pages/pages-list/live/live.js
import { myRequest } from '../../../utils/api/api'
import { alert, jump_nav, loading, loading_h } from '../../../utils/publics/tool'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132",
    loadMoreType: 1,
    liveList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLiveList()
  },
  //观看直播
  openLive(e) {
    jump_nav(`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${this.data.liveList[e.currentTarget.dataset.index].roomid}`)
  },
  //获取直播列表
  getLiveList() {
    loading("")
    myRequest({}, "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/zhibo/getliveinfo?start=0&limit=10", 'post', true).then(res => {
      console.log("res", res)
      loading_h()
      this.setData({ liveList: res.data.data.room_info, loadMoreType: 2 })
      console.log("【直播列表】", this.data.liveList)
    })
  },
  //获取用户信息
  getUserInfo() {
     this.setData({ userInfo: wx.getStorageSync("userInfo") })
  } 
})