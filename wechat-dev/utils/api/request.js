import config from '../../config'
const myRequest = (data = {}, url, type = 'post', isUrl = false, isOpenid = false) => {
  !isUrl && (url = `${config.REQUESTURL}${url}`)
  !isOpenid && Object.assign(data, { openid: getApp().store.getState().userInfo.openid || wx.getStorageSync('userInfo').openid })
  return new Promise((resolve, reject) => {
    if (type == 'post') {
      postP(url, data).then(res => { resolve(res) }).catch(err => { reject(err) })
    } else if (type == 'get') { getP(url, data).then(res => { resolve(res) }).catch(err => { reject(err) }) }
  })
}
const ajax = (url, data = {}, method = 'GET', callback) => {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const gets = (url, data = {}, callback) => {
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const post = (url, data = {}, callback) => {
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const getP = (url, data = {}, header = { 'content-type': 'application/x-www-form-urlencoded' }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
const postP = (url, data = {}, header = { 'content-type': 'application/x-www-form-urlencoded' }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
module.exports = {
  myRequest,
  ajax,
  gets,
  post,
  getP,
  postP
}