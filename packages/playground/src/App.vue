<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Vue 应用生命周期
console.log('App mounted')
</script>

<style lang="scss">
@import '../../you-ui-core/dist/style.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
}
</style>