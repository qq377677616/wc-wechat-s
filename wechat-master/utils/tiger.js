export default class Machine {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.ele = opts.ele
    this.len = opts.lattice
    this.asyncTime = opts.asyncTime
    this.duration = opts.duration
    this.latticeNum = opts.latticeNum
    this.lattice = opts.lattice
    this.valueInit = opts.valueInit
    this.sRange = opts.sRange
    this.transY1 = opts.valueInit[0]
    this.transY2 = opts.valueInit[1]
    this.transY3 = opts.valueInit[2]
    this.transY4 = opts.valueInit[3]
    this.transY5 = opts.valueInit[4]
    this.speed = opts.speed
    this.debug = opts.debug
  }
  //初始化
  init() {
    if (latticeNum > 5) {
      console.log("错误：轨道数大于5")
      return
    }
    let { ele, lattice, latticeNum, valueInit, debug } = this
    let _lattice = []
    for (let i = 0; i < lattice + 1; i++) {
      i < lattice ? _lattice.push(i) : _lattice.push(0)
    }
    this.getDom(ele).then(res => {
      this.height = res[0].height
      this.page.setData({ transY1: valueInit[0] * -this.height, transY2: valueInit[1] * -this.height, transY3: valueInit[2] * -this.height, transY4: valueInit[3] * -this.height, latticeNum, lattice: _lattice, debug})
    })
  }
  //开始抽奖
  start (valuePrize) {
    let { latticeNum } = this
    return new Promise(resolve => {
      if (latticeNum > 5) {
        console.log("错误：轨道数大于5")
        resolve({ code: 404, message: "错误：轨道数大于5" })
      }
      let { valueInit, len, height, transY1, transY2, transY3, transY4, transY5, speed, asyncTime, sRange, duration } = this
      let totalHeight = height * len 
      // let sRange = Math.floor(Math.random() * sRange + sRange)
      // let halfSpeed = speed[0] / speed[1]
      let endDis1 = valuePrize[0] == 0 ? len * height : valuePrize[0] * height
      let endDis2 = valuePrize[1] == 0 ? len * height : valuePrize[1] * height
      let endDis3 = valuePrize[2] == 0 ? len * height : valuePrize[2] * height
      let endDis4 = valuePrize[3] == 0 ? len * height : valuePrize[3] * height
      let endDis5 = valuePrize[4] == 0 ? len * height : valuePrize[4] * height
      let i1 = 1, i2 = 1, i3 = 1, i4 = 1, i5 = 1
      this.timer1 = setInterval(() => {
        let ret = this.transYFun(i1, endDis1, transY1, totalHeight, sRange, speed)
        if (ret) {
          i1 = ret[0]
          transY1 = ret[1]
          this.page.setData({ transY1 })
        } else {
          clearInterval(this.timer1)
          latticeNum <= 1 &&  resolve()
        }      
      }, duration)
      if (latticeNum <= 1) return
      setTimeout(() => {
        this.timer2 = setInterval(() => {
          let ret = this.transYFun(i2, endDis2, transY2, totalHeight, sRange, speed)
          if (ret) {
            i2 = ret[0]
            transY2 = ret[1]
            this.page.setData({ transY2 })
          } else {
            clearInterval(this.timer2)
            latticeNum <= 2 &&  resolve()
          }
        }, duration)
      }, asyncTime)    
      if (latticeNum <= 2) return
      setTimeout(() => {
        this.timer3 = setInterval(() => {
          let ret = this.transYFun(i3, endDis3, transY3, totalHeight, sRange, speed)
          if (ret) {
            i3 = ret[0]
            transY3 = ret[1]
            this.page.setData({ transY3 })
          } else {
            clearInterval(this.timer3)
            latticeNum <= 3 &&  resolve()
          }
        }, duration)
      }, asyncTime * 2)    
      if (latticeNum <= 3) return
      setTimeout(() => {
        this.timer4 = setInterval(() => {
          let ret = this.transYFun(i4, endDis4, transY4, totalHeight, sRange, speed)
          if (ret) {
            i4 = ret[0]
            transY4 = ret[1]
            this.page.setData({ transY4 })
          } else {
            clearInterval(this.timer4)
            latticeNum <= 4 &&  resolve()
          }
        }, duration)
      }, asyncTime * 3)
      if (latticeNum <= 4) return
      setTimeout(() => {
        this.timer5 = setInterval(() => {
          let ret = this.transYFun(i5, endDis5, transY5, totalHeight, sRange, speed)
          if (ret) {
            i5 = ret[0]
            transY5 = ret[1]
            this.page.setData({ transY5 })
          } else {
            clearInterval(this.timer5)
            resolve()
          }
        }, duration)
      }, asyncTime * 4)    
    })
  }

  transYFun(i, endDis, transY, totalHeight, sRange, speed) {
    if (i <= 1) {
      transY -= speed[0] 
      if (Math.abs(transY) > totalHeight) {
        transY = transY + totalHeight
        i++
      }
    } else if (i <= sRange) {
      transY -= speed[1] 
      if (Math.abs(transY) > totalHeight) {
        transY = transY + totalHeight
        i++
      }
    } else if (i > sRange && i < sRange + 2) {
      transY -= speed[2]
      if (Math.abs(transY) > totalHeight) {
        transY = transY + totalHeight
        i++
      }
    } else {
      // if (transY == -endDis)return  // 有小数点误差      
      if (Math.floor(transY + endDis) == 0 ) return        
      let dropSpeed = endDis + transY < speed[1] ? 1 : speed[1]
      transY -= dropSpeed
      if (Math.abs(transY) > endDis) transY = -endDis
    }
    return [i, transY]

  }

  getDom(ele) {
    return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery()
      query.select(ele).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        resolve(res)
      })
    })
  }
}

