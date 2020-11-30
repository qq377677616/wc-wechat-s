// subpackages/live/live/live-dev/live-pusher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pusherUrl: "rtmp://93678.livepush.myqcloud.com/live/songziquan?txSecret=e6801c3517b7d8477526b26ae7b52e05&txTime=5EA1BB7F"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  statechange(e) {
    console.log("【录制录播】", e.detail.message)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})