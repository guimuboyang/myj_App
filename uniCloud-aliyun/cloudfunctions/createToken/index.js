'use strict';
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	// return event
	const res = await uniID.createToken({
		uid: event.uid
	})
	return res
}
