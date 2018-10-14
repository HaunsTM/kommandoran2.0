import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuetify)

Vue.config.productionTip = false;
Vue.prototype.$API_BASE_URL = (Vue.config.productionTip) ? 'https://www.your-api.com' : 'http://10.0.0.4/iot/kommandoran2.0/api';
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
