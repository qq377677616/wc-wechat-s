import tool from '../../utils/publics/tool.js'
const wxPano = requirePlugin("wxPano")

Page({
  data: {
    krpanoList: [
      'https://img.vrupup.com/web/szq/images/krpano_01.jpg',
      'https://img.vrupup.com/web/szq/images/krpano_02.jpg',
      'https://img.vrupup.com/web/szq/images/krpano_03.jpg',
      'https://img.vrupup.com/web/szq/images/krpano_04.jpg'
    ]
  },
  onReady() {
    tool.loading("全景加载中")
    wxPano.onReady = () => { //wxPano初始化完成后会触发此事件
      tool.loading_h()
      tool.alert("全景加载成功")
    }
    wxPano.config({
      panolist: [{
        name: "xindamen",
        // src: this.data.krpanoList[Math.floor(Math.random() * 4)],
        src: 'https://img.vrupup.com/web/szq/images/krpano_01.jpg',
        infospots: [ //信息标记
          {
            type: "modal",
            modal: {
              title: "wxPano",
              content: "欢迎使用wxPano"
            },
            position: { x: 0.092, y: 0.434 },
            size: 1,
            icon: "info",
            bindcamera:true,
            bindsize: 0.5,
            bindicon: "info",
            bindopacity:0.75,
            bindposition: { x: 0.5, y: 0.75 }
          },
          {
            type: "page",
            page: function () {
              wx.navigateTo({
                url: "ar",
                success(evt) {
                  console.log(evt);
                }
              })
            },
            position: { x: 0.437, y: 0.447 },
            size: 1,
            icon: "info"
          }
        ]
      }],
      request:wx.request,
      loader:"GLLoader",
      entryname:"xindamen"})
  },
  covertap: function () {
    var panoId = wxPano.addPano({
      name: "dongdamen",
      src: 'https://www.aiotforest.com/pano-1-2048-1024.jpg',
      infospots: [{
        type: "pano",
        entryname: "xindamen",
        position: { x: 0.695, y: 0.503 },
        size: 1,
        icon: "arrow"
      }, {
        type: "modal",
        modal: {
          title: "东大门",
          content: "对面有公交站和唐家湾轻轨站"
        },
        position: { x: 0.092, y: 0.434 },
        size: 1,
        icon: "info"
      }]
    })
    wxPano.navigateMethod({
      type: "pano",
      entryname: "dongdamen"
    });
  },
  setCameraLookAt() {
    wxPano.setCameraLookAt({
      x: 0.5, y: 0.5
    })
  },
  enableTouch() {
    wxPano.enableTouch()
  },
  disableTouch() {
    wxPano.disableTouch()
  },
  getPanoInfo() {
    console.log(wxPano.getPanoInfo())
  }
})