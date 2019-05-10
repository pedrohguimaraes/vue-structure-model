import '@babel/polyfill'

//VUE
import Vue from 'vue'

//PLUGINS
import './plugins'

//COMPONENTS
import './components'

//APP
import App from './App.vue'
import router from '@/router'
import '@/registerServiceWorker'

Vue.config.productionTip = false

//TOKEN AUTHENTICATION REQUESTS
const token = localStorage.getItem('token');

if (token)
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token;

//RENDER
new Vue({
  	router,
  	render: h => h(App)
}).$mount('#app')
