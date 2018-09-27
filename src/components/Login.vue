<template>
  <div id="" class="login">
    <div class="logo">
      <img src="../assets/images/login-logo.png" alt="">
    </div>
    <div class="login-main">
      <!--<h1>{{title}}</h1>-->
      <h1>
        <img src="../assets/images/regist_title.jpg" alt="">
      </h1>
      <div>
        <group>
          <label>姓名</label>
          <x-input placeholder="请输入您的真实姓名" class="login-ipt" v-model="username">
            <i class="icon icon-user" slot="label"></i>
          </x-input>
        </group>
        <group>
          <label>手机</label>
          <x-input type="tel" placeholder="请输入您的手机号码" class="login-ipt" v-model="mobile">
            <i class="icon icon-phone" slot="label"></i>
          </x-input>
        </group>

        <group>
          <label>生日</label>
          <datetime v-model="birthday" :min-year=1920 :max-year=2050 class="login-ipt" placeholder="请选择您的生日">
            <i class="icon icon-date" slot="title"></i>
          </datetime>
        </group>
        <group>
          <label>身份证</label>
          <x-input placeholder="请输入身份证后四位" class="login-ipt" v-model="idNo">
            <i class="icon icon-idcard" slot="label"></i>
          </x-input>
        </group>
        <group>
          <label>验证码</label>
          <x-input placeholder="请输入验证码" class="weui-vcode login-ipt" v-model="veriCode">
            <x-button slot="right" type="primary" mini class="vericode-btn" @click.native="sendVeriCode">{{getCode}}</x-button>
            <i class="icon icon-pwd" slot="label"></i>

          </x-input>
        </group>
        <group>
          <x-button class="submit-btn" type="button" @click.native="regist">提交</x-button>
        </group>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="openDialog" class="login-dialog">
        <div class="dialog-title">
          <img src="../assets/images/regist-dialog-title.jpg" alt="">
          <h2>{{dialogHead}}</h2>
        </div>
        <div class="dialog-body">
          <h2>{{dialogTit}}</h2>
          <p>{{dialogContent}}</p>
          <p>{{dialogContent2}}</p>
        </div>
        <div class="dialog-footer" v-if="userStatus == 1">
          <p>
            <router-link to="fullinfo">
              <i class="icon icon-next"></i>
              <br>
              完善信息
            </router-link>

          </p>
        </div>
        <div @click="closeDialog" class="dialog-close">
          <span class="vux-close"><i class="icon icon-close"></i></span>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
  import { Group, Datetime, XInput, XButton, XDialog } from 'vux'

  export default {
    components: {
      Group,
      Datetime,
      XInput,
      XButton,
      XDialog
    },
    name: 'login',
    data () {
      return {
        title: '注册会员',
        username: '',
        birthday: '',
        mobile: '',
        veriCode: '',
        openDialog: false,
        dialogTit: '',
        dialogContent: '',
        dialogContent2: '',
        getCode : '获取验证码',
        canGetCode: true,
        idNo: '',
        userStatus: '',
        dialogHead: '',
        isRegistFailed: false
      }
    },
    methods: {
      closeDialog () {
        if(!this.isRegistFailed)
          this.$router.back()
        else
          this.openDialog = false
      },
      regist () {
        let _self = this
        if(_self.username.length === 0 ||  _self.mobile.length === 0 || _self.birthday.length === 0 || _self.idNo.length === 0 || _self.veriCode.length === 0){
          _self.dialogHead = '注册会员'
          _self.dialogTit = ''
          _self.dialogContent = '请您先完善信息，谢谢！'
          _self.dialogContent2 = ''
          _self.isRegistFailed = true
          _self.openDialog = true
          return
        }
        if(_self.idNo.length !== 4){
          _self.dialogHead = '注册会员'
          _self.dialogTit = ''
          _self.dialogContent = '请您正确填写身份证后四位，谢谢！'
          _self.dialogContent2 = ''
          _self.isRegistFailed = true
          _self.openDialog = true
          return
        }
        this.$ajax.post('/index/user/userreg', {username: _self.username, mobile: _self.mobile, birthday: _self.birthday, id_number: _self.idNo, code: _self.veriCode}, { params: {sign: localStorage['sign']}}).then((res) => {
          localStorage.uid = res.data.data.id
          _self.userStatus = res.data.data.status
          if(res.data.data.status == 2){
            _self.dialogHead = '注册成功'
            _self.dialogTit = '信息填写完成'
            _self.dialogContent = '我们将在3个工作日内进行审核'
            _self.dialogContent2 = '感谢支持'
            _self.isRegistFailed = false
          }else if (res.data.data.status == 1){
            _self.dialogHead = '注册成功'
            _self.dialogTit = '恭喜您！'
            _self.dialogContent = '请您继续完善信息'
            _self.dialogContent2 = '我们将为您提供更优质的服务'
            _self.isRegistFailed = false
          }else{
            _self.dialogHead = '注册会员'
            _self.dialogTit = ''
            _self.dialogContent = res.data.msg
            _self.dialogContent2 = ''
            _self.isRegistFailed = true
          }
          _self.openDialog = true
        }, (res) => {
          console.log('rejected',res)
          _self.dialogHead = '注册会员'
          _self.dialogTit = '错误'
          _self.dialogContent = res.data.msg
          _self.dialogContent2 = ''
          _self.openDialog = true
          _self.isRegistFailed = true
        }).catch(res => {
          console.log('catch',res)
          _self.dialogHead = '注册会员'
          _self.dialogTit = '错误'
          _self.dialogContent = res.data.msg
          _self.dialogContent2 = ''
          _self.openDialog = true
          _self.isRegistFailed = true
        })

      },
      sendVeriCode () {
        let _self = this
        if(_self.mobile.length != 11){
          _self.dialogHead = '注册会员'
          _self.dialogTit = ''
          _self.dialogContent = '请正确填写手机号'
          _self.dialogContent2 = ''
          _self.openDialog = true
          _self.isRegistFailed = true
          return
        }
        if(_self.canGetCode){
          let seconds = 60
          this.$ajax.get('/index/index/smssend', {params: {mobile: _self.mobile, sign: localStorage['sign']}}).then(() => {
            _self.getCode = '60s后重新获取'
            _self.canGetCode = false
            let timeLoop = setInterval(function(){
              _self.getCode = seconds + `s后重新获取`
              seconds--;
              if(seconds <= 0){
                seconds = 0
                _self.canGetCode = true
                _self.getCode = '获取验证码'
                clearInterval(timeLoop)
              }
            }, 1000)
          })
        }

      }
    },
    created () {
    }
  }
</script>

<style lang="less">
  .login {
    min-height: 100vh;
    background: url("../assets/images/login-bg.jpg") no-repeat scroll 0 0 transparent;
    background-size: cover;
    padding-top: .5rem;
    .weui-dialog {
      border-radius: 10px;
      overflow: visible;
      padding-bottom: .3rem;
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
        position: relative;
        h2 {
          position: absolute;
          color: #fff;
          font-size: .42rem;
          bottom: .4rem;
          left: .3rem;
        }
      }
      .dialog-body {
        padding: .3rem 0 0;
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
        padding: .3rem 0 0;
        p {
          color: #b4967c;
          font-size: .24rem;
          a {
            color: #b4967c;

          }
        }
      }
    }
    .weui-cells {
      margin-top: .1rem;
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
        &:after {
          border-width: 0 2px 2px 0;
          border-color: #000;
        }
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
        min-width: 1.93rem;
        background-color: transparent;
        padding: 0;

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

    }
    .logo {
      width: 3.57rem;
      margin: 0 auto;
    }
    h1 {
      font-size: .41rem;
      color: #2c2e31;
      text-align: center;
      img {
        width: 2.19rem;
      }
    }
    .login-main {
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #f1f4f7;
      width: 6.27rem;
      margin: .5rem auto 0;
      padding: .4rem .5rem;
      .login-ipt {
        background-color: #f2f1f6;
        border-radius: 50px;
        height: .62rem;
        &:before, &:after {
          border: 0 none;
        };
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #989b9f;

  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #989b9f;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #989b9f;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #989b9f;
  }
</style>
