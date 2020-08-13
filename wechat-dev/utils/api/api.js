import { myRequest } from './request'
import  config  from '../../config'
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
  //获取签名[示例--可删]
  getJoinVoIPChatSignature: (data, url = '/api/oauth/encrypt') => { return myRequest(data, url) }
}