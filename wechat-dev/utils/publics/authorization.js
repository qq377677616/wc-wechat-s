// const app = getApp()
import mta from '../mta_analysis'
import config from '../../config'
import tool from './tool'
//腾讯统计代码
const setMta = appId => {
  let option = {
    "appID": config.MTAAPPID,
    "eventID": parseInt(config.MTAAPPID) + 1,
    "autoReport": true,
    "statParam": true,
    "ignoreParams": [],
    "statPullDownFresh": true,
    "statShareApp": true,
    "statReachBottom": true
  }
  mta.App.init(option)
  tool.getWxConfig().then(res => {
    if (res.accountInfo.appId != 'wx9cb717d8151d8486' && (!appId || appId == '500689212')) {
      tool.showModal("腾讯统计", "检测到当前项目未添加腾讯统计短码，项目上线前务必请及时添加。", false, "好的,#A52920")
    }
  })
}
//登录
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      }
    })
  })
}
/*检查登录态会话密钥session_key是否过期*/
const isCheckSession = callback => {
  wx.checkSession({
    success() {
      callback(true)
    },
    fail() {
      callback(false)
    }
  })
}
/*查询用户是否否授权了 scope*/
const isSettingScope = (scope, callback) => {
  return new Promise(reject => {
    wx.getSetting({
      success(res) {
        if (res.authSetting[scope] === false ) {
          reject({ status: 0, message: "用户已拒绝过授权" })
        } else if (res.authSetting[scope] === true ) {
          reject({ status: 1, message: "用户已授权" })
        } else {
          reject({ status: -1, message: "用户未进行过此授权" })
        }
      }
    })
  })
}
/*判断是否授权用户信息*/
const isSetting = callBack => {
  wx.getSetting({
    success: res => {
      //授过权
      if (res.authSetting['scope.userInfo']) {
        callBack(true)
        //未授权  
      } else {
        callBack(false)
      }
    }
  })
}
//发起授权
const authorize = (scope)=> {
  return new Promise((reject, resolve) => {
    wx.authorize({
      scope: scope,
      success () {
        reject()
      },
      fail(err) {
        resolve(err)
      }
    })
  })
} 
//打开授权系统列表设置
const openSetting = () => {
  return new Promise(reject => {
    wx.openSetting({
      success(res) {
        reject(res)
      }
    })
  })
}
module.exports = {
  setMta,
  isCheckSession,
  isSettingScope,
  login,
  isSetting,
  authorize,
  openSetting
}