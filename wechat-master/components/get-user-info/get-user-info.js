// components/get-user-info/get-user-info.js
import api from '../../utils/api/api'
import tool from '../../utils/publics/tool'
import login from '../../utils/api/login'
Component({
  /**
   * 组件的属性列表
   */ 
  properties: {
    curPage: {
      type: Object,
      value: {}
    },
    register: {
      type: Object,
      value: {}
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: {
    baseurl: new getApp().globalData.ASSETSURL,//图片基本路径
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取用户信息
    bindgetuserinfo(e) {
      if (!e.detail.userInfo) {
        console.log("【拒绝了授权】")
        this.triggerEvent("getUserInfoCallback", { status: false })
        return
      }
      login.authorize(e, this).then(res => {
        this.triggerEvent("getUserInfoCallback", { status: true })
      })
      tool.loading_h()
    }
  }
})
