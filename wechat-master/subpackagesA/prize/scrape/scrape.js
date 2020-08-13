// pages/pages-list/scrape/scrape.js
import tool from '../../../utils/publics/tool.js'
import Scrape from '../../../utils/scrape.js'
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    canvasWidth: 300,//刮刮乐宽
    canvasHeight: 160,//刮刮乐高
    prize_img: '',//奖品图片
    layer_color: '#ddd',//刮层颜色
    layer_img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_12.png'//刮层图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  onReady() {
    if (this.data.layer_img) {
      tool.getImageInfo(this.data.layer_img).then(res => {
        this.data.layer_img = res.path
        this.scrape()
      })
    } else {
      this.scrape()
    }
  },
  //刮刮乐初始化
  scrape() { 
    this.scrape = new Scrape(this, { 
      width: this.data.canvasWidth,//刮刮乐区域宽度 
      height: this.data.canvasHeight,//刮刮乐区域高度
      range: "50%",//判定阀值 
      size: 5,//手指触摸宽度
      maskColor: this.data.layer_color,//刮层颜色
      layer_img: this.data.layer_img,//刮层图片
      initOk: "scrapeInitOk",//初始化完成回调
      scrapeStart: "scrapeStart",//开始刮回调
      scrapeOk: "scrapeOk"//判定刮完回调
    })
  },
  //刮刮乐初始化OK
  scrapeInitOk() { 
    tool.loading("【刮刮乐初始化】")
    setTimeout(() => {
      console.log("【刮刮乐初始化完成】")
      this.setData({ prize_img: 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_12.jpg' })
      tool.loading_h()
    }, 800)
  },
  //开始刮奖
  scrapeStart() {
    console.log("【开始刮奖】")
  },
  //刮完奖回调
  scrapeOk() {
    let _this = this
    console.log("【刮完Ok】")
    tool.showModal("刮刮乐", "恭喜您刮中100元现金", false, "放进口袋,#CF5673").then(() => {
      tool.loading("刮刮乐重置中")
      setTimeout(() => {
        _this.scrape.init()
        tool.alert("刮刮乐重置成功")
      }, 800)
    })
  }
})