// pages/pages-list/sliding-del/sliding-del.js
import touch from '../../utils/sliding-del'
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      { name: '张三', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448851' },
      { name: '李四', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448852' },
      { name: '王五', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448853' },
      { name: '赵六', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448854' },
      { name: '孙七', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448855' },
      { name: '龙八', add: '湖南省长沙市开福区泊富国际广场', tel: '15877448856' }
    ],
    loadMoreType: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.slidingDelInit()
  },
  //滑动删除初始化
  slidingDelInit() {
    this.touch = new touch()
  },
  //手指开始触摸
  touchstart(e) {
    //开始触摸时 重置所有删除
    let data = this.touch._touchstart(e, this.data.dataList)
    this.setData({
      dataList: data
    })
  },
  //手指触摸中
  touchmove(e) {
    let data = this.touch._touchmove(e, this.data.dataList)
    this.setData({
      dataList: data
    })
  },
  //点击删除
  del(e) {
    tool.showModal('提示', '确认要删除此条信息么？', '取消,#999', '删除,#D73F45').then(res => {
      if (res) {
        this.data.dataList.splice(e.currentTarget.dataset.index, 1)
        this.setData({
          dataList: this.data.dataList
        })
        tool.alert('删除成功')
        this.setData({ loadMoreType: this.data.dataList.length == 0 ? 0 : 2 })
      }
    })
  }
})