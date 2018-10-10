<template>
    <div id="integralRecord-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div :class="['integralRecord-main',{white:!data.length}]">
            <div class="integralRecorde-banner">
                <p class="pictrueInfo">图片摄于2018南非狂野之旅-SABISABI营地篝火晚宴</p>
            </div>
            <div class="integralRecordn-list">
                <div class="integralRecordn-first">
                    <Flexbox>
                        <FlexboxItem class="integralRecordn-first-item">积分总数</FlexboxItem>
                        <FlexboxItem class="integralRecordn-first-item">
                            {{sum}}
                        </FlexboxItem>
                        <FlexboxItem class="integralRecordn-first-item">
                            <img src="../assets/integral/icon-money.png" alt="">
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <div v-if="data.length" class="integralRecordn-list-main">
                    <Flexbox class="integralRecordn-list-item" v-for="(item,index) in data" :key="index">
                        <FlexboxItem class="integralRecordn-list-item-l" :span="3/4">
                            <h3>{{item.desc}}</h3>
                            <p>时间：<span>{{item.create_time}}</span></p>
                        </FlexboxItem>
                        <FlexboxItem class="integralRecordn-list-item-r" :span="1/4">
                            <p>积分</p>
                            <p>{{item.integral}}</p>
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <div v-else class="integralRecordn-list-main">
                    <img src="../assets/integral/nodata_bg.png" alt="">
                    <p>您可致电垂询您的专属 私人理财师了解最新产品信息</p>
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
        name: 'IntegralRecord',
        data() {
            return {
                title:'积分记录',
                sum:0,
                data:[],
                showLoading:true
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/user/my_integral_log?type_integral=1', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {
                        _self.data = res.data.data
                        for(let i in res.data.data){
                            _self.sum += Number(res.data.data[i].integral.replace('+',''))
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
    #integralRecord-page {
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
        .integralRecord-main {
            background: #f3f0ee;
            min-height:100vh;
            .integralRecorde-banner {
                height:3.2rem;
                background: url('../assets/integral/integral_record_bg.png') no-repeat center;
                background-size: contain;
                .pictrueInfo{
                    position:absolute;
                    top:3rem;
                    right:.2rem;
                    font-size:0.2rem;
                    color:#fff;
                }
            }
            .integralRecordn-list {
                padding:0 .4rem;
                .integralRecordn-first{
                    width:94%;
                    margin:-.6rem auto .4rem;
                    background:#fff;
                    border-radius:10px;
                    box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                    .integralRecordn-first-item{
                        height:1.46rem;
                        line-height:1.46rem;
                    }
                    .integralRecordn-first-item:nth-of-type(1){
                        color:#765436;
                        font-size:14px;
                        font-weight: 600;
                        text-align:right;
                    }
                    .integralRecordn-first-item:nth-of-type(2){
                        color:#765436;
                        font-size:24px;
                        font-weight:600;
                        text-align:center;
                    }
                    .integralRecordn-first-item:nth-of-type(3){
                        >img{
                            width:0.84rem;
                            height:.74rem;
                            margin-top:.3rem;
                        }
                    }
                }
                .integralRecordn-list-main{
                    text-align:center;
                    >img{
                        margin-top:1.2rem;
                        width:2.4rem;
                        height:2.4rem;
                    }
                    >p{
                        width:2.8rem;
                        margin:.2rem auto;
                        font-size:12px;
                        color:#bacccc;
                    }

                }
                .integralRecordn-list-item{
                    margin-bottom:.2rem;
                    background:#fff;
                    border-radius:10px;
                    padding:.3rem .2rem;
                    box-shadow: 0 1px 2px rgba(224, 214, 214, 0.5);
                    .integralRecordn-list-item-l{
                        >h3{
                            margin-bottom:.16rem;
                            font-size:.3rem;
                        }
                        >p{
                            font-size:.26rem;
                            color:#888;
                        }
                    }
                    .integralRecordn-list-item-r{
                        text-align:center;
                        >p:nth-of-type(1){
                            font-size:.28rem;
                            margin-bottom:.16rem;
                        }
                        >p:nth-of-type(2){
                            font-size:.3rem;
                            color:#af967f;

                        }

                    }
                }
            }
        }
        .white{
            background: #fff;
        }
    }
</style>
