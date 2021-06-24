<template>
	<view class="p-16-32">
		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称">
				<u-input v-model="nickname" />
			</u-form-item>
			<!-- 			<u-form-item label="简介">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input v-model="form.sex" type="select" />
			</u-form-item> -->
		</u-form>
		<u-button @click="saveInfo()">保存</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: ""
			}
		},
		methods: {
			async saveInfo() {
				const uid = uni.getStorageSync('uid');
				const uniIdToken = uni.getStorageSync('uni_id_token');
				let res = await this.$uniCloud('updateUserInfo', {
					uid: uid,
					uniIdToken: uniIdToken,
					nickname: this.nickname
				})
				console.log(res)
				if (res.result.code == 0) {

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
