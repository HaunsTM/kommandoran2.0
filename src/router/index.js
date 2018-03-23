import Vue from 'vue'
import Router from 'vue-router'

import MainNavigation from '@/components/MainNavigation'
import MediaController from '@/components/MediaController'
import PowerSwitchesMap from '@/components/PowerSwitchesMap'
import Security from '@/components/Security'
import Scheduler from '@/components/Scheduler'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-navigation',
      component: MainNavigation
    },
    {
      path: '/media-controller',
      name: 'media-controller',
      component: MediaController
    },
    {
      path: '/power-switches-map',
      name: 'power-switches-map',
      component: PowerSwitchesMap
    },
    {
      path: '/security',
      name: 'security',
      component: Security
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    }
  ]
})
