/**
 * 新版本
 */
import config from '../config'
import Audio from './audio'
const backgroundAudio = (app, isOpen) => { 
  if (!config.BGMCONFIG.open) return
  new Audio(this, {
    global: app,//是否全局，全局后可以通过[getApp().globalData.innerAudioContext]来操作音频
    musicUrl: BGMCONFIG.musicSrc,//音频地址
    autoplay: true,//自动播放
    loop: true,//是否循环播放
    volume: 1,//音量0-1
    obeyMuteSwitch: false,//是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
    onTimeUpdate: false//监听播放进度事件
  }).init()
}
module.exports = {
  backgroundAudio
}
/**
 * 老版本
 * app.js onLaunch
 * // backgroundAudio.backMusic(this, 'https://game.flyh5.cn/resources/game/wechat/szq/ftxiyouji/images/music.mp3')
 */
// const backMusic = (myApp, mp3Url) => {
//   myApp.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
//   let _backgroundAudioManager = myApp.globalData.backgroundAudioManager
//   _backgroundAudioManager.title = '背景音乐1'
//   _backgroundAudioManager.epname = '背景音乐2'
//   _backgroundAudioManager.singer = '背景音乐3'
//   _backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
//   _backgroundAudioManager.src = mp3Url
//   _backgroundAudioManager.onEnded(() => { backMusic(myApp, mp3Url) })
// }
// const audioState = myApp => {
//   let _backgroundAudioManager = myApp.globalData.backgroundAudioManager
//   if (!_backgroundAudioManager || _backgroundAudioManager.paused) {
//     return true
//   } else {
//     return false
//   }
// }
// module.exports = {
//   backMusic,
//   audioState
// }