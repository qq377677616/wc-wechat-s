import tool from '../../utils/publics/tool.js'

const tabUrl = [{ title: '首页', icon: "icon-zhuye", url: "/pages/index/index" }, { title: "发表", icon: "icon-jiahao", url: "" }, { title: "我的", icon: "icon-jiazaizhong", url: "/pages/pages-list/custom/custom" }]
const tabJump = (index, curPage) => {
  if (`/${curPage}` == tabUrl[index].url || !tabUrl[index].url) return
  tool.jump_rel(tabUrl[index].url)
}

module.exports = { tabUrl, tabJump }