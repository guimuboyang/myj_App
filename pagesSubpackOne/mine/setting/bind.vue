<template>
	<view class="commonCard p-16-32">
		<u-form ref="uForm" label-width="150">
			<u-form-item label="绑定微信">
				<view slot="right">
					<u-button
						size="mini"
						@click="getLoginCode()"
						type="success"
						v-if="isbindWX == false"
					>
						绑定微信
					</u-button>
				</view>
				<view slot="right">
					<u-button size="mini" type="info" v-if="isbindWX == true">
						已绑定
					</u-button>
				</view>

				<!-- 	<u-switch
					slot="right"
					v-model="isbindWX"
					@change="getLoginCode"
				></u-switch> -->
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isbindWX: false,
			userInfo: {}
		};
	},
	onLoad(option) {
		// this.unbindWeixin()
		if (option.wx_openid) {
			this.isbindWX = true;
		} else {
			this.isbindWX = false;
		}
	},
	methods: {
		//绑定微信
		getLoginCode() {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes.code);
					that.bindWX(loginRes.code);
				}
			});
		},
		//绑定微信
		async bindWX(code) {
			let res = await this.$uniCloud('bindWX', {
				code: code
			});
			console.log(res);
			uni.showToast({
				title: '绑定成功'
			});
			this.isbindWX = true;
			this.$forceUpdate();
		},
		//解绑微信
		async unbindWeixin() {
			let res = await this.$uniCloud('unbindWeixin', {});
			console.log(res);
		}
	}
};
</script>

<style lang="scss" scoped></style>
