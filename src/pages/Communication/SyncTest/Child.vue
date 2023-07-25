<template>
    <div style="background-color: #ccc; height: 60px;">
        <div>
            <button @click="$emit('update:count', count - 10)">count-10</button>
            <br>
            count每次减10,总数还剩多少???{{ count }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['count']
}
</script>

<style></style>