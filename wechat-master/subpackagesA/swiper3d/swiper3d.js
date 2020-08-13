// pages/pages-list/swiper3d/swiper3d.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperH: '',//swiper高度
    nowIdx: 0,//当前swiper索引
    imgList: [//图片列表
      "https://n.sinaimg.cn/tech/transform/780/w459h321/20200409/770c-iryninw9027188.gif",
      "http://game.flyh5.cn/resources/game/wechat/szq/images/img_01.png",
      "http://game.flyh5.cn/resources/game/wechat/szq/images/img_01.png",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50;//获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH//设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  }
})