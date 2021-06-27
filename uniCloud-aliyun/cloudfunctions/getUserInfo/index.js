'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	let payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}
	const res = await uniID.getUserInfo({
		uid: payload.uid
	})
	return res
}
