<template>
  <div class="container">
    <div class="header">
      <h1 class="title">You-UniApp UI Playground</h1>
      <p class="subtitle">组件库演示项目</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 class="section-title">快速开始</h2>
        <div class="card-list">
          <div class="card" @click="navigateToComponents">
            <h3 class="card-title">组件展示</h3>
            <p class="card-desc">查看所有可用的UI组件</p>
          </div>
          
          <div class="card">
            <h3 class="card-title">设计规范</h3>
            <p class="card-desc">了解设计系统和使用规范</p>
          </div>
          
          <div class="card">
            <h3 class="card-title">开发指南</h3>
            <p class="card-desc">学习如何使用和定制组件</p>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">特性</h2>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span class="feature-text">现代化设计系统</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span class="feature-text">多端适配</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span class="feature-text">高性能优化</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔧</span>
            <span class="feature-text">TypeScript 支持</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToComponents = () => {
  router.push('/components')
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 40px;
  color: white;
}

.title {
  font-size: 48px;
  font-weight: bold;
  display: block;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 28px;
  opacity: 0.8;
  display: block;
}

.content {
  padding: 0 20px;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  display: block;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:active {
  transform: scale(0.98);
}

.card-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 16px;
}

.card-desc {
  font-size: 28rpx;
  color: #666;
  display: block;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.feature-item {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.feature-text {
  font-size: 28rpx;
  color: #333;
  display: block;
}
</style>