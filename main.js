import Vue from 'vue'
import App from './App'
import "./static/main.css"
Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);


Vue.prototype.$uniCloud = async (name, data, ) => {
	try {
		let res = await uniCloud.callFunction({
			name, // 云函数名字
			data
		})
		return res
	} catch (e) {
		return e
	} finally {

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
