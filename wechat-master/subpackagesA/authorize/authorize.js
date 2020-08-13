// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginNum: 0,
    // userInfo: wx.getStorageSync("userInfo")
  },
  onLoad() {
    
  },
  //点击开始授权
  getUserInfo() {
    if (!getApp().store.getState().userInfo.nickName) this.isShowGetUserInfo()
  }, 
  //获取用户信息_回调
  bindgetUserInfoCallback(e) {
    console.log("【获取用户信息_回调】", e.detail.status)
    if (e.detail.status) {
      console.log("【获取用户信息、上传成功】") 
    } else {
      console.log("【获取用户信息、上传失败】")
    }
    this.isShowGetUserInfo()
  },
  //用户授权弹窗
  isShowGetUserInfo() {
    this.selectComponent('#authUserInfo').isShow()
  }
})