import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);


Vue.prototype.$uniCloud = async (name, data) => {
	uni.showLoading()
	try {
		let res = await uniCloud.callFunction({
			name, // 云函数名字
			data // 传输数据
		})
		return res
	} catch (e) {
		return e
	} finally {
		uni.hideLoading()
	}
}
Vue.prototype.$toast = (title, duration = 1500) => uni.showToast({
	icon: 'none',
	title,
	duration
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
