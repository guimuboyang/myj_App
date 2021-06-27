<template>
	<view class="u-flex u-col-center u-row-center">
		<view class="u-flex u-col-center" style="flex-direction: column;">
			<view class="loader">
				<view class="face"><view class="circle"></view></view>
				<view class="face"><view class="circle"></view></view>
			</view>
			<view class="m-t-20 textBox"><text>loading...</text></view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
body {
	margin: 0;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.loader {
	width: 10em;
	height: 10em;
	font-size: 20rpx;
	position: relative;
	top: 50vh;
	margin-top: -5em;
	display: flex;
	align-items: center;
	justify-content: center;
}
.textBox {
	position: relative;
	top: 65vh;
	margin-top: -5em;
}
.loader .face {
	position: absolute;
	border-radius: 50%;
	border-style: solid;
	animation: animate 3s linear infinite;
}

.loader .face:nth-child(1) {
	width: 100%;
	height: 100%;
	color: gold;
	border-color: currentColor transparent transparent currentColor;
	border-width: 0.2em 0.2em 0em 0em;
	--deg: -45deg;
	animation-direction: normal;
}

.loader .face:nth-child(2) {
	width: 70%;
	height: 70%;
	color: lime;
	border-color: currentColor currentColor transparent transparent;
	border-width: 0.2em 0em 0em 0.2em;
	--deg: -135deg;
	animation-direction: reverse;
}

.loader .face .circle {
	position: absolute;
	width: 50%;
	height: 0.1em;
	top: 50%;
	left: 50%;
	background-color: transparent;
	transform: rotate(var(--deg));
	transform-origin: left;
}

.loader .face .circle::before {
	position: absolute;
	top: -0.5em;
	right: -0.5em;
	content: '';
	width: 1em;
	height: 1em;
	background-color: currentColor;
	border-radius: 50%;
	box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em,
		0 0 0 0.5em rgba(255, 255, 0, 0.1);
}

@keyframes animate {
	to {
		transform: rotate(1turn);
	}
}
</style>
