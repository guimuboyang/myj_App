<template>
	<view class="forget">

		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<!-- 	<wInput v-model="checkForm.username" type="text" maxlength="11" placeholder="请输入手机号码"></wInput> -->
				<wInput v-model="checkForm.password" type="password" maxlength="11" placeholder="请输入新密码" isShowPass>
				</wInput>

				<!-- 				<wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" isShowCode codeText="获取重置码"
					setTime="30" ref="runCode" @setCode="getVerCode()"></wInput> -->
			</view>

			<wButton class="wbutton" text="重置密码" :rotate="isRotate" @click.native="createToken()"></wButton>
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
				checkForm: {
					uniIdToken: "",
					password: ""
				},
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
			getVerCode() {
				//获取验证码
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '模拟倒计时触发'
				});

				setTimeout(function() {
					_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '模拟倒计时终止'
					});
				}, 3000)
			},
			async createToken() {
				const uId = uni.getStorageSync('uid');
				console.log(uId)
				let res = await this.$uniCloud("createToken", {
					uid: uId
				})
				console.log(res)
				if (res.result.token) {
					this.checkForm.uniIdToken = res.result.token
					this.startRePass()
				}
			},

			async startRePass() {
				console.log(this.checkForm.uniIdToken)
				let res = await this.$uniCloud("findPassword", this.checkForm)
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
