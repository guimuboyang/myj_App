'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();

	const res = await db.collection('myj_room').doc(event.roomId).field({
		room_user: true
	}).get()
	let new_room_user = res.data
	let newArr = new_room_user[0].room_user
	// return new_room_user[0].room_user
	for (let i = 0; i < newArr.length; i++) {
		if (newArr[i]._id == event.uid) {
			newArr.splice(i, 1)
		}
	}
	const collection = db.collection("myj_room").where({
		_id: event.roomId
	}).update({
		room_user: newArr
	})
	//返回数据给客户端
	return collection
};
