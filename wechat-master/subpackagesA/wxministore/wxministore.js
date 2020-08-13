// subpackages/wxministore/wxministore.js
Page({
  useStore: true,//开启全局状态管理库
  data: {
    // isUseShare: true
  },
  onLoad(options) {
    console.log("this.data.$store", this.data.$state)
    console.log("getApp().store.getState()",  getApp().store.getState())
    // setTimeout(() => {
    //   // let { family } = getApp().store.$state
    //   let { family } = getApp().store.getState()
    //   family.name = '77777'
    //   getApp().store.setState({ family })
    // }, 2000)
  },
  //更新状态
  updataState() {
    if (this.data.disClick) return
    this.setData({ disClick: true })
    let app = getApp()
    let { name, address, age, family } = getApp().store.getState()
    let times = 600
    setTimeout(() => {
      app.store.setState({ name: '张三三' }) 
    }, 0)
    setTimeout(() => {
      app.store.setState({ address: '湖南省长沙市开福区' }) 
    }, times * 1)
    setTimeout(() => {
      age = 28
      app.store.setState({ age }) 
    }, times * 2)
    setTimeout(() => {
      family.name = '张四四'
      app.store.setState({ family }) 
    }, times * 3)
    setTimeout(() => {
      family.address = '湖南省长沙市天心区'
      app.store.setState({ family }) 
    }, times * 4)
    setTimeout(() => {
      family.age = 30
      app.store.setState({ family }) 
    }, times * 5)
  },
  onShareAppMessage() {}
})