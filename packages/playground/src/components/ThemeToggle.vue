<template>
  <div class="theme-toggle">
    <button 
      class="theme-toggle-button"
      @click="handleButtonClick"
      :title="`当前主题: ${getThemeLabel(currentTheme)}`"
    >
      <span class="theme-icon">{{ getThemeIcon(currentTheme) }}</span>
      <span class="theme-label">{{ getThemeLabel(currentTheme) }}</span>
      <span class="dropdown-arrow">▼</span>
    </button>
    
    <!-- 主题选择下拉菜单 -->
    <div class="theme-dropdown" v-if="showDropdown">
      <div 
        class="theme-option"
        v-for="theme in themes"
        :key="theme"
        :class="{ active: currentTheme === theme }"
        @click="selectTheme(theme)"
      >
        <span class="theme-option-icon">{{ getThemeIcon(theme) }}</span>
        <span class="theme-option-label">{{ getThemeLabel(theme) }}</span>
        <span class="theme-option-check" v-if="currentTheme === theme">✓</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme, type Theme } from '../composables/useTheme'

const { 
  currentTheme, 
  appliedTheme,
  setTheme, 
  toggleTheme, 
  getThemeLabel, 
  getThemeIcon 
} = useTheme()

const showDropdown = ref(false)
const themes: Theme[] = ['light', 'dark', 'auto']

const handleButtonClick = () => {
  showDropdown.value = !showDropdown.value
}

const selectTheme = (theme: Theme) => {
  setTheme(theme)
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-toggle')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.theme-toggle {
  position: relative;
  display: inline-block;
  z-index: 1000;
}

.theme-toggle-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--color-bg-hover);
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-base);
  }

  &:active {
    background: var(--color-bg-active);
    transform: translateY(1px);
  }
}

.theme-icon {
  font-size: var(--font-size-base);
  line-height: 1;
}

.theme-label {
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-1);
  transition: transform var(--transition-fast);
  opacity: 0.6;
}

.theme-toggle-button:hover .dropdown-arrow {
  opacity: 1;
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  min-width: 160px;
  max-height: 200px;
  overflow-y: auto;
  animation: dropdownFadeIn 0.15s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.theme-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background: var(--color-bg-hover);
  }

  &.active {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
}

.theme-option-icon {
  font-size: var(--font-size-base);
  line-height: 1;
}

.theme-option-label {
  flex: 1;
  font-weight: var(--font-weight-medium);
}

.theme-option-check {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-label {
    display: none;
  }
  
  .theme-toggle-button {
    padding: var(--spacing-2);
  }
}
</style>