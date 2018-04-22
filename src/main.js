// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'

Vue.use(VueMaterial)
Vue.use(Vuetify)
import router from './router'
import axios from 'axios';
Vue.use(axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
