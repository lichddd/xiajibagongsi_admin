import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import news from '@/views/news'
import upload from '@/views/upload'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: home
    }
    ,
    {
      path: '/news',
      name: 'news',
      component: news
    }
    ,
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
