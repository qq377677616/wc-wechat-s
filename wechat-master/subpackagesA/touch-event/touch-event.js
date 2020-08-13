import tool from '../../utils/publics/tool.js'
import touchEvent from '../../utils/touch-event.js'
 
Page({
  // 触摸开始事件 
  touchStart(e) {
    touchEvent.touchStart(e)
  },
  // 触摸移动事件 
  touchMove(e) {
    touchEvent.touchMove(e)
  },
  // 触摸结束事件 
  touchEnd(e) {
    touchEvent.touchEnd(e).then(({ type }) => {
      if (type == 1) {
        tool.alert("上滑")
      } else if (type == 2) {
        tool.alert("下滑")
      } else if (type == 3) {
        tool.alert("左滑")
      } else if (type == 4) {
        tool.alert("右滑")
      }
    })
  }
})