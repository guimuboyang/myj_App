'use strict';
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const res = await uniID.logout(event.uniIdToken)
	return res
}
