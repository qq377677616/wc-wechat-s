// subpackagesA/calendar/my-calendar/my-calendar.js
import { getDate, getDistance } from '../../../utils/util'

Page({
  data: {
    // 此处为日历自定义配置字段
    calendarConfig: {
      multi: true, // 是否开启多选,
      theme: 'default', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      showLunar: false, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      lunar: true, // 在配置showLunar为false, 但需返回农历信息时使用该选项
      inverse: true, // 单选模式下是否支持取消选中,
      chooseAreaMode: false, // 开启日期范围选择模式，该模式下只可选择时间段
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      defaultDay: true, // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，2020-12-12'
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      takeoverTap: false, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Sunday', // 每周第一天为周一还是周日，默认按周日开始'Mon'
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      hideHeadOnWeekMode: false, // 周视图模式是否隐藏日历头部
      showHandlerOnWeekMode: true, // 周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置
      disableMode: { //禁用某一天之前/之后的所有日期
        // type: 'before',//['before', 'after']
        // date: getDate().dates, //无该属性或该属性值为假，则默认为当天
      }
    }
  },
  onLoad(options) {
    console.log("getDate", getDate())//获取今天日期
    console.log("getDistance", getDistance(365))//获取距离今天1年后的日期
  },
  //日历初始化完成
  afterCalendarRender(e) {
    console.log('【日历初始化完成】', e)
    this.enableArea([getDate().dates, getDistance(365).dates])
    this.setDataClass(['2020-7-13', '2020-7-15'], 'news')
    this.setSelectedDays(['2020-7-20', '2020-7-23'])
    this.setSelectedDays(['2020-7-27', '2020-7-31'], true)
    // this.disableDay(['2020-7-22', '2020-7-24'])
    // this.disableDay(['2020-8-1', '2020-8-31'], true)

    // setTimeout(() => {
    //   console.log("取消选中")
    //   this.cancelSelectedDates()//取消选中所有
    //   this.cancelSelectedDates(['2020-7-26', '2020-7-28', '2020-8-10'])//取消选中不连续时间
    //   this.cancelSelectedDates(['2020-7-26', '2020-7-28'], true)//取消选中连续时间段
    // }, 3000)
  },
  //选择日期后回调（未接管点击事件时触发）
  afterTapDay(e) {
    console.log('afterTapDay', e.detail)
  },
  //选择日期后回调（接管点击事件时触发）
  onTapDay(e) {
    console.log('onTapDay', e.detail)
  },
  //滑动切换月份回调
  onSwipe(e) {
    console.log('【滑动切换了月份】', e.detail)
    const dates = this.calendar.getCalendarDates()
    console.log("【当前月份信息】", dates)
  },
  //切换月份回调
  whenChangeMonth(e) {
    console.log('【切换了月份】', e.detail)
  },
  //周视图下当改变周时触发 => current 当前周信息 / next 切换后周信息
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail)
  },
  //指定可选时间区域
  enableArea(dateArr) {
    this.calendar.enableArea(dateArr)
  },
  //禁止指定指定日期
  disableDay(dateArr, isContinuity) {
    this.calendar.disableDay(this.calcDatePeriod(dateArr , '', isContinuity))
  },
  //设置指定日期class类
  setDataClass(dateArr, className) {
    this.calendar.setDateStyle(this.calcDatePeriod(dateArr, className))
  },
  //设置选种多个日期
  setSelectedDays(dateArr, isContinuity) {
    this.calendar.setSelectedDays(this.calcDatePeriod(dateArr , '', isContinuity))
  },
  //设置选中连续时间段
  chooseDateArea(dateArr) {
    this.calendar.chooseDateArea(dateArr).then(dates => {
      console.log('choosed dates: ', dates)
    })
  },
  //取消选中
  cancelSelectedDates(dateArr, isContinuity) {
    this.calendar.cancelSelectedDates(this.calcDatePeriod(dateArr, '', isContinuity))
  },
  //计算换算两日期之间日期({ year: ****, month: **, day: ** } 格式)
  calcDatePeriod(dateArr, className, isContinuity) {
    if (!dateArr || dateArr.length == 0) return ''
    if (!isContinuity) {
      return dateArr.map(item => {
        if (className) {
          return { year: item.split("-")[0], month: item.split("-")[1], day: item.split("-")[2], class: className }
        } else {
          return { year: item.split("-")[0], month: item.split("-")[1], day: item.split("-")[2] }
        }
      })
    }
    let _dateStart = [], dateStart = dateArr[0], dateEnd = dateArr[1]
    if (dateEnd) {
      let _isOk = false
      while(!_isOk) {
        if (dateStart == dateEnd) _isOk = true
        let _item = {
          year: dateStart.split("-")[0],
          month: dateStart.split("-")[1],
          day: dateStart.split("-")[2]
        }
        className && (_item.class = className)
        _dateStart.push(_item)
        dateStart = getDistance(1, dateStart).dates
      }
    } else {
      _dateStart = [{ year: dateStart.split("-")[0], month: dateStart.split("-")[1], day: dateStart.split("-")[2] }]
    }
    return _dateStart
  }
})