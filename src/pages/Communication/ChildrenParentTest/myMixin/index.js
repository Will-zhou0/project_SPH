export default {
    // 对外暴露的对象，可以放置组件重复的JS业务逻辑
    methods: {
        giveMoney(money) {
            this.money -= money
            // 在子组件内部，使用$parent属性获取某一个组件的父组件，操作父组件的属性方法
            this.$parent.money += money
        }
    }
}