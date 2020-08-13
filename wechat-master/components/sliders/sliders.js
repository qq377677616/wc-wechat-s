// component/zyslider/zyslider.js
import util from '../../utils/publics/util'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sliderOptions: {
      type: Object,
      value: {
        size: [50, 4],//滑块大小、线条粗细
        step: 10,//步长
        colors: ['#027C60', '#027C60', '#ccc'],//滑块颜色、已选择滑条颜色、滑条原始颜色
        range: [0, 1000],//选择范围
        initialValue: [0, 1000]//初始值
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    totalLength: 0,
    bigLength: 0,
    ratio: 0.5,
    sliderLength: 40,
    containerLeft: 0, //标识整个组件，距离屏幕左边的距离
    hideOption: '', //初始状态为显示组件
  },
  ready() {
    console.log("this.data.curMinValue", this.data.curMinValue)
    this.sliderInit()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sliderInit() {
      this.data.curMinValue = this.data.sliderOptions.initialValue[0]
      this.data.curMaxValue = this.data.sliderOptions.initialValue[1]
      this.triggerEvent('sliderChange', { sliderValue: [this.data.sliderOptions.initialValue[0], this.data.sliderOptions.initialValue[1]] })
      let that = this;
      const getSystemInfo = util.wxPromisify(wx.getSystemInfo)
      const queryContainer = util.wxPromisify(wx.createSelectorQuery().in(this).select(".container").boundingClientRect)
      util.wxPromisify(wx.getSystemInfo)()
        .then(res => {
          let ratio = res.windowWidth / 750
          that.setData({
            ratio: ratio,
          })
        })
        .then(() => {
          var query = wx.createSelectorQuery().in(this)
          query.select(".container").boundingClientRect(function (res) {
            that.setData({
              totalLength: res.width / that.data.ratio - that.data.sliderLength,
              bigLength: res.width / that.data.ratio - that.data.sliderLength * 2,
              rightValue: res.width / that.data.ratio - that.data.sliderLength,
              containerLeft: res.left / that.data.ratio
            })
  
          /**
           * 设置初始滑块位置
           */
          that._propertyLeftValueChange()
          that._propertyRightValueChange()
          }).exec()
        })
    },
    /**
    * 设置左边滑块的值
    */
    _propertyLeftValueChange: function () {
      let minValue = this.data.sliderOptions.initialValue[0] / this.data.sliderOptions.range[1] * this.data.bigLength
      let min = this.data.sliderOptions.range[0] / this.data.sliderOptions.range[1] * this.data.bigLength
      this.setData({
        leftValue: minValue - min
      })
    },

    /**
     * 设置右边滑块的值
     */
    _propertyRightValueChange: function () {
      let right = this.data.sliderOptions.initialValue[1] / this.data.sliderOptions.range[1] * this.data.bigLength + this.data.sliderLength
      this.setData({
        rightValue: right
      })
    },

    /**
     * 左边滑块滑动
     */
    _minMove: function (e) {
      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2

      if (pagex + this.data.sliderLength >= this.data.rightValue) {
        pagex = this.data.rightValue - this.data.sliderLength
      } else if (pagex <= 0) {
        pagex = 0
      }

      this.setData({
        leftValue: pagex
      })

      let lowValue = parseInt(pagex / this.data.bigLength * parseInt(this.data.sliderOptions.range[1] - this.data.sliderOptions.range[0]) + this.data.sliderOptions.range[0])
      var myEventDetail = { lowValue: lowValue }
      this.data.curMinValue = myEventDetail.lowValue
      this.triggerEvent('sliderChange', { sliderValue: [this.data.curMinValue, this.data.curMaxValue] })
    },

    /**
     * 右边滑块滑动
     */
    _maxMove: function (e) {

      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2
      if (pagex <= this.data.leftValue + this.data.sliderLength) {
        pagex = this.data.leftValue + this.data.sliderLength
      } else if (pagex >= this.data.totalLength) {
        pagex = this.data.totalLength
      }

      this.setData({
        rightValue: pagex
      })

      pagex = pagex - this.data.sliderLength
      let heighValue = parseInt(pagex / this.data.bigLength * (this.data.sliderOptions.range[1] - this.data.sliderOptions.range[0]) + this.data.sliderOptions.range[0])

      var myEventDetail = { heighValue: heighValue }
      this.data.curMaxValue = myEventDetail.heighValue
      this.triggerEvent('sliderChange', { sliderValue: [this.data.curMinValue, this.data.curMaxValue] })
    },

    /**
     * 隐藏组件
     */
    hide: function () {
      this.setData({
        hideOption: 'hide',
      })
    },
    /**
     * 显示组件
     */
    show: function () {
      this.setData({
        hideOption: '',
      })
    },
    /**
    * 重置
    */
    reset() {
      this.sliderInit()
      // this.setData({
      //   rightValue: this.data.totalLength,
      //   leftValue: 0,
      // })
      // this.triggerEvent('sliderChange', { sliderValue: [this.data.sliderOptions.range[0], this.data.sliderOptions.range[1]] })
    }
  }
})
