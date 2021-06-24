<template>
	<view class="forget">

		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此使用短信登录。</view>
				<!-- 	<wInput v-model="checkForm.username" type="text" maxlength="11" placeholder="请输入手机号码"></wInput> -->
				<wInput v-model="loginForm.mobile" type="text" maxlength="11" placeholder="手机号"></wInput>

				<view class="u-flex u-col-center">
					<view class="u-flex-5 m-r-20">
						<wInput v-model="loginForm.code" type="number" maxlength="6" placeholder="验证码"></wInput>
					</view>
					<view class="u-flex-2">
						<u-verification-code :seconds="seconds" @start="start" ref="uCode" @change="codeChange"
							change-text="X秒" start-text="获取验证码"></u-verification-code>
						<text @tap="getVerCode" size="mini">{{tips}}</text>
					</view>
				</view>
			</view>

			<wButton class="wbutton" text="登录" :rotate="isRotate" @click.native="smsLogin()"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="registered" open-type="navigate">注册</navigator>
				<text>|</text>
				<navigator url="login" open-type="navigate">登录</navigator>
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
					mobile: '', // 用户/电话
					code: "",
					type: "login"
				},
				tips: '',
				// refCode: null,
				seconds: 30,
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this;
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getVerCode() {
				if (this.$refs.uCode.canGetCode) {
					setTimeout(async () => {
						//获取验证码
						let res = await this.$uniCloud('sendSms', {
							mobile: this.loginForm.mobile
						})
						// console.log(res)
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
					title: "验证码发送成功"
				})
			},
			async smsLogin() {
				let res = await this.$uniCloud('loginBySms', this.loginForm)
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
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
