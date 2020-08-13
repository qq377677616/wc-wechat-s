// components/h5-examine.js/h5-examine.js
import tool from '../../utils/publics/tool.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowCalculator: false,
    isShowBack: false,
    isShowDetails: false,
    isShowModal: true,
    myAdd: '',
    myList: [
      { num: 13, title: "山" },
      { num: 14, title: "水" },
      { num: 15, title: "林" },
      { num: 16, title: "田" },
      { num: 17, title: "湖" },
      { num: 18, title: "草" }
    ],
    province: ["选择省份", "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"],
    province_index: 0,
    examineType: 1,
    isAutoplay: true,
    defaultData: {
      water_people: '--',
      land_area: '--',
      crops_area: '--',
      grass_land: '--',
      nature_reserve: '--',
      forest_coverage_top: '--',
      forest_coverage: '--',
      about_island_nums: '--',
      province_index: '--'
    }
  },
  ready() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    isShowModal() {
      this.setData({ isShowModal: !this.data.isShowModal })
    },
    h5ExamineInit() {
      setTimeout(res => {
        this.hideShow()
      }, 600)
    },
    hideShow(isRepeat) {
      this.setData({
        isShowCalculator: !this.data.isShowCalculator,
        isShowBack: !this.data.isShowBack
      })
      if (!isRepeat) return
      setTimeout(res => {
        this.hideShow()
      }, 500)
    },
    jumpHome() {
      this.setData({ examineType: 2, provinceDetails: this.data.defaultData })
      this.h5ExamineInit()
    },
    bindPickerChange(e) {
      this.setData({
        province_index: e.detail.value,
        provinceDetails: this.data.defaultData
      })
      if (this.data.province_index == 0) {
        this.setData({ provinceDetails: this.data.defaultData })
      } else {
        this.getProvince(this.data.province[this.data.province_index])
      }
    },
    isShowDetails() {
      this.setData({ isShowDetails: !this.data.isShowDetails })
      if (this.data.isShowDetails) {
        this.hideShow(true)
      }
    },
    getDetails(e) {
      tool.loading("加载中")
      this.setData({
        isAutoplay: false,
        current: e.currentTarget.dataset.index
      })
      this.setData({
        selectIndex: e.currentTarget.dataset.index
      })
      setTimeout(() => { tool.loading_h() }, 600)
      this.isShowDetails()
    },
    getProvince(province) {
      tool.loading("自然资源搜查中")
      let _data = {
        about_island_nums: this.getMathRandom(1, 3),
        crops_area: this.getMathRandom(60000, 100000) / 10,
        forest_coverage: this.getMathRandom(2000, 4000) / 100 + "%",
        forest_coverage_top: this.getMathRandom(10, 40),
        grass_land: this.getMathRandom(0, 5),
        land_area: this.getMathRandom(60000, 100000) / 10,
        nature_reserve: this.getMathRandom(10, 40),
        province: "河北",
        water_people: this.getMathRandom(100, 400)
      }
      setTimeout(() => {
        this.setData({ provinceDetails: _data })
        tool.alert("搜查成功")
      }, 800)
    },
    back: function () {
      if (this.data.isShowDetails) {
        this.isShowDetails()
        this.hideShow(true)
        this.setData({
          isAutoplay: true,
          current: 0
        })
      } else {
        this.setData({ isShowCalculator: !this.data.isShowCalculator, isShowBack: !this.data.isShowBack, examineType: 1 })
      }
    },
    getMathRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
})
