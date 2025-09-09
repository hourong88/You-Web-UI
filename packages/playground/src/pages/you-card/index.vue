<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YCard 卡片组件</text>
    </view>

    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="button-group">
        <YCard :index="0" titleText="基础卡片标题" tagText="标签" @click="handleCardClick" @longclick="handleCardLongClick">
          <template #body>
            <view class="demo-content"> 这是卡片的主要内容区域，支持任意内容展示。 </view>
          </template>
          <template #footer>
            <view class="demo-footer"> 卡片底部信息区域 </view>
          </template>
        </YCard>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">配置对象用法</div>
      <div class="button-group">
        <YCard :index="1" :image="{
          url: cardImage,
          width: 80,
          height: 80,
          circle: false,
        }" :title="{ text: '自定义样式标题', size: 32, color: '#333' }" :tag="{ text: '重要', size: 26, color: '#ff6b6b' }"
          :header="{ bgcolor: '#f8f9fa', line: true }" :border="true" @click="handleCardClick"
          @longclick="handleCardLongClick">
          <template #body>
            <view class="demo-content">
              使用配置对象可以精细控制图片尺寸、文字颜色、字体大小等样式属性。
            </view>
          </template>
          <template #footer>
            <view class="demo-footer"> 自定义样式的底部区域 </view>
          </template>
        </YCard>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">全宽卡片</div>
      <div class="button-group">
        <YCard :index="2" :full="true" :imageUrl="cardImage" titleText="全宽卡片" tagText="全屏"
          :header="{ bgcolor: '#e8f5e8', line: false }" @click="handleCardClick" @longclick="handleCardLongClick">
          <template #body>
            <view class="demo-content">
              全宽卡片没有左右边距，适合需要占满整个屏幕宽度的场景。
            </view>
          </template>
          <template #footer>
            <view class="demo-footer"> 全宽卡片底部 </view>
          </template>
        </YCard>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">圆形头像</div>
      <div class="button-group">
        <YCard :index="3" :image="{ url: cardImage, circle: true }" :title="{ text: '用户名称', color: '#2c3e50' }"
          :tag="{ text: 'VIP', color: '#f39c12' }" @click="handleCardClick" @longclick="handleCardLongClick">
          <template #body>
            <view class="demo-content">
              适合用户信息展示的卡片样式，头像为圆形，常用于社交应用。
            </view>
          </template>
          <template #footer>
            <view class="demo-footer"> 用户信息卡片 </view>
          </template>
        </YCard>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">无头部线条</div>
      <div class="button-group">
        <YCard :index="4" :imageUrl="cardImage" titleText="简洁卡片" tagText="简洁" :header="{ line: false }"
          @click="handleCardClick" @longclick="handleCardLongClick">
          <template #body>
            <view class="demo-content"> 头部没有分割线的卡片样式，看起来更加简洁统一。 </view>
          </template>
          <template #footer>
            <view class="demo-footer"> 简洁风格底部 </view>
          </template>
        </YCard>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">事件演示</div>
      <div class="button-group">
        <view class="event-info">
          <text class="event-text">点击或长按卡片查看事件响应</text>
          <text class="event-result">{{ eventMessage }}</text>
        </view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YCard } from '@you-ui/core'
// 使用public目录下的静态资源
const cardImage = '/cat.png'

const router = useRouter()
const eventMessage = ref('等待事件触发...')

const goBack = () => {
  router.push('/')
}

const handleCardClick = (payload: { index: number }) => {
  console.log('卡片点击事件:', payload)
  eventMessage.value = `点击了第 ${payload.index + 1} 个卡片 (${new Date().toLocaleTimeString()})`
  uni.showToast({
    title: `点击了第 ${payload.index + 1} 个卡片`,
    icon: 'none',
  })
}

const handleCardLongClick = (payload: { index: number }) => {
  console.log('卡片长按事件:', payload)
  eventMessage.value = `长按了第 ${payload.index + 1} 个卡片 (${new Date().toLocaleTimeString()})`
  uni.showToast({
    title: `长按了第 ${payload.index + 1} 个卡片`,
    icon: 'none',
  })
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.button-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-base; // 24rpx
  align-items: stretch;

  .y-card {
    margin: 0;
  }
}

.demo-content {
  font-size: $font-size-body; // 30rpx
  color: $color-text-secondary;
  line-height: 1.6;
  padding: $spacing-base; // 24rpx
  display: flex;
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.demo-footer {
  font-size: $font-size-sm; // 24rpx
  color: $color-text-tertiary;
  text-align: center;
}

.event-info {
  background: white;
  border-radius: $border-radius-md; // 16rpx
  padding: $spacing-xl; // 40rpx
  box-shadow: $box-shadow-base;
}

.event-text {
  font-size: $font-size-body; // 30rpx
  color: $color-text-secondary;
  display: block;
  margin-bottom: $spacing-base; // 24rpx
}

.event-result {
  font-size: $font-size-base; // 28rpx
  color: $color-primary;
  display: block;
  font-weight: bold;
}
</style>
