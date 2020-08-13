
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sliderOptions: {
      size: [50, 4],//滑块大小、线条粗细
      step: 10,//步长
      colors: ['#027C60', '#027C60', '#ccc'],//滑块颜色、已选择滑条颜色、滑条原始颜色
      range: [0, 1000],//选择范围
      initialValue: [300, 700]//初始值
    }
  },
  onLoad() {

  },
  //重置slide
  reset() {
    this.selectComponent("#slider").reset()
  },
  //滑动回调
  bindsliderChange(e) {
    this.setData({ sliderValue: e.detail.sliderValue })
  }
})