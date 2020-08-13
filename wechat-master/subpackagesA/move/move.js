// subpackages/move/move.js
import tool from '../../utils/publics/tool'

Page({
  data: {
    bucketList: [//垃圾桶
      { name: "有害垃圾", num: 0 },
      { name: "可回收物", num: 0 },
      { name: "湿垃圾", num: 0 },
      { name: "干垃圾", num: 0 }
    ],
    xy: [141.5, 100]//垃圾初始位置
  },
  //生周——页面加载
  onLoad(options) {
    Promise.all([tool.getDom(".bucket0"), tool.getDom(".bucket1"), tool.getDom(".bucket2"), tool.getDom(".bucket3"), tool.getDom("#box")]).then(res => {
      let xy = []
      for (let i = 0; i < res.length -1; i++) {
        xy.push([res[i][0].left, res[i][0].left + res[i][0].width])
      }
      this.xy = xy
      this.minY = [res[0][0].top, res[0][0].top + res[0][0].height],
      this.boxXy = [res[4][0].width, res[4][0].height]
    })
  },
  //拖拽回调
  bindchange(e) {
    // console.log("e", e)
    let { x, y } = e.detail
    this.curXy = [x + this.boxXy[0] / 2, y + this.boxXy[1]]
    for (let i = 0; i < this.xy.length; i++) {
      if(this.xy[i][0] < this.curXy[0] && this.curXy[0] < this.xy[i][1] && this.curXy[1] > this.minY[0]) {
        this.setData({ curIndex: i + 1 })
        break
      }
      this.setData({ curIndex: 0 }) 
    }
  },
  //释放垃圾
  bindtouchend() {
    if (this.data.curIndex) {
      // tool.alert(`您将垃圾丢进了第${this.data.curIndex}个桶`)
      let bucketList = this.data.bucketList
      ++bucketList[this.data.curIndex - 1].num
      this.setData({ xy: this.data.xy, curIndex: 0, bucketList })
    } else {
      if (this.curXy[1] > this.minY[0]) this.setData({ xy: this.data.xy })
    }
  },
  test() {
    console.log('点击了')
  }
})