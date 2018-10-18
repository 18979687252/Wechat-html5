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
import { WechatPlugin} from 'vux'

Vue.use(WechatPlugin)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAwesomeSwiper)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$ajax = axios

// 路由逻辑为所有的页面添加自定义分享
router.afterEach((to, from, next) => {
   if(!to.meta.shareInComponent){
       let url = encodeURIComponent(window.location.href.split('#')[0])
       let href = window.location.href.split('#')[0] + '#' + to.fullPath
       //console.log(href)
       axios.get('/index/user/ceshi', {params: {head_portrait:url}}).then(res => {
           let wxConfig = res.data
           Vue.wechat.config({
               debug: false,
               appId: wxConfig.appId,
               timestamp: wxConfig.timestamp,
               nonceStr:wxConfig.nonceStr,
               signature: wxConfig.signature,
               jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
           })
           Vue.wechat.onMenuShareAppMessage({
               title: '中城银信',
               desc: '中城银信 W•E CLUB-ONLY FOR YOU',
               link: href,
               imgUrl:'http://wx.ccccmt.com/public/images/sharelogo.jpg'
           })
           Vue.wechat.onMenuShareTimeline({
               title: '中城银信 W•E CLUB-ONLY FOR YOU',
               link: href,
               imgUrl:'http://wx.ccccmt.com/public/images/sharelogo.jpg'
           })
       })
   }
})

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


