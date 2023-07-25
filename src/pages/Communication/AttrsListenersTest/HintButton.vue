<template>
    <div>
        <el-button v-bind:type="$props.type" :icon="$attrs.icon" :size="$attrs.size" @click="$emit('click')">添加</el-button>
        <!-- v-bind 不能用 ':'替代； v-on 不能用 '@' 代替 -->
        <el-button v-bind="$props" v-on="$listeners">添加</el-button>
        <el-button v-bind="$attrs">添加</el-button>
    </div>
</template>

<script>
export default {
    props: ['type'],
    mounted() {
        // $attrs属于组件的一个属性，可以获取到父组件传递过来的props数据
        // 父组件传递过来的数据，在子组件中可以使用props接收；
        // 在子组件props中没接收的父组件传来的数据，可以在$attrs中获取
        console.log(this.$props);
        console.log(this.$attrs);
        console.log(this.$listeners);
    }
}
</script>
