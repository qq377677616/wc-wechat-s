const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      resourcePackageUrl: 'https://www.echartsjs.com/zh/builder.html',//echarts.min.js官方在线构建打包地址
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    charts: [{
      id: 'bar',
      name: '柱状图'
    }, {
      id: 'pie',
      name: '饼图'
    }, {
      id: 'line',
      name: '折线图'
    }, {
      id: 'radar',
      name: '雷达图'
    }, {
      id: 'map',
      name: '中国地图'
    }],
    chartsWithoutImg: [{
      id: 'lazyLoad',
      name: '延迟加载图表'
    }, {
      id: 'move',
      name: '页面不阻塞滚动'
    }, {
      id: 'saveCanvas',
      name: '保存 Canvas 到本地文件'
    }]
  },

  onReady() {
  },

  open: function (e) {
    console.log('e', e)
    console.log('url', '../' + e.target.dataset.chart.id + '/index')
    wx.navigateTo({
      url: '/subpackagesA/wx-charts/' + e.target.dataset.chart.id + '/index'
    })
  }
})
