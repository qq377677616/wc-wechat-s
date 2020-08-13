import { myRequest } from './request'
import config from '../../config'
export default {
  /**
   ****模板默认接口【勿删】
   */
  //原始方法
  myRequest,
  //核弹系统配置 
  configure: (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=${config.CONFIGURE}`) => { return myRequest(data, url, 'get', true, true) },
  //获取openid
  getOpenid: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/meichang/public/api/oauth/get_session_key') => { return myRequest(data, url, 'post', true, true) },
  //上传头像昵称
  uploadUserInfo: (data, url = '/api/oauth/perfect_info') => { return myRequest(data, url) },
  /**
   ****项目接口
   */
  //手机号解密
  getPhoneNumber: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/meichang/public/api/oauth/de_mobile') => { return myRequest(data, url, 'post', true) },
  //微信步数解密
  getWeRunData: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/meichang/public//api/oauth/de_bushu') => { return myRequest(data, url, 'post', true) },
  //上传base64图片
  uploadBase64: (data, url = '/api/upload/upload_file_base64') => { return myRequest(data, url) },
  //发送订阅消息 
  requestSubscribeMessage: (data, url = '/api/message/send_remind_msg') => { return myRequest(data, url) },
  //获取签名
  getJoinVoIPChatSignature: (data, url = '/api/oauth/encrypt') => { return myRequest(data, url) },
}