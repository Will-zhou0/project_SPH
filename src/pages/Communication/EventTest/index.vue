<template>
    <div>
        <h1>event-test组件</h1>
        <!-- 原生DOM绑定系统事件 -->
        <button @click="handler">原生DOM绑定原生事件</button>
        <!-- event1组件 非原生DOM节点，所以click事件被当作自定义事件，并非原生DOM事件 
            @click.native 可以把自定义事件变为原生DOM事件
            当前原生DOM click事件 ，其实是给子组件的根节点绑定了点击事件——事件委派
        -->
        <Event1 @click.native="handler1"></Event1>
        <button @xxx="handler">原生DOM绑定自定义事件(无意义)</button>
        <Event2 @click="handler2"></Event2>
    </div>
</template>

<script>
export default {
    name: '',
    components: {
        Event1: () => import('./Event1.vue'),
        Event2: () => import('./Event2.vue')
    },
    methods: {
        // 原生DOMbutton的事件回调
        handler(event) {
            console.log('原生DOM 原生事件', event);
        },
        handler1(event) {
            console.log('组件原生事件', event);
        },
        handler2(a) {
            console.log('组件自定义事件', a);
        },
    }
}
</script>

<style></style>