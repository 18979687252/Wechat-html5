<template>
    <div id="userQrcode-page">
        <!--<x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>-->
        <div class="userQrcode-main">
            <!--<img :src="imgSrc" alt="">-->
            <img :src="imgSrc" class="img_bg" alt="">
            <qrcode :value="qrcodeLink" type="img" class="qrcode" size="90"></qrcode>
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
                qrcodeLink:'',
                imgSrc:''
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
                        _self.imgSrc = 'http://' + res.data.data.bg_img
                        _self.qrcodeLink = 'http://' + res.data.data.s_uid
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
        min-height: 100vh;
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
            min-height: 100vh;
            position:relative;
            .img_bg{
                min-height: 100vh;
                position:absolute;
                top:0;
                left:0;
                z-index:1;
            }
            .qrcode{
                position:absolute;
                z-index:2;
                bottom:2rem;
                right:1rem;
            }
        }
    }
</style>
