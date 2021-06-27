'use strict';
// 云函数login-by-weixin代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	// 如下旧写法依然支持
	// const res = await uniID.loginByWeixin(event.code)
	const res = await uniID.loginByWeixin({
		code: event.code
	})
	return res
}
