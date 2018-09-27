<template>
  <div id="club-page">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../assets/images/event-logo.png" alt="" slot="default">
    </x-header>
    <div class="club-allImg">
      <img src="../assets/images/club-all.png" alt="">
      <router-link to="gift" class="gift-btn"></router-link>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    name: 'Club'
  }
</script>

<style lang="less">
  #club-page {
    min-height: 100vh;
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
    .club-allImg {
      padding-top:.8rem;
      position:relative;
        .gift-btn {
          position: absolute;
          bottom: .2rem;
          right: .3rem;
          width:2rem;
          height:.52rem;
          background: url('../assets/images/gift-btn.png') no-repeat;
          background-size:contain;
        }
    }
  }
</style>
