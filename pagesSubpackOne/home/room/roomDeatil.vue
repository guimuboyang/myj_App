<template>
	<view>
		<view v-if="isLoad == true"><loading></loading></view>
		<view v-else>
			<view class="u-flex u-row-between u-flex-wrap p-16-32">
				<view
					class="commonCard p-16-32 userBox m-t-20"
					v-for="(item, index) in userList"
					:key="index"
				>
					{{ item.nickname }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import loading from '@/components/loading.vue';
export default {
	components: {
		loading
	},
	data() {
		return {
			isLoad: true,
			roomId: '',
			userList: []
		};
	},
	onLoad(option) {
		this.roomId = option._id;
		uni.setStorageSync('isEnter', true);
		uni.setStorageSync('roomId', this.roomId);
		setTimeout(() => {
			this.getDetail();
		}, 1000);
		console.log(this.roomId);
	},
	beforeDestroy() {
		this.leaveRoom();
		uni.setStorageSync('isEnter', false);
	},
	methods: {
		async getDetail() {
			let res = await this.$uniCloud('roomMoudle', {
				action: 'roomMoudle/getRoomDetail',
				data: {
					roomId: this.roomId
				}
			});
			console.log(res);
			this.userList = res.result.data[0].room_user;
			this.isLoad = false;
		},
		//离开房间
		async leaveRoom() {
			let uid = uni.getStorageSync('uid');
			let res = await this.$uniCloud('roomMoudle', {
				action: 'roomMoudle/leaveRoom',
				data: {
					uid: uid,
					roomId: this.roomId
				}
			});
			console.log(res);
		}
	}
};
</script>

<style lang="scss" scoped>
.userBox {
	min-width: 330rpx;
	min-height: 150rpx;
	border-radius: 20rpx;
}
</style>
