// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad() {
    
  },
  //获取用户信息_回调
  bindgetUserInfoCallback(e) {
    console.log("【获取用户信息_回调】", e.detail.status)
    if (e.detail.status) {
      console.log("【获取用户信息、上传成功】") 
    } else {
      console.log("【获取用户信息、上传失败】")
    }
  }
})