// component/my_header.js
import nav from '../../components/my-nav/nav.js'
import tool from '../../utils/publics/tool.js'
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    title: {
      type: String,
      value: '导航栏'
    },
    types: { 
      type: String,
      value: ""
    },
    navTopStyle: {
      type: Array,
      value: []
    },
    navBottomStyle: {
      type: Array,
      value: ['#fff', '#000']
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: '',
    titleHeight: ''
  },
  ready() {
    if (this.data.navTopStyle.length == 0) this.setData({ navTopStyle: this.data.navBottomStyle })
    let _self = this
    tool.getSystemInfo().then(res => {
      let _titleHeight
      if (res.system.indexOf("iOS") != -1) {
        _titleHeight = 40
      } else if (res.system.indexOf("Android") != -1) {
        _titleHeight = 48
      }
      _self.setData({
        statusBarHeight: res.statusBarHeight,
        titleHeight: _titleHeight
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navBack: function(){
      console.log("this.data.types", this.data.types)
      nav.navJump(this.data.types)
      this.triggerEvent("navBack", { types: this.data.types })//事件通信
    }
  }
})
