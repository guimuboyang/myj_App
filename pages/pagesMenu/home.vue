<template>
	<view class="">
		<u-button @click="logOut()">退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			const role = uni.getStorageSync('role');
			if (role == "admin") {
				console.log(role)
				uni.setTabBarItem({
					index: 0,
					text: '用户管理',
					pagePath: "pages/pagesMenu/userManagement",
					iconPath: 'static/setting.png',
					selectedIconPath: 'static/setting-fill.png',
				})
			}
		},
		methods: {
			async logOut() {
				const uniIdToken = uni.getStorageSync('uni_id_token');
				console.log(typeof(uniIdToken))
				let res = await this.$uniCloud('logOut', {
					uniIdToken: uniIdToken
				})
				if (res.result.code == 0) {
					uni.removeStorageSync('uni_id_token')
					uni.reLaunch({
						url: "/pages/common/login"
					})
				}
				console.log(res)
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
