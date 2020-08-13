// pages/pages-list/imgCode/img-code.js
import Mcaptcha from '../../utils/mcaptcha'
import tool from '../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
  },
  
  //刷新验证码
  onTap() {
    this.mcaptcha.refresh()
    this.setData({ imgCode: '' })
  },
  //输入验证码
  codeImg(e) {
    this.data.imgCode = e.detail.value
  },
  //验证验证码
  verification() {
    if(this.data.imgCode == '' || this.data.imgCode == null) {
      tool.alert('请输入验证码')
      return
    }
    if (this.mcaptcha.validate(this.data.imgCode)) {
      tool.loading("验证成功")
      setTimeout(() => { 
        this.onTap()
        tool.loading_h() 
      }, 800)
    } else {
      tool.alert('验证码错误')
    }
  }
})