<template>
    <div id="product-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div :class="['product-main',{white:!data.length}]">
            <div class="producte-banner"></div>
            <div class="productn-list">
                <div class="productn-first">
                    <Flexbox>
                        <FlexboxItem class="productn-first-item" :span="1/3">年化投资总额</FlexboxItem>
                        <FlexboxItem class="productn-first-item" :span="1/3">
                            {{sum}}
                        </FlexboxItem>
                        <FlexboxItem class="productn-first-item" :span="1/3">
                            <img src="../assets/integral/icon-money.png" alt="">
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <div v-if="data.length">
                    <div class="productn-list-item-wrapper" v-for="(item,index) in data" :key="index">
                        <Flexbox class="productn-list-item">
                            <FlexboxItem class="productn-list-item-l" :span="3/4">
                                <div class="grayRound"></div>
                                <img class="yellowRound" src="../assets/images/product-icon.png">
                                <h3>{{item.desc}}</h3>
                                <p>时间：<span>{{item.create_time | dateFormate}}</span></p>
                            </FlexboxItem>
                            <FlexboxItem class="productn-list-item-r" :span="1/4">
                                <p>金额</p>
                                <p><span>{{item.integral}}</span></p>
                            </FlexboxItem>
                        </Flexbox>
                    </div>
                </div>
                <div v-else class="productn-list-main">
                    <img src="../assets/integral/nodata_bg.png" alt="">
                    <p>马上投资，积分滚滚来</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader, XButton, Flexbox, FlexboxItem} from 'vux'
    export default {
        components: {
            XHeader,
            XButton,
            Flexbox,
            FlexboxItem
        },
        name: 'Product',
        data() {
            return {
                title:'在投产品',
                sum:0,
                data:[]
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/user/my_integral_log?type_integral=2', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {
                        _self.data = res.data.data
                        for(let i in res.data.data){
                            _self.sum += res.data.data[i].integral
                        }
                    }
                })
            }
        },
        created() {
            //this.getInfo()
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
            }
            .productn-list {
                padding-left:.6rem;
                padding-right:.4rem;
                .productn-first{
                    width:96%;
                    margin:-.54rem auto .4rem;
                    background:#fff;
                    border-radius:10px;
                    box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                    .productn-first-item{
                        height:1.46rem;
                        line-height:1.46rem;
                    }
                    .productn-first-item:nth-of-type(1){
                        color:#765436;
                        font-size:14px;
                        font-weight: 600;
                        text-align:right;
                    }
                    .productn-first-item:nth-of-type(2){
                        color:#765436;
                        font-size:24px;
                        font-weight:600;
                        text-align:center;
                    }
                    .productn-first-item:nth-of-type(3){
                        >img{
                            width:0.84rem;
                            height:.74rem;
                            margin-top:.3rem;
                        }
                    }
                }
                .productn-list-item-wrapper{
                    margin:0;
                    border-left:2px solid #d4d3d2;
                    padding:.14rem;
                    .productn-list-item{
                        position:relative;
                        background:#fff;
                        border-radius:8px;
                        padding:.3rem;
                        box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                        .productn-list-item-l{
                            padding-left:.3rem;
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
                            >h3{
                                margin-bottom:.2rem;
                                font-size:15px;
                            }
                            >p{
                                font-size:12px;
                                color:#888;
                            }
                        }
                        .productn-list-item-r{
                            text-align:center;
                            >p:nth-of-type(1){
                                font-size:.32rem;
                                margin-bottom:.2rem;
                            }
                            >p:nth-of-type(2){
                                font-size:.32rem;
                                color:#af967f;
                            }

                        }
                    }
                }
                .productn-list-main{
                    text-align:center;
                    >img{
                        margin-top:1.2rem;
                        width:2.4rem;
                        height:2.4rem;
                    }
                    >p{
                        width:3rem;
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
