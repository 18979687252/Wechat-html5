<template>
  <div id="gift-page">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../assets/images/event-logo.png" alt="" slot="default">
    </x-header>
    <div class="page-main">
      <div>
        <div>
          <img src="../assets/images/sample-gift.jpg" alt="">
        </div>
        <!--<div v-html="desc" class="gift-desc">-->

        <!--</div>-->
      </div>
      <group class="btn-area">
        <template v-if="canGet">
          <x-button type="button" class="member-rights-btn" @click.native="getGift">{{getTxt}}</x-button>
        </template>
        <template v-else>
          <x-button type="button" class="member-rights-btn getted">{{getTxt}}</x-button>
        </template>
      </group>
    </div>
    <div >
      <x-dialog v-model="getDialog" class="login-dialog">
        <!--<div class="dialog-title">-->
        <!--<img src="../assets/images/gift-pop-title.png" alt="">-->
        <!--</div>-->
        <div class="dialog-body">
          <h2 >
            <img src="../assets/images/gift-title.jpg" alt="">
          </h2>
          <div>
            <group>
              <label>姓名</label>
              <span>必填*</span>
              <x-input placeholder="请输入您的真实姓名" required class="login-ipt" v-model="realname">
                <i class="icon icon-user" slot="label"></i>
              </x-input>
            </group>
            <group>
              <label>手机</label>
              <span>必填*</span>

              <x-input placeholder="请输入您的手机号码" required class="login-ipt" v-model="mobile">
                <i class="icon icon-phone" slot="label"></i>
              </x-input>
            </group>
            <group>
              <label>地址</label>
              <span>必填*</span>

              <x-input placeholder="请输入您的地址" required class="login-ipt" v-model="addr">
                <i class="icon icon-addr" slot="label"></i>
              </x-input>
            </group>
            <group>
              <x-button class="submit-btn" @click.native="submit">提交</x-button>
            </group>
          </div>
        </div>

        <div @click="getDialog=false" class="dialog-close">
          <span class="vux-close"><i class="icon icon-close"></i></span>
        </div>
      </x-dialog>
    </div>
    <div >
      <x-dialog v-model="applyDialog" class="login-dialog">
        <div class="dialog-title">
          <img src="../assets/images/gift-pop-title.png" alt="">
        </div>
        <div class="dialog-body">
          <h2>{{getTitle}}</h2>
          <p v-html="getBody">

          </p>
        </div>

        <div @click="applyDialog=false" class="dialog-close">
          <span class="vux-close"><i class="icon icon-close"></i></span>
        </div>
      </x-dialog>
    </div>


  </div>
</template>

<script>
  import { XHeader, Group, XButton, XDialog, XInput } from 'vux'

  export default {
    components: {
      XHeader,
      Group,
      XButton,
      XDialog,
      XInput
    },
    name: 'Gift',
    data () {
      return {
        getTxt: '立即领取',
        canGet: true,
        desc: '<p style="color: #989b9f; font-size: .2rem;">领取资格：首次注册并验证通过的W▪E会员可申请领取LAMY系列精美礼盒一份。<br>' +
        '<br>' +
        '领取规则：会员礼只可领取一次，重新入会无法再次领取。<br>' +
        '<br>' +
        '领取方法：在本页面点击“申请领取”->填写收货信息-> 申领成功，10个工作日内WE俱乐部会将礼品快递寄出。<br>' +
        '<br>' +
        '最终解释权归W▪E俱乐部所有</p>',
        applyDialog: false,
        isLogin: true,
        getDialog: false,
        getTitle: '',
        getBody: '',
        realname: '',
        mobile: '',
        addr: ''
      }
    },
    created () {
      this.isGetted()
    },
    methods: {
      isGetted () {
        this.$ajax.get('/index/user/isReceiveGift', {params: {sign: localStorage['sign']}}).then(res => {
          //console.log('getted', res)
          let code = res.data.data.code
          if (+code === 0) {
            this.getTxt = '立即领取'
            this.canGet = true
          } else if (+code === 1) {
            this.getTxt = '您已领取'
            this.canGet = false
          }
        })
      },
      getGift () {
//        if(localStorage.hasOwnProperty('uid'))
//          this.isLogin = true
//        else
//          this.isLogin = false

        if(this.isLogin){
          this.getDialog = true


        }else{
          this.applyDialog = true
          this.getTitle = ' '
          this.getBody = '<a href="#/regist" class="default-btn">登录/注册会员</a> <br> 领取专属会员礼'
        }
      },
      submit () {
        if(this.realname.length === 0){
          this.applyDialog = true
          this.getTitle = ''
          this.getBody = '请您填写收件人姓名'
          return
        }

        if(this.mobile.length !== 11){
          this.applyDialog = true
          this.getTitle = ''
          this.getBody = '请您填写收件人电话'
          return
        }
        if(this.addr.length < 10){
          this.applyDialog = true
          this.getTitle = ''
          this.getBody = '请您填写收件人地址'
          return
        }

        let data = {
          name: this.realname,
          mobile: this.mobile,
          address: this.addr,

        }

        this.$ajax.post('/index/user/receiveGift', data, {params: {sign: localStorage['sign']}}).then(res => {
          if(res.data.code == 10010){
            this.getDialog = false
            this.applyDialog = true
            this.getTitle = '出错啦'
            this.getBody = res.data.msg
            return
          }else if(res.data.code == 10011){
            this.getDialog = false
            this.applyDialog = true
            this.getTitle = '领取失败'
            this.getBody = res.data.msg
            return
          }else if(res.data.code == 0){
            this.getDialog = false
            this.applyDialog = true
            this.getTitle = '恭喜您！'
            this.getBody = '10个工作日内W·E俱乐部会将礼品快递寄出'
            this.getTxt = '您已领取'
            this.canGet = false
            return
          }else if(res.data.code == 1001){
            this.getDialog = false
            this.applyDialog = true
            this.getTitle = ''
            this.getBody = '您还不是会员不能领取会员礼遇'
          }
          this.getDialog = false
          this.applyDialog = true
          this.getTitle = ''
          this.getBody = res.data.msg
        }).catch(res => {
          alert('提交失败，请稍后尝试')
//          this.getDialog = false
//          this.applyDialog = true
//          this.getTitle = '出错啦'
//          this.getBody = res.data.msg
        })
//        this.getDialog = false
//        this.applyDialog = true
//        this.getTitle = '恭喜您申领成功！'
//        this.getBody = '10个工作日内W·E俱乐部会将礼品快递寄出'


      }
    }
  }
</script>

<style lang="less">
  #gift-page {
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
    .login-dialog {
      z-index: 9999;
      position: relative;
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
      }
      .dialog-body {
        padding: .3rem 0;
        h2 {
          font-size: .33rem;
          color: #000;
          margin-bottom: 10px;
          margin-top: .22rem;
          img {
            width: 2.17rem;
          }
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

      .gift-desc {
        padding: 0 .7rem;
        margin-top: .5rem;
      }
      .btn-area {
        width: 6.73rem;
        margin: .4rem auto 0;
        background-color: transparent;
        .weui-cells {
          background-color: transparent;
        }
        .member-rights-btn {
          background-color: #b4967c;
          height: .62rem;
          color: #fff;
          border-radius: 50px;
          font-size: .3rem;
          line-height: .62rem;
          &.getted {
            opacity: .5;
          }
        }
      }
    }
    .login-ipt {
      background-color: #f2f1f6;
      border-radius: 50px;
      height: .62rem;
      &:before, &:after {
        border: 0 none;
      };
    }
    .weui-input {
      font-size: .24rem;
      height: 22px;
    }
    .weui-cells {
      margin-top: 10px;
      text-align: left;
      padding: 0 .88rem;
      &:before {
        border:  0 none;
      }
      &:after {
        border: 0 none;
      }
      label {
        font-size: .22rem;
        color: #989b9f;
      }
      span {
        position: absolute;
        right: .88rem;
        color: #d84909;
        font-size: .19rem;
        top: 6px;
      }
      .submit-btn {
        background-color: #b4967c;
        height: .61rem;
        color: #fff;
        border-radius: 50px;
        font-size: .24rem;
        margin-top: .56rem;
      }

      .weui-input {
        font-size: .24rem;
        height: 22px;
      }
      .vux-datetime-value {
        text-align: left;
        font-size: .24rem;
        padding-left: 5px;
      }
      .weui-cell__bd {
        padding-left: 5px;
      }
      .vericode-btn {
        font-size: .24rem;
        height: .62rem;
        border: 2px solid #b4967c;
        color: #b4967c;
        border-radius: 50px;
        width: 1.93rem;
        background-color: transparent;
      }
      .weui-vcode {
        padding-right: 0;
        &:before {
          border: 0 none;
        }
        &:after {
          border: 0 none;
        }
      }
      .submit-btn {
        background-color: #b4967c;
        height: .61rem;
        color: #fff;
        border-radius: 50px;
        font-size: .24rem;
        margin-bottom: .6rem;
      }

    }
  }
</style>
