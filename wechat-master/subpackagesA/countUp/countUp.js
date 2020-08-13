// subpackages/countUp/countUp.js--https://github.com/ChenXiaoMian/wx-extend/blob/master/docs/components/WxCountUp.md
import WxCountUp from '../../utils/countUp.min.js'

Page({
  data: {
    number: 0//数字
  },
  onLoad(options) {

  },
  // 开始动画
  start() {   
    this.countUp = new WxCountUp('number', 5234.56, { decimalPlaces: 2, useGrouping: false }, this)
    this.countUp.start(() => console.log('【数字滚动完成】'))
  },
  //暂停/重新开始
  pauseResume() {
    this.countUp.pauseResume()
  },
  //重置
  reset() {
    this.countUp.reset()
  },
  //更新为新值
  update() {
    this.countUp.update(1000)
  }
  /**
   * optios参数配置参考
   * 
   *  startVal	Number	滚动开始时的数字，默认为0
      decimalPlaces	Number	小数位数，默认为0
      duration	Number	动画间隔时间，默认为2秒
      useGrouping	Boolean	是否按组间隔，默认为true。例如：1,000 vs 1000
      useEasing	Boolean	是否使用缓动效果，默认为true
      smartEasingThreshold	Number	如果使用缓动，则对大于此值的大数值平滑缓动，默认为999
      smartEasingAmount	Number	超过阈值的数字将被放宽，默认为333
      separator	String	按组间隔标识，默认为','
      decimal	String	小数点标识，默认为'.'
      easingFn	Function	例如 (t: number, b: number, c: number, d: number) => number;
      formattingFn	Function	例如 (n: number) => string;
      prefix	String	以结果为前缀的文本，默认为空
      suffix	String	以结果为后缀的文本，默认为空
      numerals	String	数字符号替换
   *   
   */
})