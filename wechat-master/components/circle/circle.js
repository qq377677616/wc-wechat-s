// components/circle/circle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circle: {
      type: Object,
      value: {
        width: 100,//进度条宽度，单位px
        crude: 10,//进度条厚度
        fontStyle: ["100rpx", "#000"],//进度条中间文字样式
        speed: 100,//进度条加载动画时间
        progress: 75//进度条进度值
      }
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    countTimer: null
  },
  ready() {
    this.drawProgressbg()
    // this.drawCircle(.5)
    this.countInterval()
  },
  observers: {
    "circle": function(val) {
      console.log(val)
      this.setData({ count: 0 })
      this.drawProgressbg()
      this.countInterval()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    drawProgressbg: function () {
      // 使用 wx.createContext 获取绘图上下文 context
      console.log("this.data.parentThis2", this.data.parentThis)
      var ctx = wx.createCanvasContext('canvasProgressbg', this)
      console.log("ctx", ctx)
      ctx.setLineWidth(this.data.circle.crude)// 设置圆环的宽度
      ctx.setStrokeStyle('#FFF0D3') // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath()//开始一个新的路径
      ctx.arc(this.data.circle.width / 2, this.data.circle.width / 2, this.data.circle.width / 2 - 10, 0, 2 * Math.PI, false)
      //设置一个原点(100,100)，半径为90的圆的路径到当前路径
      ctx.stroke()//对当前路径进行描边
      ctx.draw()
    },
    countInterval: function () {
      // 设置倒计时 定时器，计数器count+1 ,耗时6秒绘一圈
      this.countTimer = setInterval(() => {
        if (this.data.count <= this.data.circle.progress * 3 / 5) {
          this.drawCircle(this.data.count / (60 / 2))
          let _count = this.data.count + 1
          this.setData({ count: _count })
        } else {
          clearInterval(this.countTimer)
        }
      }, this.data.circle.speed)
    },
    drawCircle: function (step) {
      var context = wx.createCanvasContext('canvasProgress', this)
      // 设置渐变
      var gradient = context.createLinearGradient(200, 100, 100, 200)
      gradient.addColorStop("0", "#FF973A")
      // gradient.addColorStop("0.5", "#FF6000")
      gradient.addColorStop("1.0", "#FF6000")
      context.setLineWidth(this.data.circle.crude)
      context.setStrokeStyle(gradient)
      context.setLineCap('round')
      context.beginPath()
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(this.data.circle.width / 2, this.data.circle.width / 2, this.data.circle.width / 2 - 10, -Math.PI / 2, step * Math.PI - Math.PI / 2, false)
      context.stroke()
      context.draw()
    }
  }
})
