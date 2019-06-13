import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/es5/locale/pt'

Vue.use(Vuetify, {
  	theme: theme,
  
  	lang: {
    	current: 'pt'
  	},
})
