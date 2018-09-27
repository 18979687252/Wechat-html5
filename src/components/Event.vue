<template>
  <div id="event-page">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../assets/images/event-logo.png" alt="" slot="default">
    </x-header>
    <div class="page-main">
      <div class="event-item" v-for="(item, index) in eventList" :key="index" @click="showEvent(item.id)" :style="'background-image: url(/'+ item.pic +')'">
        <!--<img :src="'/'+item.pic" alt="">-->
        <div class="mask"></div>
        <div class="event-name-area">
          <h6 class="event-subname" v-html="item.english_title"></h6>
          <h2 class="event-name">{{item.title}}</h2>
        </div>
        <!--<p class="event-no">{{item.star_time_m}}/<span>{{item.star_time_d}}</span></p>-->
        <p class="event-no" v-if="item.isPast">活动已结束</p>
        <p class="event-no" v-else>{{item.star_time.split(' ')[0]}} </p>
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
  import { XHeader, XDialog, XButton } from 'vux'

  export default {
    components: {
      XHeader,
      XDialog,
      XButton
    },
    name: '',
    data () {
      return {
        eventList: [],
        openDialog: false,
        dialogTit: '品茶活动',
        dialogContent: 'WE俱乐部日前在茶馆举行 <br>' +
        '“品茶之韵味、享悠之生活”主题活动 <br>' +
        '该活动融休闲、体验、文化于一体, <br>' +
        '给在座嘉宾提供一种身心清净的享受 <br>' +
        '举办地址：上海市黄浦区人民广场3333号',
        applyDialog: false,
        isLogin: false,
        applyTitle: '请您先',
        applyInfo: '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 再报名活动 ',

        selectedEvent: {}
      }
    },
    methods: {
      getEvent () {
        let _self = this
        this.$ajax.get('/index/index/activitylist',{params: {sign: localStorage['sign']}}).then(res => {
          _self.eventList = res.data.data
          _self.eventList.forEach((item) => {
            let now_time_stamp = new Date().getTime();
            let event_end_time_stamp = new Date(item.end_time.replace(/-/g, '/')).getTime();
            now_time_stamp > event_end_time_stamp ? item.isPast = true : item.isPast = false

          })
        }).catch((res) => {
          console.log('error', res)
        })


      },
      showEvent (index) {
        this.$router.push({path: 'event-detail', query: {id: index}})
//        this.selectedEvent = this.eventList[index]
//        this.openDialog = true
      },
      toApply () {
        if(localStorage.hasOwnProperty('uid'))
          this.isLogin = true
        else
          this.isLogin = false


        if(this.isLogin){
          let data = {
            article_id: this.selectedEvent.id,
          }
          this.$ajax.post('/index/user/sign', data, {params: {sign: localStorage['sign']}}).then(res => {
            this.openDialog = false
            this.applyDialog = true
            this.applyTitle = '感谢参与'
            this.applyInfo = '通过审核后 <br> 我们将以短信或电话形式通知您'
          })


        }else{
          this.openDialog = false
          this.applyDialog = true
          this.applyTitle = '请您先'
          this.applyInfo = '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 再报名活动'
        }

      }
    },
    created () {
      this.getEvent()
    }
  }
</script>

<style lang="less">
  #event-page {
    min-height: 100vh;
    padding-top: .8rem;
    .event-detail {
      .weui-mask {
        top: .8rem;
        background-color: #fff;
      }
      .weui-dialog {
        /*height: ;*/
        top: .8rem;
        bottom: .37rem;
        box-shadow: 0 5px 5px #999;
        /*border: 1px solid ;*/
        -webkit-transform: translate(0, 0);
        trannsform: translate(0, 0);
        left: .38rem;
        right: .38rem;
        max-width: none;
        width: auto;
      }
    }
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
      background-position: 0 0;
      background-color: #f0f0f0;
      background-repeat: no-repeat;
      background-size: contain;
      .event-item {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-color: transparent;
        height: 4.08rem;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,.5);
        }
        .event-name-area {
          position: absolute;
          bottom: .5rem;
          left: .4rem;
          .event-name {
            color: #fff;
            font-size: .41rem;
            height: 1.2rem;
          }
          .event-subname {
            color: #fff;
            font-size: .16rem;
            position: relative;
            margin-bottom: 10px;
            &:after {
              content: ' ';
              position: absolute;
              width: .84rem;
              left: 0;
              bottom: -5px;
              border-bottom: 1px solid #fff;
            }
          }
        }
        .event-no {
          position: absolute;
          right: .41rem;
          bottom: .5rem;
          color: #fff;
          /*font-size: .5rem;*/
          font-size: .28rem;
          border-top: 1px solid #fff;
          border-bottom: 1px solid #fff;
          span {
            font-size: .24rem;
          }
        }

      }
    }
  }
</style>
