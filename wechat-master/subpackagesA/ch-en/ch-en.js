// pages/my/my.js
const tool = require('../../utils/publics/tool.js')
const language = require('../../utils/language/CH-EN.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.languageSwitch()
    this.setData({ userInfo: wx.getStorageSync("userInfo") })
  },
  //中英文初始化
  languageSwitch() {
    let _lang = wx.getStorageSync('lang')
    this.setData({ lang: _lang })
    if (_lang == 'CH') {
      this.setData({ languageCon: language.Chinese })
    } else {
      this.setData({ languageCon: language.English })
    }
    wx.setNavigationBarTitle({
      title: this.data.languageCon.my.title
    })
  },
  /*切换中英文*/
  toggleLang() {
    let _self = this
    tool.showModal(_self.data.languageCon.my.alert[0], _self.data.languageCon.my.alert[1], _self.data.languageCon.my.alert[3] + ',#aaa', _self.data.languageCon.my.alert[2] + ',#004c9a').then(res => {
      if (res) {
        tool.loading(_self.data.languageCon.my.alert[4], true)
        setTimeout(() => {
          let _lang = wx.getStorageSync('lang')
          if (_lang == 'CH') {
            wx.setStorageSync('lang', 'EN')
          } else {
            wx.setStorageSync('lang', 'CH')
          }
          _self.languageSwitch()
          tool.alert(_self.data.languageCon.my.alert[5])
        }, 1000)
      }
    })

  }
})