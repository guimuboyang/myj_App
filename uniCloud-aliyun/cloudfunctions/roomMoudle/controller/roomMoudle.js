const {
	Controller
} = require("uni-cloud-router");
const uniID = require('uni-id')
const db = uniCloud.database();
module.exports = class PostController extends(
	Controller
) {
	//获取房间列表
	async getRoomLsit() {
		const collection = db.collection('myj_room').get();
		//返回数据给客户端
		return collection
	}
	//获取房间详情
	async getRoomDetail() {
		const data = this.ctx.data
		const collection = db.collection('myj_room').doc(data.roomId).get();
		//返回数据给客户端
		return collection
	}
	//进入房间
	async enterRoom() {
		//event为客户端上传的参数
		const data = this.ctx.data
		const res = await db.collection('myj_room').doc(data._id).field({
			room_user: true
		}).get()
		let new_room_user = res.data
		new_room_user[0].room_user.push(data.userInfo)
		const collection = db.collection("myj_room").where({
			_id: data._id
		}).update({
			room_user: new_room_user[0].room_user
		})
		//返回数据给客户端
		return collection
	}
	//获取房间当前人数
	async getRoomUserNum() {
		const data = this.ctx.data
		const collection = db.collection("myj_room").doc(data._id).get()
		//返回数据给客户端
		return collection
	}
	//退出房间
	async leaveRoom() {
		const data = this.ctx.data
		const res = await db.collection('myj_room').doc(data.roomId).field({
			room_user: true
		}).get()
		let new_room_user = res.data
		let newArr = new_room_user[0].room_user
		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i]._id == data.uid) {
				newArr.splice(i, 1)
			}
		}
		const collection = db.collection("myj_room").where({
			_id: data.roomId
		}).update({
			room_user: newArr
		})
		//返回数据给客户端
		return collection
	}
}
