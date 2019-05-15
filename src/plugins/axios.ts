import Vue from 'vue'

// Lib imports
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://localhost/listapreco-api/';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http.defaults.headers.put['Content-Type'] = 'application/json';