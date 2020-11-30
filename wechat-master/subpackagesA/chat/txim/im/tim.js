import TIM from 'tim-wx-sdk'
import COS from "cos-wx-sdk-v5"
import { genTestUserSig } from './GenerateTestUserSig'
import dayjs from 'dayjs'
let app = getApp()
class Tims{
  constructor(app){
    this.app = app
  }
  init(){
    console.log("this.app", this.app)
    setTimeout(() => {
      console.log("888888")
      this.app.globalData.tims.a = 8
      console.log("this.app2", this.app)
    }, 7000)
  } 
}
const im_init = () => {
  return new Promise((resolve, reject) => {
    let options = {
      SDKAppID: 1400268829 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    }
    // const _SECRETKEY = '8c58bb8594c415330020b8dc2dd811ee9414f59a291a9613ceae714e065d9f85';
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    app.globalData.tim = TIM.create(options); // SDK 实例通常用 tim 表示
    
    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    app.globalData.tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    
    // 注册 COS SDK 插件
    app.globalData.tim.registerPlugin({'cos-wx-sdk': COS})
    resolve(TIM, COS)
    // this.im_watch(tim)
  })
}
const im_watch = tim => {
  // 监听事件，如：
  tim.on(TIM.EVENT.SDK_READY, function(event) {
    console.log("【离线消息】", event)
    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
    // event.name - TIM.EVENT.SDK_READY
  });

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
    console.log("【单聊、群聊、群提示、群系统通知】", event)
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
    // event.name - TIM.EVENT.MESSAGE_RECEIVED
    // event.data - 存储 Message 对象的数组 - [Message]
  });

  tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event) {
    console.log("【消息被撤回的通知】", event)
    // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或以上。
    // event.name - TIM.EVENT.MESSAGE_REVOKED
    // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
  });

  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
    console.log("【会话列表更新通知】", event)
    // this.setData({ dialogueList: event.data })
    this.setData({ dialogueList: this.timeProcessing(JSON.parse(JSON.stringify(event.data))) })
    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    // event.data - 存储 Conversation 对象的数组 - [Conversation]
  });

  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
    console.log("【群组列表更新通知】", event)
    // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
    // event.name - TIM.EVENT.GROUP_LIST_UPDATED
    // event.data - 存储 Group 对象的数组 - [Group]
  });

  tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function(event) {
    console.log("【新的群系统通知】", event)
    // 收到新的群系统通知
    // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
    // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
    // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
  });

  tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
    console.log("【自己或好友的资料变更通知】", event)
    // 收到自己或好友的资料变更通知
    // event.name - TIM.EVENT.PROFILE_UPDATED
    // event.data - 存储 Profile 对象的数组 - [Profile]
  });

  tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
    console.log("【黑名单列表更新通知】", event)
    // 收到黑名单列表更新通知
    // event.name - TIM.EVENT.BLACKLIST_UPDATED
    // event.data - 存储 userID 的数组 - [userID]
  });

  tim.on(TIM.EVENT.ERROR, function(event) {
    console.log("【SDK 发生错误通知】", event)
    // 收到 SDK 发生错误通知，可以获取错误码和错误信息
    // event.name - TIM.EVENT.ERROR
    // event.data.code - 错误码
    // event.data.message - 错误信息
  });

  tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
    console.log("【SDK 进入 not ready 状态通知】", event)
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    // event.name - TIM.EVENT.SDK_NOT_READY
  });

  tim.on(TIM.EVENT.KICKED_OUT, function(event) {
    console.log("【被踢下线通知】", event)
    // 收到被踢下线通知
    // event.name - TIM.EVENT.KICKED_OUT
    // event.data.type - 被踢下线的原因，例如 :
    //   - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
    //   - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
    //   - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢（v2.4.0起支持）。
  });

  tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
    console.log("【网络状态发生改变】", event)
    // 网络状态发生改变（v2.5.0 起支持）。
    // event.name - TIM.EVENT.NET_STATE_CHANGE
    // event.data.state 当前网络状态，枚举值及说明如下：
    //   - TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
    //   - TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
    //   - TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
  });
  // 开始登录
  tim.login({userID: this.data.userID, userSig: genTestUserSig(this.data.userID).userSig});
}
module.exports = {
  im_init,
  genTestUserSig
}