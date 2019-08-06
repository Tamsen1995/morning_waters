// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import Api from '@/services/Api'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AuthenticationService from '@/services/AuthenticationService'
import VueCarousel from 'vue-carousel'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueCarousel)
Vue.use(VueMaterial)

Api().defaults.headers.common[
  'Authorization'
] = AuthenticationService.getAuthHeader()
console.log(`\nLaunching vuejs app\n`) // TESTING
AuthenticationService.checkAuth()
console.log('Reloading app')
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VModal) //

sync(store, router)

Vue.config.productionTip = false

if (window.location.protocol !== 'https:' && process.env.NODE_ENV === 'production') window.location.href = 'https://www.fig-analytics.com/'

/* eslint-disable no-new */
if (window.location.protocol !== 'https:' && process.env.NODE_ENV === 'production') window.location.href = 'https://www.fig-analytics.com/'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
