/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../../utils/we-cropper/we-cropper.js'
import tool from '../../utils/publics/tool.js'

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      cropperSize: [180, 180],//裁剪大小
      targetId: 'targetCropper',
      scale: 2.5,
      zoom: 8,
      boundStyle: {
        color: "#04b00f",
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 2
      }
    }
  },
  onLoad(option) {
    this.cropperInit()
  },
  //裁剪初始化
  cropperInit() {
    let { cropperOpt } = this.data
    let device = wx.getSystemInfoSync()
    let width = device.windowWidth
    let height = device.windowHeight - 50
    cropperOpt.width = width
    cropperOpt.height = height
    cropperOpt.cut = { x: (width - cropperOpt.cropperSize[0]) / 2, y: (height - cropperOpt.cropperSize[1]) / 2, width: cropperOpt.cropperSize[0], height: cropperOpt.cropperSize[1] }
    this.setData({ cropperOpt })
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', ctx => {
        console.log('【裁剪已准备完毕】')
      })
      .on('beforeImageLoad', ctx => {
        tool.loading('上传中')
      })
      .on('imageLoad', ctx => {
        tool.loading_h()
      })
  },
  //点击上传照片
  uploadTap() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:res => {
        const src = res.tempFilePaths[0]
        this.cropper.pushOrign(src)
      }
    })
  },
  //确认剪裁
  getCropperImage() {
    this.cropper.getCropperImage().then(src => {
      console.log("【剪裁后的图片】", src)
      wx.previewImage({ current: '', urls: [src]})
    }).catch(err => {
      tool.showModal('温馨提示', err.message)
    })
  },
  //触摸开始
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  //触摸中
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  //触摸结束
  touchEnd(e) {
    this.cropper.touchEnd(e)
  }
})
