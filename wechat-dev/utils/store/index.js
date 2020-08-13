import projectConfig from '../../config'
import Store from 'wxministore'
import tool from '../publics/tool'
import mta from '../mta_analysis'
export default new Store({
  debug: false, // 关闭内部日志的输出
  nonWritable: false,//是否重写page、Componenet(防改写):App.Page({...}) 和 App.Component({...})
  openPart: false,//是否开启局部模式:Page({ useStore: true })
  //全局状态
  state: {
    ASSETSURL: projectConfig.ASSETSURL,//线上资源路径
    userInfo: wx.getStorageSync("userInfo")//用户信息
  },
  //全局方法
  methods: {
    //防止多次点击方法
    buttonClicked(page, times = 700) {
      page.setData({ buttonClicked: true })
      setTimeout(() => { page.setData({ buttonClicked: false })}, times)
    },
    //空方法
    emptyMethods() {
      return
    }
  }, 
  /**
   * 监听页面生命周期(先执行pageLisener监听，后执行原本页面中周期)
   * 支持监听的所有周期事件 ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']
   */
  pageLisener: {
    onLoad(options) {
      console.log("【store监听onLoad生命周期】", this, options)
      mta.Page.init()//腾讯统计
    },
    onShow() {
      getApp().globalData.innerAudioContext && this.setData({ isPause: getApp().globalData.innerAudioContext.paused })//背景音乐相关
    },
    onShareAppMessage(res) {
      console.log("【store监听转发事件】", res)
    }
  }
})