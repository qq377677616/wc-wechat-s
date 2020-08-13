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
      iconPath: ["../icon_01.png", "../icon_02.png", "../icon_03.png", "../icon_04.png", "../icon_05.png", "../icon_06.png"],
    },
    // markers: [],
    // circles: [],  
    // polyline: [],
    busSchemeList: [],
    schemeList: ["驾车", "步行", "公交", "骑行"]
  },
  //页面load
  onLoad() {
    this.getMyPosition()
    this.getLocation()
  },
  //定位当前位置坐标
  getLocation() {
    map.getLocation3({ key: this.data.key }).then(res => {
      console.log("定位当前位置", res)
    })
  },
  //获取当前位置周边信息
  getCurrentLocation(lat, lon) {
    map.getCurrentLocation(lat, lon).then(res => {
      console.log("定位当前位置信息", res)
      this.setData({ currentLocationList: res.result.pois })
    })
  },
  //选择出行方式
  selectScheme(e) {
    this.setData({ schemeListIndex: e.currentTarget.dataset.index })
    let position_start_end = this.data.position_start_end || new Array(0, 0)
    if (position_start_end[1]) {
      this.planningRoute(`${(position_start_end[0] && position_start_end[0].location.lat) || this.data.centerLat || this.data.mapOption.latitude},${(position_start_end[0] && position_start_end[0].location.lng) || this.data.centerLon || this.data.mapOption.longitude}`, `${position_start_end[1].location.lat},${position_start_end[1].location.lng}`)
    } else if (this.data.markerId) {
      this.markertap()
    }
  },
  //关键字搜索
  keywordSearch(keyword) {
    let _data = {
      keyword: keyword,
      boundary: 'region(长沙,1)',
      key: this.data.key
    }
    map.keywordSearch(_data).then(res => {
      // console.log("关键字搜索返回", res)
      if (res.data.status == 0 && res.data.data.length > 0) {
        let _searchList = []
        this.setData({ searchList: res.data.data, isShowSearchList: true })
      } else {
        console.log("res.data", res.data)
        let { message } = res.data
        if (res.data.status == 0) res.data.data.length == 0 && (message = '暂无相关数据，请重新输入')
        tool.alert(message)
        this.setData({ searchList: [], isShowSearchList: false })
      }
    })
  },
  //选择搜索位置
  selectPosition(e) {
    console.log(e)
    let position_start_end = this.data.position_start_end || new Array(0, 0)
    position_start_end[this.data.inputCurrentType] = this.data.searchList[e.currentTarget.dataset.index]
    this.setData({ position_start_end: position_start_end, isShowSearchList: false })
    console.log("position_start_end", this.data.position_start_end)
    // if (this.data.position_start_end.some(item => { return item == 0 })) return
    if (position_start_end[1] == 0) return
    this.planningRoute(`${(position_start_end[0] && position_start_end[0].location.lat) || this.data.centerLat || this.data.mapOption.latitude},${(position_start_end[0] && position_start_end[0].location.lng) || this.data.centerLon || this.data.mapOption.longitude }`, `${ position_start_end[1].location.lat },${ position_start_end[1].location.lng}`)
  },
  //绘制规划路线
  planningRoute(fromPoint, toPoint) {
    tool.loading("路线规划中")
    let _data = {
      from: fromPoint,
      to: toPoint,
      output: "json",
      mode: this.data.schemeListIndex || 0,
      key: this.data.key
    }
    map.getRoute1(_data).then(res => {
      console.log("res", res)
      // let coors = res.data.result.routes[0].polyline
      // console.log(coors)
      // for (var i = 2; i < coors.length; i++) {
      //   coors[i] = coors[i - 2] + coors[i] / 1000000
      // }
      // // console.log(coors)
      // let _points = []
      // for (var i = 0; i < coors.length; i = i + 2) {
      //   _points.push({ latitude: coors[i], longitude: coors[i + 1] })
      // }
      setTimeout(() => {
        tool.loading_h()
        this.setData({ polyline: [{ points: res.route, color: "#4B407C", width: 4, dottedLine: false }], busSchemeList: res.scheme })
        console.log()
      }, 800)
    })
  },
  //获取我当前的位置
  getMyPosition() {
    map.getPosition().then(res => {
      console.log("res", res)
      let _mapOption = this.data.mapOption
      _mapOption.longitude = res.longitude
      _mapOption.latitude = res.latitude
      this.getCurrentLocation(_mapOption.latitude, _mapOption.longitude)
      this.centerPointDraw(_mapOption.latitude, _mapOption.longitude)
      this.setData({ mapOption: _mapOption })
    })
  },
  //在地图标注标点
  setPoint(lat, lon, icon) {
    let _markers = this.data.markers || []
    let _item = {
      id: 0,
      iconPath: icon,
      longitude: lon,
      latitude: lat,
      width: 30,
      height: 30,
      callout: { content: "这是一些文字" }
    }
    _markers.push(_item)
    this.setData({ markers: _markers })
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
        content: "如河南省开封市\n魏都路137号红河\n小区5栋2单元5楼2号",
        bgColor: "#fff",
        color: "#000",
        padding: 10,
        display: "ALWAYS",
        borderRadius: 5
      }
    }
    _markers.push(_item)
    this.setData({ markers: _markers })
    console.log("【markers】", this.data.markers)
    this.setCircles(lat, lon)
    this.randomPoint(lat, lon, 30)
  },
  //在地图上画圆
  setCircles(lat, lon) {
    console.log(lon, lat)
    let circles = [{
      latitude: lat,
      longitude: lon,
      color: '#8BA31F',
      fillColor: '#d1edff88',
      radius: 1000,
      strokeWidth: 1
    }]
    this.setData({ circles })
  },
  //随机产生一批标注点
  randomPoint(lat, lon, num) {
    let _markers= []
    let _maxId = this.data.markers[this.data.markers.length - 1].id + 1
    // let { longitude, latitude } = this.data.mapOption
    for (let i = 0; i < num; i++) {
      console.log()
      let _item = {
        id: _maxId++,
        iconPath: this.data.mapOption.iconPath[1],
        longitude: lon + getRanMathNum(),
        latitude: lat + getRanMathNum(),
        width: 30,
        height: 30
      } 
      _markers.push(_item)
    }
    function getRanMathNum() {
      return (Math.random() * 5 + 1) / 1000 * (Math.random() > .5 ? -1 : 1)
    }
    this.setData({ markers: this.data.markers.concat(_markers)})
    // console.log("markers", this.data.markers)
  },
  //拖拽地图
  regionchange(e) {
    console.log("【拖拽地图触发】", e) 
    console.log("longitude", this.data.longitude)
    console.log("latitude", this.data.latitude)
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      console.log(e)
      let _this = this;
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success(res) {
          console.log("当前地图中心信息", res)
          // _this.data.centerLon = res.longitude
          // _this.data.centerLat = res.latitude
          _this.centerPointDraw(res.latitude, res.longitude)
        }
      })
    }
  },
  //点击地图上标注
  markertap(e) {
    this.setData({ position_start_end: [0, 0] })
    e && (this.data.markerId = e.markerId)
    this.planningRoute(`${this.data.centerLat || this.data.mapOption.latitude},${this.data.centerLon || this.data.mapOption.longitude}`, `${this.data.markers[this.data.markerId].latitude},${this.data.markers[this.data.markerId].longitude}`)
  }, 
  //输入框聚焦
  inputFocus(e) {
    this.setData({ inputCurrentType: e.currentTarget.dataset.type })
  },
  //输入关键字
  bindInput(e) {
    this.keywordSearch(e.detail.value)
  },
  //点击覆盖物
  controltap(e) {
    console.log(e.controlId)
  }
})