// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'lib-flexible'
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入icon
import './assets/icon/iconfont.css'
// ant vue
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css'

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 使用element UI
Vue.use(ElementUI);
Vue.use(Ant)
// 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

// 路由拦截器
// router.beforeEach((to, from, next) => {
//     if (to.matched.length != 0) {
//         if (to.meta.requireAuth) { // requireAuth or not
//           // console.log("test login: ", localStorage.getItem("userInfo"))
//             if (Boolean(localStorage.getItem("userInfo"))) { // vuex state now if use exist
//                 next();
//             } else {
//                 next({
//                     path: '/login',
//                     query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                 })
//             }
//         } else {
//             if (Boolean(localStorage.getItem("userInfo"))) { // login or not
//                 if (to.path != "/" && to.path != "/login") { //if to login page or not
//                     next();
//                 } else {
//                     /**
//                      * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
//                      */
//                     // next({
//                     //     path: '/goods/Goods'
//                     // })
//                      console.log('user role: ',localStorage.getItem("userRole"))
//                   if (localStorage.getItem("userRole") == 0){
//
//                     next({
//                       path: '/users/userHome'
//                     })
//                   }else if(localStorage.getItem("userRole") == 1){
//                     next({
//                       path: '/operators/track'
//                     })
//                   }else if(localStorage.getItem("userRole") == 2) {
//                     next({
//                       path: '/manager/datavis'
//                     })
//
//                   }
//                 }
//             } else {
//                 next();
//             }
//         }
//     } else {
//         next({
//             path: '/login',
//             query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//     }
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    data: {
        Bus: new Vue()
    }

})
