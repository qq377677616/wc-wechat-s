// subpackages/shop/cart/cart.js
import tool from '../../../utils/publics/tool'
import touch from '../../../utils/sliding-del'
import watch from '../../../utils/wxWatch'
import WxCountUp from '../../../utils/countUp.min.js'
import { decimal_place, accAdd, accMul } from '../../../utils/util'

Page({
  data: {
    goodsDetailsUrl: '/pages/index/index?goodsId=',//商品详情页路径
    settlementsUrl: '/pages/index/index',//商品结算页路径
    goodsList: [//购物车列表
      { id: 1, name: "焕活骨胶原面膜", other: "310ml", prize: "68.50", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" },
      { id: 2, name: "焕活骨胶原面膜", other: "220ml", prize: "58.15", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" },
      { id: 3, name: "焕活骨胶原面膜", other: "500ml", prize: "128.50", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" },
      { id: 4, name: "焕活骨胶原面膜", other: "520ml", prize: "99.99", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" },
      { id: 5, name: "焕活骨胶原面膜", other: "200ml", prize: "28.00", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" },
      { id: 6, name: "焕活骨胶原面膜", other: "350ml", prize: "108.00", num: 1, img: "http://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg" }
    ],
    prizeTotal: 0,
    loadMoreType: 2,//加载更多状态
    storageType: 2//购物车数据存储：0为不存储，1为全局globalData暂储，2为缓存storage永久存储，3为store暂储
  },
  onLoad(options) {
    watch.setWatcher(this)//初始化监听
    this.slidingDelInit()
  },
  onShow() {
    this.getStorageData()
    this.isSelectGoods()
    this.isSelectAll()
  },
  onHide() {
    // this.setStorageData()
  },
  watch: {
    goodsList() {
      this.setStorageData()
    }
  },
  //跳转去结算
  settlement() {
    if (this.data.buttonClicked) return
    this.buttonClicked(this)
    if (!this.isSelectGoods()) {
      tool.alert("最少选择一件商品吧")
      return
    }
    if (!this.data.storageType) this.setStorageData(1)
    tool.jump_nav(this.data.settlementsUrl)
  },
  //加减数量
  numChange(e) {
    let { goodsList } = this.data
    if (~~e.currentTarget.dataset.type) {
      if (goodsList[e.currentTarget.dataset.index].num >= 99) {
        tool.alert("不能再多啦~")
        return
      }
      ++goodsList[e.currentTarget.dataset.index].num
    } else {
      if (goodsList[e.currentTarget.dataset.index].num <= 1) {
        this.del(e)
        // tool.alert("不能再少啦~")
        return
      }
      --goodsList[e.currentTarget.dataset.index].num
    }
    this.setData({ goodsList })
    this.calcPrize()
  },
  //计算总价格
  calcPrize() {
    let { goodsList } = this.data, prizeTotal = 0
    goodsList.forEach(item => {
      if (item.isSelect) prizeTotal = accAdd(prizeTotal, accMul(item.prize, item.num))
    })
    // this.setData({ prizeTotal: decimal_place(prizeTotal) })
    if (this.countUp) {
      this.countUp.update(decimal_place(prizeTotal))
    } else {
      this.countUp = new WxCountUp('prizeTotal', decimal_place(prizeTotal), { startVal: this.data.prizeTotal, duration: 0.5, decimalPlaces: 2, useGrouping: false }, this)
      this.countUp.start()
    }
  },
  //单选
  selectSingle(e) {
    let { goodsList } = this.data
    goodsList[e.currentTarget.dataset.index].isSelect = !goodsList[e.currentTarget.dataset.index].isSelect
    this.setData({ goodsList })
    this.calcPrize()
    this.isSelectAll()
    this.isSelectGoods()
  },
  //全选
  selectAll() {
    let { goodsList } = this.data
    goodsList.forEach(item => { item.isSelect = this.data.isSelectAll ? false : true })
    this.setData({ goodsList })
    this.calcPrize()
    this.isSelectAll()
    this.isSelectGoods()
  },
  //是否全选
  isSelectAll() {
    let isSelectAll = this.data.goodsList.every(item => { return item.isSelect })
    this.setData({ isSelectAll })
    return isSelectAll
  },
  //是否有选择
  isSelectGoods() {
    let isSelectGoods = this.data.goodsList.some(item => { return item.isSelect })
    this.setData({ isSelectGoods })
    return isSelectGoods
  },
  //拉取存储数据
  getStorageData() {
    let type = this.data.storageType, cartData
    if (!type) return
    switch(type) {
      case 1:
        cartData = getApp().globalData.cartData
        break
      case 2:
        cartData = wx.getStorageSync('cartData')  
        break
      case 3:
        cartData = getApp().store.getState().cartData
    }
    if (cartData) this.setData({ goodsList: cartData.goodsList })
    this.calcPrize()
  },
  //存储购物车数据
  setStorageData(type = this.data.storageType) {
    if (!type) return
    let cartData = { goodsList: this.data.goodsList, prizeTotal: this.data.prizeTotal }
    switch(type) {
      case 1:
        getApp().globalData.cartData = cartData
        break
      case 2:
        wx.setStorageSync('cartData', cartData)  
        break
      case 3:
        getApp().store.setState({ cartData })
    }
  },
  //滑动删除初始化
  slidingDelInit() {
    this.touch = new touch()
  },
  //手指开始触摸
  touchstart(e) {
    this.currentE = e
    let data = this.touch._touchstart(e, this.data.goodsList)
    this.setData({ goodsList: data })
  },
  //手指触摸中
  touchmove(e) {
    let data = this.touch._touchmove(e, this.data.goodsList)
    this.setData({ goodsList: data })
  },
  //点击删除多个
  delete() {
    tool.showModal('删除', '确认要删除这些商品么？', '取消,#999', '删除,#D73F45').then(res => {
      if (res) {
        this.data.goodsList.forEach((item, index) => {
          item.isSelect && this.data.goodsList.splice(index, 1)
        })
        this.setData({ goodsList: this.data.goodsList })
        tool.alert('删除成功')
        this.setData({ loadMoreType: this.data.goodsList.length == 0 ? 0 : 2 })
        this.calcPrize()
      }
    })
  },
  //点击删除单个
  del(e) {
    tool.showModal('删除', '确认要删除此条商品么？', '取消,#999', '删除,#D73F45').then(res => {
      if (res) {
        this.data.goodsList.splice(e.currentTarget.dataset.index, 1)
        this.setData({ goodsList: this.data.goodsList })
        tool.alert('删除成功')
        this.setData({ loadMoreType: this.data.goodsList.length == 0 ? 0 : 2 })
        this.calcPrize()
      } else {
        this.touchstart(this.currentE)
      }
    })
  },
  //跳转商品详情页
  jump(e) {
    tool.jump_nav(`${this.data.goodsDetailsUrl}${this.data.goodsList[e.currentTarget.dataset.index].id}`)
  }
})