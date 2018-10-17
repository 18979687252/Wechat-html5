import Vue from 'vue'
const Wxshare = function(){
    let link = window.location.href
    let url = encodeURIComponent(window.location.href.split('#')[0])
    Vue.$ajax.get('/index/user/ceshi', {params: {head_portrait:url}}).then(res => {
        let wxconfig = res.data
        Vue.wechat.config({
            debug: false,
            appId: wxconfig.appId,
            timestamp: wxconfig.timestamp,
            nonceStr:wxconfig.nonceStr,
            signature: wxconfig.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        })
        Vue.wechat.onMenuShareAppMessage({
            title: '中城银信',
            desc: '中城银信 W•E CLUB-ONLY FOR YOU',
            link: link,
            imgUrl:'http://wx.ccccmt.com/'
        })
        Vue.wechat.onMenuShareTimeline({
            title: event.title,
            link: link,
            imgUrl: 'http://wx.ccccmt.com/'
        })
    })
}

export Wxshare