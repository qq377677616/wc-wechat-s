// pages/test/test.js
import tool from '../../utils/publics/tool.js'
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{ title: '首页', icon: "icon-zhuye", url: "/pages/index/index" }, { title: "积分活动", icon: "icon-wenti", url: "" }, { title: "购物车", icon: "icon-gouwuche", url: "/pages/pages-list/custom/custom" }, { title: "我的", icon: "icon-wode", url: "/pages/pages-list/custom/custom" }],//自定义tabBar导航
    addCartConfig: {
      ballSize: ['22', '22'],//抛物体大小，单位rpx
      ballColor: '#ffcd43',//抛物体颜色
      parabolaDuration: 400,//抛物线动画速度
      targetLocation: "#car-box"//目标位置
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addCartInit()
  },
  //添加购物车动效初始化
  addCartInit() {
    this.data.parabola = this.selectComponent('#parabola')
    tool.getDom(this.data.addCartConfig.targetLocation).then(res => {
      this.data.parabola.addCartInit(res[0].left, res[0].top)
    })
  },
  //点击购物车
  addCart(e) {
    if (this.data.addCartEnd) return
    this.addCartEnd(true)
    tool.getDom(e.currentTarget.dataset.id).then(res => {
      this.data.parabola.cartAnimation(res[0].left, res[0].top)
    })
  },
  //抛物线动效完成回调
  addCartEndCallback() {
    this.addIconAnimated()
    this.addCartEnd(false)
  },
  //添加开关，防止连续点击过快
  addCartEnd(boolean) {
    this.data.addCartEnd = boolean
  },
  //添加动画
  addIconAnimated() {
    let _tabList = this.data.tabList
    _tabList[2].otherclass = "swing animated"
    this.setData({ tabList: _tabList })
    setTimeout(() => {
      _tabList[2].otherclass = ""
      this.setData({ tabList: _tabList })
    }, 500)
  }
})