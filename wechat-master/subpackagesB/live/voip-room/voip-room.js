// subpackagesA/live/voip-room/voip-room.js
import util from '../../../utils/publics/util'
import { login } from '../../../utils/api/login'
import CryptoJS from './crypto-js'
import tool from '../../../utils/publics/tool'
import auth from '../../../utils/api/authorization'
import api from '../../../utils/api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // group_id: `${parseInt(util.getDate().timeStamp / 1000)}_${util.getRandomNum(1000000, 9999999)}`,
    openIdList: [],//房间列表
    myOpenid: 'oowjy5J-6WgxvYENhHuuF59pWy-c'//我的openid
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSessionKey()
  },
  //获取session_key
  getSessionKey() {
    this.setData({ userInfo: tool.storage('userInfo') })
    auth.isCheckSession(res => {
      login(true).then(res => {
        this.joinVoIPChat(res.session_key)
      })
    })
  },
  //加入/创建房间中
  async joinVoIPChat(session_key) {
    tool.loading("加入/创建房间中")
    let wxConfig = await tool.getWxConfig()
    let appId = wxConfig.accountInfo.appId
    api.getJoinVoIPChatSignature({ session_key: session_key, app_id: appId, type: this.data.userInfo.openid == this.data.myOpenid ? 1 : 0}).then(res => {
      console.log("【获取签名返回】", res)
      let { param, sign: signature } = res.data.data
      console.log('【param】', param)
      console.log('【signsignsign】', signature)
      wx.joinVoIPChat({
        roomType: 'video',//房间类型:voice--音频房间，video--视频房间
        signature: signature,
        nonceStr: param.nonce_str,
        timeStamp: parseInt(param.timestamp),
        groupId: param.group_id,//小游戏内此房间/群聊的 ID。同一时刻传入相同 groupId 的用户会进入到同个实时语音房间。
        success: res => {
          this.onVoIPChatMembersChanged()
          tool.alert("房间创建/加入成功", 1500, true)
          console.log("房间创建成功", res)
          console.log("房间号", param.group_id)
          this.setData({ openIdList: res.openIdList })
          console.log("this.data.openIdList", this.data.openIdList)
        },
        fail: err => {
          tool.alert("房间创建/加入失败")
          console.log("房间创建失败", err)
          console.log("房间号", param.group_id)
        }
      })
    })
  },
  //监听实时语音通话成员在线状态变化事件。有成员加入/退出通话时触发回调
  onVoIPChatMembersChanged() {
    wx.onVoIPChatMembersChanged(res => {
      console.log("成员加入/退出", res)
      if (res.openIdList.length < 3) {
        this.setData({ openIdList: res.openIdList })
      } else {
        wx.subscribeVoIPVideoMembers({
          openIdlist: res.openIdList,
          success: res => {
            this.setData({ openIdList: res.openIdList })
          },
          fail: err => {
            console.log("err", err)
            tool.alert("您拒绝了订阅")
          }
        })
      }
    })
  },
  //获取计算签名的字符串
  async getSignatureStr(groupId, nonceStr, timeStamp) {
    let res = await tool.getWxConfig()
    let appId = res.accountInfo.appId
    return [appId, groupId, nonceStr, timeStamp].sort().join('')
  }
})