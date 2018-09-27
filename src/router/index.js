import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Club from '@/components/Club'
import Profile from '@/components/Profile'
import FullInfo from '@/components/Full-info'
import Event from '@/components/Event'
import EventDetail from '@/components/EventDetail'
import Rights from '@/components/Rights'
import Gift from '@/components/Gift'
import Album from '@/components/Album'
import Photo from '@/components/Photo'

import IntegralRecord from '@/components/IntegralRecord'
import IntegralRegular from '@/components/IntegralRegular'
import Product from '@/components/Product'
import Question from '@/components/Question'
import QuestionDetail from '@/components/QuestionDetail'
import UserQrcode from '@/components/UserQrcode'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/regist',
            name: 'Login',
            component: Login
        },
        {
            path: '/club',
            name: 'Club',
            component: Club
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/fullinfo',
            name: 'Full Info',
            component: FullInfo
        },
        {
            path: '/event',
            name: 'Event',
            component: Event
        },
        {
            path: '/event-detail',
            name: 'Event Detail',
            component: EventDetail
        },
        {
            path: '/rights',
            name: 'Rights',
            component: Rights
        },
        {
            path: '/gift',
            name: 'Gift',
            component: Gift
        },
        {
            path: '/album',
            name: 'Album',
            component: Album
        },
        {
            path: '/photo',
            name: 'Photo',
            component: Photo
        },
        {
            path: '/integralRecord',
            name: 'IntegralRecord',
            component: IntegralRecord
        },
        {
            path: '/integralRegular',
            name: 'IntegralRegular',
            component: IntegralRegular
        },
        {
            path: '/product',
            name: 'Product',
            component: Product
        },
        {
            path: '/question',
            name: 'Question',
            component: Question
        },
        {
            path: '/questionDetail/:id',
            name: 'QuestionDetail',
            component: QuestionDetail
        },
        {
            path: '/userQrcode',
            name: 'UserQrcode',
            component: UserQrcode
        }
    ]
})
