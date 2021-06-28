const {
	Controller
} = require("uni-cloud-router");
const uniID = require('uni-id')
module.exports = class PostController extends(
	Controller
) {
	async sendSms() {
		const data = this.ctx.data
		// 生成验证码可以按自己的需求来，这里以生成6位数字为例
		const randomStr = '00000' + Math.floor(Math.random() * 1000000)
		const code = randomStr.substring(randomStr.length - 6)
		const res = await uniID.sendSmsCode({
			mobile: data.mobile,
			templateId: "12300",
			code,
			type: 'login'
		})
		return res
	}
};
