<template>
    <div id="questionDetail-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="questionDetail-main">
            <div class="questionDetaile-banner"></div>
            <div class="questionDetailn-content">
                <div class="questionDetail-question">
                    Q: {{info.title}}
                </div>
                <div class="questionDetail-answer" v-html="info.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader} from 'vux'
    export default {
        components: {
            XHeader
        },
        name: 'Product',
        data() {
            return {
                title:'积分问答',
                info:{}
            }
        },
        methods: {
            getInfo(id) {
                const _self = this;
                this.$ajax.get('/index/index/article_integral_list?id=' + id  , {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {
                        _self.info = res.data.data
                    }

                })
            }
        },
        created() {
            let id = this.$route.params.id
            this.getInfo(id)
        }
    }
</script>
<style lang="less">
    #questionDetail-page {
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
        .questionDetail-main {
            background: #fff;
            .questionDetaile-banner {
                height:3.2rem;
                background: url('../assets/images/question_bg.png') no-repeat center;
                background-size: 100% 100%;
            }
            .questionDetailn-content {
               padding:0 .32rem .4rem;
                .questionDetail-question{
                    color:#333;
                    font-weight:600;
                    padding:.3rem 0;
                    font-size:14px;
                    border-bottom:1px solid #ddd;
                }
                .questionDetail-answer{
                    padding:.3rem .2rem;
                    font-size:.30rem;
                    line-height:22px;
                }
            }

        }

    }
</style>
