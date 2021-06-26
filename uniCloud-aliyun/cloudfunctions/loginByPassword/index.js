'use strict';
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		username,
		password
	} = event
	// 自动完成username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password,
		queryField: ['username', 'email', 'mobile']
	})
	return res
}
