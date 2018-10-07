<template>
    <div id="userQrcode-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="userQrcode-main" :style="{backgroundImage: 'url(' + imgSrc + ')', backgroundSize:'contain'}">
            <qrcode :value="qrcodeLink" type="img" class="qrcode" size="120"></qrcode>
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
            bottom:0;
            left:0;
            .qrcode{
                position:absolute;
                left:50%;
                bottom:2rem;
                margin-left:-60px;
            }
        }
    }
</style>
