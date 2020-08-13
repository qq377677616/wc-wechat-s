// components/tabBar/tabBar.js
import tool from '../../utils/publics/tool.js'
import tabbar from '../../components/my-tabbar/tabbar.js'
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    tabList: {
      type: Array,
      value: []  
    },
    curIndex: {
      type: Number,
      value: -1
    },
    types: {
      type: [Number, String],
      value: 0
    },
    navType: {
      type: [Number, String],
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    this.setData({ tabList: this.data.tabList.length > 0 ? this.data.tabList : tabbar.tabUrl })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checked(e) {
      if (this.properties.curIndex == e.currentTarget.dataset.index) return
      this.setData({ curIndex: e.currentTarget.dataset.index })
      tabbar.tabJump(e.currentTarget.dataset.index, this.route)
      this.triggerEvent('mytab', { e })//事件通信
    }
  }
})
