// pages/pages-list/websocket/websocket.js
import tool from '../../utils/publics/tool.js'
//html测试地址  https://dev.flyh5.cn/yinian-answer/chat.html
//心跳对象
let heartCheck = {
  timeout: 10000,
  timeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj)
    return this
  },
  start: function () {
    clearTimeout(this.timeoutObj)
    this.timeoutObj = setTimeout(() => {
      console.log("【心跳一次】")
      wx.sendSocketMessage({ data: JSON.stringify({ type: "pong" })})
    }, this.timeout)
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // websocketUrl: 'wss://dev.flyh5.cn/yinian-answer/websocket/',//websocket地址
    websocketUrl: 'wss://192.168.1.193:8282',//websocket地址
    // websocketUrl: 'ws://121.40.105.37:7272',//websocket地址
    peopleNum: 1,//几v几
    my: '张三丰',//我的昵称
    blueList:[],//已方队伍
    redList: [],//对方队伍
    isGameOver: false,//当前轮游戏是否结束
    myWebsocket: null,//websocket对象
    curTimes: null,//用于计时的定时器
    socketOpen: false,//是否已连接成功
    lockReconnect: false,//是否在重连
    limit: 0,//当前重连次数
    reconnectNumber: 5,//重连次数
    reconnectInterval: 5000,//重连时间间隔
    timer: null,//断开重连定时器
    answerList: [],//所有题目列表
    curIndex: 0,//当前题目索引
    times: 0,//当前答题时间
    maxTime: 10,//每题最大时间
    inter_time: null,//计时定时器
    time_type: 1000//计时类型按 time_type/1000计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //答题
  selected(e) {
    let [_index, _index2] = [e.currentTarget.dataset.selects.split(",")[0], e.currentTarget.dataset.selects.split(",")[1]]
    if (this.data.curIndex < this.data.answerList.length - 1) {
      console.log("本题耗时--->", this.data.times + 's')
      this.send(JSON.stringify({ "type": "answer", 'question_id': this.data.answerList[_index].question_id, 'answer_id': this.data.answerList[_index].answerOptionResponses[_index2].answer_id, 'time': this.data.times }))
    } else {
      console.log("答完了")
    }
  },
  //提交答案
  submitAnswers() {
    
  },
  //计算当前题两个队伍是否答完
  ranksIsOK() {
    let _allList = [...this.data.blueList, ...this.data.redList]
    return _allList.every((item) => {
      return item.is_answer == 1
    })
  },
  //计时
  calcTime() {
    if (this.data.inter_time) {
      clearInterval(this.data.inter_time)
      this.setData({ times: 0})
    }
    this.data.inter_time = setInterval(() => {
      if (this.data.times < this.data.maxTime) {
        let _times = this.data.times
        _times += (this.data.time_type / 1000)
        this.setData({
          times: parseInt(_times)
        })
      } else {
        console.log("本题超时")
        clearInterval(this.data.inter_time)
        if (this.data.curIndex < this.data.answerList.length - 1) {
          let _index = this.data.curIndex
          this.send(JSON.stringify({ "type": "answer", 'question_id': this.data.answerList[_index].question_id, 'answer_id': -1, 'time': -1 }))
        } else {
          console.log("答完了")
        }
      }
    }, this.data.time_type)
  },
  //开始匹配
  start() {
    tool.loading("匹配中")
    setTimeout(() => {
      this.websocket()
      tool.loading_h()
      tool.alert("匹配成功")
    }, 1500)
  },
  //初始化websocket
  websocket() {
    let _this = this
    if (_this.isConnect) return
    _this.isConnect = true 
    _this.myWebsocket = wx.connectSocket({
      url: `${this.data.websocketUrl}`,
      // header: {
      //   'content-type': 'application/json'
      // },
      // protocols: ['protocol1'],
      // method: "GET",
      success: function (e) {
        console.log("【WebSocket 创建成功】", e)
        _this.initWebsocket()
      }
    })
  },
  //创建成功后
  initWebsocket() {
    let _this = this
    let _number = 0
    //监听websocket连接成功
    wx.onSocketOpen(() => {
      console.log("【WebSocket 连接成功】")
      heartCheck.start()
      _this.curTimes = setInterval(() => {
        // console.log(`<连接中...${_number++}s>`)
      }, 1000)
    })
    //监听websocket接收数据
    wx.onSocketMessage(res => {
      let _res = JSON.parse(res.data)
      console.log("【WebSocket 接收数据】", _res)
      if (_res.code == 1000) {//答题结果
        console.log("==答题结果==")
        this.setData({
          blueList: _res.blueList,
          redList: _res.redList
        })
        if (this.ranksIsOK()) {//两方队伍都答完了
          if (_res.is_answer == 2) {
            let score_red = 0, score_blue = 0
            this.data.redList.forEach(item => {
              console.log(item)
              score_red += item.score.totalScore
            })
            this.data.blueList.forEach(item => {
              console.log(item)
              score_blue += item.score.totalScore
            })
            tool.showModal("答题结果", `${score_red > score_blue ? '【红方胜出】' : (score_red < score_blue ? '【蓝方胜出】' : '【平分秋色】')}\r\n红方总成绩:${score_red}分,\r\n蓝方总成线：${score_blue}分`, "好的,#008000", false)
            return
          }
          tool.loading("下一题")
          setTimeout(() => {
            tool.loading_h()
            let [_blueList, _redList, _curIndex] = [this.data.blueList, this.data.redList, this.data.curIndex + 1]
            _blueList.forEach(item => {
              item.is_answer = -1
            })
            _redList.forEach(item => {
              item.is_answer = -1
            })
            this.setData({ 
              curIndex: _curIndex,
              blueList: _blueList,
              redList: _redList
            })
            wx.sendSocketMessage({data: JSON.stringify({ type: "isNext" }) })
            this.calcTime()
          }, 800)
        }
      } else if (_res.code == 1001) {//匹配成功
        console.log("==匹配成功==")
        console.log(_res)
        this.setData({
          blueList: _res.blueList,
          redList: _res.redList
        })
        console.log("blueList", this.data.blueList)
        console.log("redList", this.data.redList)
      } else if (_res.code == 2000) {//返回题目
        console.log("==返回题目==")
        this.calcTime()
        let _answerList = _res.data.answerQuestionResponses
        this.setData({ answerList: _answerList})
        console.log("【题库】")
        console.log(this.data.answerList)
      }
      if (res.data == "pong") {
        console.log("【心跳消息】")
        heartCheck.start()
      } else {
        console.log("【其它消息】")
      }
    })
    //监听websocket断开连接
    wx.onSocketClose(res => {
      console.log("【WebSocket 断开连接】", res)
      clearInterval(_this.curTimes)
      _this.isConnect = false
      _this.reconnect()
    })
    //监听websocket连接失败
    wx.onSocketError(res => {
      console.log("【WebSocket 连接失败】", res)
      _this.isConnect = false
      _this.reconnect()
    })
  },
  //关闭连接
  close() {
    this.isConnect && wx.closeSocket()
  },
  //发送消息
  send(data) {
    console.log("答题情况", data)
    if (!this.isConnect) return
    console.log("点击发送消息")
    wx.sendSocketMessage({
      data: data
    })
  },
  //断开重连
  reconnect() {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    clearTimeout(this.timer)
    if (this.data.limit < this.data.reconnectNumber) {
      console.log(`【WebSocket 第${this.data.limit}连接失败】`)
      this.timer = setTimeout(() => {
        this.websocket()
        this.lockReconnect = false
      }, this.data.reconnectInterval)
      this.setData({
        limit: this.data.limit + 1
      })
    }
  }
})