// 云函数代码
'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		uniIdToken,
		password
	} = event
	const payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}

	const res = await uniID.resetPwd({
		uid: payload.uid,
		password
	})
	return res
}
