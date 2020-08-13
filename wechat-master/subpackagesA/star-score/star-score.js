// pages/pages-list/star-score/star-score.js
Page({

  data: {
    starOption: {
      type: 5,//几颗星
      width: 80,//星星大小
      spacing: 20,//星星间距
      score: 3.5//默认分数
    }
  },
  curStar(e) {
    console.log("当前星星评分--->", e.detail.star)
    let _starOption = this.data.starOption
    _starOption.score = e.detail.star
    this.setData({ starOption: _starOption})
  }
})