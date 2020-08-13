// pages/pages-list/map/my-map/index.js
import api from '../../../utils/api/api.js'
import map from '../../../utils/map/map.js'
import tool from '../../../utils/publics/tool.js'
Page({
  data: {
    key: "GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ",
    mapOption: {
      mapId: "map",
      longitude: '',
      latitude: '',
      centerLon: '',
      centerLat: '',
      scale: 15,
      iconPath: ["../icon_01.png", "../icon_02.png"],
    }
  },
  //页面load
  onLoad() {
    this.getMyPosition()
  },
  //获取我当前的位置
  getMyPosition() {
    map.getPosition().then(res => {
      let _mapOption = this.data.mapOption
      _mapOption.longitude = res.longitude
      _mapOption.latitude = res.latitude
      this.centerPointDraw(_mapOption.latitude, _mapOption.longitude)
      this.setData({ mapOption: _mapOption })
    })
  },
  //在当前中心点绘制范围内的标注
  centerPointDraw(lat, lon) {
    let _markers = []
    let _item = {
      id: 0,
      iconPath: this.data.mapOption.iconPath[0],
      longitude: lon,
      latitude: lat,
      width: 30,
      height: 30,
      callout: {
        content: "我的位置",
        bgColor: "#fff",
        color: "#000",
        padding: 10,
        display: "ALWAYS",
        borderRadius: 5
      }
    }
    _markers.push(_item)
    this.setData({ markers: _markers })
    this.randomPoint(lat, lon, 30)
  },
  //随机产生一批标注点
  randomPoint(lat, lon, num) {
    let _markers = []
    let _maxId = this.data.markers[this.data.markers.length - 1].id + 1
    for (let i = 0; i < num; i++) {
      let _item = {
        id: _maxId++,
        iconPath: this.data.mapOption.iconPath[1],
        longitude: lon + getRanMathNum(),
        latitude: lat + getRanMathNum(),
        width: 30,
        height: 30,
        callout: {
          content: "如河南省开封市\n魏都路137号红河\n小区5栋2单元5楼2号",
          bgColor: "#fff",
          color: "#000",
          padding: 10,
          display: "BYCLICK",
          borderRadius: 5
        }
      }
      _markers.push(_item)
    }
    function getRanMathNum() {
      return (Math.random() * 5 + 1) / 1000 * (Math.random() > .5 ? -1 : 1)
    }
    this.setData({ markers: this.data.markers.concat(_markers) })
  },
  //点击标记点事件
  markertap(e) {
    console.log("e", e)
  }
})