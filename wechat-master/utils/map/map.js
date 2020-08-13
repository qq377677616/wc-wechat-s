const QQMapWX = require('./qqmap-wx-jssdk.min.js')
// const qqmapsdk = new QQMapWX({ key: 'GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ' })
const qqmapsdk = new QQMapWX({ key: '2O6BZ-N3HK6-IQTS3-EEVSR-AGBLQ-UBFKJ' })
import my_Request from '../api/api.js'
let myRequest = my_Request.myRequest
//---------------------------------【微信小程序 API】---------------------------------
//获取当前位置定位1
const getPosition = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//---------------------------------【腾讯位置服务**微信小程序JavaScript SDK】---------------------------------
//获取当前位置定位2
const getPosition2 = () => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      success: res => {//成功后的回调
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
//获取当前位置周边信息
const getCurrentLocation = (lat, lon) => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      // location: '28.208797,112.985326',
      location: `${lat},${lon}`,
      get_poi: 1,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
//路线规划
const getRoute1 = (data) => {
  return new Promise((resolve, reject) => {
    let mode = ['driving', 'walking', 'transit', 'bicycling']
    let _mode = mode[data.mode ? data.mode : '0']
    qqmapsdk.direction({
      mode: _mode,//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      from: data.from,
      to: data.to,
      success(res) {
        console.log(res)
        if (data.mode != 2) {
          var ret = res
          var coors = ret.result.routes[0].polyline, pl = []
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          // console.log(pl)
          resolve({ route: pl, scheme: []})
        } else {
          var ret = res.result.routes[0];
          var count = ret.steps.length;
          var pl = [];
          var coors = [];
          var scheme = [];
          //获取各个步骤的polyline
          for (var i = 0; i < count; i++) {
            if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
              coors.push(ret.steps[i].polyline);
              var _m = 0
              if (ret.steps[i].steps) {
                for (var j = 0; j < ret.steps[i].steps.length; j++) {
                  _m += ret.steps[i].steps[j].distance
                }
              } else {
                _m = ret.steps[i].distance
              }
              console.log("_m_m_m_m_m", _m)
              if (i != count - 1) {
                let _vehicle = ret.steps[i + 1].lines[0].vehicle == 'BUS' ? '公交站' : (ret.steps[i + 1].lines[0].vehicle == 'SUBWAY' ? '地铁站' : '')
                scheme.push({ describe: `步行${_m > 0 ? _m + '米' : ''}到达${_vehicle}【${ret.steps[i + 1].lines[0].geton.title}】`})
              } else {
                scheme.push({ describe: `步行${_m > 0 ? _m + '米' : ''}到达目的地` })
              }
            }
            if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
              coors.push(ret.steps[i].lines[0].polyline);
              if (i != count - 1) {
                let _vehicle = ret.steps[i].lines[0].vehicle == 'BUS' ? '公交车' : (ret.steps[i].lines[0].vehicle == 'SUBWAY' ? '地铁' : '')
                scheme.push({ describe: `乘坐【${ret.steps[i].lines[0].title}】${_vehicle}，从【${ret.steps[i].lines[0].geton.title}】站上车，从【${ret.steps[i].lines[0].getoff.title}】站下车` })
              } else {
                scheme.push({ describe: `从【${ret.steps[i].lines[0].geton.title}】站上车，从【${ret.steps[i].lines[0].getoff.title}】站下车,步行到达目的地` })
              }
            }
          }
          console.log("公交路径规划详情", scheme)
          resolve({ route: pl, scheme: scheme })
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 0; i < coors.length; i++) {
            for (var j = 2; j < coors[i].length; j++) {
              coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
            }
          }
          //定义新数组，将coors中的数组合并为一个数组
          var coorsArr = [];
          for (var i = 0; i < coors.length; i++) {
            coorsArr = coorsArr.concat(coors[i]);
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coorsArr.length; i += 2) {
            pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
          }
          // console.log(pl)
          resolve(pl)
        } 
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
//---------------------------------【腾讯位置服务**WebService API】---------------------------------
//位置服务--定位当前位置
const getLocation3 = (data, url = 'https://apis.map.qq.com/ws/location/v1/ip') => { return myRequest(data, url, 'get', true) }
//位置服务--获取路线规划
const getRoute2 = (data, url = 'https://apis.map.qq.com/ws/direction/v1/driving') => { return myRequest(data, url, 'get', true) }
//位置服务--关键字搜索
const keywordSearch = (data, url = 'https://apis.map.qq.com/ws/place/v1/search') => { return myRequest(data, url, 'get', true) }

module.exports = {
  getPosition,
  getPosition2,
  getLocation3,
  getRoute1,
  getRoute2,
  keywordSearch,
  getCurrentLocation
}