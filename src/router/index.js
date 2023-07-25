import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
// import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

import store from '@/store'

// console.log(VueRouter.prototype);
// 1.把Vuerouter原型对象上的push 先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 2.重写push|replace
// 参数依次是 跳转信息（传递的参数）、成功的回调、失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    console.log(this);
    if (resolve && reject) {
        // console.log(this);
        // originPush(this) // 直接调用originPush 是普通函数里的this 这里的this是函数的调用者 window
        // 普通函数里面的this指向window，构造函数和原型对象里的方法指向实例对象，所以这里的this指向vuerouter实例
        // call()改变this的指向,与apply()的区别，都是修改this的指向，但是apply后面几个参数传递的是数组
        originPush.call(this, location, resolve, reject)  // 使用call()  这里的this是外部的构造函数的实例对象
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)  // 使用call()  这里的this是外部的构造函数的实例对象
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 路由懒加载
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
// Vue Router 支持开箱即用的动态导入
const Home = () => import('@/pages/Home')

// 配置路由
let router = new VueRouter({
    routes: [
        {
            path: '/communication',
            component: () => import('@/pages/Communication'),
            children: [
                // 重定向
                {
                    path: '/communication',
                    redirect: 'event'
                },
                {
                    path: 'event',
                    component: () => import('@/pages/Communication/EventTest')
                },
                {
                    path: 'model',
                    component: () => import('@/pages/Communication/ModelTest')
                },
                {
                    path: 'sync',
                    component: () => import('@/pages/Communication/SyncTest')
                },
                {
                    path: 'attrs-listeners',
                    component: () => import('@/pages/Communication/AttrsListenersTest')
                },
                {
                    path: 'children-parent',
                    component: () => import('@/pages/Communication/ChildrenParentTest')
                },
                {
                    path: 'scope-slot',
                    component: () => import('@/pages/Communication/ScopeSlotTest')
                },
            ]
        },
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            name: 'search',
            // params 参数可传可不传
            path: '/search:keyword?',
            component: () => import('@/pages/Search'),
            meta: { show: true },
            // 传递 props 
            // 1.布尔值写法 传递的只能是params参数 query传不了
            // props: true
            // 2.对象写法 另外的参数
            // props: { a: 1, b: 2 },
            // 3.函数写法 可以传递params 和 query
            props: ($route) => {
                return {
                    keyword: $route.params.keyword,
                    k: $route.query.k
                }
            }

        },
        {
            path: '/detail/:skuid?',
            component: () => import('@/pages/Detail'),
            meta: { show: true }
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess/:skuid/:skuNum',
            component: AddCartSuccess
        },
        {
            path: '/shopcart',
            component: ShopCart
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/trade',
            component: Trade,
            beforeEnter: (to, from, next) => {
                // 去交易页面必须从购物车进入
                if (from.path == '/shopcart') {
                    next()
                } else {
                    // 取消当前的导航。如果浏览器的 URL 改变了(手动或浏览器后退按钮)，
                    // 那么 URL 地址会重置到 from 路由对应的地址。
                    next(false)
                }
            },
        },
        {
            path: '/pay',
            component: Pay,
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            beforeEnter: (to, from, next) => {
                if (from.path == '/pay') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/center',
            component: Center,
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                // 重定向
                {
                    path: '/center',
                    redirect: 'myorder'
                },
            ]
        },
        // 重定向  项目运行时，访问‘/’，立刻跳转首页
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 滚动条始终滚动到顶部
        return { top: 0 }
    },
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
    // 用户已经登录
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            // 去的不是login register
            // 登陆了且拥有用户信息 放行
            if (name) {
                next()
            } else {
                // 登录了且没有用户信息
                try {
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    // TOKEN失效 重新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }

            }

        }
    } else {
        // 用户未登录
        // console.log(to.path);
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            // console.log(to.path);
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})
export default router