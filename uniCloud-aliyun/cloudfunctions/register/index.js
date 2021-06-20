'use strict';
// 云函数register的代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		username,
		password,
		mobile
	} = event
	//自己额外增加的校验密码规范的逻辑（可选）
	//强弱密码校验,密码至少包含大写字母，小写字母，数字，且不少于6位
	if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(password)) {
		return {
			code: 401,
			msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
		}
	}
	// 自动验证用户名是否与已经注册的用户名重复，如果重复会直接返回错误。否则会自动生成token并加密password存储username、password、token到数据表uni-id-users，并返回如上响应参数
	const res = await uniID.register({ //支持传入任何值，比如可以直接传入mobile即可设置手机号码，切勿直接传入event否则这是一个极大的安全问题
		username,
		password,
		mobile
	})
	return res
}
