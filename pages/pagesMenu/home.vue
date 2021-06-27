<template>
	<view>
		<view v-if="isLoad == true"><loading></loading></view>
		<view v-else>
			<view class="p-16-32">
				<u-search
					:clearabled="true"
					show-action
					animation
					action-text="重置"
					bg-color="#fff"
				></u-search>
			</view>
			<view class="u-m-t-20">
				<view class="" v-for="(item, index) in roomList" :key="index">
					<u-card :title="item.room_name" @click="toDetail(item)">
						<view slot="body">
							<view class="u-flex u-col-center u-row-between">
								<view>{{ item.room_des }}</view>
								<view>
									<u-tag
										type="success"
										v-if="item.is_open == true"
										text="开放中"
										mode="dark"
									></u-tag>
									<u-tag
										type="info"
										v-else
										text="未开放"
										mode="dark"
									></u-tag>
								</view>
							</view>
						</view>
						<view class="" slot="foot">
							<text>
								{{
									item.room_user.length +
										'/' +
										item.room_userNum
								}}
							</text>
						</view>
					</u-card>
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
			roomList: [],
			userInfo: {}
		};
	},
	onPullDownRefresh() {
		this.getRoomLsit();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad() {
		this.getUserInfo();
		this.backRoom();
	},
	onShow() {
		setTimeout(() => {
			this.getRoomLsit();
		}, 1000);
	},
	methods: {
		//监听是否是非法退出
		backRoom() {
			let isEnter = uni.getStorageSync('isEnter');
			let roomId = uni.getStorageSync('roomId');
			if (isEnter == true) {
				uni.navigateTo({
					url: '/pagesSubpackOne/home/room/roomDeatil?_id=' + roomId
				});
			} else {
			}
		},

		async getRoomLsit() {
			let res = await this.$uniCloud('getRoomLsit');
			console.log(res);
			if (res.result.affectedDocs !== 0) {
				this.roomList = res.result.data;
			}
			this.isLoad = false;
		},
		//获取个人信息
		async getUserInfo() {
			let res = await this.$uniCloud('getUserInfo');
			console.log(res);
			if (res.result.code == 0) {
				this.userInfo = res.result.userInfo;
			}
		},
		//进入房间
		async addRoomUserNum(id) {
			let res = await this.$uniCloud('enterRoom', {
				_id: id,
				userInfo: this.userInfo
			});
			console.log(res);
		},
		//跳往房间详情
		async toDetail(item) {
			console.log(item._id);
			let res = await this.$uniCloud('getRoomUserNum', {
				_id: item._id
			});
			// console.log(res);
			if (res.result.data[0].room_user.length < item.room_userNum) {
				uni.navigateTo({
					url: '/pagesSubpackOne/home/room/roomDeatil?_id=' + item._id
				});
				this.addRoomUserNum(item._id);
			} else {
				uni.showToast({
					title: '房间已满',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
