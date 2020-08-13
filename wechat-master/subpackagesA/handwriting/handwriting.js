import Handwriting from './handwriting/handwriting'
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectColor: 'black',
    slideValue: 50,
    isStart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handwriting = new Handwriting(this, {
      lineColor: this.data.lineColor,
      slideValue: this.data.slideValue, // 0, 25, 50, 75, 100
    })
  },
  //保存
  preserve() {
    // if (!this.data.isStart) {
    //   tool.alert("请先签名")
    //   return
    // }
    tool.canvasToTempImage("handWriting").then(res => {
      this.setData({ handwritingImg: res})
    })
  },
  //关闭
  close() {
    this.setData({ handwritingImg: '' })
    this.retDraw()
  },
  // 选择画笔颜色
  selectColorEvent(event) {
    var color = event.currentTarget.dataset.colorValue;
    var colorSelected = event.currentTarget.dataset.color;
    this.setData({
      selectColor: colorSelected
    })
    this.handwriting.selectColorEvent(color)
  },
  retDraw() {
    this.handwriting.retDraw()
  },
  // 笔迹粗细滑块
  onTouchStart(event) {
    this.startY = event.touches[0].clientY;
    this.startValue = this.format(this.data.slideValue)
  },
  onTouchMove(event) {
    const touch = event.touches[0];
    this.deltaY = touch.clientY - this.startY;
    this.updateValue(this.startValue + this.deltaY);
  },
  onTouchEnd() {
    this.updateValue(this.data.slideValue, true);
  },
  updateValue(slideValue, end) {
    slideValue = this.format(slideValue);
    this.setData({
      slideValue,
    });
    this.handwriting.selectSlideValue(this.data.slideValue)
  },
  format(value) {
    return Math.round(Math.max(0, Math.min(value, 100)) / 25) * 25;
  }
})