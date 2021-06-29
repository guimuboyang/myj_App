<template>
	<view class="forget">
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<!-- <view class="tips">若你不想使用短信登录，可在此使用密码登录。</view> -->
				<!-- 	<wInput v-model="checkForm.username" type="text" maxlength="11" placeholder="请输入手机号码"></wInput> -->
				<wInput
					v-model="loginForm.username"
					type="text"
					maxlength="11"
					placeholder="手机号/用户名"
				></wInput>
				<wInput
					v-model="loginForm.password"
					type="password"
					placeholder="密码"
				></wInput>
			</view>

			<wButton
				class="wbutton"
				text="登录"
				:rotate="isRotate"
				@click.native="smsLogin()"
			></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="login" open-type="navigate">
					验证码登录
				</navigator>
				<!-- 				<text>|</text>
				<navigator url="login" open-type="navigate">登录</navigator> -->
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
				username: '', // 用户/电话
				password: ''
			},
			isRotate: false, //是否加载旋转
			isFocus: false // 是否聚焦
		};
	},
	components: {
		wInput,
		wButton
	},
	methods: {
		async smsLogin() {
			this.isRotate = true;
			let res = await this.$uniCloud('loginMoudle', {
				action: 'loginMoudle/loginByPassword',
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
				uni.reLaunch({
					url: '../pagesMenu/home'
				});
			} else {
				this.$toast(res.result.msg);
			}
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
