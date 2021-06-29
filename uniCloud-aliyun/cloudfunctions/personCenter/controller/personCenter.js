const {
	Controller
} = require("uni-cloud-router");
const uniID = require('uni-id')
module.exports = class PostController extends(
	Controller
) {
	//修改个人信息
	async updateUserInfo() {
		const event = this.ctx.event
		const data = this.ctx.data
		let payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		const res = await uniID.updateUser({
			uid: data.uid,
			nickname: data.nickname,
			username: data.username,
			password: data.password
		})
		return res
	}
	//设置头像
	async setUserAvatar() {
		const data = this.ctx.data
		const db = uniCloud.database();
		const res = await db.collection('uni-id-users').doc(data.uid).update({
			avatar: data.avatar
		})
		return res
	}
	//获取个人信息
	async getUserInfo() {
		const event = this.ctx.event
		let payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		const res = await uniID.getUserInfo({
			uid: payload.uid
		})
		return res
	}
}
