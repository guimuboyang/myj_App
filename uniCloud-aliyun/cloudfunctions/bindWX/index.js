'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}
	const res = await uniID.bindWeixin({
		uid: payload.uid,
		code: event.code
	})
	return res
}
