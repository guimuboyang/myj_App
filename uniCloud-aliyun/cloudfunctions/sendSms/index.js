// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		mobile
	} = event
	// 生成验证码可以按自己的需求来，这里以生成6位数字为例
	const randomStr = '00000' + Math.floor(Math.random() * 1000000)
	const code = randomStr.substring(randomStr.length - 6)
	const res = await uniID.sendSmsCode({
		mobile,
		templateId: "12300",
		code,
		type: 'login'
	})
	return res
}
