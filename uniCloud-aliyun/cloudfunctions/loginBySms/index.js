'use strict';
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		mobile,
		code,
	} = event
	const res = await uniID.loginBySms({
		mobile,
		code,
	})
	return res
}
