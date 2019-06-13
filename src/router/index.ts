//LIB
import Vue from 'vue'
import Router from 'vue-router'

//COMPONENTS
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Lista from '@/views/Lista.vue'
import Product from '@/views/Product.vue'

Vue.use(Router)

//NEW ROUTER
let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/lista',
      name: 'Lista',
      component: Lista,
      meta: {
        auth: true,
        title: 'Listas de preço'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        auth: true,
        title: 'Home'
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        auth: true,
        title: 'Product'
      }
    },

    { path: '*', redirect: '/home' }
  ]
});

export default router