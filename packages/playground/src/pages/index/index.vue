<template>
  <div class="container">
    <div class="header">
      <h1 class="title">You-Web UI Playground</h1>
      <p class="subtitle">组件库演示项目</p>
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
          <div class="component-item" @click="navigateTo('/YCascadeSelection')">
            <span class="component-icon">🔗</span>
            <span class="component-name">YCascadeSelection</span>
            <span class="component-desc">级联选择器</span>
          </div>
          <div class="component-item" @click="navigateTo('/YRadio')">
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
          <div class="component-item" @click="navigateTo('/YToast')">
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
  padding: $spacing-lg;
  background-color: $bg-color-grey;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 60px 0;
  background: #777676;
  border-radius: $border-radius-lg;
  margin-bottom: $spacing-xl;
  color: $color-white;
}

.title {
  font-size: $font-size-title;
  font-weight: bold;
  display: block;
  margin-bottom: $spacing-lg;
}

.subtitle {
  font-size: $font-size-subtitle;
  opacity: 0.8;
  display: block;
}

.content {
  padding: 0 $spacing-lg;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: $font-size-xl;
  font-weight: bold;
  color: $text-color;
  margin-bottom: $spacing-xl;
  display: block;
}

.component-list {
  background: $color-white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.component-item {
  display: flex;
  align-items: center;
  padding: $spacing-lg $spacing-xl;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
  transition: background-color 0.2s;
}

.component-item:last-child {
  border-bottom: none;
}

.component-item:hover {
  background-color: $bg-color-hover;
}

.component-item:active {
  background-color: $bg-color-grey;
}

.component-icon {
  font-size: $font-size-xl;
  margin-right: $spacing-lg;
  width: 40px;
  text-align: center;
}

.component-name {
  font-size: $font-size-lg;
  font-weight: bold;
  color: $text-color;
  margin-right: $spacing-lg;
  min-width: 120px;
}

.component-desc {
  font-size: $font-size-base;
  color: $text-color-grey;
  flex: 1;
}
</style>