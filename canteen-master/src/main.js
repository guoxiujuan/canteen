// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import FastClick from 'fastclick'
// import axios from 'axios'
import jquery from 'jquery'

FastClick.attach(document.body)

// let _axios = axios.create({
//   headers: {'Content-Type': 'multipart/form-data'}
// })
// Vue.prototype.$ajax = axios
Vue.prototype.$ = jquery

Vue.config.productionTip = false

// Vue.prototype.api = '/web'
Vue.prototype.api = 'http://xaake3.rmxxkj.com/web'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

