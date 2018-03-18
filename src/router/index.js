import Vue from 'vue'
import Router from 'vue-router'
import SchedulerComponent from '@/components/SchedulerComponent'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SchedulerComponent',
      component: SchedulerComponent
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
