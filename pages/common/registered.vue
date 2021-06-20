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
				<wInput v-model="registerForm.username" type="text" maxlength="11" placeholder="昵称"></wInput>
				<wInput v-model="registerForm.mobile" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="registerForm.password" type="password" maxlength="11" placeholder="登录密码" isShowPass>
				</wInput>
				<!-- 				<wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" isShowCode ref="runCode"
					@setCode="getVerCode()"></wInput> -->

			</view>

			<wButton class="wbutton" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="findPassWord" open-type="navigate">找回密码</navigator>
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
				registerForm: {
					username: "",
					mobile: '', // 用户/电话
					password: '', //密码
				},
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
			// isShowAgree() {
			// 	//是否选择协议
			// 	_this.showAgree = !_this.showAgree;
			// },
			// getVerCode() {
			// 	//获取验证码
			// 	if (_this.phoneData.length != 11) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			position: 'bottom',
			// 			title: '手机号不正确'
			// 		});
			// 		return false;
			// 	}
			// 	console.log("获取验证码")
			// 	this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position: 'bottom',
			// 		title: '模拟倒计时触发'
			// 	});

			// 	setTimeout(function() {
			// 		_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
			// 		uni.showToast({
			// 			icon: 'none',
			// 			position: 'bottom',
			// 			title: '模拟倒计时终止'
			// 		});
			// 	}, 3000)
			// },
			async startReg() {
				console.log(this.registerForm)
				let res = await this.$uniCloud('register', this.registerForm)
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
