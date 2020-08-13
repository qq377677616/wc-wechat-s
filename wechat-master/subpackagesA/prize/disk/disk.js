//index.js
import tool from '../../../utils/publics/tool'
import luckDraw from '../../../utils/luck-draw'
Page({
  data: {
    prizeList: [//奖品池列表[这里是示例，开发时由接口返回]
      { id: 1, name: "5元话费券" },
      { id: 2, name: "iphone X" },
      { id: 3, name: "50元现金红包" },
      { id: 4, name: "谢谢参与" },
      { id: 5, name: "100元代金券" },
      { id: 6, name: "50积分" },
      { id: 7, name: "1000理财金" },
      { id: 8, name: "2积分" }
    ]
  },
  onLoad(){
    this.prizeInit()
  },
  //转盘初始化
  prizeInit() {
    this.data.luckDraw = new luckDraw(this, {
      type: 1,//抽奖类型，1：转盘针转、2：转盘盘转、3为九宫格，默认为1[非必填]
      prizeList: this.data.prizeList,//奖品池列表[必填项]
      duration: 4000,//转动时间，默认为5000[非必填项]
      id: "id"//奖品池列表、抽奖的奖品id字段，默认为'id'[非必填项]
    })
    this.data.luckDraw.init()
  },
  //点击开始抽奖
  start() {
    if (!this.data.isPrize) return
    let randomNum = Math.floor(Math.random() * this.data.prizeList.length)//这里模拟抽奖：随机从奖品池中一个奖品[开发中请求接口获取中奖id]
    let prizeId = this.data.prizeList[randomNum].id
    console.log(`中【${this.data.prizeList[randomNum].name}】`)
    this.data.luckDraw.start(prizeId).then(res => {
      if (res.status == 1) {
        tool.showModal("抽奖结果", this.data.prizeList[randomNum].name, false, "好的,#00B26A")
      } else if (res.status == 0){
        tool.alert("您手速太快了~")
      } else if (res.status == -1){
        tool.showModal("抽奖异常", "抽奖异常,请检查抽奖传入的id字段和奖品池id字段是否匹配", false, "好的,#00B26A" )
      }
    })
  }
})
