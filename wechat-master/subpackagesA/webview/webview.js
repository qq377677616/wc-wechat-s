// pages/webview/webview.js
import tool from '../../utils/publics/tool.js'
Page({
  //页面的初始数据
  data: {
    // h5Url: 'https://game.flyh5.cn/resources/game/wechat/szq/vue-s/index.html',//前端的h5链接地址
    // h5Url: 'https://dev.flyh5.cn/leysen/wxAuth/login',//前端的h5链接地址
    h5Url: 'https://vrupup.com/resources/web/szq/baidumap.html',//前端的h5链接地址
    isAvatar: true,//是否将头像传给h5
    isNickName: true,//是否将昵称传给h5
    isPhone: true,//是否将手机号传给h5
    isWatchShare: false,//是否监听分享
  },
  //生命周期函数--监听页面加载
  onLoad(options) {
    this.webviewInit()
  },
  //webview初始化
  webviewInit() {
    if (!wx.getStorageSync("userInfo").nickName) {
      tool.showModal("请先去授权", "你还未授权登录，请先去授权登录吧", false , "好的,#333").then(() => {
        tool.jump_back()
      })
    }
    let _userInfo= wx.getStorageSync('userInfo')
    let h5Url = `${this.data.h5Url}?openid=${_userInfo.openid}`
    this.data.isAvatar && (h5Url += `&avatarUrl=${_userInfo.avatarUrl}`)
    this.data.isNickName && (h5Url += `&nickName=${encodeURIComponent(_userInfo.nickName)}`)
    this.data.isPhone && (h5Url += `&phone=${_userInfo.phone || encodeURIComponent('请在小程序端授权获取手机号')}`)
    // let h5Url = `${this.data.h5Url}?nickName=${encodeURIComponent(_userInfo.nickName)}&avatarUrl=${_userInfo.avatarUrl}&openid=${_userInfo.openid}&phoneNumber=${_userInfo.phone}`
    this.setData({ h5Url })
    console.log("【最终跳转到h5的链接】", this.data.h5Url)
  },
  //通信事件
  bindmessage(e) {
    console.log("e.detail", e.detail)
    this.setData({ shareContent: e.detail.data[0] })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options) {
    console.log("onShareAppMessage", options)
    if (options.from == "menu" && this.data.isWatchShare) {
      let _h5Url = `${this.data.h5Url}#ShareOk${new Date().getTime()}`
      this.setData({ h5Url: _h5Url })
    }
    if (this.data.shareContent) return this.data.shareContent
  }
})