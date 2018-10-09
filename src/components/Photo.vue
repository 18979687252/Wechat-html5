<template>
    <div id="photo-page">
        <x-header :left-options="{showBack: false}" class="header">
            <img src="../assets/images/event-logo.png" alt="" slot="default">
        </x-header>
        <div class="page-main">
            <swiper :options="swiperOpt" ref="mySwiper">
                <swiper-slide v-for="(item, index) in photos.imgs" :key="index" v-if="index < showAmount">
                    <div :style="'background-image: url(/'+ item.img +') '"
                         style="width: 283px; height: 415px; background-size: cover; background-repeat: no-repeat; background-position: center;"
                         @click="openFullImg(item.img)">
                    </div>
                </swiper-slide>

            </swiper>
            <!--<div class="swiper-pagination" slot="pagination"></div>-->
            <h2>{{photos.title}}</h2>
            <!--<p v-html="photos.describe_info"></p>-->
            <p v-html="photos.imgs[photos_index].describe"></p>
        </div>
        <x-dialog v-model="showFullImg" class="fullImg-dialog" @click.native="openFullImg">
            <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwiperight">
                <img :src="imgUrl">
            </v-touch>
        </x-dialog>
        <loading :show="showLoading" text="loading"></loading>
    </div>
</template>

<script>
    import {XHeader, XDialog,Loading} from 'vux'
    export default {
        components: {
            XHeader,
            XDialog,
            Loading
        },
        name: '',
        data() {
            return {
                showLoading:true,
                showAmount:3,
                photos: {
                    imgs:[{}]
                },
                showFullImg: false,
                imgUrl: '',
                photos_index: 0,
                swiperOpt: {
                    pagination: '.swiper-pagination',
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    onTransitionEnd: swiper => {
                        let _self = this
                        //console.log(swiper)
                        _self.photos_index = swiper.activeIndex
                    },
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        watch:{
            'photos_index'(val,oldVal){
                if(val > oldVal){
                    this.showAmount =  this.showAmount * 2
                }else if(val >= 5){
                    this.showAmount =  this.photos.imgs.length
                }
            }
        },
        methods: {
            onSwipeLeft(){
                if(this.photos_index < this.photos.imgs.length){
                    ++this.photos_index
                    this.swiper.slideTo(this.photos_index, 300, false)
                    this.imgUrl = '/' + this.photos.imgs[this.photos_index].img
                }
            },
            onSwiperight(){
                if(this.photos_index > 0){
                    --this.photos_index
                    this.swiper.slideTo(this.photos_index, 300, false)
                    this.imgUrl = '/' + this.photos.imgs[this.photos_index].img
                }

            },
            openFullImg(url) {
                this.imgUrl = '/' + url
                this.showFullImg = !this.showFullImg
            },
            hideLoading () {
                let _self = this
                setTimeout(() => {
                    _self.showLoading = false
                }, 1500)
            },
            getPhoto() {
                let id = this.$route.query.id
                this.$ajax.get('/index/index/getAlbumInfo', {
                    params: {
                        id: id,
                        sign: localStorage['sign']
                    }
                }).then(res => {
                    this.photos = res.data.data
                })
            }
        },
        created() {
            this.getPhoto()
            this.hideLoading()
        }
    }
</script>

<style lang="less">
    #photo-page {
        min-height: 100vh;
        background-color: #fff;
        .fullImg-dialog {
            .weui-dialog {
                width: 100%;
                max-width: none;
                background-color: transparent;
            }
        }
        .header {
            background-color: #fff;
            font-size: .33rem;
            color: #fff;
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            img {
                width: 2.25rem;
            }
            .vux-header-title {
                line-height: .8rem;
                height: .8rem;
            }
        }
        .page-main {
            height: 100vh;
            padding-top: .8rem;
            position: relative;
            h2 {
                text-align: center;
                color: #2c2e31;
                font-size: .42rem;
                margin: .1rem 0;
            }
            p {
                text-align: center;
                color: #989b9f;
                font-size: .24rem;
            }
            .swiper-pagination {
                bottom: .5rem;
                width: 100%;
                text-align: center;
                .swiper-pagination-bullet {
                    background-color: #b4967c;
                    width: .14rem;
                    height: .14rem;
                    opacity: 1;
                    vertical-align: middle;
                    margin: 0 4px;
                    &.swiper-pagination-bullet-active {
                        background-color: transparent;
                        border: 2px solid #b4967c;
                        border-radius: 100%;
                        width: .28rem;
                        height: .28rem;
                    }
                }
            }
            .swiper-container {
                position: static !important;
                overflow: visible;
                margin-top: 10px;
                .swiper-wrapper {
                    .swiper-slide {
                        border-radius: 10px;
                        overflow: hidden;
                    }
                }
                .swiper-inner {
                    width: 100%;
                    height: 400px;
                    padding-top: 50px;
                    padding-bottom: 50px;
                }
                .swiper-slide {
                    background-position: center;
                    background-size: cover;
                    width: 5.66rem;
                    height: 8.3rem;
                    /*width: 283px;*/
                    /*height: 415px;*/
                }
                .itemDesc {
                    position: absolute;
                    bottom: .5rem;
                }

            }
        }
    }
</style>
