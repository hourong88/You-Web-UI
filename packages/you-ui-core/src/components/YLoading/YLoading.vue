<template>
  <view v-if="visible">
    <view 
      class="y-loading y-loading__box" 
      :class="{'y-loading__fixed': fixed}" 
      :style="{ backgroundColor: backgroundColor, color: color, position: fixed ? 'fixed' : 'static' }" 
      v-if="type === 'column'"
    >
      <!-- 默认CSS加载器 -->
      <view v-if="animationType === 'default'" class="y-loading__default-spinner"></view>
      
      <!-- 现代化圆形加载器 -->
      <view v-else-if="animationType === 'spinner'" class="y-loading__modern-spinner"></view>
      
      <!-- 柱状图加载器 -->
      <view v-else-if="animationType === 'bars'" class="y-loading__bars">
        <view class="y-loading__bar"></view>
        <view class="y-loading__bar"></view>
        <view class="y-loading__bar"></view>
      </view>
      
      <!-- 脉冲加载器 -->
      <view v-else-if="animationType === 'pulse'" class="y-loading__pulse"></view>
      
      <view class="y-loading__text">{{ text }}</view>
    </view>
    <view 
      v-else 
      class="y-loading y-loading__row" 
      :class="{'y-loading__fixed': fixed}" 
      :style="{position: fixed ? 'fixed' : 'static'}"
    >
      <!-- 默认CSS加载器 -->
      <view v-if="animationType === 'default'" class="y-loading__default-spinner"></view>
      
      <!-- 现代化圆形加载器 -->
      <view v-else-if="animationType === 'spinner'" class="y-loading__modern-spinner"></view>
      
      <!-- 柱状图加载器 -->
      <view v-else-if="animationType === 'bars'" class="y-loading__bars">
        <view class="y-loading__bar"></view>
        <view class="y-loading__bar"></view>
        <view class="y-loading__bar"></view>
      </view>
      
      <!-- 脉冲加载器 -->
      <view v-else-if="animationType === 'pulse'" class="y-loading__pulse"></view>
      
      <view class="y-loading__text">{{ text }}</view>
    </view>
    <view 
      class="y-loading__mask" 
      :style="{background: maskColor}" 
      v-if="isMask && fixed"
      @click="maskClosable ? handleMaskClick() : undefined"
    ></view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

// Props 接口定义
interface Props {
  /** 显示状态 */
  visible?: boolean
  /** 布局类型：column 垂直布局，row 水平布局 */
  type?: 'column' | 'row'
  /** 加载动画样式：default 默认图片，spinner 圆形加载器，bars 柱状图，pulse 脉冲动画 */
  animationType?: 'default' | 'spinner' | 'bars' | 'pulse'
  /** 加载文本 */
  text?: string
  /** 文本颜色（type=column时生效） */
  color?: string
  /** 背景颜色（type=column时生效） */
  backgroundColor?: string
  /** 垂直布局时的图标（base64或图片路径） */
  src?: string
  /** 水平布局时的图标（base64或图片路径） */
  rowSrc?: string
  /** 是否固定定位 */
  fixed?: boolean
  /** 是否显示遮罩层 */
  isMask?: boolean
  /** 遮罩层颜色 */
  maskColor?: string
  /** 是否允许点击遮罩关闭 */
  maskClosable?: boolean
}

// 默认属性
withDefaults(defineProps<Props>(), {
  visible: true,
  type: 'column',
  animationType: 'default',
  text: '加载中',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',

  fixed: true,
  isMask: false,
  maskColor: 'rgba(0,0,0,.3)',
  maskClosable: false
})

// 事件定义
const emit = defineEmits(['maskClick'])

// 处理遮罩点击事件
const handleMaskClick = () => {
  emit('maskClick')
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.y-loading__fixed {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index-modal;
}

.y-loading__mask {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-modal-backdrop;
}

.y-loading__box {
  min-width: 200rpx;
  min-height: 200rpx;
  max-width: 500rpx;
  flex-direction: column;
  border-radius: $border-radius-base;
}

/* 默认CSS加载器样式 */
.y-loading__default-spinner {
  width: 64rpx;
  height: 64rpx;
  border: 6rpx solid rgba(200, 200, 200, 0.3);
  border-radius: $border-radius-full;
  border-top-color: currentColor;
  animation: rotate 0.9s linear infinite;
  margin-bottom: $spacing-lg;
  background: transparent;
}

.y-loading__row {
  width: 100%;
  height: 36rpx;
  color: var(--y-color-text-tertiary, $color-text-tertiary);
}

.y-loading__row .y-loading__default-spinner {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid rgba(150, 150, 150, 0.4);
  border-top-color: var(--y-color-text-secondary, $color-text-secondary);
  margin-right: $spacing-sm;
  margin-bottom: 0;
}

.y-loading__text {
  font-size: $font-size-sm;
  line-height: $font-size-sm;
  text-align: center;
}

@-webkit-keyframes rotate {
  from {
    transform: rotatez(0deg);
  }

  to {
    transform: rotatez(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotatez(0deg);
  }

  to {
    transform: rotatez(360deg);
  }
}

/* 添加柱状图加载动画样式 */
.y-loading__bars {
  display: flex;
  gap: $spacing-xs;
  align-items: flex-end;
  height: 80rpx;
  margin-bottom: $spacing-sm;
}

.y-loading__bar {
  width: $spacing-sm;
  height: 80rpx;
  border-radius: $border-radius-sm;
  background: linear-gradient(to top, var(--y-color-success, $color-success), rgba(129, 199, 132, 1));
  animation: barAnimation 1.2s infinite ease-in-out;
  transform-origin: bottom;
}

.y-loading__bar:nth-child(1) {
  background: linear-gradient(to top, var(--y-color-primary, $color-primary), rgba(100, 181, 246, 1));
  animation-delay: -0.32s;
}

.y-loading__bar:nth-child(2) {
  background: linear-gradient(to top, var(--y-color-info, $color-info), rgba(79, 195, 247, 1));
  animation-delay: -0.16s;
}

.y-loading__bar:nth-child(3) {
  background: linear-gradient(to top, var(--y-color-success, $color-success), rgba(129, 199, 132, 1));
  animation-delay: 0s;
}

@keyframes barAnimation {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    opacity: 0.7;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* 现代化圆形加载器样式 */
.y-loading__modern-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 6rpx solid rgba(255, 255, 255, 0.2);
  border-radius: $border-radius-full;
  border-top-color: var(--y-color-white, $color-white);
  border-right-color: rgba(255, 255, 255, 0.6);
  animation: modernSpin 1s ease-in-out infinite;
  margin-bottom: $spacing-sm;
  box-shadow: $box-shadow-sm;
}

@keyframes modernSpin {
  0% {
    transform: rotate(0deg);
    border-top-color: var(--y-color-white, $color-white);
    border-right-color: rgba(255, 255, 255, 0.6);
  }
  25% {
    border-top-color: rgba(255, 255, 255, 0.6);
    border-right-color: var(--y-color-white, $color-white);
  }
  50% {
    transform: rotate(180deg);
    border-top-color: rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.6);
  }
  75% {
    border-top-color: rgba(255, 255, 255, 0.6);
    border-right-color: var(--y-color-white, $color-white);
  }
  100% {
    transform: rotate(360deg);
    border-top-color: var(--y-color-white, $color-white);
    border-right-color: rgba(255, 255, 255, 0.6);
  }
}

/* 脉冲动画样式 */
.y-loading__pulse {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  border-radius: 30rpx;
  animation: modernPulse 2s infinite;
  margin-bottom: $spacing-sm;
  position: relative;
  box-shadow: $box-shadow-md;
}

.y-loading__pulse::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: $spacing-sm;
  height: $spacing-sm;
  background: rgba(255, 255, 255, 0.9);
  border-radius: $border-radius-xs;
  transform: translate(-50%, -50%);
  animation: innerPulse 2s infinite;
}

@keyframes modernPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
    box-shadow: $box-shadow-sm;
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
    box-shadow: $box-shadow-lg;
  }
}

@keyframes innerPulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.3);
  }
}
</style>