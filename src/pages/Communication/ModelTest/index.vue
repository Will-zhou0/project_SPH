<template>
    <div>
        <h2>v-model深入</h2>
        <input v-model="msg">
        <span>{{ msg }}</span>
        <br>
        <hr>
        <h2>v-model实现原理</h2>
        <!-- 通过 :value单向绑定 与input事件 实现v-model双向绑定功能 -->
        <input :value="msg" @input="msg = $event.target.value">
        <br>
        <hr>
        <!-- 组件里的 :abc 是子组件里的 props ，用于父子组件通信
            @input 为自定义事件
        -->
        <!-- 这里的$event 代表什么 
            $event 是一个特殊的变量，它代表当前事件对象。
            当在模板中使用 @ 或 v-on 指令绑定事件监听器时，可以通过 $event 访问到触发事件的原生事件对象。
        -->
        <CustomInput :abc='msg' @input="msg = $event" />
        <!-- 等价于下面的 v-model -->
        <CustomInput :abc='msg' v-model="msg" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '文蒂公主'
        }
    },
    components: {
        CustomInput: () => import('./CustomInput.vue')
    },
    methods: {
        handler(v) {
            this.msg = v
        }
    }
}
</script>

<style></style>