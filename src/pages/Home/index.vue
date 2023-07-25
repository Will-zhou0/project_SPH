<template>
    <div>
        <!-- 三级联动组件已经注册为全局组件 因此不需要在引入 直接使用 -->
        <TypeNav></TypeNav>
        <List></List>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <!-- floor组件内部是没有发送请求的（没有异步操作），数据是父组件给的 -->
        <Floor v-for="(f, index) in floorList" :key="f.id" :list="f"></Floor>
        <!-- <Floor></Floor> -->
        <Brand></Brand>
    </div>
</template>

<script>
// import TypeNav from './TypeNav/index.vue'
import List from '@/pages/Home/List'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'

export default {
    components: { List, Recommend, Rank, Like, Floor, Brand },
    mounted() {
        this.$store.dispatch('getFloorList')
    },

    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    },
    methods: {
        // add() {
        //     // 派发action
        //     this.$store.dispatch('add')
        // }
    }
}
</script>

<style></style>