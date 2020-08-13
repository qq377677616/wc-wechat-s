// components/showModal/showModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModalOption: {
      type: Object,
      value: {
        isShow: false,
        type: 0,//0为普通确认取消框，1为获取手机号，2为授权
        title: "确认",
        test: "确认要进行当前操作？",
        cancelText: "取消",
        confirmText: "确定",
        color_confirm: '#000'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    operation(e) {
      let options = { confirm : true}
      if (e.currentTarget.dataset.type == 0) {
        options.confirm = false
        this.triggerEvent("operation", options)
      } else if (this.data.showModalOption.type == 0) this.triggerEvent("operation", options)
    },
    getPhoneNumberUserInfo(e) {
      let options = { confirm: true }
      if (e.detail.encryptedData) {
        Object.assign(options, e.detail)
        this.triggerEvent("operation", options)
      } else {
        options.confirm = false
        this.triggerEvent("operation", options)
      }
    }
  }
})
