<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/img/login.jpg"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="loginForm.mobile"
					type="text"
					maxlength="11"
					placeholder="手机号"
					:focus="isFocus"
				></wInput>
				<view class="u-flex u-col-center">
					<view class="u-flex-5 m-r-20">
						<wInput
							v-model="loginForm.code"
							type="number"
							maxlength="6"
							placeholder="验证码"
						></wInput>
					</view>
					<view class="u-flex-2">
						<u-verification-code
							:seconds="seconds"
							@start="start"
							ref="uCode"
							@change="codeChange"
							change-text="X秒"
							start-text="获取验证码"
						></u-verification-code>
						<text @tap="getVerCode" size="mini">{{ tips }}</text>
					</view>
				</view>
			</view>
			<wButton
				class="wbutton"
				text="登录"
				:rotate="isRotate"
				@click.native="smsLogin()"
			></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon" style="margin-bottom: 20rpx;">
					<view class="cuIcon-weixin" @tap="getWxInfo"></view>
				</view>
				<!-- 	<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view> -->
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="passwordLogin" open-type="navigate">
					密码登录
				</navigator>
				<!-- <text>|</text>
				<navigator url="registered" open-type="navigate">注册账号</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button

export default {
	data() {
		return {
			loginForm: {
				mobile: '', // 用户/电话
				code: ''
			},
			seconds: 30,
			tips: '',
			isRotate: false, //是否加载旋转
			isFocus: false // 是否聚焦
		};
	},
	components: {
		wInput,
		wButton
	},
	mounted() {
		_this = this;
		//this.isLogin();
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		getVerCode() {
			if (this.$refs.uCode.canGetCode) {
				setTimeout(async () => {
					//获取验证码
					// let res = await this.$uniCloud('sendSms', {
					// 	mobile: this.loginForm.mobile
					// });

					let res = await this.$uniCloud('loginMoudle', {
						action: 'loginMoudle/sendSms',
						data: {
							mobile: this.loginForm.mobile
						}
					});
					console.log(res);
					// 这里此提示会被this.start()方法中的提示覆盖

					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 500);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		start() {
			uni.showToast({
				title: '验证码发送成功'
			});
		},
		async smsLogin() {
			this.isRotate = true;
			let res = await this.$uniCloud('loginMoudle', {
				action: 'loginMoudle/loginBySms',
				data: this.loginForm
			});
			console.log(res);
			if (res.result.code === 0) {
				this.$toast(res.result.message);
				uni.setStorageSync(
					'userInfo',
					JSON.stringify(res.result.userInfo)
				);
				uni.setStorageSync('uni_id_token', res.result.token);
				uni.setStorageSync('uid', res.result.uid);
				uni.setStorageSync('uid', res.result.uid);
				uni.reLaunch({
					url: '../pagesMenu/home'
				});
			} else {
				this.$toast(res.result.msg);
			}
		},
		getWxInfo() {
			let that = this;
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '获取你的昵称、头像、地区及性别',
				success: res => {
					console.log(res);
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes.code);
							that.loginByWx(loginRes.code);
						}
					});
				},
				fail: res => {
					console.log(res);
				}
			});
		},
		async loginByWx(code) {
			let res = await this.$uniCloud('loginMoudle', {
				action: 'loginMoudle/loginByWechat',
				data: {
					code: code
				}
			});
			console.log(res);
			if (res.result.code === 0) {
				this.$toast(res.result.message);
				uni.setStorageSync(
					'userInfo',
					JSON.stringify(res.result.userInfo)
				);
				uni.setStorageSync('uni_id_token', res.result.token);
				uni.setStorageSync('uid', res.result.uid);
				uni.setStorageSync('uid', res.result.uid);
				uni.reLaunch({
					url: '../pagesMenu/home'
				});
			} else {
				this.$toast(res.result.msg);
			}
		}
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
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
