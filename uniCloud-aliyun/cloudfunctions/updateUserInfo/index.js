'use strict';
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	let payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}
	const res = await uniID.updateUser({
		uid: event.uid,
		nickname: event.nickname
	})
	return res
}
