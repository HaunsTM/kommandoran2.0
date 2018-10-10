import Vue from 'vue'
import Router from 'vue-router'

import MainNavigation from '@/components/MainNavigation'
import MediaController from '@/components/MediaController'
import SwitchesOverview from '@/components/SwitchesOverview'
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
      path: '/switches-overview',
      name: 'switches-overview',
      component: SwitchesOverview
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