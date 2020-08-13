import tool from './publics/tool.js'
let touchStartX = 0//触摸时的原点 
let touchStartY = 0//触摸时的原点 
let time = 0// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
let interval = ""// 记录/清理时间记录 
let touchMoveX = 0 // x轴方向移动的距离
let touchMoveY = 0 // y轴方向移动的距离
let threshold = 30//滑动阀值
// 触摸开始事件 
const touchStart = e => {
  touchMoveX = touchStartX = e.touches[0].pageX // 获取触摸时的原点 
  touchMoveY = touchStartY = e.touches[0].pageY // 获取触摸时的原点 
  // 使用js计时器记录时间 
  interval = setInterval(function () {
    time++
  }, 100)
}
// 触摸移动事件 
const touchMove = e => {
  touchMoveX = e.touches[0].pageX
  touchMoveY = e.touches[0].pageY
}
// 触摸结束事件 
const touchEnd = e => {
  return new Promise(resolve => {
    let moveX = touchMoveX - touchStartX
    let moveY = touchMoveY - touchStartY
    if (Math.sign(moveX) == -1) {
      moveX = moveX * -1
    }
    if (Math.sign(moveY) == -1) {
      moveY = moveY * -1
    }
    if (moveX <= moveY) {// 上下
    // 向上滑动
    if (touchMoveY - touchStartY <= -threshold && time < 10) {
      resolve({ type: 1, title: "上滑" })
    }
    // 向下滑动 
    if (touchMoveY - touchStartY >= threshold && time < 10) {
      resolve({ type: 2, title: "下滑" })
    }
    } else {// 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -threshold && time < 10) {
        resolve({ type: 3, title: "左滑" })
      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= threshold && time < 10) {
        resolve({ type: 4, title: "右滑" })
      }
    }
    clearInterval(interval) // 清除setInterval 
    time = 0
  })
}
module.exports = {
  touchStart,
  touchMove,
  touchEnd
}
