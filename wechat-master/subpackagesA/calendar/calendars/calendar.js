Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: [
      {
        date: '2019-7-21'
      }, {
        date: '2019-8-22'
      }, {
        date: '2019-9-24'
      }, {
        date: '2019-10-25'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  /**
  * 日历是否被打开
  */
  bindselect(e) {
    console.log("日历是否展开了-->", e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log("当前选中的日期-->", time)
  }
})