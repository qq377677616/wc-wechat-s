//index.js
import api from '../../utils/api/api'
import apiConfig from '../../utils/api/api.config'
import login from '../../utils/api/login'
import tool from '../../utils/publics/tool'

Page({
  data: {
    indexPageTitle: "小程序开发目录(2.0.1)",//页面标题
    contentType: -1,//页面内容类型0为小程序模板内容，1为h5游戏嵌入小程序壳子审核专用内容，当需要h5游戏审核时默认置为-1
    isUseShare: false,//是否不配置全局分享
    jumpList: [//模板列表
      { name: "授权", url: "/subpackagesA/authorize/authorize"},
      { name: "获取手机号", url: "/subpackagesA/get-phone/get-phone"},
      { name: "获取微信步数", url: "/subpackagesA/werun/werun"},
      { name: "嵌入h5", url: "/subpackagesA/webview/webview"},
      { name: "地理位置定位", url: "/subpackagesA/location/location"},
      { name: "生成海报", url: "/subpackagesA/poster/poster"},
      { name: "生成二维码", url: "/subpackagesA/codes/codes"},
      { name: "日历", url: "/subpackagesA/calendar/index"},
      { name: "html解析", url: "/subpackagesA/html/html"},
      { name: "摇一摇", url: "/subpackagesA/shake/shake"},
      { name: "环形进度条", url: "/subpackagesA/circle/circle"},
      { name: "charts图表", url: "/subpackagesA/wx-charts/index/index"},
      { name: "星星评分", url: "/subpackagesA/star-score/star-score"},
      { name: "抽奖系列", url: "/subpackagesA/prize/index"},
      { name: "地图", url: "/subpackagesA/map/index"},
      { name: "websocket", url: "/subpackagesA/websocket/websocket"},
      { name: "AR", url: "/subpackagesA/ar/ar"},
      { name: "图片验证码", url: "/subpackagesA/img-code/img-code"},
      { name: "计算属性与监听", url: "/subpackagesA/computed-watch/computed-watch"},
      { name: "中英文语言", url: "/subpackagesA/ch-en/ch-en"},
      { name: "序列帧", url: "/subpackagesA/sequence/sequence"},
      { name: "导航栏和tabBar", url: "/subpackagesA/custom/custom"},
      { name: "3d轮播", url: "/subpackagesA/swiper3d/swiper3d"},
      { name: "滚动淡出", url: "/subpackagesA/scroll-show/scroll-show"},
      { name: "电子手写签名", url: "/subpackagesA/handwriting/handwriting"},
      { name: "机器人", url: "/subpackagesA/robot/robot"},
      { name: "全景", url: "/subpackagesA/panorama/panorama"},
      { name: "图片裁剪", url: "/subpackagesA/cropper/cropper"},
      { name: "滑动删除", url: "/subpackagesA/sliding-del/sliding-del"},
      { name: "抛物线动画", url: "/subpackagesA/parabola/parabola"},
      { name: "索引列表", url: "/subpackagesA/index-list/index-list"},
      { name: "双向滑块", url: "/subpackagesA/slider/slider"},
      { name: "直播", url: "/subpackagesA/live/index"},
      { name: "即时通讯", url: "/subpackagesA/chat/index"},
      { name: "滑动事件", url: "/subpackagesA/touch-event/touch-event"},
      { name: "拖拽", url: "/subpackagesA/move/move"},
      { name: "播放音效", url: "/subpackagesA/audio/audio"},
      { name: "表单验证", url: "/subpackagesA/wx-validate/wx-validate"},
      { name: "状态管理", url: "/subpackagesA/wxministore/wxministore"},
      { name: "数字滚动", url: "/subpackagesA/count-up/count-up"},
      { name: "商城合集", url: "/subpackagesB/shop/index"},
      { name: "双指缩放", url: "/subpackagesA/double-zoom/double-zoom"},
      { name: "测试", url: "/pages/pages-list/test/test"}
    ]
  },
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    this.configure()//核弹系统
    //静默登录 
    login.login().then(res => { 
      console.log("【静默登录成功】", res)
      //在这里做页面初始化请求操作，可保证本地缓存中有用户的openid/userId
    }).catch(err => {
      console.log("【静默登录失败】", err)
    })
  },
  //核弹系统
  configure() {
    if (this.data.contentType != -1) {
      wx.setNavigationBarTitle({ title: this.data.indexPageTitle })
      return
    }
    apiConfig.configure().then(res => {
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
      let _val = _data.custom.h5.val
      this.setData({ contentType:  _val})
      _val == 1 ? wx.setNavigationBarTitle({ title: '自然资源' }) : wx.setNavigationBarTitle({ title: this.data.indexPageTitle })
    })
  },
  //跳转页面
  jumps(e) {
    if (this.data.jumpList[e.currentTarget.dataset.index].url) tool.jump_nav(this.data.jumpList[e.currentTarget.dataset.index].url)
  },
  onShareAppMessage() {}
})
