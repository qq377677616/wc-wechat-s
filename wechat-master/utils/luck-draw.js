export default class luckDraw {
  constructor (page, option) {
    this.page = page
    this.option = option
    this.type = this.option.type || 1
    this.duration = this.option.duration || 5000
  }
  //初始化
  init() {
    let { prizeList } = this.option
    let _curNumDeg = 360 / prizeList.length
    for (let i = 0; i < prizeList.length; i++) {
      prizeList[i].deg = _curNumDeg * i
    }
    this.page.setData({ prizeList, duration: this.duration, curNumDeg: _curNumDeg, needleDeg: this.type == 1 ? -90 : 0, isPrize: true, curIndex: 1 })
  }
  //开始抽奖
  start(prizeId) {
    return new Promise(resolve => {
      if (!this.page.data.isPrize) {
        resolve({ status: 0 })
        return
      }
      if (this.type != 3) {
        let _num = this.page.data.prizeList.findIndex(item => item[this.option.id || 'id'] == prizeId)
        if (_num == -1) {
          resolve({ status: -1 })
          return
        }
        let surplus = Math.floor(Math.random() * 7 + 2) / 10, _needleDeg
        if (this.type == 1) {
          _needleDeg = (_num + surplus) * this.page.data.curNumDeg + this.page.data.needleDeg + (360 - this.page.data.needleDeg % 360) + 1800
        } else if (this.type == 2) {
          _needleDeg = (_num - surplus) * this.page.data.curNumDeg - 90 + this.page.data.needleDeg + (360 - this.page.data.needleDeg % 360) + 1800
        }
        this.page.setData({ isPrize: false, needleDeg: _needleDeg })
        setTimeout(() => {
          this.page.setData({ isPrize: true })
          resolve({ status: 1 })
        }, this.duration + 300)
      } else if (this.type == 3) {
        let _this = this
        if (!this.page.data.isPrize) {
          resolve({ status: 0 })
          return
        }
        var _curIndex = this.page.data.curIndex, start_num = this.option.start_num || 6, step = this.option.step || 5
        var _speed = this.option.speed || 260
        var _num = this.page.data.prizeList.findIndex(item => item[this.option.id || 'id'] == prizeId)
        var prize_num = _num + step * 8 - _curIndex - 1
        var _prize_num = 0
        var _auto = setTimeout(auto_prize, _speed)
        this.page.setData({ isPrize: false })
        function auto_prize() {
          clearInterval(_auto)
          if (_prize_num <= prize_num) {
            _prize_num++
            _curIndex++
            _curIndex = (_curIndex) % 8
            if (_prize_num < start_num) {
              _speed -= 40
            } else if (_prize_num == start_num) {
              _speed = 25
            } else if (_prize_num >= start_num && _prize_num < start_num * 4) {
              _speed += 6
            } else {
              _speed += 16
            }
            _auto = setInterval(auto_prize, _speed)
            _this.page.setData({ curIndex: _curIndex })
          } else {
            _this.page.setData({ isPrize: true })
            resolve({ status: 1 })
          }
        }
      }
    })
  }
}