import api from './api'
import apiConfig from './api.config'
import config from '../../config'
import auth from './authorization'
import tool from '../publics/tool'
//登录
const login = (get_session_key = 0) => {
  updateUserInfo()
  return new Promise((resolve, reject) => {
    tool.loading("")
    auth.login().then(res => { 
      return res 
    }).then(res => {
      return apiConfig.getOpenid({ js_code: res.code })
    }).then(res => {
      tool.loading_h()
      if (get_session_key == 1) resolve({ session_key: res.data.data.session_key })
      let userInfo = wx.getStorageSync("userInfo") || {}
      Object.assign(userInfo, res.data.data.user_info)
      getApp().store.setState({ userInfo })
      wx.setStorageSync("userInfo", userInfo)
      resolve(res.data.data)
    }).catch(err => {
      tool.loading_h()
      reject(err) 
    })
  })
}
//授权
const authorize = e => {
  return new Promise((resolve, reject) => {
    tool.loading("授权中")
    const _userInfo = e.detail.userInfo
    if (_userInfo) {
      submitUserInfo(_userInfo).then(res => {
        let userInfo = wx.getStorageSync("userInfo") || {}
        Object.assign(userInfo, res.data.data )
        getApp().store.setState({ userInfo })
        wx.setStorageSync("userInfo", userInfo)
        tool.loading_h()
        resolve(true)
      })
    } else {
      tool.loading_h()
      resolve(false)
    }
  })
}
//更新头像昵称
const updateUserInfo = () => {
  if (getApp().globalData.isUpdateUserInfo || !config.UPDATEUSERINFO) return
  auth.isSettingScope('scope.userInfo').then(res => {
    console.log("是否授权", res)
    if (res.status === 1) {
      wx.getUserInfo({
        success: res => {
          submitUserInfo(res.userInfo).then(res => {
            tool.alert("更新头像昵称成功")
            getApp().globalData.isUpdateUserInfo = true
            let userInfo = wx.getStorageSync("userInfo") || {}
            Object.assign(userInfo, res.data.data )
            getApp().store.setState({ userInfo })
            wx.setStorageSync("userInfo", userInfo)
          })
        }
      })
    }
  })
}
//提交用户头像昵称
const submitUserInfo = (userInfo) => {
  return new Promise((resolve, reject) => {
    apiConfig.uploadUserInfo({
      openid: wx.getStorageSync("userInfo").openid,
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
   })
}
module.exports = { login, authorize }