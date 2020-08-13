
//index.js
//获取应用实例
import $ from '../../utils/api/request.js'
import api from '../../utils/api/api.js'
import tool from '../../utils/publics/tool.js'
import upng from '../../utils/upng/UPNG.js'
// const context = wx.createCameraContext()
Page({
  data: {
    type: 0,//0为ar，1为拍照
    photographOk: false,//拍摄是否完成
    maxNum: 3,//最多自拍几张
    speed: 3,//多少秒自动拍摄一张
    times: 3,
    isInit: false,
    imgList: [],
    src: '',
    imgw: '520rpx',
    imgh: '520rpx',
    isSend: true,
    device: 'back'
  },
  //切换前后摄像头
  deviceSwitch() {
    let _device = (this.data.device == 'back' ? 'front' : 'back')
    this.setData({ device: _device })
  },
  onLoad() {
    tool.loading("智能相机初始化中")
    if (this.data.type == 0) {
      this.arInit()
    } else if (this.data.type == 1) {
      this.timingPhotograph()
    }
  },
  //定时自拍
  timingPhotograph() {
    let times = this.data.speed
    const context = wx.createCameraContext()
    const listener = context.onCameraFrame((frame) => {
      if (this.data.isInit) return
      this.setData({ isInit: true })
      tool.loading_h()
      tool.alert("智能相机已准备")
      this.autoPhotograph()
      let times = this.data.speed
      this.data.autoTimes = setInterval(() => {
        tool.alert(times)
        this.setData({ times: times })
        times <= 1 ? times = this.data.speed : times--
      }, 1000)
      console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
    })
    this.autoPhotograph()
  },
  //自动拍照
  autoPhotograph() {
    let _num = 0
    this.data.autoPhotograph = setInterval(() => {
      _num++
      if (_num <= this.data.maxNum) {
        this.takePhoto()
      } else {
        // clearInterval(this.data.autoPhotograph)
      }
    }, 3000)
  },
  //ar
  arInit() {
    console.log("【监听开始】")
    const context = wx.createCameraContext()
    let index = 0
    //监听摄像头
    const listener = context.onCameraFrame(frame => {
      tool.alert("智能相机已准备")
      index++
      if (index % 20 == 0 && this.data.isSend) {
        this.data.isSend = false
        let pngData = upng.encode([frame.data], frame.width, frame.height, 10);
        let base64 = wx.arrayBufferToBase64(pngData);
        this.setData({
          src: 'data:image/png;base64,' + base64,
          imgw: frame.width + 'px',
          imgh: (frame.height) + 'px'
        })
        console.log("【传给后台的img】", this.data.src.slice(0, 30))
        //调取AI图片识别接口  
        $.postP('http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_logo/public/index/index/search_test', { img: this.data.src }).then(res => {
          console.log("【识别返回】", res)
          let _x
          let _data = JSON.parse(res.data.data.result[0].brief);
          _x = parseFloat(res.data.data.result[0].score * 100).toFixed(2)
          console.log("相似度", _x)
          if (_x < 70) {
            this.data.isSend = true
            return
          }
          tool.showModal("AR扫描结果", `您扫的物体相似度高达${_x}%`, '好的,#333', '结束,#DD5044').then(res => {
            if (res) {
              setTimeout(() => {
                this.data.isSend = true
              }, 1000)
            }
          })
        }).catch(err => {
          reject(err)
        })
      }
    })
    listener.start()
  },
  //拍照
  takePhoto() {
    const context = wx.createCameraContext()
    context.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        let imgList = [...this.data.imgList, res.tempImagePath]
        if (imgList.length >= this.data.maxNum) {
          clearInterval(this.data.autoTimes)
          clearInterval(this.data.autoPhotograph)
          this.setData({ photographOk: true})
          tool.alert(`${this.data.maxNum}张照片已拍摄完成，等待美颜。`, 3000)
        }  
        this.setData({ imgList })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
