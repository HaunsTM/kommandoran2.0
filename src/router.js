import Vue from 'vue'
import Router from 'vue-router'


import GoogleDrive from '@/components/GoogleDrive'
import MainNavigation from '@/components/MainNavigation'
import MediaController from '@/components/MediaController'
import SwitchesOverview from '@/components/SwitchesOverview'
import Screensaver from '@/components/Screensaver'
import Security from '@/components/Security'
import Scheduler from '@/components/Scheduler'
import SurveillanceVideoLibrary from '@/components/SurveillanceVideoLibrary'

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
      path: '/security',
      name: 'security',
      component: Security
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    },
    {
      path: '/screensaver',
      name: 'screensaver',
      component: Screensaver
    },
    {
      path: '/sjostorpsvagen-drive',
      name: 'sjostorpsvagen-drive',
      component: GoogleDrive
    },
    {
      path: '/surveillance-video',
      name: 'surveillance-video',
      component: SurveillanceVideoLibrary
    },
    {
      path: '/switches-overview',
      name: 'switches-overview',
      component: SwitchesOverview
    },  
  ]
})