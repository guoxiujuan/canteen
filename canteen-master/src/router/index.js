import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/Login'
// import Register from '@/components/register'
// import Index from '@/components/index'
import Info from '@/components/info'
import Home from '@/components/home'
import Pay from '@/components/pay'
import Orders from '@/components/orders'
import My from '@/components/my'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/my',
      name: 'My',
      component: My
    }
  ]
})
