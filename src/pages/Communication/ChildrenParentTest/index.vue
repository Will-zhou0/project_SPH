<template>
    <div>
        <h2>银行有存款：{{ money }}</h2>
        <button @click="borrowMoneyFromSon(200)">向儿子借钱200</button><br>
        <button @click="borrowMoneyFromDaughter(100)">向女儿借钱100</button><br>
        <button @click="borrowMoneyFromAll(200)">向儿女借钱200</button>
        <br>
        <Son ref="son" />
        <br>
        <Daughter ref="daughter" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            money: 1000
        }
    },
    components: {
        Son: () => import('./Son.vue'),
        Daughter: () => import('./Daughter.vue')
    },
    methods: {
        borrowMoneyFromSon(money) {
            this.money += money
            // ref可以获取真实DOM节点，也可以获取子组件标签（操作子组件的数据与方法）
            this.$refs.son.money -= money
        },
        borrowMoneyFromDaughter(money) {
            this.money += money
            // ref可以获取真实DOM节点，也可以获取子组件标签（操作子组件的数据与方法）
            this.$refs.daughter.money -= money
        },
        borrowMoneyFromAll(money) {
            this.money += money * 2
            // 组件实例自身的属性$children,可以获取当前组件全部子组件
            this.$children.forEach(item => {
                item.money -= money
            })
        },

    }
}
</script>

<style></style>