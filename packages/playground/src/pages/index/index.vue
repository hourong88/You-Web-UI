<template>
  <view class="container">
    <view class="header">
      <text class="title">You-UniApp UI Playground</text>
      <text class="subtitle">组件库演示项目</text>
    </view>
    
    <view class="content">
      <view class="section">
        <text class="section-title">快速开始</text>
        <view class="card-list">
          <view class="card" @click="navigateToComponents">
            <text class="card-title">组件展示</text>
            <text class="card-desc">查看所有可用的UI组件</text>
          </view>
          
          <view class="card">
            <text class="card-title">设计规范</text>
            <text class="card-desc">了解设计系统和使用规范</text>
          </view>
          
          <view class="card">
            <text class="card-title">开发指南</text>
            <text class="card-desc">学习如何使用和定制组件</text>
          </view>
        </view>
      </view>
      
      <view class="section">
        <text class="section-title">特性</text>
        <view class="feature-list">
          <view class="feature-item">
            <text class="feature-icon">🎨</text>
            <text class="feature-text">现代化设计系统</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">📱</text>
            <text class="feature-text">多端适配</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">⚡</text>
            <text class="feature-text">高性能优化</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">🔧</text>
            <text class="feature-text">TypeScript 支持</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const navigateToComponents = () => {
  uni.navigateTo({
    url: '/pages/components/index'
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 60rpx 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  color: white;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  opacity: 0.8;
  display: block;
}

.content {
  padding: 0 20rpx;
}

.section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  display: block;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:active {
  transform: scale(0.98);
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 16rpx;
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
  min-width: 300rpx;
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  text-align: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 48rpx;
  display: block;
  margin-bottom: 16rpx;
}

.feature-text {
  font-size: 28rpx;
  color: #333;
  display: block;
}
</style>