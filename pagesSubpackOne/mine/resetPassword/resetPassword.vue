<template>
	<view class="p-16-32 commonCard">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="新密码">
				<u-input v-model="resetPasswordForm.password" />
			</u-form-item>
		</u-form>
		<u-button @click="resetPassword()">重置</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			resetPasswordForm: {
				uniIdToken: '',
				password: ''
			}
		};
	},
	onLoad() {
		this.resetPasswordForm.uniIdToken = uni.getStorageSync('uni_id_token');
	},
	methods: {
		async resetPassword() {
			let res = await this.$uniCloud(
				'setPassword',
				this.resetPasswordForm
			);
			console.log(res);
			uni.showToast({
				title: '请重新登录',
				icon: 'none'
			});
			setTimeout(function() {
				uni.removeStorageSync('uni_id_token');
				uni.reLaunch({
					url: '/pages/common/login'
				});
			}, 1500);
		}
	}
};
</script>

<style lang="scss" scoped></style>
