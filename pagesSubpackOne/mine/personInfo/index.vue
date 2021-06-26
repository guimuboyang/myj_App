<template>
	<view class="p-16-32 commonCard">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="昵称">
				<u-input v-model="userForm.nickname" />
			</u-form-item>
			<u-form-item label="用户名">
				<u-input v-model="userForm.username" />
			</u-form-item>
		</u-form>
		<u-button @click="saveInfo()">保存</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userForm: {
				uid: '',
				uniIdToken: '',
				nickname: '',
				username: ''
			},
			resetPasswordForm: {
				uniIdToken: '',
				password: ''
			}
		};
	},
	onLoad() {
		this.userForm.uid = uni.getStorageSync('uid');
		this.userForm.uniIdToken = uni.getStorageSync('uni_id_token');
		this.resetPasswordForm.uniIdToken = uni.getStorageSync('uni_id_token');
		this.getUserInfo();
	},
	methods: {
		async getUserInfo() {
			let res = await this.$uniCloud('getUserInfo');
			console.log(res);
			this.userForm.nickname = res.result.userInfo.nickname;
			this.userForm.username = res.result.userInfo.username;
		},
		saveInfo() {
			this.saveBaseInfo();
			setTimeout(function() {
				uni.navigateBack({});
			}, 1000);
		},
		async saveBaseInfo() {
			let res = await this.$uniCloud('updateUserInfo', this.userForm);
			console.log(res);
			if (res.result.code == 0) {
				if (this.resetPasswordForm.password !== '') {
					this.resetPassword();
				}
			}
		},
		async resetPassword() {
			let res = await this.$uniCloud(
				'setPassword',
				this.resetPasswordForm
			);
			console.log(res);
		}
	}
};
</script>

<style lang="scss" scoped></style>
