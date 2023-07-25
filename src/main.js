import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 三级联动组件————注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 按需引入element-ui
import { Button, MessageBox } from 'element-ui'
// 使用全局组件 参数为（全局组件的名字，哪一个组件——刚引入的名字）
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 使用element ui
Vue.component(Button.name, Button)
// 注册elementui组件的另一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入mockserver.js ———mock数据
import '@/mock/mockserver'
// 引入swiper
import 'swiper/swiper-bundle.css'
import 'swiper/swiper-bundle.css'
// 统一引入接口文件里的全部请求函数
// API对象包含所有的请求函数
import * as API from '@/api'
import loadingimg from '@/assets/1.gif'

// 引入懒加载 插件 
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  loading: loadingimg,
  // attempt: 1
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this;
    // 将接口文件挂载到Vue原型对象中
    Vue.prototype.$API = API
  },
  // 注册路由，KV一致省略V
  // 注册完之后，组件身上都有$router（编程式导航路由跳转） $route（路由信息） 属性
  router,
  // 注册仓库：组件实例的身上都有$store属性
  store
}).$mount('#app')
