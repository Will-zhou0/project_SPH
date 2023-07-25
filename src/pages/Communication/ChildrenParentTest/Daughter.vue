<template>
    <div style="background-color: #ccc;height: 50px;">
        <span>女儿有存款{{ money }}</span>
        <button @click="giveMoney(50)">给父50</button>

    </div>
</template>

<script>
import myMixin from './myMixin'
export default {
    data() {
        return {
            money: 20000
        }
    },
    mixins: [myMixin]
}
</script>

<style></style>