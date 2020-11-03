// pages/pages-list/get-phone/get-phone.js
import tool from '../../utils/publics/tool'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync("userInfo")
  },
  onLoad() {
    // this.setData({ myPhone: wx.getStorageSync("userInfo").phone || '1**********' })
  },
  //获取手机号_回调
  bindgetPhoneCallback(e) {
    console.log("【获取手机号_回调】", e)
    if (e.detail.status) {
      console.log("【获取手机号成功】", e.detail.mobile.mobile)
      
    } else {
      console.log("【获取手机号失败】")
    }
    tool.loading_h()
    this.isShowGetPhoneNumber()
  },
  //点击获取手机号
  getPhone() {
    if (!getApp().store.getState().userInfo.mobile) this.isShowGetPhoneNumber()
  },
  //获取手机号授权弹窗
  isShowGetPhoneNumber() {
    this.selectComponent('#authPhone').isShow()
  }
})