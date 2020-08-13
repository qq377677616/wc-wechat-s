// subpackagesA/wx-validate/wx-validate.js
import WxValidate from '../../utils/wxValidate'
import tool from '../../utils/publics/tool'
Page({
  data: {

  },
  onLoad(options) {
    this.initValidate()
  },
  //初始化 WxValidate
  initValidate() {
    const rules = {//验证字段的规则
      name: { required: true, minlength: 2, maxlength: 5 },
      phone: { required: true, tel: true },
      email: { required: true, email: true },
      password: { required: true, minlength: 8, maxlength: 15, letter: '#A&a' }
    }
    const messages = {//验证字段的提示信息，若不传则调用默认的信息
      name: { required: '姓名不能为空', minlength: '请输入2-5位字符的姓名', maxlength: '请输入2-5位字符的姓名' },
      phone: { required: '手机号不能为空', tel: '请输入正确的手机号' },
      email: { required: '电子邮箱不能空', email: '请输入正确的电子邮箱' },
      password: { required: '密码不能空', minlength: '请输入8-15位以大写字母开头且带小写字母的密码', maxlength: '请输入8-15位以大写字母开头且带小写字母的密码', letter: '请输入8-15位以大写字母开头且带小写字母的密码' }
    }
    this.WxValidate = new WxValidate(rules, messages)
    //自定义验证规则--字母（可选）
    this.WxValidate.addMethod('letter', (value, param) => {
      if (param == 'A') {
        return this.WxValidate.optional(value) || (value.match(/^.*[A-Z]+.*$/) != null)
      } else if (param == 'a') {
        return this.WxValidate.optional(value) || (value.match(/^.*[a-z]+.*$/) != null)
      } else if (param == 'A/a') {
        return this.WxValidate.optional(value) || (value.match(/^.*[a-zA-Z]+.*$/) != null)
      } else if (param == 'A&a') {
        return this.WxValidate.optional(value) || ((value.match(/^.*[A-Z]+.*$/) != null && value.match(/^.*[a-z]+.*$/) != null))
      } else if (param == '#A') {
        return this.WxValidate.optional(value) || (value[0].match(/^.*[A-Z]+.*$/) != null)
      } else if (param == '#A&a') {
        return this.WxValidate.optional(value) || (value[0].match(/^.*[A-Z]+.*$/) != null && value.match(/^.*[a-z]+.*$/) != null)
      } else if (param == '#a') {
        return this.WxValidate.optional(value) || (value[0].match(/^.*[a-z]+.*$/) != null)
      } else if (param == '#a&A') {
        return this.WxValidate.optional(value) || (value[0].match(/^.*[a-z]+.*$/) != null && value.match(/^.*[A-Z]+.*$/) != null)
      } else if (param == '#A/a') {
        return this.WxValidate.optional(value) || (value[0].match(/^.*[A-Z]+.*$/) != null || value[0].match(/^.*[a-z]+.*$/) != null)
      } 
      // return this.WxValidate.optional(value) || (value.match(/^.*[a-zA-Z]+.*$/) != null)
    }, '输入字符不含指定大/小写字母')
  },
  //提交表单
  bindsubmit(e) {
    if (!this.WxValidate.checkForm(e.detail.value)) {
      const error = this.WxValidate.errorList[0]
      console.log("error", error)
      tool.alert(error.msg)
      return
    } else {
      tool.alert("验证成功", 1500, 1)
    }
  }
})

/**
 * 附录//https://github.com/skyvow/wx-extend/blob/master/docs/components/validate.md
 *  1	required: true	这是必填字段。
    2	email: true	请输入有效的电子邮件地址。
    3	tel: true	请输入11位的手机号码。
    4	url: true	请输入有效的网址。
    5	date: true	请输入有效的日期。
    6	dateISO: true	请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。
    7	number: true	请输入有效的数字。
    8	digits: true	只能输入数字。
    9	idcard: true	请输入18位的有效身份证。
    10	equalTo: 'field'	输入值必须和 field 相同。
    11	contains: 'ABC'	输入值必须包含 ABC。
    12	minlength: 5	最少要输入 5 个字符。
    13	maxlength: 10	最多可以输入 10 个字符。
    14	rangelength: [5, 10]	请输入长度在 5 到 10 之间的字符。
    15	min: 5	请输入不小于 5 的数值。
    16	max: 10	请输入不大于 10 的数值。
    17	range: [5, 10]	请输入范围在 5 到 10 之间的数值。
    #18	letter: A a A/a A&a #A #a #A/a #A&a #a&A 输入字母[A：字符中带大写字母 a:字符中带小写字母 A/a:字符中带字母 A&a:带大写字母和小写字母 #A:以大写字母开头 #a:以小写字母开头 #A/a:以字母开头 #A&a以大写字母开头且带小写字母 #a&A以小写字母开头且带大写字母]
 */