<template>
    <div>
        <span>当前count为{{ count }}</span>
        <h2>不使用sync修饰符</h2>
        <!-- 
            :count 父组件给子组件传递的props
            @update:count 给子组件绑定的自定义事件
            实现父子组件通信
         -->
        <Child :count='count' @update:count="count = $event" />
        <h2>使用sync修饰符</h2>
        <!-- 
            :count.sync 1.父组件给子组件传递一个props count
            2.给子组件绑定的自定义事件，事件名为update:count
         -->
        <Child2 :count.sync="count" />
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            count: 100
        }
    },
    components: {
        Child: () => import('./Child.vue'),
        Child2: () => import('./Child2.vue')
    }
}
</script>

<style></style>