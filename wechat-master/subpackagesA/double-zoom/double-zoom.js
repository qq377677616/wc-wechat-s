// subpackagesA/double-zoom/double-zoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seatTotal: 36,//总座位
    itemSize: [80, 80, 20, 26],//座位大小、间距、字体大小，单位：rpx
    curScale: [1, 2]//缩放比
  },
  onLoad(options) {
    this.seatInit()//座位初始化
  },
  //双手指触发开始,计算开始触发两个手指坐标的距离
  touchstartCallback(e) {
    this.calcDistance(e)
  },
  //双手指移动,计算两个手指坐标和距离
  touchmoveCallback(e) {
    this.calcDistance(e, true, res => {
      console.log("【双指缩放比】", res)
      this.setData({ curScale: [res > 1 ? this.data.curScale[1] : 1, this.data.curScale[1]] })
    })
  },
  //选择座位
  selectSeatList(e) {
    let { mySeatList } = this.data, _index = e.currentTarget.dataset.index
    mySeatList[parseInt(_index / 10)][_index % 10].isSelect = !mySeatList[parseInt(_index / 10)][_index % 10].isSelect
    this.setData({ mySeatList })
  },
  //座位初始化
  seatInit() {
    let _seatLists = []
    for (let i = 0; i < this.data.seatTotal; i++) {
      _seatLists.push({ num: i + 1, isSelect: false })
    }
    let _seatList = [], _list = _seatLists
    for (let i = 0; i < _list.length / 10; i++) {
      _seatList.push(_list.slice(i * 10, (i + 1) * 10))
    }
    this.setData({ mySeatList: _seatList })
  },
  //计算双指位置
  calcDistance(e, type, callback) {
    //单手指缩放开始，不做任何处理
    if (e.touches.length == 1) return
    //当两根手指放上去的时候，计算distance
    let xMove = e.touches[1].clientX - e.touches[0].clientX
    let yMove = e.touches[1].clientY - e.touches[0].clientY
    //计算开始触发两个手指坐标的距离
    let distance = Math.sqrt(xMove * xMove + yMove * yMove)
    if (!type) {
      this.setData({ distance })
    } else {
      let distanceDiff = distance - this.data.distance
      let newScale = 1 + 0.005 * distanceDiff
      callback(newScale)
    }
  }
})