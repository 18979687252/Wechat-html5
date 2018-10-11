<template>
  <div id="eventdetail-page">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../assets/images/event-logo.png" alt="" slot="default">
    </x-header>
    <div class="page-main">
      <swiper dots-position="center" auto>
        <swiper-item v-for="(item, index) in event.imgs" :key="index">
          <img :src="'/' + item" alt="">
        </swiper-item>
      </swiper>
      <!--<h1>{{event.title}}</h1>-->
      <div class="event-desc"  v-html="event.rule_info"></div>
      <div class="time-info">
        <p class="event-no">{{event.star_time_m}}/<span>{{event.star_time_d}}</span></p>
        <!--<a href="javascript:;" @click="toApply" v-if="!event.isPast">-->
          <!--<img src="../assets/images/event-apply-btn.jpg" alt="" />-->
        <!--</a>-->
        <!--<a href="javascript:;" v-else>-->
          <!--<img src="../assets/images/event-apply-btn-disabled.jpg" alt="" />-->
        <!--</a>-->
      </div>
    </div>

    <div >
      <x-dialog v-model="applyDialog" class="login-dialog">
        <div class="dialog-title">
          <img src="../assets/images/event-apply-banner.png" alt="">
        </div>
        <div class="dialog-body">
          <h2>{{applyTitle}}</h2>
          <p v-html="applyInfo"></p>
        </div>

        <div @click="applyDialog=false" class="dialog-close">
          <span class="vux-close"><i class="icon icon-close"></i></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import { XHeader, XDialog, XButton, Swiper, SwiperItem } from 'vux'
  export default {
    components: {
      XHeader,
      XDialog,
      XButton,
      Swiper,
      SwiperItem
    },
    name: '',
    data () {
      return {
        openDialog: false,
        applyDialog: false,
        isLogin: true,
        applyTitle: '请您先',
        applyInfo: '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 再报名活动 ',
        selectedEvent: {},
        event: {},
        id: this.$route.query.id,
        wxconfig:{}
      }
    },
    methods: {
      getEvent () {
        let _self = this
        let id = this.$route.query.id
        this.$ajax.get('/index/index/activityinfo',{params: {id, sign: localStorage['sign']}}).then(res => {
          _self.event = res.data.data[0]
          let now_time_stamp = new Date().getTime();
          let event_end_time_stamp = new Date(_self.event.end_time.replace(/-/g, '/')).getTime();
          now_time_stamp > event_end_time_stamp ? _self.event.isPast = true : _self.event.isPast = false
        })
      },
      toApply () {
        const _self = this
        let now_timestamp = new Date().getTime();
        if(now_timestamp > _self.event.signup_end_time || now_timestamp < _self.event.signup_sta_time) {
          this.openDialog = false
          this.applyDialog = true
          this.applyTitle = ''
          this.applyInfo = '不在报名时间内！'
          return
        }

        if(localStorage.hasOwnProperty('uid'))
          this.isLogin = true
        else
          this.isLogin = false

        if(this.isLogin){
          let data = {
            article_id: this.id,

          }
          this.$ajax.post('/index/user/sign', data, {params: {sign: localStorage['sign']}}).then(res => {
            // console.log(res)
            // alert(res.data)
            if(res.data.code == 10010){
              this.openDialog = false
              this.applyDialog = true
              this.applyTitle = '请您先'
              this.applyInfo = '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 再报名活动'
            }else if(res.data.code == 0){
              this.openDialog = false
              this.applyDialog = true
              this.applyTitle = '感谢参与'
              this.applyInfo = '通过审核后 <br> 我们将以短信或电话形式通知您'
            }else {
              this.openDialog = false
              this.applyDialog = true
              this.applyTitle = ''
              this.applyInfo = res.data.msg
            }
          })
        }else{
          this.openDialog = false
          this.applyDialog = true
          this.applyTitle = '请您先'
          this.applyInfo = '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 再报名活动'
        }
      },
      getConfig(){
        let url = window.location.href
        this.$ajax.get('/index/user/ceshi', {params: {head_portrait:url}}).then(res => {
            this.wxconfig = res.data.wxconfig
            alert(this.wxconfig.signature)
        })
      }
    },
    created () {
      this.getEvent()
      this.getConfig()
    },
    mounted(){
        let _self = this
        _self.$wechat.config({
            debug: false,
            appId: _self.wxconfig.appId,
            timestamp: _self.wxconfig.timestamp,
            nonceStr: _self.wxconfig.nonceStr,
            signature: _self.wxconfig.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        })
        _self.$wechat.onMenuShareAppMessage({
            title: _self.event.title,
            desc: _self.event.describe_info,
            link: window.location.href,
            imgUrl: this.event.pic
        })
        _self.$wechat.onMenuShareTimeline({
            title: _self.event.title,
            link: window.location.href,
            imgUrl: _self.event.pic
        })
    }
  }
</script>

<style lang="less">
  #eventdetail-page {
    min-height: 100vh;
    padding-top: .8rem;
    background-color: #fff;
    .header {
      background-color: #fff;
      font-size: .33rem;
      color: #fff;
      padding: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      img {
        width: 2.25rem;
      }
      .vux-header-title {
        line-height: .8rem;
        height: .8rem;
      }
    }
    .default-btn {
      border: 0 none;
      text-decoration: underline;
      line-height: normal;
      height: auto;
      font-weight: normal;
    }
    .weui-dialog {
      border-radius: 10px;
      overflow: visible;
      width: 6.68rem;
      .dialog-close {
        position: absolute;
        text-align: center;
        line-height: .5rem;
        width: .5rem;
        background-color: #434343;
        top: -.25rem;
        right: -.25rem;
        border-radius: 50px;

      }
      .dialog-title {
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        .event-img {
          height: 4.34rem;
          background-position: center;
          background-size: cover;
        }
      }
      .dialog-body {
        padding: .3rem 0;
        h2 {
          font-size: .33rem;
          color: #000;
          margin-bottom: 10px;
        }
        p {
          font-size: .24rem;
          color: #989b9f;
          line-height: 2em;
        }
      }
      .dialog-footer {
        padding-left: 20px;
        padding-bottom: 20px;
        .event-no {
          text-align: left;
          color: #000;
          font-size: .5rem;
          span {
            font-size: .24rem;
          }
        }
        a {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          width: 1.43rem;
          img {
            vertical-align: bottom;
          }
        }
      }
    }
    .page-main {
      position: fixed;
      left: .38rem;
      right: .38rem;
      top: .8rem;
      bottom: .37rem;
      box-shadow: 0 5px 5px #999;
      border-radius: 10px;
      overflow: hidden;
      .vux-slider {
        border-radius: 10px 10px 0 0;
        .vux-swiper {
          border-radius: 10px 10px 0 0;
        }

      }
      .vux-indicator {
        i {
          background-color: rgba(0,0,0,.7);
          &.active {
            background-color: #fff;
          }
        }
      }
      h1 {
        text-align: center;
        color: #2c2e31;
        font-size: .42rem;
        margin: .5rem 0 .4rem;
      }
      .event-desc {
        text-align: center;
        font-size: .24rem;
        color: #989b9f;
        padding: 0 10px;
        overflow: auto;
        height: 50%;
        -webkit-overflow-scrolling: touch;
        position: relative;
        z-index: 10;
        margin: .5rem 0 0;
      }
      .time-info {
        position: absolute;
        bottom: 0;
        left: .25rem;
        right: 0;
        .event-no {
          text-align: left;
          color: #000;
          font-size: .5rem;
          line-height: 1.53rem;
          span {
            font-size: .24rem;
          }
        }
        a {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          width: 1.53rem;
          img {
            vertical-align: bottom;
          }
        }
      }
    }
  }
</style>
