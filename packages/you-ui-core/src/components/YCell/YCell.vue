<template>
  <view :class="[
    'y-cell',
    { 'y-cell--disabled': disabled },
    { 'y-cell--hover': hover && !disabled },
    { 'y-cell--unlined': unlined },
    { 'y-cell--clickable': arrow || hover },
  ]" :style="cellStyle" :hover-class="hover && !disabled ? 'y-cell--active' : 'none'" @click="handleClick">
    <!-- 内容容器 -->
    <view class="y-cell__wrapper" :style="wrapperStyle">
      <!-- 左侧图标插槽 -->
      <view class="y-cell__icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </view>

      <!-- 主体内容区域 -->
      <view class="y-cell__content">
        <!-- 主要内容 -->
        <view class="y-cell__main">
          <view class="y-cell__title">
            <slot></slot>
          </view>
          <view class="y-cell__description" v-if="$slots.description">
            <slot name="description"></slot>
          </view>
        </view>

        <!-- 右侧内容插槽 -->
        <view class="y-cell__extra" v-if="$slots.extra">
          <slot name="extra"></slot>
        </view>
      </view>

      <!-- 右侧箭头 -->
      <view v-if="arrow" class="y-cell__arrow" :style="{ borderColor: arrowColor }">
        <view class="y-cell__arrow-icon"></view>
      </view>
    </view>

    <!-- 分割线 -->
    <view class="y-cell__border" v-if="!unlined"
      :style="{ backgroundColor: lineColor, left: lineLeft + 'rpx', right: lineRight + 'rpx' }">
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, withDefaults } from 'vue'

// Props 接口定义
interface Props {
  /** 是否显示右箭头 */
  arrow?: boolean
  /** 箭头颜色 */
  arrowColor?: string
  /** 是否有点击效果 */
  hover?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 隐藏分割线 */
  unlined?: boolean
  /** 分割线颜色 */
  lineColor?: string
  /** 分割线左偏移距离，单位rpx */
  lineLeft?: number | string
  /** 分割线右偏移距离，单位rpx */
  lineRight?: number | string
  /** 内边距 */
  padding?: string
  /** 外边距顶部，单位rpx */
  marginTop?: number | string
  /** 外边距底部，单位rpx */
  marginBottom?: number | string
  /** 背景颜色 */
  backgroundColor?: string
  /** 字体大小，单位rpx */
  fontSize?: number
  /** 字体颜色 */
  color?: string
  /** 圆角值，单位rpx */
  borderRadius?: number | string
  /** 单元格高度，单位rpx */
  height?: number | string
  /** 索引 */
  index?: number
}

interface YCellClickEvent {
  index: number
}

interface Emits {
  (e: 'click', event: YCellClickEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  arrow: false,
  arrowColor: '#c8c9cc',
  hover: true,
  disabled: false,
  unlined: false,
  lineColor: '#f0f0f0',
  lineLeft: 32,
  lineRight: 0,
  marginTop: 0,
  marginBottom: 0,
  backgroundColor: '#ffffff',
  fontSize: 32,
  color: '#1a1a1a',
  borderRadius: 0,
  height: 'auto',
  index: 0,
  padding: '24rpx 32rpx',
})

const emit = defineEmits<Emits>()

const cellStyle = computed(() => {
  const style: any = {}
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.marginTop)
    style.marginTop =
      typeof props.marginTop === 'number' ? `${props.marginTop}rpx` : props.marginTop
  if (props.marginBottom)
    style.marginBottom =
      typeof props.marginBottom === 'number' ? `${props.marginBottom}rpx` : props.marginBottom
  if (props.borderRadius)
    style.borderRadius =
      typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius
  if (props.fontSize) style.fontSize = `${props.fontSize}rpx`
  if (props.color) style.color = props.color
  if (props.height && props.height !== 'auto')
    style.height = typeof props.height === 'number' ? `${props.height}rpx` : props.height
  return style
})

const wrapperStyle = computed(() => {
  const style: any = {}
  if (props.padding) style.padding = props.padding
  return style
})

const handleClick = () => {
  if (props.disabled) return
  emit('click', { index: props.index || 0 })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-cell {
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #1a1a1a;
  font-size: 32rpx;
  transition: all 0.2s ease;

  // 内容包装器
  &__wrapper {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 24rpx 32rpx;
  }

  // 左侧图标区域
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
    flex-shrink: 0;
    width: 48rpx;
    height: 48rpx;
  }

  // 主体内容区域
  &__content {
    display: flex;
    align-items: center;
    flex: 1;
    min-height: 48rpx;
  }

  // 主要内容
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  // 标题
  &__title {
    font-size: 32rpx;
    font-weight: 500;
    color: var(--y-color-text-primary, #1a1a1a);
    line-height: 44rpx;
  }

  // 描述文字
  &__description {
    font-size: 26rpx;
    color: var(--y-color-text-secondary, #666666);
    line-height: 36rpx;
    margin-top: 4rpx;
  }

  // 右侧额外内容
  &__extra {
    display: flex;
    align-items: center;
    margin-left: 24rpx;
    font-size: 28rpx;
    color: var(--y-color-text-secondary, #666666);
    flex-shrink: 0;
  }

  // 右侧箭头
  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    width: 32rpx;
    height: 32rpx;
    flex-shrink: 0;
  }

  &__arrow-icon {
    width: 12rpx;
    height: 12rpx;
    border-top: 2rpx solid var(--y-color-text-tertiary, #c8c9cc);
    border-right: 2rpx solid var(--y-color-text-tertiary, #c8c9cc);
    transform: rotate(45deg);
    transition: border-color 0.2s ease;
  }

  // 分割线
  &__border {
    position: absolute;
    bottom: 0;
    left: 32rpx;
    right: 0;
    height: 1rpx;
    background-color: var(--y-color-border, #f0f0f0);
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }

  // 状态样式
  &--clickable {
    cursor: pointer;
  }

  &--hover:active,
  &--active {
    background-color: var(--y-color-gray-50, #f8f9fa);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .y-cell__title,
    .y-cell__description,
    .y-cell__extra {
      color: var(--y-color-text-disabled, #c8c9cc);
    }

    .y-cell__arrow-icon {
      border-color: var(--y-color-text-disabled, #c8c9cc);
    }
  }

  &--unlined {
    .y-cell__border {
      display: none;
    }
  }

  // 响应式设计
  @media (max-width: 750rpx) {
    &__wrapper {
      padding: 20rpx 24rpx;
      min-height: 88rpx;
    }

    &__title {
      font-size: 30rpx;
    }

    &__description {
      font-size: 24rpx;
    }

    &__extra {
      font-size: 26rpx;
    }
  }
}
</style>
