import tool from './publics/tool'
import config from '../config'
export default () => {
  if (!config.APPLYUPDATE) return
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(res => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          tool.showModal('更新提示', '新版本已经准备好，请点击下方按钮重启应用', false, '重启,#81D741').then(() => {
            updateManager.applyUpdate()
          })
        })
        updateManager.onUpdateFailed(() => {
          tool.showModal('重启新版本', '新版本已经上线，请您删除当前小程序，重新搜索打开', false, '好的,#81D741')
        })
      } else {
        console.log("【小程序版本：当前为最新版本】")
      }
    })
  } else {
    tool.showModal('版块过低', '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。', false, '好的,#81D741')
  }
}