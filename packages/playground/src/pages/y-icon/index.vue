<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YIcon 图标组件</text>
    </view>

    <div class="demo-section">
      <div class="section-title">基础图标</div>
      <div class="icon-group">
        <div class="icon-item" v-for="icon in basicIcons" :key="icon.name">
          <YIcon :name="icon.name" :size="32" @click="handleIconClick" />
          <text class="icon-name">{{ icon.name }}</text>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">操作图标</div>
      <div class="icon-group">
        <div class="icon-item" v-for="icon in actionIcons" :key="icon.name">
          <YIcon :name="icon.name" :size="32" @click="handleIconClick" />
          <text class="icon-name">{{ icon.name }}</text>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">不同尺寸</div>
      <div class="size-demo">
        <YIcon name="home" :size="24" color="#007aff" />
        <YIcon name="home" :size="32" color="#007aff" />
        <YIcon name="home" :size="48" color="#007aff" />
        <YIcon name="home" :size="64" color="#007aff" />
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">不同颜色</div>
      <div class="color-demo">
        <YIcon name="plus" :size="32" color="#ff3b30" />
        <YIcon name="star" :size="32" color="#ff9500" />
        <YIcon name="like" :size="32" color="#34c759" />
        <YIcon name="message" :size="32" color="#007aff" />
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">自定义间距</div>
      <div class="margin-demo">
        <text class="demo-label">默认间距:</text>
        <YIcon name="home" :size="24" color="#007aff" />
        <YIcon name="star" :size="24" color="#007aff" />
        <YIcon name="like" :size="24" color="#007aff" />
      </div>
      <div class="margin-demo">
        <text class="demo-label">自定义间距:</text>
        <YIcon name="home" :size="24" color="#ff3b30" margin="0 20rpx" />
        <YIcon name="star" :size="24" color="#ff3b30" margin="0 20rpx" />
        <YIcon name="like" :size="24" color="#ff3b30" margin="0 20rpx" />
      </div>
      <div class="margin-demo">
        <text class="demo-label">大间距:</text>
        <YIcon name="home" :size="24" color="#34c759" margin="0 40rpx" />
        <YIcon name="star" :size="24" color="#34c759" margin="0 40rpx" />
        <YIcon name="like" :size="24" color="#34c759" margin="0 40rpx" />
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">点击事件</div>
      <div class="event-demo">
        <YIcon name="home" :size="32" color="#007aff" @click="handleIconClick" />
        <text class="event-text">点击图标查看事件</text>
      </div>
    </div>

    <div class="demo-section">
      <div class="icon-info">
        <div class="info-title">📁 更多图标</div>
        <div class="info-content">
          <p>本页面仅展示部分常用图标，完整的图标库包含170+个精美图标。</p>
          <p>查看完整图标列表：<code>public/icons</code> 文件夹</p>
          <p>所有图标均为SVG格式，支持自定义颜色和尺寸。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YIcon } from '@you-web/ui-core'



// 声明uni全局对象
declare const uni: any

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础图标（仅使用README.md中存在的图标）
const basicIcons = ref([
  { name: 'home' },
  { name: 'search' },
  { name: 'like' },
  { name: 'star' },
  { name: 'share' },
  { name: 'message' },
  { name: 'mail' },
  { name: 'location' },
  { name: 'add' },
  { name: 'close' },
  { name: 'check' },
])

// 操作图标
const actionIcons = ref([
  { name: 'add' },
  { name: 'reduce' },
  { name: 'close' },
  { name: 'check' },
  { name: 'edit' },
  { name: 'delete' },
  { name: 'refresh' },
  { name: 'download' },
])

const handleIconClick = () => {
  console.log('图标被点击了！')
  // 可以替换为自定义 toast 组件
  alert('图标被点击了！')
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.icon-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-base; // 24rpx
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(25% - 18rpx); // 一行4个图标
  padding: $spacing-md; // 24rpx
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2rpx);
  }
}

.icon-name {
  font-size: $font-size-xs; // 20rpx
  color: #666;
  margin-top: $spacing-xs; // 8rpx
  text-align: center;
  word-break: break-all;
}

.size-demo {
  display: flex;
  align-items: center;
  gap: $spacing-lg; // 32rpx
  padding: $spacing-md; // 24rpx
  background-color: #fafafa;
  border-radius: $border-radius-sm; // 8rpx
}

.color-demo {
  display: flex;
  align-items: center;
  gap: $spacing-lg; // 32rpx
  padding: $spacing-md; // 24rpx
  background-color: #fafafa;
  border-radius: $border-radius-sm; // 8rpx
}

.svg-icon-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md; // 24rpx
}

.svg-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(25% - 18rpx); // 一行4个图标
  padding: $spacing-md; // 24rpx
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2rpx);
  }
}

.svg-icon {
  width: 32rpx;
  height: 32rpx;
}

.margin-demo {
  display: flex;
  align-items: center;
  gap: $spacing-xs; // 8rpx
  padding: $spacing-md; // 24rpx
  background-color: #fafafa;
  border-radius: $border-radius-sm; // 8rpx
  margin-bottom: $spacing-sm; // 16rpx

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  font-size: $font-size-sm; // 24rpx
  color: #666;
  min-width: 120rpx;
  margin-right: $spacing-sm; // 16rpx
}

.event-demo {
  display: flex;
  align-items: center;
  gap: $spacing-md; // 24rpx
  padding: $spacing-md; // 24rpx
  background-color: #fafafa;
  border-radius: $border-radius-sm; // 8rpx
}

.event-text {
  font-size: $font-size-base; // 28rpx
  color: #666;
}

.icon-info {
  background-color: #f8f9fa;
  border-radius: $border-radius-base; // 12rpx
  padding: $spacing-lg; // 32rpx
  border-left: 4rpx solid #007aff;
}

.info-title {
  font-size: $font-size-lg; // 32rpx
  font-weight: 600;
  color: #333;
  margin-bottom: $spacing-md; // 24rpx
  display: flex;
  align-items: center;
  gap: $spacing-xs; // 8rpx
}

.info-content {
  p {
    margin: $spacing-sm 0; // 16rpx
    font-size: $font-size-base; // 28rpx
    color: #666;
    line-height: 1.6;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background-color: #e9ecef;
    color: #495057;
    padding: 2rpx 8rpx;
    border-radius: 4rpx;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: $font-size-sm; // 24rpx
  }
}
</style>
