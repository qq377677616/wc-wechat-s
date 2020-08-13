import auth from '../publics/authorization'
import api from './api'
import tool from '../publics/tool'

//登录
const login = () => {
  return new Promise((resolve, reject) => {
    let _userInfo = wx.getStorageSync("userInfo") || {}
    tool.loading("")
    auth.login().then(res => {
      return res
    }).then(res => {
      return api.getOpenid({ js_code: res.code })
    }).then(res => {
      tool.loading_h()
      let userInfo = wx.getStorageSync("userInfo") || {}
      Object.assign(userInfo, res.data.data)
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
    const userInfo = e.detail.userInfo
    if (userInfo) {
      tool.loading_h()
      //这里做上传头像昵称给后台操作
      api.uploadUserInfo({
        openid: wx.getStorageSync("userInfo").openid,
        nickname: userInfo.nickName,
        headimg: userInfo.avatarUrl
      }).then(res => {
        tool.loading_h()
        Object.assign(userInfo, wx.getStorageSync("userInfo") || {})
        getApp().store.setState({ userInfo })
        wx.setStorageSync("userInfo", userInfo)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    } else {
      tool.loading_h()
      resolve(false)
    }
  })
}

module.exports = { login, authorize }