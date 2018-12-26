import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import _ from 'lodash';

import VueMqtt from 'vue-mqtt';

import "./assets/scroll.css";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueMqtt, "ws://10.0.0.4:9001", {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});

Vue.config.productionTip = false;
Vue.prototype.$TELLDUS_API_BASE_URL = 'http://10.0.0.4/iot/kommandoran2.0/telldus-api';
Vue.prototype.$DB_API_BASE_URL = 'http://10.0.0.4/iot/kommandoran2.0/db-api';

Vue.prototype.$DEFAULT_START_DATE_MONDAY = '2018-07-02';

Object.defineProperty(Vue.prototype, '$_', { value: _ });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
