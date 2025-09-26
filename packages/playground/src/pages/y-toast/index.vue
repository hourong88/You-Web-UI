<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YToast 轻提示</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="button-group">
        <YButton type="primary" @click="showBasicToast">显示基础提示</YButton>
      </div>
      <div class="demo-desc">最简单的文字提示</div>
    </div>

    <!-- 成功提示 -->
    <div class="demo-section">
      <div class="section-title">成功提示</div>
      <div class="button-group">
        <YButton type="success" @click="showSuccessToast">显示成功提示</YButton>
      </div>
      <div class="demo-desc">带成功图标的提示</div>
    </div>

    <!-- 错误提示 -->
    <div class="demo-section">
      <div class="section-title">错误提示</div>
      <div class="button-group">
        <YButton type="danger" @click="showErrorToast">显示错误提示</YButton>
      </div>
      <div class="demo-desc">带错误图标的提示</div>
    </div>

    <!-- 警告提示 -->
    <div class="demo-section">
      <div class="section-title">警告提示</div>
      <div class="button-group">
        <YButton type="warning" @click="showWarningToast">显示警告提示</YButton>
      </div>
      <div class="demo-desc">带警告图标的提示</div>
    </div>

    <!-- 加载提示 -->
    <div class="demo-section">
      <div class="section-title">加载提示</div>
      <div class="button-group">
        <YButton type="gray" @click="showLoadingToast">显示加载提示</YButton>
      </div>
      <div class="demo-desc">带加载图标的提示</div>
    </div>

    <!-- 带内容的提示 -->
    <div class="demo-section">
      <div class="section-title">带内容的提示</div>
      <div class="button-group">
        <YButton type="primary" @click="showContentToast">显示详细提示</YButton>
      </div>
      <div class="demo-desc">标题+内容的详细提示</div>
    </div>

    <!-- 长时间显示 -->
    <div class="demo-section">
      <div class="section-title">长时间显示</div>
      <div class="button-group">
        <YButton type="primary" @click="showLongToast">显示长时间提示</YButton>
      </div>
      <div class="demo-desc">显示5秒的提示</div>
    </div>

    <!-- 手动关闭 -->
    <div class="demo-section">
      <div class="section-title">手动关闭</div>
      <div class="button-group">
        <YButton type="primary" @click="showManualToast">显示提示</YButton>
        <YButton type="gray" @click="hideToast">手动关闭</YButton>
      </div>
      <div class="demo-desc">可以手动关闭的提示</div>
    </div>

    <!-- Toast组件 -->
    <YToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YToast, YButton } from '@you-web/ui-core'

const router = useRouter()
const toastRef = ref()

const goBack = () => {
  router.push('/')
}

// 基础提示
const showBasicToast = () => {
  toastRef.value?.show({
    title: '操作成功',
    duration: 2000
  })
}

// 成功提示
const showSuccessToast = () => {
  toastRef.value?.show({
    title: '提交成功',
    icon: true,
    imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM1MkM0MUEiLz4KPHBhdGggZD0iTTI2LjY2NjcgMzJMMjkuMzMzNCAzNC42NjY3TDM3LjMzMzQgMjYuNjY2NyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjY2NjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    duration: 2000
  })
}

// 错误提示
const showErrorToast = () => {
  toastRef.value?.show({
    title: '操作失败',
    icon: true,
    imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGNTU2NTYiLz4KPHBhdGggZD0iTTI2LjY2NjcgMjYuNjY2N0wzNy4zMzM0IDM3LjMzMzRNMzcuMzMzNCAyNi42NjY3TDI2LjY2NjcgMzcuMzMzNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjY2NjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    duration: 2000
  })
}

// 警告提示
const showWarningToast = () => {
  toastRef.value?.show({
    title: '请注意',
    icon: true,
    imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGRkI5MDAiLz4KPHBhdGggZD0iTTMyIDIyLjY2NjdWMzJNMzIgNDEuMzMzNEgzMi4wMTMzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNjY2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4=',
    duration: 2000
  })
}

// 加载提示
const showLoadingToast = () => {
  toastRef.value?.show({
    title: '加载中...',
    icon: true,
    imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM2Qzc1N0QiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTAuNjY2NyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjY2NjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjE2IDgiLz4KPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCAzMiAzMiIgdG89IjM2MCAzMiAzMiIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9zdmc+',
    duration: 3000
  })
}

// 带内容的提示
const showContentToast = () => {
  toastRef.value?.show({
    title: '操作成功',
    content: '您的数据已保存',
    icon: true,
    imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM1MkM0MUEiLz4KPHBhdGggZD0iTTI2LjY2NjcgMzJMMjkuMzMzNCAzNC42NjY3TDM3LjMzMzQgMjYuNjY2NyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjY2NjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    duration: 2000
  })
}

// 长时间显示
const showLongToast = () => {
  toastRef.value?.show({
    title: '这是一个长时间显示的提示',
    duration: 5000
  })
}

// 手动关闭
const showManualToast = () => {
  toastRef.value?.show({
    title: '这个提示需要手动关闭',
    duration: 10000 // 10秒后自动关闭
  })
}

const hideToast = () => {
  toastRef.value?.hide()
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.button-group {
  display: flex;
  gap: $spacing-base;
  flex-wrap: wrap;
  justify-content: center;
  
  :deep(.y-button) {
    flex: 1;
    min-width: 120px;
    max-width: 200px;
  }
}

.demo-desc {
  margin-top: $spacing-base;
  padding: $spacing-base;
  background-color: #f8f9fa;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  text-align: center;
}
</style>