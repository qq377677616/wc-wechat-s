//index.js
import login from '../../utils/api/login'
Page({
  data: {

  },
  onLoad(options) {
    //静默登录
    login.login().then(res => {
      console.log("【静默登录成功】", res)
      //在这里做页面初始化请求操作，可保证本地缓存中有用户的openid/userId
    }).catch(err => {
      console.log("【静默登录失败】", err)
    })
  }
})
