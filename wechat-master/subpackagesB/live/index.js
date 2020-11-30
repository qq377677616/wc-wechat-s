// pages/pages-list/prize/index.js
import tool from '../../utils/publics/tool.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowHaze: true,//密码弹窗
    passWord: 20202020//密码
  },
  //输入密码
  bindinput(e) {
    console.log("e", e)
    this.setData({ inputValue: e.detail.value })
  },
  //确认输入密码
  confirm() {
    if (this.data.inputValue == this.data.passWord) {
      tool.alert("密码正确")
      this.isShowHaze()
      tool.jump_nav('/subpackages/live/live-dev/live-pusher')
    } else {
      tool.alert("通关密码不对哦")
      this.setData({ inputValue: "" })
    }
  },
  //页面跳转
  jump(e) {
    if (e.currentTarget.dataset.page == '/subpackages/live/live-dev/live-pusher') {
      this.isShowHaze()
    } else {
      tool.jump_nav(e.currentTarget.dataset.page)
    }
  },
  //弹窗
  isShowHaze() {
    this.setData({ isShowHaze: !this.data.isShowHaze })
  }
})