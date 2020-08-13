import Machine from "../../../utils/tiger"
import tool from "../../../utils/publics/tool"

Page({
  data: {
    
  },
  onLoad() {
    this.tigerInit()
  },
  //老虎机初始化
  tigerInit() {
    this.machine = new Machine(this, {
      ele: '.machine_item_wp',
      latticeNum: 3,//轨道数,取值：1-5
      lattice: 4,//奖品种类数
      valueInit: [0, 0, 0, 0, 1],//初始位置
      sRange: 8,//滚动圈数
      duration: 30,//滚动速率比
      speed: [18, 28, 10],//滚动速率步长[起, 中, 停]
      asyncTime: 200,//轨道之间异步时间    
      debug: false//是否打开数字索引调试模式 
    })
    this.machine.init()
  },
  //点击开始抽奖
  onStart() {
    this.machine.start([1, 2, 1]).then(() => {
      console.log("抽奖完成")
    })
  }
})