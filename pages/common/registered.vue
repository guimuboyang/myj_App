<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/login.jpg"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<!-- <u-upload :action="action"></u-upload> -->
				<!-- <wInput v-model="registerForm.username" type="text" maxlength="11" placeholder="用户名"></wInput> -->
				<wInput v-model="registerForm.mobile" type="text" maxlength="11" placeholder="手机号"></wInput>
				<!-- <wInput v-model="registerForm.password" type="password" maxlength="11" placeholder="登录密码" isShowPass>
				</wInput> -->
				<view class="u-flex u-col-center">
					<view class="u-flex-5 m-r-20">
						<wInput v-model="registerForm.code" type="number" maxlength="6" placeholder="验证码"></wInput>
					</view>
					<view class="u-flex-2">
						<u-verification-code :seconds="seconds" @start="start" ref="uCode" @change="codeChange"
							change-text="X秒" start-text="获取验证码"></u-verification-code>
						<text @tap="getVerCode" size="mini">{{tips}}</text>
					</view>
				</view>


			</view>

			<wButton class="wbutton" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="smsLogin" open-type="navigate">验证码登录</navigator>
				<text>|</text>
				<navigator url="login" open-type="navigate">登录</navigator>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				registerForm: {
					mobile: '', // 用户/电话
					code: "",
				},
				tips: '',
				// refCode: null,
				seconds: 30,
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			// isShowAgree() {
			// 	//是否选择协议
			// 	_this.showAgree = !_this.showAgree;
			// },
			getVerCode() {
				if (this.$refs.uCode.canGetCode) {
					setTimeout(async () => {
						//获取验证码
						let res = await this.$uniCloud('sendSms', {
							mobile: this.registerForm.mobile
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
			async startReg() {
				console.log(this.registerForm)
				let res = await this.$uniCloud('registerBySms', this.registerForm)
				console.log(res)
				if (res.result.code === 0) {
					this.$toast(res.result.message)
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
