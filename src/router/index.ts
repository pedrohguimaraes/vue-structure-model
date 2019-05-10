//LIB
import Vue from 'vue'
import Router from 'vue-router'

//COMPONENTS
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'

Vue.use(Router)

//NEW ROUTER
let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'Admin',
      component: Admin,
      meta: {
        auth: true,
        title: 'Admin'
      }
    },
    { path: '*', redirect: '/home' }
  ]
});

export default router