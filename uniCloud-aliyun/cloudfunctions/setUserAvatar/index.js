'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		avatar
	} = event
	const db = uniCloud.database();
	const res = await db.collection('uni-id-users').doc(event.uid).update({
		avatar: avatar
	})
	return res
}
