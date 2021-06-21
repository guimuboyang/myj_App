<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/login.jpg"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="loginForm.username" type="text" maxlength="11" placeholder="用户名" :focus="isFocus">
				</wInput>
				<wInput v-model="loginForm.password" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 其他登录 -->
			<!-- 		<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view> -->

			<!-- 底部信息 -->
			<view class="footer">
				<!-- <navigator url="findPassWord" open-type="navigate">找回密码</navigator>
				<text>|</text> -->
				<navigator url="registered" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				loginForm: {
					username: '', //用户/电话
					password: '', //密码
				},
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			async startLogin(e) {
				console.log(this.registerForm)
				let res = await this.$uniCloud('login', this.loginForm)
				console.log(res)
				if (res.result.code === 0) {
					this.$toast(res.result.message)
					uni.setStorageSync("role", res.result.userInfo.role)
					uni.setStorageSync("uni_id_token", res.result.token)
					uni.setStorageSync("uid", res.result.uid)
					uni.reLaunch({
						url: "../pagesMenu/home"
					})
				} else {
					this.$toast(res.result.msg)
				}

			},
			// login_weixin() {
			// 	//微信登录
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position: 'bottom',
			// 		title: '...'
			// 	});
			// },
			// login_weibo() {
			// 	//微博登录
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position: 'bottom',
			// 		title: '...'
			// 	});
			// },
			// login_github() {
			// 	//github登录
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position: 'bottom',
			// 		title: '...'
			// 	});
			// }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
