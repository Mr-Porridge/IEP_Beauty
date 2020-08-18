import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
//import store from './vuex/store'

/*第三组整合时用到了store.js*/
import store from './components/tools/store';
import VueResource from 'vue-resource';

import wordExport from './vendor/jquery.wordexport'

import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import axios from 'axios'
//import Mock from './mock'
//Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import 'lib-flexible/flexible.js'



Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(wordExport);
//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app');

