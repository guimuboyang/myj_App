<template>
	<view>
		<!-- <u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<view class="u-flex u-col-center u-row-around user-box p-16-32">
			<view class="u-m-r-10 m-r-20" @click="setAvatar()">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{ userInfo.username }}</view>
				<view class="u-font-14 u-tips-color">
					手机号:{{ userInfo.mobile ? userInfo.mobile : '-' }}
				</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<!-- 		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="account" title="设置个人信息" @click="toPersonal()"></u-cell-item>
			</u-cell-group>
		</view> -->

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item
					icon="account"
					title="设置个人信息"
					@click="toPersonal()"
				></u-cell-item>
				<u-cell-item
					icon="lock"
					title="重置密码"
					@click="toResetPassword()"
				></u-cell-item>
				<u-cell-item
					icon="setting"
					title="绑定设置"
					@click="tobind()"
				></u-cell-item>
				<u-cell-item icon="pushpin" title="版本信息"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item
					title="退出登录"
					:title-style="{ color: 'red' }"
					@click="logOut"
				></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			pic: 'https://uviewui.com/common/logo.png',
			show: true
		};
	},
	onPullDownRefresh() {
		this.getUserInfo();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onShow() {
		this.getUserInfo();
	},
	methods: {
		async logOut() {
			const uniIdToken = uni.getStorageSync('uni_id_token');
			console.log(typeof uniIdToken);
			let res = await this.$uniCloud('loginMoudle', {
				action: 'loginMoudle/logOut',
				data: {
					uniIdToken: uniIdToken
				}
			});
			if (res.result.code == 0) {
				uni.removeStorageSync('uni_id_token');
				uni.reLaunch({
					url: '/pages/common/login'
				});
			}
			console.log(res);
		},
		//设置头像
		setAvatar() {
			let that = this;
			uni.chooseImage({
				count: 1,
				async success(res) {
					console.log(res);
					if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0];
						//进行上传操作
						const result = await uniCloud.uploadFile({
							filePath: filePath,
							cloudPath:
								String(Math.random() * 5).split('.')[1] +
								'.jpg',
							fileType: 'image'
						});
						console.log(result.fileID);
						that.saveAvatar(result.fileID);
					}
				}
			});
		},
		async saveAvatar(url) {
			console.log(this.userInfo._id);
			let res = await this.$uniCloud('personCenter', {
				action: 'personCenter/setUserAvatar',
				data: {
					uid: this.userInfo._id,
					avatar: url
				}
			});
			console.log(res);
			this.pic = url;
		},
		async getUserInfo() {
			let res = await this.$uniCloud('personCenter', {
				action: 'personCenter/getUserInfo'
			});
			console.log(res);
			if (res.result.code == 0) {
				this.userInfo = res.result.userInfo;
				this.pic = this.userInfo.avatar;
			} else if (res.result.code == 30204) {
				uni.showToast({
					title: '登陆已过期',
					icon: 'none'
				});
				setTimeout(function() {
					uni.removeStorageSync('uni_id_token');
					uni.reLaunch({
						url: '/pages/common/login'
					});
				}, 1500);
			} else if (res.result.code == 30202) {
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
		},
		//跳往个人信息
		toPersonal() {
			uni.navigateTo({
				url: '/pagesSubpackOne/mine/personInfo/index'
			});
		},
		//跳往重置密码
		toResetPassword() {
			uni.navigateTo({
				url: '/pagesSubpackOne/mine/resetPassword/resetPassword'
			});
		},
		//跳往绑定设置
		tobind() {
			uni.navigateTo({
				url:
					'/pagesSubpackOne/mine/setting/bind?wx_openid=' +
					this.userInfo.wx_openid
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ededed;
}

.camera {
	width: 54px;
	height: 44px;

	&:active {
		background-color: #ededed;
	}
}

.user-box {
	background-color: #fff;
}
</style>
