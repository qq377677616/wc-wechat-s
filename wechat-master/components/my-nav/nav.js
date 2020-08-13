import tool from '../../utils/publics/tool.js'

const navUrl = ["/pages/index/index"]

const navJump = index => {
  if (index == 0) {
    console.log("【无icon】")
  } else if (index == 1) {
    if (getCurrentPages().length <= 1) {
      tool.alert("当前无页面栈，无法返回")
      return
    }
    tool.jump_back()
  } else if (index == 2) {
    tool.jump_red(navUrl[0])
  }
}

module.exports = { navJump }