<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

// 初始化主题系统
const { detectSystemTheme, loadTheme } = useTheme()

onMounted(() => {
  detectSystemTheme()
  loadTheme()
  console.log('App mounted with theme system')
})
</script>

<style lang="scss">
@import './styles/design-tokens.scss';
@import './styles/common.scss';
@import '../../you-ui-core/dist/style.css';

#app {
  font-family: var(--font-family-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: background-color var(--transition-base), color var(--transition-base);
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg-secondary);
  transition: background-color var(--transition-base);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-tertiary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border-primary);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-hover);
}
</style>