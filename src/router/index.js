import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import upload from '@/components/upload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: upload
    }
  ]
})
