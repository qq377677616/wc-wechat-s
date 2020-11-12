// pages/pages-list/poster/poster.js
import tool from '../../utils/publics/tool'
import auth from '../../utils/api/authorization'
import util from '../../utils/publics/util'
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
  onLoad(options) {
    // this.setData({ userInfo: wx.getStorageSync("userInfo") || {} })
    this.getSharePoster()
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
        { url: "https://img.vrupup.com/web/szq/images/poster_02.png", drawW: 574, drawH: 1022, imgX: 0, imgY: 0 },
        { url: "https://game.flyh5.cn/resources/game/wechat/xw/rc_qc/assets/district/code.jpg", drawW: 91, drawH: 91, imgX: 452, imgY: 876 }
      ],
      textList: [
        { string: "中国太平人寿", color: '#FFEEE9', fontSize: '23', fontFamily: 'Arial', textAlign: 'center', bold: false, textX: 287, textY: 340 },
        { string: "这是一些文字可以居中", color: '#FF9B5F', fontSize: '23', fontFamily: 'Arial', textAlign: 'center', bold: false, textX: 287, textY: 500 },
        { string: '一份份捐赠如星火燎原之势，点亮孩子的希望，爱润童心，助力成长！特发此证，感恩您的爱心义举！', color: '#60294E', fontSize: '22', fontFamily: 'Arial', fontStyle: 'italic',  bold: false, textX: 130, textY: 545, wrap: 15, lineHeight: 34 }, 
        { string: '长按识别二维码，马上进入体验', color: '#fff', fontSize: '13', fontFamily: 'Arial', bold: false, textX: 364, textY: 977 }
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
    auth.isSettingScope("scope.writePhotosAlbum").then(res => {
      console.log("res", res)
      if (res.status == 0) {
        tool.loading_h()
        _self.showHideModal()
      } else {
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
  }
})