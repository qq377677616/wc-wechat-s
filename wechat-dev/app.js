import applyUpdate from './utils/apply-update'
import store from './utils/store/index'
import { setMta } from './utils/api/authorization'
import setAllShare from './utils/set-all-share'
App({
  onLaunch(opation) {
    applyUpdate()//自动更新小程序
    setMta()//腾讯统计
    setAllShare()//全局分享
  },
  store,//状态管理
  globalData: {}//全局对象
})