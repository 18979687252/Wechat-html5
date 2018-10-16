<template>
  <div id="rights-page">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../assets/images/event-logo.png" alt="" slot="default">
    </x-header>
    <div class="page-main">
      <h1>
        <img src="../assets/images/rights-title.png" alt="">
      </h1>
      <div>
        <img src="../assets/images/rights-tab.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    name: '',
    data () {
      return {
        title: '会员权益'
      }
    }
  }
</script>

<style lang="less">
  #rights-page {
    min-height: 100vh;
    padding-top: .8rem;
    background: url("../assets/images/bg-rights.png") no-repeat scroll bottom transparent;
    background-size: cover;
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
    .page-main {
      padding: .6rem .65rem;
      h1 {
        color: #2c2e31;
        font-size: .41rem;
        text-align: center;
        margin-bottom: .6rem;
        img {
          width: 6.03rem;
        }
      }
      table {
        border-radius: 10px;
        /*background-color: rgba(0,0,0,.3);*/
        overflow: hidden;
        border-collapse: separate;
        border-spacing: 1px;
        text-align: center;
        th {
          background-color: rgba(0,0,0,.3);
          font-size: .29rem;
          color: #fff;
          font-weight: bold;
          /*border: 1px solid rgba(255,255,255,.5);*/
          height: .75rem;
        }
        td {
          /*border: 1px solid rgba(255,255,255,.5);*/
          height: 1.06rem;
          padding: .15rem;
          font-size: .2rem;
          color: #ffffff;
          background-color: rgba(0,0,0,.3);
          svg {
            fill: #fff;
          }
        }
      }
    }
  }
</style>
