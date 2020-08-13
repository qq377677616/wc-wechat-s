// pages/pages-list/sequence/sequence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sequenceList: { url: `${getApp().globalData.ASSETSURL}/sequence/bean/bean_`, num: 30, speed: 100, loop: false }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sequenceInit("sequenceList")//序列帧初始化
  },
  //点击开始
  start() {
    this.sequenceStart("sequenceList").then(() => { console.log("序列帧播放完成") })//序列动画开始
  },
  //序列帧初始化
  sequenceInit(sequence) {
    let _sequence = []
    let _url = this.data[sequence].url
    let _num = this.data[sequence].num
    for (let i = 0; i < _num; i++) {
      _sequence.push({ url: `${_url}${i + 1}.png`, num: this.data[sequence].num, speed: this.data[sequence].speed, loop: this.data[sequence].loop })
    }
    this.setData({ [sequence]: _sequence })
  },
  //序列动画开始
  sequenceStart(sequence) {
    let _num = 1
    return new Promise(resolve => {
      let autoSequence = setInterval(() => {
        let _curSequenceIndex = this.data[`${sequence}Index`] || 0
        _curSequenceIndex++
        if (_curSequenceIndex <= this.data[sequence][0].num) {
          this.setData({ [`${sequence}Index`]: _curSequenceIndex })
        } else {
          if ((typeof (this.data[sequence][0].loop) == 'boolean' && this.data[sequence][0].loop) || (typeof (this.data[sequence][0].loop) == 'number' && _num < this.data[sequence][0].loop)) {
            _num++
            this.setData({ [`${sequence}Index`]: 0 })
          } else {
            this.setData({ [`${sequence}Index`]: -1 })
            clearInterval(autoSequence)
            resolve()
          }
        }
      }, this.data[sequence][0].speed)
    })
  }
})