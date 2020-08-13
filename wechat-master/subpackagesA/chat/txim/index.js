import { jump_nav, chooseImage } from '../../../utils/publics/tool'
import tims from '../../../utils/im/tim.js'
import dayjs from 'dayjs'
let tim;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: 'user0',//用户id
    isShowUserInfo: true//显示隐藏修改昵称头像弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.im_init()//初始化im
  },
  onShow() {
    if (wx.getStorageSync('isZeroClearing') && this.data.dialogueList) { 
      this.zeroClearing(this.data.dialogueList.findIndex(item => item.conversationID == wx.getStorageSync('isZeroClearing')))
      wx.removeStorageSync('isZeroClearing')
    }  
  },
  //初始化im
  im_init() {
    tims.im_init().then((TIM, COS) => {
      this.im_watch(TIM, COS)
    })
  },
  //数据接收监听
  im_watch(TIM, COS) {
    tim = getApp().globalData.tim
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
    tim.login({userID: this.data.userID, userSig: tims.genTestUserSig(this.data.userID).userSig});
  },
  //发送文字消息
  send_message_font() {
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = tim.createTextMessage({
      to: 'user1',
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: 'Hello world!'
      }
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message)
    promise.then(imResponse => {
      // 发送成功
      console.log("【消息发送成功】", imResponse)
    }).catch(imError => {
      // 发送失败
      console.warn("【消息发送失败】", imError)
    });
  },
  // 将某会话下所有未读消息已读上报
  setMessageRead(conversationID){
    return new Promise((resolve, reject) => {
      let promise = tim.setMessageRead({conversationID: conversationID})
      promise.then(function(imResponse) {
        // 已读上报成功
        console.log("【消息已读上报成功】")
        resolve()
      }).catch(function(imError) {
        // 已读上报失败
        reject(imError)
        console.warn('【消息已读上报失败】', imError)
      })
    })
  },
  //未读消息数字清零
  zeroClearing(index) {
    let _dialogueList = this.data.dialogueList
    _dialogueList[index].unreadCount = 0
    this.setData({ dialogueList: _dialogueList })
  },
  //处理时间
  timeProcessing(arr) {
    return arr.map(item => {
      item.lastMessage.lastTime= formatTime(new Date(item.lastMessage.lastTime * 1000))
      return item
    })
    function formatTime(date) {
      if (isToday(date)) {
        return dayjs(date).format('A HH:mm').replace('PM', '下午').replace('AM', '上午')
      }
      return getDate(date)
    }
    function getDate(date, splitor = '/') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
    }
    function isToday(date) {
      return date.toDateString() === new Date().toDateString()
    }
    function addZeroPrefix(number) {
      return number < 10 ? `0${number}` : number
    }
  },
  //上传头像
  chooseImages() {
    chooseImage(1).then(res => {
      tempFilePaths[0]
    })
  },
  //更新个人资料
  updateMyProfile() {
    // 修改个人标配资料
    let promise = tim.updateMyProfile({
      nick: '我的昵称',
      avatar: 'http://game.flyh5.cn/resources/game/wechat/szq/images/avatar.png'
      // gender: TIM.TYPES.GENDER_MALE,
      // selfSignature: '我的个性签名',
      // allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
    })
    promise.then(function(imResponse) {
      console.log("【更新资料成功】", imResponse.data) // 更新资料成功
    }).catch(function(imError) {
      console.warn('【更新资料失败】', imError) // 更新资料失败的相关信息
    })
  },
  //显示隐藏用户信息修改弹窗
  showUserInotModify() {
    this.setData({ isShowUserInfo: !this.data.isShowUserInfo })
  },
  //页面跳转
  jump(e) {
    let _conversationID = this.data.dialogueList[e.currentTarget.dataset.index].conversationID
    jump_nav(`${e.currentTarget.dataset.url}?id=${_conversationID}`)
    this.setMessageRead(_conversationID).then(() => {
      this.zeroClearing(e.currentTarget.dataset.index)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})