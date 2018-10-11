<template>
    <div id="userQrcode-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="userQrcode-main" v-if="imgLink">
            <img :src="imgLink" alt="">
            <div class="footer">
                <p class="pictrueInfo">图片摄于2018南非狂野之旅-SABISABI营地</p>
                <p class="notice">长按保存海报，推荐好友<span>赢积分</span></p>
            </div>
        </div>
        <loading :show="showLoading" text="loading"></loading>
    </div>
</template>
<script>
    import {XHeader,Qrcode,Loading} from 'vux'
    export default {
        components: {
            XHeader,
            Qrcode,
            Loading
        },
        name: 'userQrcode',
        data() {
            return {
                title:'我的二维码',
                showLoading:true,
                imgLink:''
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
                        _self.imgLink = res.data.data
                        _self.showLoading = false
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
            padding:.28rem .4rem;
            height:100vh;
            text-align:center;
            img{
                margin-top:.8rem;
                height:84%;
                width:100%;
            }
            .footer {
                background: #fff;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                .pictrueInfo {
                    text-align:right;
                    padding-right:.2rem;
                    font-size: 0.2rem;
                    color: #000;
                }
                .notice {
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .32rem;
                    font-weight: 600;
                    span {
                        color: #fe6130;
                    }
                }
            }
        }
    }
</style>
