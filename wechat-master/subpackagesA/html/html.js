// pages/pages-list/html/html.js
import $ from '../../utils/api/request'
import WxParse from '../../utils/wxParse/wxParse.js'
import htmlDom from './htmjson'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageInit()
  },
  pageInit() {
    let article = htmlDom.replace(/&nbsp;/g, '')
    console.log("原html富文本内容", article)
    WxParse.wxParse('article', 'html', article, this, 5)
  }
})