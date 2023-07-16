// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// login
import login from '@/views/login';
// op home page
import index from '@/views/index';


// register
import register from "../views/users/register";
import settings from "../views/users/settings";



// freshpotatoes
import homepage from "../views/homepage";

import profile from "../views/users/profile";

import forget from "../views/users/forget";

// use Router
Vue.use(Router);
const originalPush = Router.prototype.push
//change original push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// export router
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: login,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },
    {
    path: '/home',
    name: 'homepage',
    component: homepage,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },
    // 用于电影详情页刷新
    {
      path: '/users/profile',
      name: 'profile',
      component: profile,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },{
      path: '/users/forget',
      name: 'forget',
      component: forget,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },{
      path: '/users/settings',
      name: 'settings',
      component: settings,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },

  // fresh end
    {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },{path: '/users/register',
    name: 'register',
    component: register,
    hidden: true,
    meta: {
      requireAuth: false
    }
  } ,
    {
      path: '/index',
      name: 'home',
      component: index,
      iconCls: 'el-icon-tickets',
      children: [
      ]
    }]
})
