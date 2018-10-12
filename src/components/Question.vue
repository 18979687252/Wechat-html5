<template>
    <div id="question-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="question-main">
            <div class="questione-banner">
                <p class="pictrueInfo">图片摄于2016迪拜之旅-迪拜F1赛道</p>
            </div>
            <div class="questionn-list">
                <div class="questionn-info-title">
                   <i class="icon-question"></i> 常见问题
                </div>
                <ul class="question-list-main">
                    <router-link tag="li"
                                 v-for="item in data"
                                 :key="item.id"
                                 v-html="item.title"
                                 :to="{path:'/questionDetail/' + item.id}">
                    </router-link>
                </ul>
            </div>
            <!--<div class="more-question" @click="getInfo">-->
                <!--更多问题-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    import {XHeader, Cell, Group,} from 'vux'
    export default {
        components: {
            XHeader,
            Cell,
            Group
        },
        name: 'Product',
        data() {
            return {
                title:'积分问答',
                data:[]
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/index/article_integral', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {
                        _self.data = res.data.data
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
    #question-page {
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
        .question-main {
            .questione-banner {
                height:3.2rem;
                background: url('../assets/images/question_bg.png') no-repeat center;
                background-size: 100% 100%;
                .pictrueInfo{
                    position:absolute;
                    top:3.5rem;
                    right:.2rem;
                    font-size:0.2rem;
                    color:#000;
                }

            }
            .questionn-list {
               padding:0 .2rem .4rem;
                .questionn-info-title{
                    color:#054193;
                    font-weight:600;
                    padding:.3rem 0;
                    font-size:.34rem;
                    border-bottom:1px solid #ddd;
                    .icon-question{
                        display: inline-block;
                        vertical-align: middle;
                        margin-right:0rem;
                        width:.44rem;
                        height:.44rem;
                        background: url('../assets/images/icon-question.png') no-repeat center;
                        background-size: contain;
                    }
                }
                .question-list-main{
                    list-style: none;
                    li{
                        border-bottom:1px solid #ddd;
                        padding:.24rem .36rem .24rem .1rem;
                        font-size:.3rem;
                        color:#222;
                        font-weight:400;
                        background: url('../assets/images/icon-right.png') no-repeat right center;
                        background-size:.4rem .4rem;
                        .nav-to{
                            float:right;
                        }
                    }
                }

            }
            .more-question{
                position:fixed;
                bottom:0;
                left:0;
                width:100%;
                background:#eadfdf;
                height:1.3rem;
                line-height:1.3rem;
                text-align:center;
                color:#999;
                font-size:14px;
            }

        }

    }
</style>
