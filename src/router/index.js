import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import New from '@/components/new'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pres'
    },
    {
      path: '/pres',
      component: resolve => require(['@/views/pres.vue'], resolve)
    },
    {
      path: '/second',
      component: resolve => require(['@/views/second.vue'], resolve)
    }
  ]
})
