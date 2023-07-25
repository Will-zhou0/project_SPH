<template>
    <div>
        <h2>自定义带hover提示的按钮</h2>
        <HintButton type="success" icon="el-icon-plus" size="mini" title="提示按钮" @click="handler" />
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {
        HintButton: () => import('./HintButton.vue')
    },
    methods: {
        handler() {
            alert(111)
        }
    }
}
</script>

<style></style>