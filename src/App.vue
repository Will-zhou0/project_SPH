<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在home search中显示，在login register隐藏 -->
    <!-- <Footer v-show="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted() {
    this.$store.dispatch('CategoryList')
  }

}
</script>

<style></style>
