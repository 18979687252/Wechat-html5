<template>
    <div id="integralRegular-page">
        <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
        <div class="integralRegular-banner">
            <router-link to="/question"><img src="../assets/integral/question_bg.png" alt="" class="question"></router-link>
        </div>
        <div class="integralRegular-main">
            <div class="integralRegular-content">
                <Flexbox class="integralRegular-content-title">
                    <FlexboxItem @click.native="changeActive('regular')"
                                 :class="['title-l',{active:active == 'regular'}]">
                        <img src="../assets/integral/icon-yellow-l.png" v-if="active == 'regular'" alt="">
                        <img src="../assets/integral/icon-gray-l.png" v-else alt="">
                        <span>积分规则</span>
                    </FlexboxItem>
                    <FlexboxItem @click.native="changeActive('idea')" :class="['title-r',{active:active == 'idea'}]">
                        <img src="../assets/integral/icon-yellow-r.png" v-if="active == 'idea'" alt="">
                        <img src="../assets/integral/icon-gray-r.png" v-else alt="">
                        <span>积分理念</span>
                    </FlexboxItem>
                </Flexbox>
                <div v-if="active == 'regular'" class="integralRegular-content-main">
                    <p>客户个人投资额作为其自身入会时所属级别的界定占据了重要地位；其次，在客户获得基础积分之外，
                        将依据客户个人转介客户个数的绝对值计入积分；以及依据转介绍客户投资额按比例计入积分。</p>
                    <img src="../assets/integral/regualr1_bg.png" alt="">
                    <img src="../assets/integral/exaple.png" alt="">
                    <p>
                        A客户个人投资额为500W，其转介B客户，转介客户累计投资额为1000W，则A客户累计积分为31000积分。
                        （积分比例为内部数据不予以公开）
                    </p>
                    <img src="../assets/integral/regular2.png" alt="">
                    <p class="rightTxt">*(仅供参考)</p>
                    <p style="margin-top:.2rem;"><strong>W.E CLUB 会员积分设置，旨在限定会员数量，保证志同道合的会员质量。</strong></p>
                    <div class="integralRegular-content-footer">
                        <p>-积分权益说明参照《中诚银信W.E CLUB积分管理办法》</p>
                        <p>-最终解释权归中城银信W.E CLUB所有</p>
                    </div>
                </div>
                <div  class="integralRegular-content-main" v-else>
                    <p>W·E CLUB主张让基础会员能有更多机会享受高级别的会员权益，为会员开辟了除个人投资额以外累计积分的全新渠道。
                        会员通过个人转介客户获得积分，从而享受自身更高的权益。</p>
                    <img src="../assets/integral/regular3.png" alt="" class="regular3">
                    <p>随着W·E CLUB的快速发展，会员的说亮与日俱增，会员活动也日益丰富，
                        为了能让更多热衷于生活品质，尽享悠然人生的高精人士享受到W·E CLUB的“专属于您的私人订制”服务，
                        W·E CLUB创新了积分理念，鼓励越多志同道合的人士加入！
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader, Flexbox, FlexboxItem} from 'vux'

    export default {
        components: {
            XHeader,
            Flexbox,
            FlexboxItem
        },
        name: 'integralRegular',
        data() {
            return {
                title: 'W.E CLUB积分',
                active: 'regular'
            }
        },
        methods: {
            changeActive(val) {
                this.active = val
            },
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/index/integral_rule', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 0) {

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
    #integralRegular-page {
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
        .integralRegular-banner {
            height: 5.2rem;
            width: 100%;
            background: url('../assets/integral/integralRegualr_bg.png') no-repeat center;
            background-size: contain;
            position: relative;
            top:.7rem;
            .question{
                width:24px;
                height:26px;
                position:absolute;
                top:.5rem;
                right:.5rem;
            }
        }
        .integralRegular-main {
            padding: 0 .42rem 0;
            position:absolute;
            .integralRegular-content {
                background: #fff;
                min-height: 8rem;
                border-radius: 6px;
                padding: 0 .24rem;
                margin-top: -2.6rem;
                .integralRegular-content-title {
                    .title-l {
                        img {
                            width: 26px;
                            height: 26px;
                            margin-right: .1rem;
                        }

                    }
                    .title-r {
                        text-align: right;
                        img {
                            width: 24px;
                            height: 30px;
                            margin-right: .1rem;
                        }

                    }
                    .title-l, .title-r {
                        padding-top: .6rem;
                        font-size: 15px;
                        > span {
                            color: #8d8d8d;
                            font-weight: 600;
                        }
                    }
                    .active {
                        > span {
                            color: #054193;
                        }
                    }
                }
                .integralRegular-content-main {
                    padding-top: .4rem;
                    color: #777;
                    p {
                        font-size:.28rem;
                        line-height: 22px;
                    }
                    img{
                        width:100%;
                        margin:.3rem 0;
                    }
                    img:nth-of-type(2){
                        width:1.6rem;
                        height:.46rem;
                        margin-bottom:.12rem;
                    }
                    img:nth-of-type(3){
                        margin:.2rem;
                    }
                    .regular3{
                        margin:.32rem 0;
                    }
                }
                .integralRegular-content-footer{
                    margin-top:.2rem;
                    padding:.2rem 0;
                    border-top:1px dashed #ccc;
                    >p{
                        font-size:12px;
                    }
                }
            }

        }
    }
</style>
