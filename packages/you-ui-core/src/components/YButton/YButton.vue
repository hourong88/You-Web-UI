<template>
  <view
    :class="[
      'y-button',
      `y-button--${type}`,
      `y-button--${size}`,
      plain ? 'y-button--plain' : '',
      round ? 'y-button--round' : '',
      circle ? 'y-button--circle' : '',
      block ? 'y-button--block' : '',
      disabled || loading ? 'y-button--disabled' : '',
      rippleActive ? 'y-button--ripple-active' : ''
    ]"
    :hover-class="computedHoverClass"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :style="[customStyle, buttonCustomStyle]"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <view class="y-button__content">
      <template v-if="loading">
        <view class="y-button__loading-icon" :style="loadingIconStyle">
          <view class="y-button__loading-spinner"></view>
        </view>
        <text v-if="loadingText" class="y-button__loading-text">{{ loadingText }}</text>
      </template>
      <template v-else>
        <slot name="icon-left">
          <view v-if="icon && iconPosition === 'left'" :class="['y-button__icon', icon]" />
        </slot>
        <slot>{{ text }}</slot>
        <slot name="icon-right">
          <view v-if="icon && iconPosition === 'right'" :class="['y-button__icon', icon]" />
        </slot>
      </template>
    </view>
    <!-- 波纹效果元素 -->
    <view v-if="ripple && rippleActive" class="y-button__ripple-circle" :style="rippleStyle"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, CSSProperties, withDefaults } from 'vue'

// Props 定义
interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'large' | 'default' | 'mini'
  plain?: boolean // 镂空
  round?: boolean // 圆角
  circle?: boolean // 圆形 (通常用于图标按钮)
  block?: boolean // 块级
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  loadingColor?: string // 自定义加载图标颜色
  loadingSize?: string | number // 自定义加载图标大小
  icon?: string // 图标类名
  iconPosition?: 'left' | 'right'
  text?: string // 按钮文本，如果使用 slot 则忽略
  throttle?: number // 节流时间，单位ms，防止重复点击
  customStyle?: string | CSSProperties // 自定义样式
  // UniApp hover 属性
  hoverClass?: string
  hoverStartTime?: number
  hoverStayTime?: number
  // 自定义颜色覆盖
  bgColor?: string
  textColor?: string
  borderColor?: string
  // 增强交互
  ripple?: boolean // 是否开启点击波纹效果
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  block: false,
  disabled: false,
  loading: false,
  loadingText: '',
  loadingColor: '',
  loadingSize: '',
  icon: '',
  iconPosition: 'left',
  text: '',
  throttle: 0,
  customStyle: () => ({}),
  hoverClass: 'y-button--hover',
  hoverStartTime: 20,
  hoverStayTime: 70,
  ripple: true
})

// Emits 定义
const emit = defineEmits(['click', 'getuserinfo', 'getphonenumber', 'error', 'launchapp', 'opensetting', 'contact'])

// 响应式数据
const rippleActive = ref(false)
const rippleStyle = ref({})

// 计算属性
const computedHoverClass = computed(() => {
  if (props.disabled || props.loading) return ''
  return props.hoverClass
})

const buttonCustomStyle = computed(() => {
  const style: CSSProperties = {}
  
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.borderColor) {
    style.borderColor = props.borderColor
  }
  
  return style
})

// 计算加载图标样式
const loadingIconStyle = computed(() => {
  const style: CSSProperties = {}
  
  if (props.loadingColor) {
    style.color = props.loadingColor
  } else if (props.plain) {
    style.color = `var(--y-color-${props.type})`
  }
  
  if (props.loadingSize) {
    style.width = typeof props.loadingSize === 'number' ? `${props.loadingSize}px` : props.loadingSize
    style.height = typeof props.loadingSize === 'number' ? `${props.loadingSize}px` : props.loadingSize
  }
  
  return style
})

// 节流处理
let lastClickTime = 0
const handleClick = (event: Event) => {
  if (props.disabled || props.loading) return

  const now = Date.now()
  if (props.throttle > 0 && now - lastClickTime < props.throttle) {
    return
  }
  lastClickTime = now

  emit('click', event)
}

// 波纹效果处理
const handleTouchStart = (event: TouchEvent) => {
  if (!props.ripple || props.disabled || props.loading) return
  
  const touch = event.touches[0]
  const rect = (event.currentTarget as Element).getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top
  
  rippleStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
    transform: 'scale(0)',
    opacity: '0.6'
  }
  
  rippleActive.value = true
  
  // 触发动画
  setTimeout(() => {
    rippleStyle.value = {
      ...rippleStyle.value,
      transform: 'scale(4)',
      opacity: '0'
    }
  }, 10)
}

const handleTouchEnd = () => {
  if (!props.ripple) return
  
  setTimeout(() => {
    rippleActive.value = false
  }, 300)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 $spacing-lg; // 32rpx
  height: $button-height-base; // 88rpx
  font-size: $font-size-md; // 32rpx
  line-height: 1;
  text-align: center;
  border: $border-width-thin solid transparent; // 2rpx
  border-radius: $border-radius-sm; // 8rpx
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  &__icon {
    font-size: inherit;
    
    &:not(:only-child) {
      margin: 0 $spacing-xs; // 8rpx
    }
  }

  &__loading-icon {
    display: flex;
    align-items: center;
    margin-right: $spacing-sm; // 16rpx
  }

  &__loading-spinner {
    width: 32rpx;
    height: 32rpx;
    border: $border-width-base solid currentColor; // 4rpx
    border-top-color: transparent;
    border-radius: 50%;
    animation: y-button-spin 1s linear infinite;
  }

  &__loading-text {
    margin-left: $spacing-xs; // 8rpx
  }

  &__ripple-circle {
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  // 类型样式
  &--default {
    background-color: var(--y-color-white);
    color: var(--y-color-text-primary);
    border-color: var(--y-color-border);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-gray-1);
    }
  }

  &--primary {
    background-color: var(--y-color-primary);
    color: var(--y-color-white);
    border-color: var(--y-color-primary);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-primary-dark);
    }
  }

  &--success {
    background-color: var(--y-color-success);
    color: var(--y-color-white);
    border-color: var(--y-color-success);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-success-dark);
    }
  }

  &--warning {
    background-color: var(--y-color-warning);
    color: var(--y-color-white);
    border-color: var(--y-color-warning);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-warning-dark);
    }
  }

  &--danger {
    background-color: var(--y-color-danger);
    color: var(--y-color-white);
    border-color: var(--y-color-danger);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-danger-dark);
    }
  }

  &--info {
    background-color: var(--y-color-info);
    color: var(--y-color-white);
    border-color: var(--y-color-info);

    &:not(.y-button--disabled):active {
      background-color: var(--y-color-info-dark);
    }
  }

  // 镂空样式
  &--plain {
    background-color: transparent;

    &.y-button--default {
      color: var(--y-color-text-primary);
      border-color: var(--y-color-border);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-gray-1);
      }
    }

    &.y-button--primary {
      color: var(--y-color-primary);
      border-color: var(--y-color-primary);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-primary-light);
      }
    }

    &.y-button--success {
      color: var(--y-color-success);
      border-color: var(--y-color-success);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-success-light);
      }
    }

    &.y-button--warning {
      color: var(--y-color-warning);
      border-color: var(--y-color-warning);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-warning-light);
      }
    }

    &.y-button--danger {
      color: var(--y-color-danger);
      border-color: var(--y-color-danger);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-danger-light);
      }
    }

    &.y-button--info {
      color: var(--y-color-info);
      border-color: var(--y-color-info);

      &:not(.y-button--disabled):active {
        background-color: var(--y-color-info-light);
      }
    }
  }

  // 尺寸样式
  &--large {
    height: $button-height-large; // 100rpx
    padding: 0 $spacing-xl; // 40rpx
    font-size: $font-size-lg; // 36rpx
  }

  &--mini {
    height: $button-height-mini; // 64rpx
    padding: 0 $spacing-base; // 24rpx
    font-size: $font-size-sm; // 28rpx
  }

  // 形状样式
  &--round {
    border-radius: 44rpx;

    &.y-button--large {
      border-radius: 50rpx;
    }

    &.y-button--mini {
      border-radius: 32rpx;
    }
  }

  &--circle {
    width: $button-height-base; // 88rpx
    padding: 0;
    border-radius: 50%;

    &.y-button--large {
      width: $button-height-large; // 100rpx
    }

    &.y-button--mini {
      width: $button-height-mini; // 64rpx
    }
  }

  &--block {
    display: flex;
    width: 100%;
  }

  // 禁用状态
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Hover 状态
  &--hover {
    opacity: 0.8;
  }
}

@keyframes y-button-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>