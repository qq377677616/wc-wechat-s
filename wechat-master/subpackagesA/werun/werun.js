// subpackages/werun/werun.js
import api from '../../utils/api/api'
import gets from '../../utils/publics/authorization'
import tool from '../../utils/publics/tool'
import { timestampToTime } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    runData_cur: 0,//步数差
    runData_pre: '-',//原步数
    runData_new: '-',//现步数
    runType: -1,//按钮状态
    times: 0//用时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ runType: wx.getStorageSync('werun') ? 1 : 0 })
  },
  //开始计步
  startRun() {
    this.myLogin()
  },
  //登录
  myLogin() {
    // gets.isCheckSession(res => {
    //   console.log("是否过期", res)
    // })
    tool.loading("", true)
    gets.login().then(value => {
      return api.getOpenid({
        js_code: value.code
      })
    }).then(value => {
      console.log("value", value)
      const data = value.data.data;
      if (value.data.code == 1) {
        this.data.session_key = data.session_key
        console.log("【拿到session_key】", this.data.session_key)
        tool.loading_h()
        this.getWeRunData()
      } else {
        tool.loading_h()
        console.log("【服务器异常，请稍后再试】")
        // this.myLogin()
      }
    })
  },
  //获取微信步数
  getWeRunData() {
    let _this = this
    wx.getWeRunData({
      success (res) {
        console.log('res', res)
        let _data = {
          e_data: encodeURIComponent(res.encryptedData),
          session_key: encodeURIComponent(_this.data.session_key),
          iv: encodeURIComponent(res.iv)
        }
        api.getWeRunData(_data).then(res => {
          _this.setRun(res)
        })
      }
    })
  },
  //计步处理
  setRun(e) {
    let stepInfoList = e.data.data.stepInfoList
    console.log("【近一个月微信步数】", stepInfoList)
    // stepInfoList.forEach(item => {
    //   item.times = timestampToTime(item.timestamp).split(" ")[0]
    // })
    let _runData =  stepInfoList[stepInfoList.length - 1].step
    if (this.data.runType) {//停止计步
      console.log(new Date().getTime() - wx.getStorageSync('werun').preTime)
      let _times = parseInt((new Date().getTime() - wx.getStorageSync('werun').preTime)/60000)
      if (_times < 1) {
        tool.alert("您还没走一分钟呢")
        return
      }
      console.log(wx.getStorageSync('werun'))
      let run_pre = wx.getStorageSync('werun').runData_pre
      // _runData = _runData + 88
      this.setData({ times: _times, runData_pre: run_pre, runData_new: _runData,runData_cur: _runData - run_pre })
      console.log(timestampToTime(wx.getStorageSync('werun').preTime - new Date().getTime(), true))
      wx.removeStorageSync('werun')
    } else {
      wx.setStorageSync('werun', { runData_pre: _runData, preTime: new Date().getTime() })
      // this.setData({ runData_pre: _runData })
      this.setData({ runData_pre: _runData, runData_new: '--',runData_cur: 0 })
    }
    this.setData({ weRunList: e.data.data.stepInfoList,runType: !this.data.runType })
  }
})