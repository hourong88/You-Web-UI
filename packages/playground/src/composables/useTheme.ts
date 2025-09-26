/**
 * 主题管理 Composable
 * Theme Management Composable
 */

import { ref, computed, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'you-ui-theme'

// 全局主题状态
const currentTheme = ref<Theme>('light')
const systemTheme = ref<'light' | 'dark'>('light')

export function useTheme() {
  // 计算实际应用的主题
  const appliedTheme = computed(() => {
    if (currentTheme.value === 'auto') {
      return systemTheme.value
    }
    return currentTheme.value
  })

  // 检测系统主题
  const detectSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      systemTheme.value = mediaQuery.matches ? 'dark' : 'light'

      // 监听系统主题变化
      mediaQuery.addEventListener('change', (e) => {
        systemTheme.value = e.matches ? 'dark' : 'light'
      })
    }
  }

  // 应用主题到DOM
  const applyTheme = (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      console.log('Applied theme:', theme, 'to document.documentElement')
    }
  }

  // 设置主题
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme

    // 保存到本地存储
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }

  // 切换主题
  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // 从本地存储加载主题
  const loadTheme = () => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        currentTheme.value = savedTheme
      }
    }
  }

  // 获取主题显示名称
  const getThemeLabel = (theme: Theme) => {
    const labels = {
      light: '浅色',
      dark: '深色',
      auto: '跟随系统'
    }
    return labels[theme]
  }

  // 获取主题图标
  const getThemeIcon = (theme: Theme) => {
    const icons = {
      light: '☀️',
      dark: '🌙',
      auto: '🔄'
    }
    return icons[theme]
  }

  // 监听应用主题变化
  watch(appliedTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  // 初始化
  onMounted(() => {
    detectSystemTheme()
    loadTheme()
  })

  return {
    currentTheme: computed(() => currentTheme.value),
    appliedTheme,
    systemTheme: computed(() => systemTheme.value),
    setTheme,
    toggleTheme,
    getThemeLabel,
    getThemeIcon,
    loadTheme,
    detectSystemTheme
  }
}