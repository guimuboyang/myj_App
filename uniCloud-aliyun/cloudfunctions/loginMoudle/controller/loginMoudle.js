const {
	Controller
} = require("uni-cloud-router");
const uniID = require('uni-id')
module.exports = class PostController extends(
	Controller
) {
	//发送短信
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
	//短信验证码登录
	async loginBySms() {
		const data = this.ctx.data
		const res = await uniID.loginBySms({
			mobile: data.mobile,
			code: data.code
		})
		return res
	}
	//绑定微信
	async bindWX() {
		const data = this.ctx.data
		const event = this.ctx.event
		const payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		const res = await uniID.bindWeixin({
			uid: payload.uid,
			code: data.code
		})
		return res
	}
	//解绑微信
	async unbindWeixin() {
		const event = this.ctx.event
		const payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		const res = await uniID.unbindWeixin(payload.uid)
		return res
	}
	// 微信登陆
	async loginByWechat() {
		const data = this.ctx.data
		const res = await uniID.loginByWeixin({
			code: data.code
		})
		return res
	}
	//密码登录
	async loginByPassword() {
		const {
			username,
			password
		} = this.ctx.data
		// 自动完成username、password验证是否合法的逻辑
		const res = await uniID.login({
			username,
			password,
			queryField: ['username', 'email', 'mobile']
		})
		return res
	}
	//重置密码
	async setPassword() {
		const event = this.ctx.event
		const data = this.ctx.data
		const payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		const res = await uniID.resetPwd({
			uid: payload.uid,
			password: data.password
		})
		return res
	}
	//退出登录
	async logOut() {
		const data = this.ctx.data
		const res = await uniID.logout(data.uniIdToken)
		return res
	}
};
