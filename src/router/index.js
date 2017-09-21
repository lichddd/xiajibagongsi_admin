import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import login from '@/views/login'
import news from '@/views/news'
import upload from '@/views/upload'

import {Message} from 'element-ui'
import cookie from '@/util/cookie'
Vue.use(Router)
let router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      name: 'login',
      component: login
    }
    ,
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
router.beforeEach((to,from,next)=>{
  if (to.name!="login") {
    if (cookie.getCookie("token")) {
      next();
    } else {
      if (from&&from.fullPath && from.fullPath!="/") {
        Message({showClose:true,message:"尚未登录或登录信息已过期,请重新登录",type:"warning"});
      }
      next({
        name:"login",
        query:{
          redirect:to.fullPath
        }


      });
    }




  } else {
    next();
  }




})



export default router;
