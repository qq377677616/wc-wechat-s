import { myRequest } from './request'
import config from '../../config'
export default {
  /**
   ****项目接口
   */
  //原始方法
  myRequest,
  //微信步数解密
  getWeRunData: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/meichang/public/api/oauth/de_bushu') => { return myRequest(data, url, 'post', true) },
  //上传base64图片
  uploadBase64: (data, url = '/api/upload/upload_file_base64') => { return myRequest(data, url) },
  //发送订阅消息
  requestSubscribeMessage: (data, url = '/api/message/send_remind_msg') => { return myRequest(data, url) },
  //获取签名
  getJoinVoIPChatSignature: (data, url = '/api/oauth/encrypt') => { return myRequest(data, url) },
  //领取会员卡到微信卡包
  getVipCard: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/good100/public/api/card/get_card') => { return myRequest(data, url, 'post', true) }
}