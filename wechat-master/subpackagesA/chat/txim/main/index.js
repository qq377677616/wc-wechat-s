// pages/pages-list/chat/txim/main/index.js
import TIM from 'tim-wx-sdk'
import { decodeElement } from '../../../../utils/im/decodeElement'
import { getDom, alert, previewImage } from '../../../../utils/publics/tool'
import { isSettingScope, openSetting } from '../../../../utils/publics/authorization'
import { emojiName, emojiMap, emojiUrl } from '../../../../utils/im/emojiMap'
const audioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
const recordOptions = {
  duration: 60000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
}
// import COS from "cos-wx-sdk-v5"
// import { genTestUserSig } from '../../../../utils/im/GenerateTestUserSig'
// import dayjs from 'dayjs'
let tim;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toolList: [{ title: "图片", icon: "icon-tupian" }, { title: "拍照", icon: "icon-post_pic" }, { title: "视频", icon: "icon-shipin-tianchong" }, { title: "视频通话", icon: "icon-shipin" }],
    toolType: 0,//工具栏状态 0为正常状态，1为表情包栏状态，2为工具栏状态
    emojisType: 0,//表情栏状态
    paddingBottom: 0,//页面撑起底部
    isRecording: false,//是否为录音准备状态
    isRecordings: true,//是否正在录音
    isSend: true,//是否显示发送按钮
    inputText: '',//输入框文字
    inputsType: 0,//输入框和录音按钮切换
    bigEmoji: ['tt01', 'tt02', 'tt03', 'tt04', 'tt05', 'tt06', 'tt07', 'tt08', 'tt09', 'tt10', 'tt11', 'tt12', 'tt13', 'tt14', 'tt15', 'tt16'],
    faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/'//图片表情的域名url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleOptions(options)
    this.im_init()
    this.recorderManagerInit()
  },
  //路由传参处理
  handleOptions(options) {
    this.setData({ pageOptions: options })
  },
  //input输入
  bindinput(e) {
    this.setData({ inputText: e.detail.value })
  },
  im_init() {
    tim = getApp().globalData.tim
    this.getConversationProfile()
    this.setData({
      emojiName: emojiName, 
      emojiMap: emojiMap, 
      emojiUrl: emojiUrl
    })
  },
  getConversationProfile() {
    console.log("eeeee", tim)
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
      console.log("【单聊、群聊、群提示、群系统通知222】", event)
      this.updateMessageList([...this.data.messageList, ...event.data])
      this.setMessageRead(event.data[0].conversationID)
      wx.setStorageSync('isZeroClearing', event.data[0].conversationID)
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    });
    // 打开某个会话时，第一次拉取消息列表
    let promise = tim.getMessageList({conversationID: this.data.pageOptions.id, count: 15});
    promise.then(imResponse => {
      console.log("imResponse", imResponse)
      // const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      this.updateMessageList(imResponse.data.messageList)
      wx.setNavigationBarTitle({ title: imResponse.data.messageList[0].flow == 'out' ? imResponse.data.messageList[0].to : imResponse.data.messageList[0].from })
      // this.setData({ messageList:  imResponse.data.messageList})
      // this.pageScrollToBottom()
    }); 
  },
  //更新消息列表
  updateMessageList(messageList) {
    this.setData({ messageList:  this.handleTIMTextElem(messageList)})
    this.pageScrollToBottom()
    console.log("【最新消息列表】", this.data.messageList)
  },
  //发送文字消息
  send_message_font() {
    // 发送文本消息，Web 端与小程序端相同
    console.log("tim", tim)
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = tim.createTextMessage({
      to: 'user1',
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: this.data.inputText
      }
    })
    this.sends(message)
  },
  //发送消息
  sends(message) {
    // 2. 发送消息
    let promise = tim.sendMessage(message)
    this.setData({ inputText: "" })
    promise.then(imResponse => {
      // 发送成功
      console.log("【消息发送成功】", imResponse)
      this.updateMessageList([...this.data.messageList, imResponse.data.message])
    }).catch(imError => {
      // 发送失败
      console.warn("【消息发送失败】", imError)
    });
  },
  //发送其它信息
  send_other(e) {
    let _index = e.currentTarget.dataset.index
    if (_index == 0) {
      this.send_image('album')
    } else if (_index == 1) {
      this.send_image('camera')
    } else if (_index == 2) {
      this.send_video()
    } else if (_index == 3) {
      alert("暂未开放，敬请期待")
    }
  },
  //发送图片消息
  send_image(type) {
    // 1. 选择图片
    wx.chooseImage({
      sourceType: [type], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: res => {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createImageMessage({
          to: 'user1',
          conversationType: TIM.TYPES.CONV_C2C,
          payload: { file: res },
          onProgress: function(event) { console.log('file uploading:', event) }
        });
        this.sends(message)
      }
    })
  }, 
  //发送视频消息
  send_video() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // 来源相册或者拍摄
      maxDuration: 60, // 设置最长时间60s
      camera: 'back', // 后置摄像头
      success: res => {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createVideoMessage({
          to: 'user1',
          conversationType: TIM.TYPES.CONV_C2C,
          payload: { file: res }
        })
        this.sends(message)
      }
    })
  },
  //发送音频消息
  send_video_recording() {
    isSettingScope('scope.record').then(res => {
      console.log("'scope.record'", res)
      if (res.status == -1) {
        console.log("发起第一次用户录音授权")
      } else if (res.status == 0) {
        alert('请点击"按住 说话"进行录音授权')
      } else {
        this.setData({ isRecordings: false })
        recorderManager.start(recordOptions)
      }
    })
  },
  //打开系统授权设置界面
  openSettings() {
    isSettingScope('scope.record').then(res => {
      if (res.status !== 1) {
        openSetting().then(res => {
          console.log("res", res)
          if (res.authSetting['scope.record']) {
            console.log('成功授权录音')
          } else { alert('授权失败') }
        })
      }
    })
  },
  //松开录音
  handleTouchEnd () {
    this.setData({ isRecordings: true })
    // wx.hideLoading()
    recorderManager.stop()
  },
  //音频相关
  recorderManagerInit() {
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop')
      wx.hideLoading()
      // if (this.canSend) {
        if (res.duration < 1000) {
          this.$store.commit('showToast', {
            title: '录音时间太短'
          })
        } else {
          console.log("发送音频消息成功")
          // 4. 创建消息实例，接口返回的实例可以上屏
          const message = tim.createAudioMessage({
            to: 'user1',
            conversationType: TIM.TYPES.CONV_C2C,
            payload: {
              file: res
            }
          })
          this.sends(message)
        }
      // }
    })
  },
  //发送表情消息
  send_emoji(e) {
    console.log("eeeee", e)
    if (e.currentTarget.dataset.type == 0) {
      this.setData({ inputText: this.data.inputText + e.currentTarget.dataset.emoji })
      return
    }
    // 发送表情消息，Web端与小程序端相同。
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = tim.createFaceMessage({
      to: 'user1',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        index: 1, // Number 表情索引，用户自定义
        data: e.currentTarget.dataset.emoji // String 额外数据
      }
    })
    this.sends(message)
  },
  //表情处理
  handleTIMTextElem(messageList) {
    for (let i = 0; i< messageList.length; i++) {
      messageList[i].virtualDom = decodeElement(messageList[i])
    }
    return messageList
  },
  //切换输入类型状态
  switchInputsType() {
    this.setData({ isRecording: !this.data.isRecording })
    if (this.data.isRecording) this.setData({ toolType: 0 })
  },
  //切换表情栏
  switchEmojiType(e) {
    this.setData({ emojisType: e.currentTarget.dataset.type })
  },
  //切换操作栏状态
  switchToolType(e) {
    let { type } = e.currentTarget.dataset
    if (this.data.toolType != 0) {
      if (type == this.data.toolType) {
        this.setData({ toolType: 0 })
        return
      }
    }
    if (type == 1) this.setData({ isRecording: false })
    this.setData({ toolType: type })
    this.showPageBottom()
    this.pageScrollToBottom()
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
  //获取底部操作栏的高度，使消息内容全部显示
  showPageBottom(){
    getDom("#controls").then(res => {
      this.setData({ paddingBottom: res[0].height })
    })  
  },
  //获取容器高度，使页面滚动到容器底部
  pageScrollToBottom() {
    this.showPageBottom()
    getDom("#page").then(res => {
      wx.pageScrollTo({ scrollTop: res[0].height })
    })
  },
  //预览图片
  previewImage(e) {
    previewImage([e.currentTarget.dataset.url], e.currentTarget.dataset.url)
  },
  //播放音频
  openAudio(e) {
    console.log("e.currentTarget.dataset.payload", e.currentTarget.dataset.payload)
    let { messageList: _messageList } = this.data
    let { index: _index, payload: _payload } = e.currentTarget.dataset
    _messageList.map(item => { return item.payload.isAudioPlay = false })
    _messageList[_index].payload.isAudioPlay = true
    audioContext.src = _payload.url
    audioContext.play()
    audioContext.onPlay(() => {
      console.log("开始播放")
      this.setData({ messageList: _messageList })
    })
    audioContext.onEnded(() => {
      _messageList[_index].payload.isAudioPlay = false
      this.setData({ messageList: _messageList })
      console.log("播放完毕")
    })
    audioContext.onError(() => {
      alert('小程序暂不支持播放该音频格式')
    })
  }
})