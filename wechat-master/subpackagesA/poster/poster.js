// pages/pages-list/poster/poster.js
import tool from '../../utils/publics/tool'
import auth from '../../utils/publics/authorization'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalOption: {  
      isShow: false,
      type: 0,
      title: "访问手机相册",
      test: "小程序将访问您的手机相册，将生成的海报保存到您的手机相册。",
      cancelText: "取消",
      confirmText: "确定",
      color_confirm: "#0BB20C"
    },
    posterImgUrl: '',
    isIos: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ userInfo: wx.getStorageSync("userInfo") || {} })
    if (this.data.userInfo.nickName) { 
      this.getSharePoster()
    } else {
      tool.showModal("未授权", "系统检测到您未授权，请先去授权再来生成海报", false, "去授权,red").then(res => {
        tool.jump_back()
      })
    }
    tool.getSystemInfo().then(res => {
      this.setData({ isIos: res.model.includes("iPhone") ? 1 : 2})
    })
  },

  //获取分享海报
  getSharePoster() {
    var _this = this
    tool.loading("海报生成中", "loading")
    this.data.canvasLoading = setTimeout(() => {
      if (!this.data.posterImgUrl) {
        tool.loading_h()
        tool.alert("海报生成失败，请稍后再试")
      }
    }, 15000) 
    tool.canvasImg({
      canvasId: 'myCanvas', 
      canvasSize: '574*1022',
      imgList: [
        { url: "https://game.flyh5.cn/resources/game/wechat/szq/images/img_04.jpg", drawW: 574, drawH: 726, imgX: 0, imgY: 0 },
        { url: _this.data.userInfo.avatarUrl, drawW: 78, drawH: 78, imgX: 26, imgY: 788, isRadius: true },
        { url: "https://game.flyh5.cn/resources/game/wechat/xw/rc_qc/assets/district/code.jpg", drawW: 91, drawH: 91, imgX: 452, imgY: 876 }
      ],
      textList: [
        { string: this.data.userInfo.nickName, color: '#373737', fontSize: '23', fontFamily: 'Arial', bold: false, textX: 117, textY: 797 },
        { string: '群体皮内陷，孔小，直径约 1.5 mm。共骨有小突起列纵纹。生列呈活1.5 mm群体列列常呈呈色或棕褐色结尾了吧。', color: '#a0a3a7', fontSize: '20', fontFamily: 'ygyxsziti2', fontStyle: 'italic',  bold: false, textX: 116, textY: 833, wrap: 10, lineHeight: 30 },
        { string: '长按识别二维码，马上进入体验', color: '#9fa0a0', fontSize: '13', fontFamily: 'Arial', bold: false, textX: 364, textY: 977 }
      ]
    }).then(res => {
      console.log("res", res)
      tool.loading_h()
      _this.setData({
        isPosterOk: true,
        posterImgUrl: res
      })
    })
  },
  //保存到相册
  savePhoto() {
    tool.loading("海报保存中", "loading")
    this.isSettingScope()
  },
  //判断是否授权访问手机相册
  isSettingScope() {
    let _self = this
    auth.isSettingScope("scope.writePhotosAlbum", res => {
      console.log("res", res)
      if (res.status == 0) {
        tool.loading_h()
        _self.showHideModal()
      } else if (res.status == 1 || res.status == 2) {
        _self.saveImageToPhotosAlbum(this.data.posterImgUrl)
      }
    })
  },
  //将canvas生成的临时海报图片保存到手机相册
  saveImageToPhotosAlbum(imgUrl) {
    let _this = this;
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        setTimeout(() => {
          tool.alert("已保存到手机相册")
          _this.setData({
            canvasHidden: false,
            isShare: true
          })
        }, 600)
      },
      fail() {
        tool.alert("保存失败")
      },
      complete() {
        tool.loading_h()
      }
    })
  },
  //点击自定义Modal弹框上的确定按钮
  operation(e) {
    if (e.detail.confirm) {
      auth.openSetting(res => {//用户自行从设置勾选授权后
        if (res.authSetting["scope.writePhotosAlbum"] && this.data.posterImgUrl) {
          this.saveImageToPhotosAlbum(this.data.posterImgUrl)
        }
      })
    }
    this.showHideModal()
  },
  //打开、关闭自定义Modal弹框
  showHideModal() {
    let _showModalOption = this.data.showModalOption
    _showModalOption.isShow = !_showModalOption.isShow
    this.setData({ showModalOption: _showModalOption })
  },
})