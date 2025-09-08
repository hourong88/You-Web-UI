<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YLoading 加载组件</text>
    </view>
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="demo-item">
        <div class="demo-label">垂直布局（默认）</div>
        <div class="demo-content">
          <YLoading :visible="showColumn" text="加载中..." />
          <button @click="toggleColumn" class="demo-btn">
            {{ showColumn ? '隐藏' : '显示' }}加载
          </button>
        </div>
      </div>

      <div class="demo-item">
        <div class="demo-label">水平布局</div>
        <div class="demo-content">
          <YLoading :visible="showRow" type="row" text="加载中..." :fixed="false" />
          <button @click="toggleRow" class="demo-btn">{{ showRow ? '隐藏' : '显示' }}加载</button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <div class="demo-item">
        <div class="demo-label">自定义颜色和背景</div>
        <div class="demo-content">
          <YLoading :visible="showCustom" text="自定义加载" color="#007AFF" backgroundColor="rgba(255, 255, 255, 0.9)" />
          <button @click="toggleCustom" class="demo-btn">
            {{ showCustom ? '隐藏' : '显示' }}加载
          </button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">遮罩层</div>
      <div class="demo-item">
        <div class="demo-label">带遮罩层的加载</div>
        <div class="demo-content">
          <YLoading :visible="showMask" text="带遮罩加载" :isMask="true" maskColor="rgba(0,0,0,0.5)" :maskClosable="true"
            @maskClick="handleMaskClick" />
          <button @click="toggleMask" class="demo-btn">{{ showMask ? '隐藏' : '显示' }}加载</button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">非固定定位</div>
      <div class="demo-item">
        <div class="demo-label">内联加载</div>
        <div class="demo-content inline-container">
          <div class="inline-box">
            <YLoading :visible="showInline" type="row" text="内联加载" :fixed="false" />
            <div v-if="!showInline" class="placeholder-content">
              <text>这里是一些内容</text>
            </div>
          </div>
          <button @click="toggleInline" class="demo-btn">
            {{ showInline ? '隐藏' : '显示' }}加载
          </button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">扩展加载样式</div>
      <div class="demo-item loader-section">
        <div class="demo-label">样式1 - 柱状图动画</div>
        <div class="demo-content">
          <div class="tui-loading-box">
            <div class="bar-loader">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
            <text class="tui-loadmore-tips">柱状图加载中...</text>
          </div>
        </div>
      </div>

      <div class="demo-item loader-section">
        <div class="demo-label">样式2 - 应用图标</div>
        <div class="demo-content">
          <div class="tui-loading-box">
            <div class="app-icon"></div>
            <text class="tui-loadmore-tips">应用图标加载中...</text>
          </div>
        </div>
      </div>

      <div class="demo-item loader-section">
        <div class="demo-label">样式3 - 圆形加载器</div>
        <div class="demo-content">
          <div class="tui-loading-box">
            <div class="circular-loader">
              <div class="spinner"></div>
              <text class="loading-text">Loading</text>
            </div>
            <text class="tui-loadmore-tips">圆形加载中...</text>
          </div>
        </div>
      </div>

      <div class="demo-item loader-section">
        <div class="demo-label">样式4 - 简单加载器</div>
        <div class="demo-content">
          <div class="tui-loading-box">
            <div class="simple-loader">
              <div class="simple-spinner"></div>
              <text class="simple-text">Loading...</text>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">模拟加载场景</div>
      <div class="demo-item">
        <div class="demo-label">模拟数据加载</div>
        <div class="demo-content" style="display: block">
          <YLoading :visible="isLoading" text="正在加载数据..." :isMask="true" :maskClosable="true"
            @maskClick="handleSimulateLoadingMaskClick" />
          <div v-if="!isLoading && loadedData.length > 0" class="data-list">
            <div v-for="item in loadedData" :key="item.id" class="data-item">
              {{ item.name }}
            </div>
          </div>
          <div style="margin-top: 20px">
            <YButton @click="simulateLoading" class="demo-btn" :disabled="isLoading">
              {{ isLoading ? '加载中...' : '开始加载' }}
            </YButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YLoading, YButton } from '@you-uniapp/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础用法状态
const showColumn = ref(false)
const showRow = ref(false)
const showCustom = ref(false)
const showMask = ref(false)
const showInline = ref(false)



// 模拟加载状态
const isLoading = ref(false)
const loadedData = ref<Array<{ id: number; name: string }>>([])

// 切换显示状态的方法
const toggleColumn = () => {
  showColumn.value = !showColumn.value
}

const toggleRow = () => {
  showRow.value = !showRow.value
}

const toggleCustom = () => {
  showCustom.value = !showCustom.value
}

const toggleMask = () => {
  showMask.value = !showMask.value
}

const toggleInline = () => {
  showInline.value = !showInline.value
}



// 处理遮罩点击事件
const handleMaskClick = () => {
  showMask.value = false
}

// 处理模拟加载遮罩点击事件
const handleSimulateLoadingMaskClick = () => {
  isLoading.value = false
}

// 模拟数据加载
const simulateLoading = () => {
  isLoading.value = true
  loadedData.value = []

  setTimeout(() => {
    loadedData.value = [
      { id: 1, name: '数据项 1' },
      { id: 2, name: '数据项 2' },
      { id: 3, name: '数据项 3' },
      { id: 4, name: '数据项 4' },
      { id: 5, name: '数据项 5' },
    ]
    isLoading.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';



.demo-item {
  margin-bottom: 40rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.demo-content {
  position: relative;
  min-height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx dashed #ddd;
  border-radius: 12rpx;
  padding: 40rpx;
}

.demo-btn {
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.inline-container {
  flex-direction: column;
  gap: 20rpx;
}

.inline-box {
  width: 100%;
  height: 200rpx;
  border: 2rpx solid #e5e5e5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fafafa;
}

.placeholder-content {
  color: #999;
  font-size: 28rpx;
}

.data-list {
  width: 100%;
  max-width: 600rpx;
}

.data-item {
  padding: 20rpx;
  background-color: #f8f9fa;
  border: 1rpx solid #e9ecef;
  border-radius: 8rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  color: #495057;

  &:last-child {
    margin-bottom: 0;
  }
}

// 扩展加载样式
.tui-loadmore {
  width: 48%;
  margin: 1.5em auto;
  line-height: 1.5em;
  font-size: 24rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
}

/* 柱状图Loading动画 */
.bar-loader {
  display: flex;
  gap: 8rpx;
  margin-bottom: 40rpx;
}

.bar {
  width: 16rpx;
  height: 80rpx;
  background: linear-gradient(to top, #4caf50, #81c784);
  animation: barAnimation 1.2s infinite ease-in-out;
  transform-origin: bottom;
  border-radius: 8rpx;
}

.bar:nth-child(1) {
  background: linear-gradient(to top, #2196f3, #64b5f6);
  animation-delay: -0.32s;
}

.bar:nth-child(2) {
  background: linear-gradient(to top, #03a9f4, #4fc3f7);
  animation-delay: -0.16s;
}

.bar:nth-child(3) {
  background: linear-gradient(to top, #4caf50, #81c784);
  animation-delay: 0s;
}

@keyframes barAnimation {

  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    opacity: 0.7;
  }

  20% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* 应用图标样式 */
.app-icon {
  width: 160rpx;
  height: 160rpx;
  border-radius: 36rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 120rpx;
}

.app-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 36rpx 36rpx 0 0;
}

.app-icon::after {
  content: '';
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.tui-loadmore-tips {
  display: inline-block;
  vertical-align: middle;
  color: #666;
}

/* 圆形加载器 */
.circular-loader {
  width: 240rpx;
  height: 240rpx;
  background-color: #666;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
  position: relative;
}

.spinner {
  width: 80rpx;
  height: 80rpx;
  border: 6rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 30rpx;
}

.loading-text {
  color: #fff;
  font-size: 28rpx;
  font-weight: 400;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 底部简单加载器 */
.simple-loader {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.simple-spinner {
  width: 48rpx;
  height: 48rpx;
  border: 4rpx solid #ddd;
  border-radius: 50%;
  border-top-color: #666;
  animation: spin 0.8s linear infinite;
}

.simple-text {
  color: #666;
  font-size: 32rpx;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .title {
    font-size: 56rpx;
  }

  .container {
    padding: 0 20rpx;
  }

  .circular-loader {
    width: 200rpx;
    height: 200rpx;
  }

  .spinner {
    width: 64rpx;
    height: 64rpx;
  }
}

/* 添加一些装饰性动画 */
.loader-section {
  animation: fadeInUp 0.6s ease-out;
}

.loader-section:nth-child(2) {
  animation-delay: 0.1s;
}

.loader-section:nth-child(3) {
  animation-delay: 0.2s;
}

.loader-section:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
