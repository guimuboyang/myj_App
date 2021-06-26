'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();

	const res = await db.collection('myj_room').doc(event._id).field({
		room_user: true
	}).get()
	let new_room_user = res.data

	// return new_room_user[0].room_user
	new_room_user[0].room_user.push(event.userInfo)
	const collection = db.collection("myj_room").where({
		_id: event._id
	}).update({
		room_user: new_room_user[0].room_user
	})
	//返回数据给客户端
	return collection
};
