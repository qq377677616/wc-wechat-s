import * as echarts from '../ec-canvas/echarts'
import geoJson from './mapData'

let chart = null//图表实例
const app = getApp(); 

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  echarts.registerMap('henan', geoJson);

  const option = {
    tooltip: {
      trigger: 'item'
    },
    triggerEvent: false,
    visualMap: {//颜色比例尺
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: false,
      inRange: {
        color: ['yellow', 'orangered']
      },
      show: false
    },
    toolbox: {//右侧视距视图、还原、下载
      orient: 'vertical',
      left: 'right',
      top: 'center',
      show: false,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      type: 'map',
      mapType: 'henan',
      label: {
        normal: {//每个省市名字
          show: true,
          fontSize: 8,
          verticalAlign: 'middle'
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#389BB7',//省市版块轮廓线条颜色
          areaColor: 'purple',
          areaStyle: {
            color: '#f3f3f3',//默认的地图板块颜色
          }
        },
        emphasis: {//点击后板块的样式
          areaColor: 'purple',
          borderWidth: 0
        }
      },
      animation: true,
      data: [
        { name: "南海诸岛", value: 10 },
        { name: '北京', value: 10 },
        { name: '天津', value: 10 },
        { name: '上海', value: 10 },
        { name: '重庆', value: 10 },
        { name: '河北', value: 10 },
        { name: '河南', value: 10 },
        { name: '云南', value: 10 },
        { name: '辽宁', value: 10 },
        { name: '黑龙江', value: 10 },
        { name: '湖南', value: 50 },
        { name: '安徽', value: 10 },
        { name: '山东', value: 10 },
        { name: '新疆', value: 10 },
        { name: '江苏', value: 10 },
        { name: '浙江', value: 10 },
        { name: '江西', value: 10 },
        { name: '湖北', value: 10 },
        { name: '广西', value: 10 },
        { name: '甘肃', value: 10 },
        { name: '山西', value: 10 },
        { name: '内蒙古', value: 10 },
        { name: '陕西', value: 10 },
        { name: '吉林', value: 10 },
        { name: '福建', value: 10 },
        { name: '贵州', value: 10 },
        { name: '广东', value: 10 },
        { name: '青海', value: 10 },
        { name: '西藏', value: 10 },
        { name: '四川', value: 10 },
        { name: '宁夏', value: 10 },
        { name: '海南', value: 10 },
        { name: '台湾', value: 10 },
        { name: '香港', value: 10 },
        { name: '澳门', value: 10 }
      ]
    }]
  };
  chart.setOption(option);
  return chart;
}
// function 10 {
//   return Math.round(Math.random() * 1000);
// }
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  onLoad() {
    console.log("chart", chart)
    setTimeout(() => {
      console.log("chart", chart)
      chart.setOption({
        series: [{
          type: 'map',
          mapType: 'henan',
          label: {
            normal: {//每个省市名字
              show: true
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          // itemStyle: {
          //   normal: {
          //     borderColor: '#389BB7',
          //     areaColor: '#fff',
          //   },
          //   emphasis: {
          //     areaColor: '#389BB7',
          //     borderWidth: 0
          //   }
          // },
          animation: true,
          data: [
            { name: "南海诸岛", value: 60 },
            { name: '北京', value: 10 },
            { name: '天津', value: 10 },
            { name: '上海', value: 10 },
            { name: '重庆', value: 10 },
            { name: '河北', value: 10 },
            { name: '河南', value: 10 },
            { name: '云南', value: 10 },
            { name: '辽宁', value: 10 },
            { name: '黑龙江', value: 10 },
            { name: '湖南', value: 50 },
            { name: '安徽', value: 10 },
            { name: '山东', value: 10 },
            { name: '新疆', value: 100 },
            { name: '江苏', value: 10 },
            { name: '浙江', value: 10 },
            { name: '江西', value: 10 },
            { name: '湖北', value: 10 },
            { name: '广西', value: 10 },
            { name: '甘肃', value: 10 },
            { name: '山西', value: 10 },
            { name: '内蒙古', value: 10 },
            { name: '陕西', value: 10 },
            { name: '吉林', value: 10 },
            { name: '福建', value: 10 },
            { name: '贵州', value: 10 },
            { name: '广东', value: 10 },
            { name: '青海', value: 10 },
            { name: '西藏', value: 10 },
            { name: '四川', value: 10 },
            { name: '宁夏', value: 10 },
            { name: '海南', value: 10 },
            { name: '台湾', value: 10 },
            { name: '香港', value: 10 },
            { name: '澳门', value: 10 }
          ]
        }]
      });
    }, 2000)
  }
});
