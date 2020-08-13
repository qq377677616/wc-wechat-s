export default class audio {
  constructor (page, opts){
    console.log("opts.global", opts.global)
    this.page = page
    this.audio = null
    this.global = opts.global
    this.musicUrl = opts.musicUrl
    this.autoplay = opts.autoplay
    this.loop = opts.loop
    this.volume = opts.volume
    this.startTime = opts.startTime || 0
    this.mixWithOther = opts.mixWithOther || true
    this.obeyMuteSwitch = opts.obeyMuteSwitch || false
    this.onTimeUpdate = opts.onTimeUpdate || false
  }
  //初始化
  init() {
    let { musicUrl, autoplay, loop, volume, startTime, mixWithOther, obeyMuteSwitch, onTimeUpdate } = this
    if (this.global) {
      this.audio = this.global.globalData.innerAudioContext = wx.createInnerAudioContext()
    } else {
      this.audio = this.page.innerAudioContext = wx.createInnerAudioContext()
    }
    this.audio.src = musicUrl  // 音频资源的地址
    this.audio.volume = volume  // 音量
    this.audio.autoplay = autoplay  // 是否自动开始播放，默认为 false
    this.audio.loop = loop  // 是否循环播放，默认为 false
    this.audio.startTime = startTime  // 是否循环播放，默认为 false
    wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
      mixWithOther: mixWithOther,//是否与其他音频混播，设置为 true 之后，不会终止其他应用或微信内的音乐
      obeyMuteSwitch: obeyMuteSwitch,//是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
      success(e) { console.log(e) },
      fail(e) { console.log(e) }
    })
    this.audio.onCanplay(() => { console.log('可以播放了')})// 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放
    this.audio.onError(err => { console.log('播放错误', err) })//监听音频播放错误事件
    this.audio.onPlay(() => { console.log('播放')})//监听音频播放事件
    this.audio.onPause(() => { console.log('暂停') })//监听音频暂停事件
    this.audio.onStop(() => { console.log('停止') })//监听音频停止事件
    this.audio.onEnded(() => { console.log('播放结束')})//监听音频自然播放至结束的事件
    this.audio.onWaiting(() => { console.log('音频数据不足')})//监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
    this.audio.onTimeUpdate(() => { if (onTimeUpdate && this.page.onTimeUpdate) this.page.onTimeUpdate({ currentTime: this.audio.currentTime, duration: this.audio.duration }) })//监听音频播放进度更新事件
  }
  //播放
  play() {
    this.audio.play()
  }
  //暂停
  pause() {
    this.audio.pause()
  }
  //停止
  stop() {
    this.audio.stop()
  }
  //跳转到指定位置
  seek(time) {
    this.audio.seek(time)
  }
}