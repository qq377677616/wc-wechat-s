// pages/audiocontrols/controls.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPause: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // isShow: false
    // isPause: true
  },
  attached() {
    this.controls(1)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //新版本
    controls(isSwitch){
      let _backgroundAudioManager = app.globalData.innerAudioContext
      if (!_backgroundAudioManager || _backgroundAudioManager.paused === undefined) return
      if (!this.data.isAudio) this.setData({ isAudio: true })
      if (_backgroundAudioManager.paused) {
        if (isSwitch === 1) {
          this.properties.isPause = true
          this.setData({ isPause: true })
        } else {
          _backgroundAudioManager.play()
          this.setData({ isPause: false })
          this.properties.isPause = false
        }
      } else {
        if (isSwitch === 1) { 
          this.setData({ isPause: false })
          this.properties.isPause = false
        } else {
          _backgroundAudioManager.pause()
          this.setData({ isPause: true })
          this.properties.isPause = true
        }
      }
    },
    //老版本
    controls2(isSwitch){
      let _backgroundAudioManager = wx.getBackgroundAudioManager()
      if (_backgroundAudioManager.paused === undefined) {
        return
      }
      // this.setData({ isShow: true })
      if (_backgroundAudioManager.paused) {
        if (isSwitch === 1) {
          this.properties.isPause = true
          this.setData({ isPause: true })
        } else {
          _backgroundAudioManager.play()
          this.setData({ isPause: false })
          this.properties.isPause = false
        }
      } else {
        if (isSwitch === 1) { 
          this.setData({ isPause: false })
          this.properties.isPause = false
        } else {
          _backgroundAudioManager.pause()
          this.setData({ isPause: true })
          this.properties.isPause = true
        }
      }
    }
  }
})
