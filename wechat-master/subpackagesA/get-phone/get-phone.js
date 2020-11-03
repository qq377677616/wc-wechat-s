// pages/pages-list/get-phone/get-phone.js
import tool from '../../utils/publics/tool'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad() {

  },
  //获取手机号_回调
  bindgetPhoneCallback(e) {
    console.log("【获取手机号_回调】", e)
    if (e.detail.status) {
      console.log("【获取手机号成功】", e.detail.mobile.mobile)
    } else {
      console.log("【获取手机号失败】")
    }
  }
})