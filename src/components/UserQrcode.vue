<template>
    <div id="userQrcode-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="userQrcode-main">
            <img src="../assets/images/qrcode_bg.png" alt="" class="poster">
            <qrcode :value="qrcodeLink" type="img" class="qrcode" :size="100"></qrcode>
            <div class="notice">长按保存海报，推荐好友<span>赢积分</span></div>
        </div>
    </div>
</template>
<script>
    import {XHeader,Qrcode } from 'vux'
    export default {
        components: {
            XHeader,
            Qrcode
        },
        name: 'userQrcode',
        data() {
            return {
                title:'我的二维码',
                qrcodeLink:''
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/user/my_code_img', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 1001) {
                        alert(res.data.msg)
                        return
                    }
                    if(res.data.code == 0){
                        _self.qrcodeLink = res.data.data.s_uid
                    }
                })
            }
        },
        created() {
            this.getInfo()
        }
    }
</script>
<style lang="less">
    #userQrcode-page {
        height: 100vh;
        overflow: hidden;
        .header {
            background-color: #fff;
            font-size: .33rem;
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            .vux-header-title {
                line-height: .8rem;
                height: .8rem;
                color: #666;
                font-weight: 600;
            }
        }
        .userQrcode-main {
            background: #aa805c;
            position:relative;
            padding:.28rem .28rem;
            top:.8rem;
            left:0;
            height:100vh;
            text-align:center;
            img.poster{
                width:100%;
                height:auto;
            }
            .qrcode{
                position:absolute;
                right:.7rem;
                bottom:3rem;
            }
            .notice{
                background: #fff;
                height:1.16rem;
                line-height:1.16rem;
                font-size:.36rem;
                font-weight:600;
                span{
                    color:#fe6130;
                }
            }
        }
    }
</style>
