<template>
    <div id="product-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div :class="['product-main',{white:!data.length}]">
            <div class="producte-banner">
                <p class="pictrueInfo">图片摄于2018南非狂野之旅-开普敦直升机停机坪</p>
            </div>
            <div class="product-list">
                <div class="product-first">
                    <Flexbox>
                        <FlexboxItem class="product-first-item" :span="1/3">年化投资总额</FlexboxItem>
                        <FlexboxItem class="product-first-item" :span="1/3">
                            {{sum + "万"}}
                        </FlexboxItem>
                        <FlexboxItem class="product-first-item" :span="1/3">
                            <img src="../assets/integral/icon-money.png" alt="">
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <div v-if="data.length">
                    <div class="product-list-item-wrapper" v-for="(item,index) in data" :key="index">
                        <div class="product-list-item">
                            <div class="grayRound"></div>
                            <img class="yellowRound" src="../assets/images/product-icon.png">
                            <div class="product-list-item-t">
                                <p>{{item.desc}}</p>
                                <p><span>{{item.integral + '万'}}</span></p>
                            </div>
                            <div class="product-list-item-b">
                                <p>购买时间：<span>{{item.create_time | dateHandler}}</span></p>
                                <p>到期时间：<span>{{item.endtime | dateHandler}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="product-list-main">
                    <img src="../assets/integral/nodata_bg.png" alt="">
                    <p>马上投资，积分滚滚来</p>
                </div>
            </div>
        </div>
        <loading :show="showLoading" text="loading"></loading>
    </div>
</template>
<script>
    import {XHeader, XButton, Flexbox, FlexboxItem,Loading} from 'vux'
    export default {
        components: {
            XHeader,
            XButton,
            Flexbox,
            FlexboxItem,
            Loading
        },
        name: 'Product',
        data() {
            return {
                title:'在投产品',
                sum:0,
                data:[],
                showLoading:true
            }
        },
        filters:{
            dateHandler(val){
                return val.split(' ')[0]
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/user/my_integral_log?type_integral=2', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {
                        _self.data = res.data.data
                        for(let i in res.data.data){
                            _self.sum += Number(res.data.data[i].integral)
                        }
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
    #product-page {
        padding-top: .8rem;
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
        .product-main {
            background: #f3f0ee;
            min-height:100vh;
            .producte-banner {
                height:3.2rem;
                background: url('../assets/images/product_bg.png') no-repeat center;
                background-size: contain;
                .pictrueInfo{
                    position:absolute;
                    top:3.1rem;
                    right:.2rem;
                    font-size:0.2rem;
                    color:#000;
                }
            }
            .product-list {
                padding-left:.6rem;
                padding-right:.4rem;
                .product-first{
                    width:96%;
                    margin:-.54rem auto .4rem;
                    background:#fff;
                    border-radius:10px;
                    box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                    .product-first-item{
                        height:1.6rem;
                        line-height:1.6rem;
                    }
                    .product-first-item:nth-of-type(1){
                        color:#765436;
                        font-size:14px;
                        font-weight: 600;
                        text-align:right;
                    }
                    .product-first-item:nth-of-type(2){
                        color:#765436;
                        font-size:24px;
                        font-weight:600;
                        text-align:left;
                    }
                    .product-first-item:nth-of-type(3){
                        >img{
                            width:0.84rem;
                            height:.74rem;
                            margin-top:.3rem;
                        }
                    }
                }
                .product-list-item-wrapper{
                    margin:0;
                    border-left:2px solid #d4d3d2;
                    padding:.14rem;
                    .product-list-item{
                        position:relative;
                        background:#fff;
                        border-radius:8px;
                        padding:.3rem .2rem .3rem .4rem;
                        box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                        .grayRound{
                            position: absolute;
                            top:.4rem;
                            left:-.38rem;
                            background: #f3f0ee;
                            width:.7rem;
                            height:.7rem;
                            z-index:1;
                            border-radius: 100%;
                        }
                        .yellowRound{
                            position: absolute;
                            top:.42rem;
                            left:-.46rem;
                            width:.64rem;
                            height:.64rem;
                            z-index:2;
                        }
                        .product-list-item-t{
                            clear: both;
                            overflow: hidden;
                            >p{
                                margin-bottom:.16rem;
                                font-size:.3rem;
                                float:left;
                                font-weight:600;
                            }
                            >p:nth-of-type(1){
                                width:70%;
                            }
                            >p:nth-of-type(2){
                                width:30%;
                                text-align:center;
                            }
                        }
                        .product-list-item-b{
                            clear: both;
                            overflow: hidden;
                            >p{
                                color:#666;
                                float:left;
                                width:50%;
                                font-size:0.26rem;
                            }
                            >p:nth-of-type(2){
                                color:#af967f;
                                text-align:right;
                            }

                        }
                    }
                }
                .product-list-main{
                    text-align:center;
                    >img{
                        margin-top:1.2rem;
                        width:2.4rem;
                        height:2.4rem;
                    }
                    >p{
                        width:4rem;
                        margin:.2rem auto;
                        font-size:12px;
                        color:#bacccc;
                    }

                }
            }
        }
        .white{
            background: #fff;
        }
    }
</style>
