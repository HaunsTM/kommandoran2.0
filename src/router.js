import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Bar from '@/components/Bar'
import Foo from '@/components/Foo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: HelloWorld
    },
    {
      path: '/bar',
      name: 'bar',
      component: Bar
    },
    {
      path: '/foo',
      name: 'foo',
      component: Foo
    }
  ]
})