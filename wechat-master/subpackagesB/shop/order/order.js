import { decimal_place, accAdd, accMul } from '../../../utils/util'
import initComputed from '../../../utils/wxComputed.min'
Page({
  data: {
    label: ["全部", "待付款", "待发货", "待收货"],//标签列表
    labelIndex: 0,//标签索引
    orderList: [//订单列表
      { id: 1, type: 1, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] },
      { id: 2, type: 2, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] },
      { id: 3, type: 3, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] },
      { id: 4, type: 4, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] },
      { id: 5, type: 5, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] },
      { id: 6, type: 6, orders: [{ id: 1, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "68.50", num: 1}, { id: 2, img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/good_02.jpg', name: '焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜焕活骨胶原面膜', other: "310ml", prize: "128.00", num: 2}] }
    ]
  },
  onLoad() {
    initComputed(this)//初始化计算属性
    this.orderCalc()
  },
  //计算属性
  computed: {
    /*待付款列表*/
    unpaidList() {
      return this.data.orderList.filter(item => { return item.type == 1 })
    },
    /*待发货列表*/
    deliverGoodsList() {
      return this.data.orderList.filter(item => { return item.type == 2 })
    },
    /*待收货列表*/
    receiptGoodsList() {
      return this.data.orderList.filter(item => { return item.type == 3 })
    }
  },
  //点击操作订单按钮
  operation(e) {
    let { index, type } = e.currentTarget.dataset
    switch(type) {
      case '1':
        console.log("删除订单")
        break
      case '2':
        console.log("去付款")
        break
      case '3':
        console.log("取消订单")
        break
      case '4':
        console.log("提醒发货")
        break
      case '5':  
        console.log("查看物流")
        break  
      case '6':  
        console.log("确认收货")
        break       
    }
  },
  //订单计算
  orderCalc() {
    let { orderList } = this.data
    orderList.forEach(item => {
      item.numTotal = item.orders.reduce((total, items) => { return (total.num + items.num) })
      item.prizeTotal = item.orders.reduce((total, items) => { return decimal_place(accAdd(accMul(total.num, total.prize), accMul(items.num, items.prize))) })
    })
    this.setData({ orderList })
  },
  //点击选择label
  selectLabel(e) {
    this.setData({ labelIndex: e.currentTarget.dataset.index })
  },
  //swiper切换
  bindchangeSwiper(e) {
    this.setData({ labelIndex: e.detail.current })
  },
  //scroll-view上拉触底
  bindscrolltolower(e) {
    console.log("上拉触底", e.currentTarget.dataset.index)
  }
})