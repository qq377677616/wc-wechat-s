import applyUpdate from './utils/applyUpdate'
import store from './utils/store/index'
import { setMta } from './utils/publics/authorization'
import setAllShare from './utils/setAllShare'
App({
  onLaunch(opation) {
    applyUpdate()//自动更新小程序
    setMta()//腾讯统计
    setAllShare()//全局分享
  },
  store,//状态管理
  globalData: {}//全局对象
})