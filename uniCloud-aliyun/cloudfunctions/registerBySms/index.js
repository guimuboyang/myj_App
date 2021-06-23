'use strict';
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		username
		mobile
		code
		type
		password
		role
	} = event
	const res = await uniID.loginBySms({
		username
		mobile
		code
		type
		password,
		role
	})
	return res
}
