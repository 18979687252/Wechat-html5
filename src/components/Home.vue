<template>
    <div id="home-page">
        <div class="home-main">
            <flexbox class="top-flex" align="flex-end">
                <flexbox-item :span="1/2" v-if="isLogin === 'Login'">
                    <div class="rightTxt nav-regist">
                        <router-link to="profile"><img src="../assets/images/nav-regist.png" alt=""></router-link>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2" v-else-if="isLogin === 'notLogin'">
                    <div class="rightTxt nav-regist">
                        <router-link to="regist"><img src="../assets/images/nav-regist.png" alt=""></router-link>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2" v-else>
                    <div class="rightTxt nav-regist"><img src="../assets/images/nav-regist.png" alt=""></div>
                </flexbox-item>
                <!--<flexbox-item :span="1/2"><div class="rightTxt nav-regist"><img src="../assets/images/nav-regist.png" alt=""></div></flexbox-item>-->

                <flexbox-item :span="1/2">
                    <div class="leftTxt nav-cloub">
                        <router-link to="club"><img src="../assets/images/nav-cloub.png" alt=""></router-link>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox class="bottom-flex" align="flex-start">
                <flexbox-item :span="1/2">
                    <div class="rightTxt nav-apply">
                        <router-link to="/event"><img src="../assets/images/nav-apply.png" alt=""></router-link>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2">
                    <div class="leftTxt nav-photos">
                        <router-link to="album"><img src="../assets/images/nav-photos.png" alt=""></router-link>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <p class="notes">仅限W▪E会员注册</p>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem} from 'vux'

    export default {
        components: {
            Flexbox,
            FlexboxItem
        },
        name: 'Home',
        data() {
            return {
                isLogin: 'Login'
            }
        },
        methods: {
            isEmptyObj(obj) {
                for (let name in obj) {
                    return false
                }
                return true
            },
            chkLogin(sign) {
                const _self = this
                this.$ajax.get('/index/user/chkLogin', {params: {sign: sign}}).then(function (response) {
                    if (_self.isEmptyObj(response.data.data) || response.data.data.status != 1) {
                        _self.isLogin = 'notLogin'
                    } else {
                        _self.isLogin = 'Login'
                    }
                })
            },
            chkAuto() {
                const _self = this
                const _sign = localStorage['sign']
                this.$ajax.get('/index.php/index/index/checkauto', {params: {sign: _sign}}).then((res) => {
                    if (res.data.code === 0) {
                        _self.chkLogin(_sign)
                        return
                    }
                    if (res.data.code === 1) {
                        location.href = res.data.data
                    }
                })
            }
        },
        created() {
            let sign = this.$route.query.sign
            localStorage['sign'] = sign
             localStorage['sign'] = 'ok3zx0SC0QSIxTz_rFqmcbUIivPA'
//            this.chkAuto()
        }
    }
</script>

<style lang="less">
    #home-page {
        min-height: 100vh;
        background: url("../assets/images/bg-home.jpg") no-repeat scroll 0 0 transparent;
        background-size: cover;
        .notes {
            position: absolute;
            color: #fff;
            font-size: .24rem;
            right: .2rem;
            bottom: .2rem;
        }
        .home-main {
            padding-top: 3.5rem;
            .top-flex {
                margin-bottom: 8px;
            }
            img {
                box-shadow: 0 3px 5px rgba(0, 0, 0, .5);
                border-radius: 5px;
            }
            .nav-regist {
                img {
                    width: 3.15rem;
                }
            }
            .nav-cloub {
                img {
                    width: 3.17rem;
                }
            }
            .nav-apply {
                img {
                    width: 2.53rem;
                }
            }
            .nav-photos {
                img {
                    width: 2.83rem;
                }
            }
        }
        .rightTxt {
            text-align: right;
        }
        .leftTxt {
            text-align: left;
        }
    }
</style>
