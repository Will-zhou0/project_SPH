<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <!-- <h1>{{ categoryList }}</h1> -->
        <div class="container">
            <!-- 使用事件委托 当鼠标移出全部商品分类 和 一级分类 外面的大盒子 才会改变index 
            而不是将事件绑定在一级分类上 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" @click="goSearch" v-show="show">
                        <div class="all-sort-list2">
                            <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                </h3>
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{
                                                            c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { throttle } from 'lodash'
// import throttle from 'lodash/throttle'
// console.log();
export default {
    name: 'TypeNav',
    // 组件挂载完毕，向服务器发请求
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    mounted() {
        // 通知Vuex发请求 获取数据 存储与数据中
        console.log("我是typenav组件");

        if (this.$route.path != '/home') {
            this.show = false
        }
    },
    computed: {
        ...mapState({
            // 对象写法
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会执行一次
            // 注入一个参数state 即为大仓库store中的数据
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // changeIndex(index) {
        //     console.log(index, '鼠标进入');
        //     this.currentIndex = index
        // },
        // 鼠标移入 修改响应式数据currentIndex属性

        // 全局引入
        // changeIndex: _.throttle(function (index) {
        //     // index 一级分类的索引
        //     // 正常情况：鼠标进入，每一个一级分类h3 都会触发鼠标进入事件
        //     // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件 但是经过测试 只有部分h3 触发
        //     // 就是由于用户行为过快 导致浏览器反应不过来 .如果当前回调函数中有大量业务 可能出现卡顿现象
        //     console.log(index, '鼠标进入');
        //     this.currentIndex = index
        // }, 50),

        // 按需引入 不能用箭头函数 否则this会出现问题
        changeIndex: throttle(function (index) {
            // index 一级分类的索引
            // 正常情况：鼠标进入，每一个一级分类h3 都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件 但是经过测试 只有部分h3 触发
            // 就是由于用户行为过快 导致浏览器反应不过来 .如果当前回调函数中有大量业务 可能出现卡顿现象
            // console.log(index, '鼠标进入');
            this.currentIndex = index
        }, 50),
        leaveIndex() {
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                // 鼠标移出 商品列表隐藏
                this.show = false
            }

        },
        enterShow() {
            // 鼠标移入 商品列表展示
            if (this.$route.path != '/home') {
                // 鼠标移出 商品列表隐藏
                this.show = true
            }
        },
        goSearch(event) {
            let node = event.target;
            // console.log(node);
            // console.log(node.dataset);

            let { categoryname, category1id, category2id, category3id } = node.dataset

            if (categoryname) {
                // this.$router.push({
                //     name: 'search',
                //     params: { keyword: this.keyword || undefined },
                //     query: { k: this.keyword.toUpperCase() }
                // })
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // console.log(location, query);
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                if (this.$route.params) {
                    location.params = this.$route.params;
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }

            }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // less中&表示父类名，相当于.item:hover
                    // CSS控制二三级分类显示隐藏
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                // 使用CSS对一级分类添加背景颜色
                // .item:hover {
                //     background-color: skyblue;
                // }

                // 使用js对一级分类添加背景色
                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 过渡动画的样式
        // 开始状态
        .sort-enter {
            height: 0px;
        }

        // 结束状态

        .sort-enter-to {
            height: 461px;
        }

        // 定义动画事件、速率
        .sort-enter-active {
            transition: all .5s linear;
        }
    }
}
</style>