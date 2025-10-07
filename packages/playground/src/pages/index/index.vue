<template>
  <div class="container">
    <div class="header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="title">You-Web UI Playground</h1>
          <p class="subtitle">组件库演示项目</p>
        </div>
        <div class="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 基础组件 -->
      <div class="section">
        <h2 class="section-title">基础组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/y-button')">
            <span class="component-icon">🔘</span>
            <span class="component-name">YButton</span>
            <span class="component-desc">按钮组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-icon')">
            <span class="component-icon">🎨</span>
            <span class="component-name">YIcon</span>
            <span class="component-desc">图标组件</span>
          </div>
        </div>
      </div>

      <!-- 表单组件 -->
      <div class="section">
        <h2 class="section-title">表单组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/y-input')">
            <span class="component-icon">📝</span>
            <span class="component-name">YInput</span>
            <span class="component-desc">输入框组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-textarea')">
            <span class="component-icon">📄</span>
            <span class="component-name">YTextarea</span>
            <span class="component-desc">文本域组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-cascade-selection/index')">
            <span class="component-icon">🔗</span>
            <span class="component-name">YCascadeSelection</span>
            <span class="component-desc">级联选择器</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-switch')">
            <span class="component-icon">🔄</span>
            <span class="component-name">YSwitch</span>
            <span class="component-desc">开关组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-radio/index')">
            <span class="component-icon">🔘</span>
            <span class="component-name">YRadio</span>
            <span class="component-desc">单选框组件</span>
          </div>
        </div>
      </div>

      <!-- 布局组件 -->
      <div class="section">
        <h2 class="section-title">布局组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/y-grid')">
            <span class="component-icon">⚏</span>
            <span class="component-name">YGrid</span>
            <span class="component-desc">宫格组件</span>
          </div>
        </div>
      </div>

      <!-- 导航组件 -->
      <div class="section">
        <h2 class="section-title">导航组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/pages/y-swipe-action/index')">
            <span class="component-icon">👆</span>
            <span class="component-name">YSwipeAction</span>
            <span class="component-desc">左滑菜单组件</span>
          </div>
        </div>
      </div>

      <!-- 展示组件 -->
      <div class="section">
        <h2 class="section-title">展示组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/pages/y-card/index')">
            <span class="component-icon">🎴</span>
            <span class="component-name">YCard</span>
            <span class="component-desc">基础卡片组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-list')">
            <span class="component-icon">📝</span>
            <span class="component-name">YList</span>
            <span class="component-desc">移动端列表组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-cell')">
            <span class="component-icon">📋</span>
            <span class="component-name">YCell</span>
            <span class="component-desc">单元格组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-tag')">
            <span class="component-icon">🏷️</span>
            <span class="component-name">YTag</span>
            <span class="component-desc">标签组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-footer')">
            <span class="component-icon">📄</span>
            <span class="component-name">YFooter</span>
            <span class="component-desc">页脚组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-steps/index')">
            <span class="component-icon">📊</span>
            <span class="component-name">YSteps</span>
            <span class="component-desc">步骤条组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-tabs/index')">
            <span class="component-icon">📑</span>
            <span class="component-name">YTabs</span>
            <span class="component-desc">标签页组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-countdown/index')">
            <span class="component-icon">⏰</span>
            <span class="component-name">YCountdown</span>
            <span class="component-desc">倒计时组件</span>
          </div>
        </div>
      </div>

      <!-- 反馈组件 -->
      <div class="section">
        <h2 class="section-title">反馈组件</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/y-loading')">
            <span class="component-icon">⏳</span>
            <span class="component-name">YLoading</span>
            <span class="component-desc">加载状态组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/y-tips')">
            <span class="component-icon">💬</span>
            <span class="component-name">YTips</span>
            <span class="component-desc">消息提示组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-modal/index')">
            <span class="component-icon">🔔</span>
            <span class="component-name">YModal</span>
            <span class="component-desc">弹窗组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-toast/index')">
            <span class="component-icon">💬</span>
            <span class="component-name">YToast</span>
            <span class="component-desc">消息提示组件</span>
          </div>
          <div class="component-item" @click="navigateTo('/pages/y-drawer/index')">
            <span class="component-icon">📱</span>
            <span class="component-name">YDrawer</span>
            <span class="component-desc">抽屉组件</span>
          </div>
        </div>
      </div>

      <!-- 工具函数 -->
      <div class="section">
        <h2 class="section-title">工具函数</h2>
        <div class="component-list">
          <div class="component-item" @click="navigateTo('/utils')">
            <span class="component-icon">🔧</span>
            <span class="component-name">Utils</span>
            <span class="component-desc">实用工具函数</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ThemeToggle from '../../components/ThemeToggle.vue'

// 声明Vue模板类型
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

const router = useRouter()

const navigateTo = (path: string) => {
  // 统一使用 Vue Router 进行导航
  router.push(path)
}
</script>

<style lang="scss" scoped>
.container {
  padding: var(--spacing-6);
  background-color: var(--color-bg-secondary);
  min-height: 100vh;
}

.header {
  padding: var(--spacing-16) var(--spacing-8);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-600) 100%);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-8);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    pointer-events: none;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.header-text {
  text-align: left;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin: 0;
  font-weight: var(--font-weight-normal);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--spacing-6);
    text-align: center;
  }
  
  .header-text {
    text-align: center;
  }
  
  .title {
    font-size: var(--font-size-3xl);
  }
  
  .subtitle {
    font-size: var(--font-size-base);
  }
}

.content {
  padding: 0 var(--spacing-6);
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-8);
  display: block;
}

.component-list {
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  overflow: hidden;
  border: 1px solid var(--color-border-primary);
}

.component-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-8);
  border-bottom: 1px solid var(--color-border-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  background-color: var(--color-bg-primary);
}

.component-item:last-child {
  border-bottom: none;
}

.component-item:hover {
  background-color: var(--color-bg-hover);
}

.component-item:active {
  background-color: var(--color-bg-active);
}

.component-icon {
  font-size: var(--font-size-xl);
  margin-right: var(--spacing-6);
  width: 40px;
  text-align: center;
  opacity: 0.8;
}

.component-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-right: var(--spacing-6);
  min-width: 120px;
}

.component-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  flex: 1;
}
</style>