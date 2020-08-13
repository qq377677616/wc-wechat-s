/************中文************/
const Chinese = {
  //个人中心
  my: {
    title: '中英文',
    nickName: '前端',
    phone: ['工号：', '手机号：'],
    column: ['我发布的点子', '我回复的帖子', '投诉与建议', '关于我们'],
    alert: ['语言切换', '您当前正在切换当前应用的语言版本，是否继续？', '切换', '取消', 'Language switching', '语言切换成功']
  }
}
/************英文************/
const English = {
  //个人中心
  my: {
    title: 'Chinese and English',
    nickName: 'Front end',
    phone: ['Number:', 'Mobile:'],
    column: ['The ideas I posted', 'My reply', 'Complaints and Suggestions', 'About us'],
    alert: ['Language switching', 'You are currently switching the language version of the current application. Do you want to continue?', 'Switch', 'Cancel', '语言切换中', 'Successful language switching']
  }
}

module.exports = {
  Chinese: Chinese,
  English: English
}
