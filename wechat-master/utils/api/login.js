import config from '../../config'
import auth from '../publics/authorization'
import api from './api'
import tool from '../publics/tool'
//登录
const login = () => {
  updateUserInfo()
  return new Promise((resolve, reject) => {
    let _userInfo = wx.getStorageSync("userInfo") || {}
    tool.loading("")
    auth.login().then(res => {
      return res
    }).then(res => {
      return api.getOpenid({ js_code: res.code })
    }).then(res => {
      console.log("resres", res)
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
      submitUserInfo(userInfo).then(res => {
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
    api.uploadUserInfo({
      openid: wx.getStorageSync("userInfo").openid,
      nickname: userInfo.nickName,
      headimg: userInfo.avatarUrl
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
   })
}
module.exports = { login, authorize }