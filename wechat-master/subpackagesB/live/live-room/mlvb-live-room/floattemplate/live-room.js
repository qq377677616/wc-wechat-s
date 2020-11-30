Page({
  data: {
      //...
      roomID: '',
      roomName: '',
      beauty: 3,
      muted: false,
      debug: false,
  },
  //...
  onRoomEvent: function(e){
      switch(e.detail.tag){
          case 'roomClosed': {
              //房间已经关闭
              break;
          }
          case 'error': {
              //发生错误
              var code = e.detail.code;
              var detail = e.detail.detail;
              break;
          }
          case 'recvTextMsg': {
              //收到文本消息
              var text = e.detail.detail;
              break;
          }
          case 'requestJoinAnchor': {
              //主播收到来自观众的连麦请求
              var audience = e.detail;
              var name = audience.userName;
              var id = audience.userID;
              // 允许请求
              liveroom.respondJoinReq(true, audience)
              break;
          }
          case 'linkOn': {
              //连麦观众在连麦成功时会收到此通知
              break;
          }
          case 'linkOut': {
              //连麦观众退出连麦时会收到此通知
              break;
          }
      }
  },

onShow: function () {
},

onHide: function () {
},

onRead: function() {
    var liveroom = this.selectComponent("#id_liveroom");
    this.setData({
        roomName: '测试',
    });
  liveroom.start();
},

})