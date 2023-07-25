<template>
    <div>
        <div class="link">
            <h2>组件间高级通信</h2>
            <router-link to="event">event深入</router-link>&nbsp;
            <router-link to="model">v-model深入</router-link>&nbsp;
            <router-link to="sync">属性修饰符sync</router-link>&nbsp;
            <router-link to="attrs-listeners">$attrs与$listeners</router-link>&nbsp;
            <router-link to="children-parent">$children与$parent</router-link>&nbsp;
            <router-link to="scope-slot">作用域插槽scope-slot</router-link>&nbsp;
        </div>
        <br>
        <hr>
        <div class="view">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    name: '',

}
</script>

<style>
.link {
    font-size: 15px
}

.view {
    font-size: 15px
}
</style>