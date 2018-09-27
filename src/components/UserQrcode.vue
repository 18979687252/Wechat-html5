<template>
    <div id="userQrcode-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="userQrcode-main">
            <img :src="imgSrc" alt="">
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
            img{
                min-height: 100vh;
            }
        }
    }
</style>
