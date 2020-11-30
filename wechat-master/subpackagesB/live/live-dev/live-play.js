// subpackages/live/live/live-dev/live-play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerUrl: "rtmp://live.flyh5.cn/live/songziquan"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  statechange(e) {
    console.log('【播放直播】', e.detail.message)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  onShareAppMessage() {}
})