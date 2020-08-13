// components/slider/slider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    options_default: {
      width:"80%",//组件宽度
      sliderSize: 60,//滑块大小
      colors:['#f7f7f7', 'red', 'green'],//滑条颜色
      step: 10,//步长
      min: 50, // 两个slider所能取的最小值
      max: 1000, // 两个slider所能达到的最大值
    },
    change: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    rate: 9.5, // slider的最大最小值之差和100（或1000）之间的比率
    slider1Max: 1000, // slider1的最大取值
    slider2Min: 50, // slider2的最小取值
    slider1Value: 50, // slider1的值
    slider2Value: 1000, // slider2的值000
    slider1W: 100, // slider1的宽度
    slider2W: 0, // slider2的宽度
  },
  ready() {
    let _opations = Object.assign(this.data.options_default, this.data.options)
    this.setData({ options: _opations })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 开始滑动
    changeStart(e) {
      var idx = parseInt(e.currentTarget.dataset.idx)
      if (idx === 1) {
        // dW是当前操作的slider所能占据的最大宽度百分数
        var dW = (this.data.slider2Value - this.data.options.min) / this.data.rate
        this.setData({
          slider1W: dW,
          slider2W: 100 - dW,
          slider1Max: this.data.slider2Value,
          slider2Min: this.data.slider2Value,
          change: false
        })
      } else if (idx === 2) {
        var dw = (this.data.options.max - this.data.slider1Value) / this.data.rate
        this.setData({
          slider2W: dw,
          slider1W: 100 - dw,
          slider1Max: this.data.slider1Value,
          slider2Min: this.data.slider1Value,
          change: false
        })
      }
    },
    // 正在滑动
    changing(e) {
      var idx = parseInt(e.currentTarget.dataset.idx)
      var value = e.detail.value
      if (idx === 1) {
        this.setData({
          slider1Value: value
        })
      } else if (idx === 2) {
        this.setData({
          slider2Value: value,
        })
      }
      this.triggerEvent("curValue", { valMin: this.data.slider1Value, valMax: this.data.slider2Value })
    },
    changed(e) {
      console.log(e)
      if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.options.max) {
        this.setData({
          change: true
        })
      }
    }
  }
})
