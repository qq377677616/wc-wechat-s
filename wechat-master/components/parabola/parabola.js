// components/parabola/parabola.js
import tool from '../../utils/publics/tool.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addCartConfig: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化
    addCartInit(cartX, cartY) {
      tool.getSystemInfo().then(res => {
        this.data.cartX = cartX
        this.data.cartY = cartY
        this.data.windowWidth = res.windowWidth
        this.data.windowHeight = res.windowHeight
      })
    },
    //创建动画
    cartAnimation(x, y) {
      let self = this,
        animationXs = flyX(this.data.cartX, x),
        animationYs = flyY(this.data.cartY, y),
        ballX = this.data.ballX || [],
        ballY = this.data.ballY || [],
        animationX = this.data.animationX || [],
        animationY = this.data.animationY || []
      ballX.push(x)
      ballY.push(y)
      animationX.push(animationXs.export())
      animationY.push(animationYs.export())
      this.setData({
        ballX,
        ballY,
        showBall: true
      })
      setTimeoutES6(100).then(() => {
        self.setData({ animationX, animationY })
        return setTimeoutES6(this.data.addCartConfig.parabolaDuration)
      }).then(() => {
        let _ballIndex = this.data.ballIndex || 1
        this.setData({ ballIndex: ++_ballIndex, showBall: false })
        this.triggerEvent('addCartEndCallback')
      })
      function setTimeoutES6(sec) {
        return new Promise((resolve, reject) => {
          setTimeout(() => { resolve() }, sec)
        })
      }
      function flyX(cartX, oriX) {
        let animation = wx.createAnimation({
          duration: self.data.addCartConfig.parabolaDuration,
          timingFunction: 'linear',
        })
        animation.left(cartX).step()
        return animation
      }
      function flyY(cartY, oriY) {
        let animation = wx.createAnimation({
          duration: self.data.addCartConfig.parabolaDuration,
          timingFunction: 'ease-in',
        })
        animation.top(cartY).step()
        return animation
      }
    },
    //下面为测试方法，不要用
    cartAnimation2(x, y) {
      let self = this,
        cartY = 603 - 50,
        cartX = 50,
        animationX = flyX(cartX, x),
        animationY = flyY(cartY, y)
      this.setData({
        ballX: x,
        ballY: y,
        leftNum: x,
        topNum: y,
        showBall: true
      })
      setTimeoutES6(100).then(() => {
        self.setData({
          animationDataX: animationX.export(),
          animationDataY: animationY.export(),
        })
        return setTimeoutES6(this.data.parabolaDuration)
      }).then(() => {
        this.setData({
          showBall: false,
          animationX: flyX(0, 0, 0).export(), // 还原小球位置，即 translate 恢复默认值
          animationY: flyY(0, 0, 0).export(),
        })
      })
      function setTimeoutES6(sec) { // Promise 化 setTimeout
        return new Promise((resolve, reject) => {
          setTimeout(() => { resolve() }, sec)
        })
      }
      function flyX(cartX, oriX, duration) {
        let animation = wx.createAnimation({
          duration: duration || self.data.parabolaDuration,
          timingFunction: 'linear',
        })
        animation.translateX(cartX - oriX).step()
        return animation
      }
      function flyY(cartY, oriY, duration) {
        let animation = wx.createAnimation({
          duration: duration || self.data.parabolaDuration,
          timingFunction: 'ease-in',
        })
        animation.translateY(cartY - oriY).step()
        return animation
      }
    }
  }
})
