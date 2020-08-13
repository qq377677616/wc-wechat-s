// pages/pages-list/barcode/barcode.js
import { toBarcode, toQrcode } from '../../utils/code/codes.js'
import { canvasToTempImage } from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    imagePath: '',
    imagePath2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    const code = '20190716';
    const code2 = '这是一些中文';
    toBarcode('barcode', code, 320, 70)
    toQrcode('qrcode', code2, 390, 390)
    let getImgPath = () => {
      setTimeout(() => {
        Promise.all([canvasToTempImage("barcode", 320, 70), canvasToTempImage("qrcode", 390, 390)]).then(res => {
          this.setData({ imagePath: res[0], imagePath2: res[1] })
        }).catch(err => {
          console.log("err", err)
          getImgPath()
        })
      }, 50)
    }
    getImgPath()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})