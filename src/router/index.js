import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push //备份
let originReplace = VueRouter.prototype.replace //备份

//重新编成式路由跳转 以防止报错： Vue-router3新加入的promise报错 // Vue-router4应该没有这个问题了
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)

    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//重新编成式路由跳转 以防止报错： Vue-router3新加入的promise报错 // Vue-router4应该没有这个问题了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)

    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home')
        },

        {
            path: "/user",
            name: "user",
            component: () => import('@/views/user')
        },
        {
            path: "/mall",
            name: "mall",
            component: () => import('@/views/mall')
        },
        {
            path: "/page1",
            name: "page1",
            component: () => import('@/views/other/pageOne.vue')
        },
        {
            path: "/page2",
            name: "page2",
            component: () => import('@/views/other/pageTwo')
        },

        {
            path:'/home',
            redirect:'/'
        }
    ]
})