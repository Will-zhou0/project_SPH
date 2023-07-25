<template>
    <div class="event1">
        <h2 @click="$emit('click', '自定义事件click')">event2组件</h2>
        <span>其他内容</span>

    </div>
</template>

<script>
export default {
    name: '',
    mounted() {
        // this.$emit('click')
    },
    methods: {
        handler() {
            this.$emit('click', 111)
        }
    }
}
</script>

<style>
.event1 {
    background-color: rgb(167, 161, 161);
    height: 80px;
}
</style>