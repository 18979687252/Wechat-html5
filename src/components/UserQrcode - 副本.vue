<template>
    <div id="userQrcode-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="userQrcode-main">
            <qrcode :value="qrcodeLink" type="img" class="qrcode" :size="100"></qrcode>
            <canvas id="canvas" width="320" height="460"></canvas>
            <img src="" alt="" class="poster">
            <div class="notice">长按保存海报，推荐好友<span>赢积分</span></div>
        </div>
    </div>
</template>
<script>
    import {XHeader,Qrcode } from 'vux'
    import * as $ from 'jquery'
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
                        _self.qrcodeLink = res.data.data.s_uid
                        _self.imgSrc = 'http://' + res.data.data.bg_img
                    }
                })
            }
        },
        created() {
            this.getInfo()
        },
        // mounted(){
        //     //画海报
        //     var c = document.getElementById("canvas")
        //     var ctx = c.getContext("2d")
        //
        //     //首先画上背景图
        //     var img = new Image()
        //     img.src = 'https://www.hivequant.com/chart/35.png'
        //     img.setAttribute("crossOrigin", 'Anonymous')
        //
        //     //二维码
        //     var codeimg = new Image()
        //     codeimg.src = 'data:image/png;base64,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';
        //     codeimg.setAttribute("crossOrigin", 'Anonymous')
        //
        //     codeimg.onload = function() { //必须等待图片加载完成
        //         ctx.drawImage(codeimg, 0, 0, 72, 72);
        //     }
        //
        //     img.onload = function() { //必须等待图片加载完成
        //         ctx.drawImage(img, 0, 0, 320, 400); //绘制图像进行拉伸
        //     }
        //     //绘制完成,转为图片
        //     setTimeout(function() {  //在ios上无法在画完之后取到整个画布内容，加了个settimeout
        //         var bigcan = $('canvas')[1];
        //         let images = new Image();
        //         images.src = bigcan.toDataURL("image/png");
        //         images.setAttribute("crossOrigin", 'Anonymous')
        //         $('.poster').attr('src', bigcan.toDataURL("image/png"))
        //     }, 0)
        // }
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
                position:absolute;
                z-index:10;
            }
            .qrcode{
                position:absolute;
                left:0;
                top:0;
                z-index:-100;
            }
            .canvas{
                position:absolute;
                z-index:-100;
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
