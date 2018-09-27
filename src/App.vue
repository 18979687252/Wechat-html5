<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  * {
    padding: 0;
    margin: 0;
    line-height: normal;
    box-sizing: border-box;
    text-decoration: none;
    letter-spacing: inherit;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
  html, body {
    font-family: "Microsoft YaHei", '微软雅黑', Arial, SansSerif, sans-serif;
    background-color: #f6f6f6;
    min-height: 100%;
    overflow-x: hidden;
  }
  body {
    font-size: .24rem;
  }
  .icon {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-attachment: scroll;
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
    &.icon-user {
      background-image: url("assets/images/icon-user.png");
      width: .29rem;
      height: .33rem;
    }
    &.icon-phone {
      background-image: url("assets/images/icon-phone.png");
      width: .29rem;
      height: .33rem;
    }
    &.icon-date {
      background-image: url("assets/images/icon-date.png");
      width: .29rem;
      height: .30rem;
    }
    &.icon-idcard {
      background-image: url("assets/images/icon-idcard.png");
      width: .29rem;
      height: .30rem;
    }
    &.icon-pwd {
      background-image: url("assets/images/icon-pwd.png");
      width: .29rem;
      height: .34rem;
    }
    &.icon-next {
      background-image: url("assets/images/icon-next.png");
      width: .63rem;
      height: .63rem;
    }
    &.icon-close {
      background-image: url("assets/images/icon-close.png");
      width: .16rem;
      height: .16rem;
    }
    &.icon-jiaozi {
      background-image: url("assets/images/member-jiaozi.jpg");
      width: .44rem;
      height: .62rem;
    }
    &.icon-tongbao {
      background-image: url("assets/images/member-tongbao.jpg");
      width: .72rem;
      height: .72rem;
    }
    &.icon-wuzhu {
      background-image: url("assets/images/member-wuzhu.jpg");
      width: .72rem;
      height: .72rem;
    }
    &.icon-addr {
      background-image: url("assets/images/icon-addr.png");
      width: .29rem;
      height: .36rem;
    }
  }
  .centerTxt {
    text-align: center;
  }
  .leftTxt{
    text-align: left;
  }
  .rightTxt{
    text-align: right;
  }
  .fr{
    float:right;
  }
  .fl{
    float:left;
  }
  .fixClear{
    overflow:hidden;
    clear:both;
  }
  .default-btn {
    box-sizing: content-box;
    font-size: .24rem;
    height: .62rem;
    line-height: .62rem;
    border: 2px solid #b4967c;
    color: #b4967c;
    border-radius: 50px;
    width: 1.83rem;
    display: inline-block;
    background-color: transparent;

  }
  .weui-toast {
    padding: 0 10px;
  }
</style>
