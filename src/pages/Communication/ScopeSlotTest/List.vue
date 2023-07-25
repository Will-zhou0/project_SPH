<template>
    <div>
        <ul>

            <li v-for="(item, index) in todos" :key="item.id">
                <!-- 作用域插槽的语法规则，：加上变量名 
                    将子组件中的数据传给父组件
                -->
                <slot :todo="item">

                </slot>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    props: ['todos']
}
</script>

<style></style>