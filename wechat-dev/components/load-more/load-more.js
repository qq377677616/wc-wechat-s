// components/load-more/load-more.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    iconfontSize: '180rpx',//默认字体图标、图片大小
    iconfontColor: 'green',//默认字体图标颜色
    textSize: '28rpx',//默认提示文字大小
    textColor: '#333'//默认提示文字颜色
  },
  properties: {
    iconfont: {//字体图标或者图片
      type: [String, Array],
      value: 'icon-xiaoxihezi-kong'
    },
    margin: {//图标、图标离提示文字的距离
      type: String,
      value: '0'
    },
    padding: {//整体上下距离:数组第一项为纯文字时上下间距，数组第二项为有图标、图片时的上下间距
      type: Array,
      value: ['20px', '80rpx']
    },
    loadMoreType: {//加载状态：0为暂无数据，1为加载中，2为没有更多
      type: [String, Number],
      value: 1
    },
    textList: {//提示文字
      type: Array,
      value: ['暂无数据', '加载中...', '没有更多啦~']
    }
  },
  attached() {
    let _iconfont = this.data.iconfont, _iconfontType, _iconfontTypes,  _textList_three = this.data.textList[3] || '',  _textList_four = this.data.textList[4] || ''
    if (typeof (_iconfont) == 'string') {
      _iconfontType = this.isIncludes(_iconfont, '.')
      _iconfontTypes = 0
    } else if (typeof (_iconfont) == 'object') {
      _iconfontType = this.isIncludes(_iconfont[0], '.')
      _iconfontTypes = 1
    }
    this.setData({
      iconfontType: _iconfontType,
      iconfontTypes: _iconfontTypes,
      iconfontSize: _iconfont[1].includes('rpx') ? _iconfont[1] : (_iconfont[2].includes('rpx') ? _iconfont[2] : this.data.iconfontSize),
      iconfontColor: !_iconfont[1].includes('rpx') ? _iconfont[1] : (!_iconfontType ? (!_iconfont[2].includes('rpx') ? _iconfont[2] : this.data.iconfontColor) : 'none'),
      textSize: _textList_three.includes('rpx') ? _textList_three : (_textList_four.includes('rpx') ? _textList_four : this.data.textSize),
      textColor: !_textList_three.includes('rpx') ? _textList_three : (!_textList_four.includes('rpx') ? _textList_four : this.data.textColor),
    })
  }, 
  /**
   * 组件的方法列表
   */
  methods: {
    isIncludes (val, str) {
      return val.includes(str)
    }
  }
})
