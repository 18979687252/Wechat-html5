// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('swiper/dist/css/swiper.css')
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

import axios from 'axios'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAwesomeSwiper)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth > 750) deviceWidth = 750;
var dpr = window.devicePixelRatio || 1;
document.documentElement.setAttribute('data-dpr', dpr);
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
//
// var lastY;//最后一次y坐标点
// document.body.addEventListener('touchstart', function (event) {
//   lastY = event.changedTouches[0].clientY;
// })
// document.body.addEventListener('touchmove', function (event) {
//   var y = event.changedTouches[0].clientY;
//   var st = document.body.scrollTop;
//   if (y >= lastY && st <= 10) {
//     lastY = y;
//     event.preventDefault();
//   }
//   lastY = y;
// })

