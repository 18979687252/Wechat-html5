<template>
    <div id="album-page">
        <loading :show="show" :text="loadingText"></loading>
        <v-touch class="page-main" v-on:swipeup="changeAlbum('up')" v-on:swipedown="changeAlbum('down')">
            <div class="selected">
                <div class="selected-album" :style="'background-image: url('+ selectedAlbum +')'"></div>
                <div class="album-list">
                    <div @click="selectAlbum(item.id, index)" class="album-item" :class="{'curr': index===currImg, 'album-0': index===currImg-4,
          'album-1': index===currImg-3, 'album-2': index===currImg-2, 'album-3': index===currImg-1,'album-last-3': index === currImg+1, 'album-last-2': index===currImg+2, 'album-last-1': index===currImg+3, 'album-last-0': index===currImg+4}"
                         v-for="(item, index) in albumList">
                        <!--<div class="item-img" :style="'background-image: url('+ item.img + ')'"></div>-->
                        <img class="item-img" :src="item.img">
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
        </v-touch>
    </div>
</template>

<script>
    import {XHeader,Loading } from 'vux'

    export default {
        components: {
            XHeader,
            Loading
        },
        name: '',
        data() {
            return {
                selectedAlbum: '',
                albumList: [],
                currImg: 0,
                show:false,
                loadingText:'加载中...'
            }
        },
        methods: {
            showLoading() {
                let that = this
                setTimeout(() => {
                    that.show = false
                }, 1000)
            },
            selectAlbum(id, index) {
                //console.log(arguments)
                if (this.currImg === index)
                    this.$router.push({path: 'photo', query: {id: id}})
            },
            changeAlbum(type) {
                switch (type) {
                    case 'up':
                        if (this.currImg === this.albumList.length - 1)
                            return
                        else
                            this.currImg++

                        break;
                    case 'down':
                        if (this.currImg === 0)
                            return
                        else
                            this.currImg--

                        break;
                }
                this.selectedAlbum = this.albumList[this.currImg].img

            },
            getAlbum() {
                this.show = true
                this.$ajax.get('/index/index/getAlbumList', {params: {sign: localStorage['sign']}}).then(res => {
                    if (res.data.data.length < 7) {
                        this.currImg = Math.round(res.data.data.length / 2) - 1
                    } else {
                        this.currImg = 3
                    }
                    this.albumList = res.data.data
                    this.selectedAlbum = res.data.data[this.currImg].img
                    this.show = false
                })

            }
        },
        created() {
            this.getAlbum()
        }
    }
</script>

<style lang="less">
    #album-page {
        min-height: 100vh;
        /*padding-top: .8rem;*/
        background: url("../assets/images/bg-photos.jpg") no-repeat scroll bottom #fff;
        background-size: cover;
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
            padding-top: 2.17rem;
            .selected {
                background: url("../assets/images/bg-selected.png") no-repeat scroll 0 0 transparent;
                width: 4.46rem;
                height: 8.91rem;
                background-size: contain;
                position: relative;
                line-height: 9.37rem;
                display: flex;
                align-items: center;
                .selected-album {
                    height: 6.39rem;
                    width: 6.39rem;
                    max-width: none;
                    margin-left: -6.39/2rem;
                    border-radius: 100%;
                    background-position: center;
                    background-size: cover;
                }
            }
            .album-list {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                .album-item {
                    display: none;
                    position: absolute;
                    width: 1.4rem;
                    transition: all .8s;
                    /*left: -1.47rem;*/
                    img, .item-img {
                        border-radius: 100px;
                        width: 1.4rem;
                        height: 1.4rem;
                        transition: all .8s;
                    }
                    .item-img {
                        width: 1.4rem;
                        height: 1.4rem;
                        background-size: cover;
                        background-position: center;
                        border-radius: 100px;
                    }
                    span {
                        position: absolute;
                        left: 110%;
                        width: auto;
                        white-space: nowrap;
                        top: 40%;
                        color: #989b9f;
                        font-size: .24rem;
                        /*display: none;*/
                    }
                    &.curr {
                        display: block;
                        width: 1.85rem;
                        left: 3.53rem;
                        top: 3.62rem;
                        img, .item-img {
                            width: 1.85rem;
                            height: 1.85rem;
                        }
                        span {
                            color: #cb9d3e;
                            font-size: .3rem;
                            display: block;

                        }
                    }
                    &.album-0 {
                        left: -1.53rem;
                        top: -.68rem;
                        display: block;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-1 {
                        display: block;
                        top: -.68rem;
                        left: -.68rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-2 {
                        display: block;

                        left: 1.53rem;
                        top: -.09rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-3 {
                        display: block;

                        left: 3.15rem;
                        top: 1.62rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-last-3 {
                        display: block;

                        left: 3.16rem;
                        top: 5.97rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-last-2 {
                        display: block;

                        left: 1.53rem;
                        top: 7.59rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-last-1 {
                        display: block;
                        top: 8.19rem;
                        left: -.68rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                    &.album-last-0 {
                        display: block;

                        left: -1.53rem;
                        top: 8.19rem;
                        width: 1.4rem;
                        img, .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                        }
                    }
                }
            }
        }
    }

</style>
