<template>
    <div id="profile-page">
        <div :class="'member-gist ' + memberType[info.level].bgClass">
            <flexbox class="member-gist-main">
                <flexbox-item class="member-gist-avatar" :span="1/4">
                    <img :src="info.head_portrait" alt="">
                </flexbox-item>
                <flexbox-item class="member-gist-info" :span="3/4">
                    <div class="member-gist-info-t fixClear">
                        <h1 class="fl">{{info.username}}</h1>
                        <router-link tag="p" class="fr" to="/fullinfo">
                            编辑
                            <x-icon type="ios-arrow-right" size="24" class="nav-to" style="fill:#fff;"></x-icon>
                        </router-link>
                    </div>
                    <div class="member-gist-info-btn">
                        <router-link to="/gift" tag="p" class="btn member" :style="'color:' + memberType[info.level].color">
                            <i :class="memberType[info.level].icon1"></i> 会员礼遇
                        </router-link>
                        <router-link to="/integralRegular" tag="p" class="btn club" :style="'color:' + memberType[info.level].color">
                            <i :class="memberType[info.level].icon2"></i> W.E CLUB积分
                        </router-link>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="member-info-main">
            <div class="member-info-integral member-info">
                <Flexbox>
                    <FlexboxItem :span="3/4" class="member-info-integral-l fixClear">
                        <div :class="memberType[info.level].icon+ ' icon fl'" style="margin-top:.12rem;"></div>
                        <div class="fl integral-info">
                            <h2 :style="'color:' + memberType[info.level].color">{{memberType[info.level].name}}</h2>
                            <p class="member-id">会员号：{{info.card_number}}</p>
                        </div>
                    </FlexboxItem>
                    <FlexboxItem :span="1/4" class="member-info-integral-r">
                        <p :style="'color:' + memberType[info.level].color" class="centerTxt">{{info.integral}}</p>
                        <p class="centerTxt">积分数</p>
                    </FlexboxItem>
                </Flexbox>
            </div>
            <div class="member-info-nav member-info">
                <flexbox class="member-info-nav-main">
                    <flexbox-item>
                        <router-link tag="div" to="/userQrcode" class="member-info-nav-item" :style="'color:' + memberType[info.level].color">
                            <i :class="'nav ' + memberType[info.level].icon3"></i> 推广二维码
                        </router-link>
                    </flexbox-item>
                    <flexbox-item>
                        <router-link tag="div" to="/product" class="member-info-nav-item" :style="'color:' + memberType[info.level].color">
                            <i :class="'nav ' +memberType[info.level].icon4"></i> 在投产品
                        </router-link>
                    </flexbox-item>
                    <flexbox-item>
                        <router-link tag="div" to="/integralRecord" class="member-info-nav-item" :style="'color:' + memberType[info.level].color">
                            <i :class="'nav ' +memberType[info.level].icon5"></i> 积分记录
                        </router-link>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="member-info">
                <h3 class="member-info-title">基本信息</h3>
                <group>
                    <cell :title="'姓名'" :value="info.username">
                    </cell>
                    <cell :title="'手机'" :value="info.mobile">
                    </cell>
                    <cell :title="'生日'" :value="info.birthday"></cell>
                    <cell :title="'入会日'" :value="info.join_time | formateDate('YYYY-MM-DD')"></cell>
                    <cell :title="'到期日'" :value="info.maturity_time | formateDate('YYYY-MM-DD')"></cell>
                </group>
            </div>
            <div class="member-footer">
                <group class="btn-area">
                    <x-button type="button" class="member-rights-btn" link="rights">会员权益</x-button>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader, XButton, Group, Cell, Flexbox, FlexboxItem} from 'vux'
    export default {
        components: {
            XHeader,
            XButton,
            Group,
            Cell,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                memberType: {
                    '2': {
                        icon: 'icon-jiaozi',
                        icon1: 'icon-jiaozi1',
                        icon2: 'icon-jiaozi2',
                        icon3: 'icon-jiaozi3',
                        icon4: 'icon-jiaozi4',
                        icon5: 'icon-jiaozi5',
                        name: '交子会员',
                        color: '#cb9d3e',
                        bgClass: 'jiaozi-bg'
                    },
                    '1': {
                        icon: 'icon-tongbao',
                        icon1: 'icon-tongbao1',
                        icon2: 'icon-tongbao2',
                        icon3: 'icon-tongbao3',
                        icon4: 'icon-tongbao4',
                        icon5: 'icon-tongbao5',
                        name: '通宝会员',
                        color: '#577f96',
                        bgClass: 'tongbao-bg'
                    },
                    '0': {
                        icon: 'icon-wuzhu',
                        icon1: 'icon-wuzhu1',
                        icon2: 'icon-wuzhu2',
                        icon3: 'icon-wuzhu3',
                        icon4: 'icon-wuzhu4',
                        icon5: 'icon-wuzhu5',
                        name: '五铢会员',
                        color: '#70a18a',
                        bgClass: 'wuzhu-bg'
                    }
                },
                info: {
                    "id": '',
                    "openid": "",
                    "level": '0',
                    "mobile": "",
                    "username": "",
                    "id_number": "",
                    "birthday": "",
                    "card_number": "",
                    "head_portrait": null,
                    "Interest": null,
                    "occupation": null,
                    "is_marriage": '',
                    "login_number": null,
                    "addtime": '',
                    "updatetime": '',
                    "login_time": null,
                    "status": '',
                    "gender": '',
                    "province": null,
                    "city": null,
                    "address": null,
                    "master_fiscal": null,
                    "join_time": null,
                    "last_time": null,
                    "maturity_time": null,
                    "investment_num": null,
                    "performance": null,
                    "activity_num": null,
                    "log_time": null,
                    "nickname": "",
                    "avatar": ""
                },
                isFinishInfo: true,
                receptionDisabled: false
            }
        },
        methods: {
            getInfo() {
                const _self = this;
                this.$ajax.get('/index/user/getinformation', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.code == 1001) {
                        alert(res.data.msg)
                        return
                    }
                    _self.info = res.data.data
                    if (!_self.info.head_portrait || _self.info.head_portrait == '') {
                        _self.info.head_portrait = 'data:image/jpeg;base64,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'
                    }
                    //   console.log(_self.info)
                })
            }
        },
        created() {
            this.getInfo()
        },
        filters: {
            formateDate(v, fmt) {
                let D = new Date(v * 1000);
                var o = {
                    "M+": D.getMonth() + 1,                 //月份
                    "D+": D.getDate(),                    //日
                    "h+": D.getHours(),                   //小时
                    "m+": D.getMinutes(),                 //分
                    "s+": D.getSeconds(),                 //秒
                    "q+": Math.floor((D.getMonth() + 3) / 3), //季度
                    "S": D.getMilliseconds()             //毫秒
                };
                if (/(Y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (D.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }
    }
</script>

<style lang="less">
    #profile-page {
        min-height: 100vh;
        .member-gist {
            position: relative;
            height: 4.35rem;
            background-size: contain;
            background-repeat: no-repeat;
            &.jiaozi-bg {
                background-image: url("../assets/images/bg-jiaozi.png");
            }
            &.tongbao-bg {
                background-image: url("../assets/images/bg-tongbao.png");
            }
            &.wuzhu-bg {
                background-image: url("../assets/images/bg-wuzhu.png");
            }
            .member-gist-main {
                position: absolute;
                top: 1rem;
                left: 0;
                .member-gist-avatar {
                    > img {
                        width: 1.4rem;
                        height: 1.4rem;
                        margin-left: .4rem;
                        border-radius: 100%;
                    }
                }
                .member-gist-info {
                    .member-gist-info-t {
                        margin-bottom:.1rem;
                        > h1 {
                            font-size: .3rem;
                            color: #FFF;
                        }
                        > p {
                            font-size: 0.26rem;
                            padding: 0;
                            color: #fff;
                            margin-right: .2rem;
                            .nav-to {
                                vertical-align: middle;
                            }
                        }
                    }
                    .member-gist-info-btn {
                        p {
                            float: left;
                            margin-right: .12rem;
                            font-size: .28rem;
                            background: #fff;
                            padding: .06rem 0.2rem;
                            border-radius: 20px;
                            i {
                                display: inline-block;
                                vertical-align: middle;
                                &.icon-jiaozi1 {
                                    width: .24rem;
                                    height: .32rem;
                                    background: url('../assets/images/icon-jiaozi1.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                                &.icon-jiaozi2 {
                                    width: .28rem;
                                    height: .28rem;
                                    background: url('../assets/images/icon-jiaozi2.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                                &.icon-tongbao1 {
                                    width: .24rem;
                                    height: .32rem;
                                    background: url('../assets/images/icon-tongbao1.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                                &.icon-tongbao2 {
                                    width: .28rem;
                                    height: .28rem;
                                    background: url('../assets/images/icon-tongbao2.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                                &.icon-wuzhu1 {
                                    width: .24rem;
                                    height: .32rem;
                                    background: url('../assets/images/icon-wuzhu1.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                                &.icon-wuzhu2 {
                                    width: .28rem;
                                    height: .28rem;
                                    background: url('../assets/images/icon-wuzhu2.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                            }
                        }

                    }
                }
            }
        }
        .member-info-main {
            position: relative;
            margin-top: -1.4rem;
            padding-bottom:.5rem;
            .member-info-integral {
                padding: .4rem .12rem;
                .integral-info {
                    margin-left: .1rem;
                    h2 {
                        margin-bottom: .12rem;
                        font-size: .3rem;
                    }
                    > p {
                        color: #999;
                        font-size: .28rem;
                    }
                }
                .member-info-integral-r {
                    > p:nth-of-type(1) {
                        font-size: .3rem;
                        font-weight: 600;
                        margin-bottom: .12rem;
                    }
                    > p:nth-of-type(2) {
                        color: #999;
                        font-size: .28rem;
                    }
                }
            }
            .member-info-nav {
                margin:.16rem 0;
                .member-info-nav-item{
                    background: #fff;
                    padding:.36rem 0;
                    border-right:1px solid #eee;
                    font-size:.32rem;
                    text-align:center;
                    .nav{
                        display: inline-block;
                        vertical-align: middle;
                        &.icon-jiaozi3 {
                            width: .26rem;
                            height: .26rem;
                            background: url('../assets/images/icon-jiaozi3.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-jiaozi4 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-jiaozi4.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-jiaozi5 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-jiaozi5.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-tongbao3 {
                            width: .26rem;
                            height: .26rem;
                            background: url('../assets/images/icon-tongbao3.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-tongbao4 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-tongbao4.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-tongbao5 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-tongbao5.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-wuzhu3 {
                            width: .26rem;
                            height: .26rem;
                            background: url('../assets/images/icon-wuzhu3.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-wuzhu4 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-wuzhu4.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &.icon-wuzhu5 {
                            width: .28rem;
                            height: .28rem;
                            background: url('../assets/images/icon-wuzhu5.png') no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .member-info {
                width: 6.73rem;
                border-radius: 10px;
                margin: .2rem auto;
                background-color: #fff;
                overflow: hidden;
                .member-info-title {
                    height: 1rem;
                    line-height: 1rem;
                    font-size: 15px;
                    padding-left:.2rem;
                }
                .weui-cells {
                    margin-top: 0;
                    .weui-cell {
                        padding: .15rem .37rem;
                        /*padding: .28rem .37rem;*/
                        &:before {
                            left: 0;
                        }
                        &.title {
                            .vux-label {
                                color: #2c2e31;
                            }
                            .weui-cell__ft {
                                font-size: .16rem;
                                color: #989b9f;
                            }
                        }
                        .vux-label {
                            font-size: .24rem;
                            color: #989b9f;
                        }
                        .weui-cell__ft {
                            font-size: .24rem;
                            color: #2c2e31;
                        }
                    }
                }

            }
            .member-footer {
                .btn-area {
                    width: 6.73rem;
                    margin: 0 auto;
                    background-color: transparent;
                    .weui-cells {
                        margin-top: 0;
                        background-color: transparent;
                    }
                    .member-rights-btn {
                        background-color: #b4967c;
                        height: .62rem;
                        color: #fff;
                        border-radius: 50px;
                        font-size: .3rem;
                        line-height: .62rem;
                    }
                }
            }
        }
    }
</style>
