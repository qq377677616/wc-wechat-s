// pages/pages-list/test/test.js
import tabbar from '../../../components/my-tabbar/tabbar.js'
import tool from '../../../utils/publics/tool.js'
import gifshot from '../../../utils/gifshot.min.js'
import api from '../../../utils/api/api.js'
import map from '../../../utils/map/map'
import utils from '../../../utils/publics/util'
// 在页面中定义激励视频广告
// let videoAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [{ videoUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/video_04.mp4', imgUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_02.jpg', curIndex: 8 }, { videoUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/video_03.mp4', imgUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_03.jpg', curIndex: 8 }, { videoUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/video_02.mp4', imgUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_04.jpg', curIndex: 8 }, { videoUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/video_01.mp4', imgUrl: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_05.jpg', curIndex: 8 }],
    sequenceList: { url: 'https://game.flyh5.cn/resources/game/wechat/szq/images/love/love_', num: 28, speed: 60, loop: false },
    curIndexArr: [],
    sequenceListIndex0: 8,
    prevIndex: 0,
    imgVideoType: 0,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.enableAlertBeforeUnload({
      message: "确定要返回？",
      success: res => { console.log("返回了", res) },
      fail: res => { console.log("取消返回了", res) }
    })
    // setTimeout(() => {
    //   tool.storage("aaa", 333)
    //   tool.storage("bbb", 444)
    //   tool.storage("ccc", 555)
    //   tool.storage("ddd", 666)
    //   tool.storage("eee", 777)
    // }, 2000)
    // setTimeout(() => {
    //   console.log(tool.storage())
    //   console.log(tool.storage("aaa"))
    // }, 4000)
    // setTimeout(() => {
    //   tool.storage("#bbb")
    // }, 6000)
    // setTimeout(() => {
    //   tool.storage("#ccc")
    // }, 8000)
    // setTimeout(() => {
    //   tool.storage("#")
    // }, 10000)
    // this.getVideoData()
    // console.log("utils", utils.getDate().dateDateTime)
    // map.getPosition().then(res => {
    //   console.log("定位详细信息", res)
    // }).catch(err => {
    //   console.log("定位失败", err)
    //   this.logins()
    // })
    // tool.getSystemInfo().then(res => {
    //   console.log("res555", res)
    // })
    // this.sequenceInit("sequenceList")//序列帧初始化
    // this.videoPlay(0)
    // console.log("__wxConfig", __wxConfig)
    // tool.getWxConfig().then(res => {
    //   console.log("当前小程序信息", res)
    // })
    // setTimeout(() => {
    //   this.roundRect(wx.createCanvasContext("myCanvas"), 10, 10, 100, 100, 10)
    // }, 1000)
    // this.connectWifi()
    // this.getWifiList()
    // this.chooseInvoiceTitle()
  },
  saveVideo() {
    tool.loading("保存中")
    tool.downloadFile('https://img.vrupup.com/web/szq/images/video_02.mp4').then(res => {
      console.log("res", res)
      wx.saveVideoToPhotosAlbum({
        filePath: res,
        success (res) {
          tool.alert("已保存到相册",1500, 1)
          console.log(res.errMsg)
        },
        fail(err) {
          console.log(err)
        }
      })
    })
  },
  getVipCrad() {
    api.getVipCard().then(({data}) => {
      console.log("【领取卡券vip】", data)
      wx.addCard({
        cardList: [
          data
        ],
        success (res) {
          console.log(res.cardList) // 卡券添加结果
        }
      })
    })
  },
  scan() {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },
  //开启小程序进入前后台时均接收位置消息
  startLocationUpdateBackground() {
    // setInterval(() => {
    //   console.log(555)
    //   mta.Event.stat("startlocationupdate",{ log: 1, lat: 2 })
    // }, 2000)
    // return
    wx.startLocationUpdateBackground({
      success: res => {
        console.log("监听成功", res)
        wx.onLocationChange(res => {
          console.log("实时动态位置数据", res)
          res = {...res, ...{ time: utils.getDate().dateDateTime }}
          let _locationList = this.data.locationList || []
          _locationList.unshift(res)
          mta.Event.stat("startlocationupdate",{ location: `${res.longitude}--${res.latitude}` })
          this.setData({ locationList: _locationList })
        })
      },
      fail: err => {
        console.log("监听失败", err)
      }
    })
  },
  //打开内置地图
  openLocation() {
    wx.openLocation({
      latitude: 39.914935,
      longitude: 116.403119,
      scale: 18
    })
  },
  //录制视频
  chooseVideo() {
    console.log("555")
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      },
      fail(err) {
        console.log("err", err)
      }
    })
  },
  chooseAddressMap() {
    // wx.chooseLocation({ success: () => {res => {
    //   console.log("地图选择", res)
    // }}})

    wx.chooseLocation({
      success (res) {
        console.log("地图选择", res)
        tool.showModal("地址", res.address)
      }
     })
  },
  statechange(e) {
    console.log('【直播推流组件】', e.detail.code)
  },
  //绘制圆角矩形
  roundRect(context, x, y, w, h, r) {
    //  ctx = wx.createCanvasContext('myCanvas')
    // context.rect(10, 10, 150, 75)
    // context.setFillStyle('red')
    // context.fill()
    // context.draw()
    // console.log("context", context)
    // context.setFillStyle("red"); //设置纯色填充
    // context.fillRect(0, 0, 335, 556);
    
    roundRectColor(context,0, 0, 50, 20, 5, "green");
    function roundRectColor(ctx, x, y, w, h, r, color) {
      ctx.save()
      ctx.setFillStyle(color)
      ctx.setStrokeStyle(color)
      ctx.setLineJoin('round')
      ctx.setLineWidth(r)
      ctx.strokeRect(x + r/2, y + r/2, w - r , h - r )
      ctx.fillRect(x + r, y + r, w - r * 2, h - r * 2)
      ctx.stroke()
      ctx.closePath()
      ctx.draw()
    }
  },
  //收货地址
  chooseAddress() {
    wx.chooseAddress({
      success (res) {
        console.log("收货地址", res)
      }
    })
  },
  //支付
  requestPayment() {
    let _data = {
      token: "3ea9f035-6e12-4551-979c-504823461e3f",
      goodsJSONStr: "dfa"
    }
    api.myRequest(_data, "https://dev.flyh5.cn/co-working/Api/shopOrder/createOrder", 'post', true).then(res => {
      console.log("res", res)
      let _data = res.data.result
      wx.requestPayment({
        timeStamp: _data.timeStamp,
        nonceStr: _data.nonceStr,
        package: _data.package,
        signType: 'MD5',
        paySign: _data.paySign,
        success(res) { 
          console.log('【支付成功】', res)
        },
        fail(err) {
          console.log('【支付失败】', err)  
        },
        complete(res) {
          console.log('【支付结束】', res)  
        }
      })
    })

    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success(res) { },
    //   fail(res) { }
    // })
  },
  //发送订阅消息
  subscribeMessage(){
    //测试链接https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/message/timeout_test
    wx.requestSubscribeMessage({
      // tmplIds: ['hn1HqAq7CUNnRW6lAj_1GMmDnvdCgoBNaa5WXLyh7hs'],
      tmplIds: ['nhYXxwGsLicW1YaSBC-8W0sMNwv_fHQEb9mHnRMB7_Y'],
      success(res) {
        tool.alert("订阅成功")
        console.log("订阅消息发送", res)
        let _info = {
          thing1: {
            value: "网晨《话题之王》"
          },
          date2: {
            value: "2020-1-1"
          },
          thing3: {
            value: "湖南省长沙市开福区泊富国际广场"
          },
          thing4: {
            value: "每周三下午1：40，不见不散！"
          }
        }
        let _data = {
          template_id: 'nhYXxwGsLicW1YaSBC-8W0sMNwv_fHQEb9mHnRMB7_Y',
          openid: wx.getStorageSync("userInfo").openid,
          info: JSON.stringify(_info),  
          page: '/pages/pages-list/poster/poster'
        }
        console.log("订阅消息传给后端的数据", _data)
        api.requestSubscribeMessage(_data).then(res => {
          console.log("订阅消息发送接口返回", res)
        })
      }
    })
  },
  //获取周边wifi列表
  getWifiList() {
    wx.startWifi({
      success: () => { 
        console.log("【wifi功能初始化成功】")
        wx.getWifiList({
          success: () => { console.log("【获取wifi列表成功】") }
        })
      }
    })
    wx.onGetWifiList(res => {
      console.log("【wifi列表】", res)
    })
  },
  //连接指定wifi
  connectWifi(){
    console.log("【点击连接wifi】")
    wx.startWifi({
      success: () => {
        console.log("【wifi功能初始化成功】")
        tool.loading("wifi连接中")
        wx.connectWifi({
          SSID: 'tplink-5g-js',
          BSSID: 'ec:6c:9f:41:4d:69',
          password: "@wckj888",
          success: res => {
            console.log("【指定wifi连接成功】", res)
            wx.onWifiConnected(res => {
              tool.alert("指定wifi连接成功")
              console.log("【监听到指定wifi连接成功了1】", res)
            })
          },
          fail: err => {
            console.log("【指定wifi连接失败】", err)
            tool.alert("指定wifi连接失败")
          }
        })
      }
    })
  },
  jump_Invoice() {
    api.myRequest({}, "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_dfqcfslb/public/api3/test/test_fapiao", "get", true).then(res => {
      console.log("res", res.data.data)
      let _data = res.data.data
      wx.navigateToMiniProgram({
        appId: _data.appid,
        path: _data.auth_url,
        envVersion: 'release',
        success(res) {
          // 打开成功
          console.log("跳转成功")
        }
      })
    })
  },
  jump_Invoice2() {
    wx.navigateToMiniProgram({
      appId: 'wx9db2c16d0633c2e7',
      path: 'pages/auth/auth?s_pappid=d3g5Njk5ZTUyNTc5ZmYxYmFiX4s4V40JQ8q61SapB5GNwwOMaTbKubeJvVQcqhbtH4de&appid=wx9699e52579ff1bab&num=1&o1=123456&m1=1871&t1=1575364722&source=wxa&type=1&signature=a06b9167f352aff3ad5b5f8ed5ab35bdf06ce8ba',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log("跳转成功")
      }
    })
  },
  //选择发票抬头
  chooseInvoiceTitle(){
    wx.chooseInvoiceTitle({
      success(res) { 
        console.log("发票抬头", res)
      }
    })
  },
  //创建激励广告
  createRewardedVideoAd() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-3a9c41833c2ca448'
      })
      videoAd.onLoad(() => { })
      videoAd.onError((err) => { })
      videoAd.onClose((res) => { })
    }

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },
  //跳转
  goTest2(){
    tool.jump_red("/pages/pages-list/test/test2")
  },
  //获取视频信息
  getVideoData() {
    tool.downloadFile("https://game.flyh5.cn/resources/game/wechat/szq/images/video_01.mp4").then(res => {
      console.log("视频信息", res)
      tool.getVideoInfo(res).then(res => {
        console.log("视频信息2", res)
      })
    })
  },
  //剪辑视频
  videoEditor() {
    tool.chooseVideo().then(res => {
      console.log("视频信息", res)
      wx.openVideoEditor({
        filePath: res.tempFilePath,
        success: res => {
          console.log("视频编辑器打开成功", res)
          this.setData({ videoSrc: res.tempFilePath, tempThumbPath: res.tempThumbPath })
        },
        fail: err => {
          console.log("视频编辑器打开失败", err)
        }
      })
    })
  },
  //生成git图
  createGif() {
    gifshot.createGIF({
      'interval': .5,
      'images': ['https://game.flyh5.cn/resources/game/wechat/szq/images/imgs_01.jpg', 'https://game.flyh5.cn/resources/game/wechat/szq/images/imgs_02.jpg', 'https://game.flyh5.cn/resources/game/wechat/szq/images/imgs_03.jpg']
    }, obj => {
      console.log("obj", obj)
      if (!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        console.log("image", image.slice(0, 30))
        document.body.appendChild(animatedImage);
      }
    })
  },
  uploadFile() {
    let _this = this
    tool.chooseMessageFile(3).then(res => {
      console.log(res.tempFiles)
      tool.uploadFiles(res.tempFiles.map(val => { return val.path }), "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/api/upload/upload_file").then(res => {
        console.log("上传文件返回", res)
        _this.data.filePath = res[0]
        _this.openDocument()
      }) 
    })
  },
  openDocument() {
    tool.openDocument(this.data.filePath)
  },
  vibrateLong() {
    wx.vibrateLong()
  },
  setScreenBrightness() {
    wx.setScreenBrightness({ value: 1 })
  },
  makePhoneCall() {
    wx.makePhoneCall({ phoneNumber: "15522553355" })
  },
  setKeepScreenOn() {
    wx.setKeepScreenOn({
      keepScreenOn: true,
      success() {
        tool.alert("设置成功")
      }
    })
  },
  uploadImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("res", res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  goWechat() {
    wx.navigateToMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: 'pages/webview/webview?url=https%3A%2F%2Fdocs.qq.com%2Fscenario%2Frecieve-template.html%3FpackId%3DXHwKXlfnC3gePoU%2FMYoQGMQvuFPEH4TlX4NQ2I%2Frkl1LKQBDCd9Sk8zwuzHK7HTD',
      envVersion: 'release',
      extraData: {
        foo: 'bar'
      },
      success(res) {
        // 打开成功
        console.log("打开成功")
      }
    })
  },
  goGame() {
    wx.navigateToMiniProgram({
      appId: 'wxec482d13249feff9',
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
        console.log("打开成功")
      }
    })
  },
  goGame2() {
    wx.navigateBackMiniProgram({
      extraData: {
        foo: 'bar'
      },
      success(res) {
        // 返回成功
      }
    })
  },
  lookImage() {
    wx.previewImage({
      current: 'http://game.flyh5.cn/resources/game/wechat/szq/images/code_01s.jpg', // 当前显示图片的http链接
      urls: ['http://game.flyh5.cn/resources/game/wechat/szq/images/code_01s.jpg'] // 需要预览的图片http链接列表
    })
  },
  start(e) {//序列动画开始
    console.log("e", e)
    let _clickIndex = e.currentTarget.dataset.index
    console.log("_clickIndex", _clickIndex)
    this.sequenceStart("sequenceList", _clickIndex).then(() => {
      let _videoList = this.data.videoList
      _videoList[_clickIndex].curIndex = 6
      this.setData({ videoList: _videoList })
    })
  },
  sequenceInit(sequence) {
    let _sequence = []
    let _url = this.data[sequence].url
    let _num = this.data[sequence].num
    for (let i = 0; i < _num; i++) {
      _sequence.push({ url: `${_url}${i + 1}.png`, speed: this.data[sequence].speed, num: _num, loop: this.data[sequence].loop })
    }
    this.setData({ [sequence]: _sequence })
  },
  //序列动画开始
  sequenceStart(sequence, clickIndex) {
    let _num = 1
    return new Promise(resolve => {
      let autoSequence = setInterval(() => {
        let _videoList = this.data.videoList
        _videoList[clickIndex].curIndex++
        // let _curSequenceIndex = this.data[`${sequence}Index`] || 0
        // _curSequenceIndex++
        if (_videoList[clickIndex].curIndex <= this.data[sequence][0].num) {
          this.setData({ videoList: _videoList })
        } else {
          if ((typeof (this.data[sequence][0].loop) == 'boolean' && this.data[sequence][0].loop) || (typeof (this.data[sequence][0].loop) == 'number' && _num < this.data[sequence][0].loop)) {
            _num++
          } else {
            clearInterval(autoSequence)
            resolve()
          }
        }
      }, this.data[sequence][0].speed)
    })
  },
  bindchange(e) {
    console.log("e", e)
    let _index = e.detail.current
    this.videoPlay(_index)
    this.data.prevIndex = _index
    console.log("_index", _index)
  },
  // 播放视频
  videoPlay(index) {
    if (this.data.prevIndex == 0 || this.data.prevIndex) {
      var _videos = wx.createVideoContext('video' + this.data.prevIndex)
      console.log("_videos", _videos)
      _videos.pause()
    }
    var _video = wx.createVideoContext('video' + index)
    _video.play()
  },
  bindmytab(e) {
    tabbar.tabJump(e.detail.e.currentTarget.dataset.index)
  },
  onShareAppMessage: function () {
    return {
      // title: '全新启辰T90 跨悦上市',
      // path: `/pages/look_car_detail/look_car_detail?id=${this.data.id}`,
      // imageUrl: `${this.data.IMGSERVICE}/car_detail/share.jpg`
    }
  }
})