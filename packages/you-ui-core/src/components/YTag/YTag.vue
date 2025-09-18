<template>
  <view 
    :class="tagClass" 
    :style="tagStyle"
    @tap="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <slot>{{ text }}</slot>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ComponentBaseProps } from '../../types'

// 标签类型定义
type TagType = 
  | 'primary' 
  | 'white' 
  | 'danger' 
  | 'pink' 
  | 'warning' 
  | 'green' 
  | 'gray' 
  | 'black'
  | 'light-danger'
  | 'light-blue'
  | 'light-brownish'
  | 'light-orange'
  | 'light-green'

// 形状类型定义
type TagShape = 'circle' | 'square' | 'circleLeft' | 'circleRight'

// Props 接口定义
interface YTagProps extends ComponentBaseProps {
  /** 标签文本内容 */
  text?: string
  /** 样式类型 */
  type?: TagType
  /** 内边距值 */
  padding?: string
  /** 外边距值 */
  margin?: string
  /** 文字大小，单位rpx */
  size?: string
  /** 形状 */
  shape?: TagShape
  /** 是否空心 */
  plain?: boolean
  /** 点击效果 */
  hover?: boolean
  /** 缩放倍数 */
  scaleMultiple?: number
  /** 元素的基点位置0 center */
  originLeft?: boolean
  /** 元素的基点位置100% center */
  originRight?: boolean
  /** 索引 */
  index?: number
}

const props = withDefaults(defineProps<YTagProps>(), {
  text: '',
  type: 'primary',
  padding: '16rpx 26rpx',
  margin: '0',
  size: '28rpx',
  shape: 'square',
  plain: false,
  hover: false,
  scaleMultiple: 1,
  originLeft: false,
  originRight: false,
  index: 0
})

// 事件定义
const emit = defineEmits<{
  click: [payload: { index: number; text: string }]
}>()

// 响应式状态
const isPressed = ref(false)

// 计算属性 - 标签类名
const tagClass = computed(() => {
  const classes = ['y-tag']
  
  // 添加类型样式
  classes.push(`y-tag--${props.type}`)
  
  // 添加形状样式
  classes.push(`y-tag--${props.shape}`)
  
  // 添加空心样式
  if (props.plain) {
    classes.push('y-tag--plain')
  }
  
  // 添加禁用样式
  if (props.disabled) {
    classes.push('y-tag--disabled')
  }
  
  // 添加按压效果
  if (props.hover && isPressed.value) {
    classes.push('y-tag--pressed')
  }
  
  // 添加自定义类名
  if (props.customClass) {
    classes.push(props.customClass)
  }
  
  return classes.join(' ')
})

// 计算属性 - 标签样式
const tagStyle = computed(() => {
  const style: Record<string, any> = {
    padding: props.padding,
    margin: props.margin,
    fontSize: props.size
  }
  
  // 设置缩放
  if (props.scaleMultiple !== 1) {
    style.transform = `scale(${props.scaleMultiple})`
  }
  
  // 设置变换原点
  if (props.originLeft) {
    style.transformOrigin = '0 center'
  } else if (props.originRight) {
    style.transformOrigin = '100% center'
  }
  
  // 合并自定义样式
  if (props.customStyle) {
    if (typeof props.customStyle === 'string') {
      // 解析字符串样式
      props.customStyle.split(';').forEach(rule => {
        const [property, value] = rule.split(':').map(s => s.trim())
        if (property && value) {
          const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
          style[camelProperty] = value
        }
      })
    } else {
      Object.assign(style, props.customStyle)
    }
  }
  
  return style
})

// 事件处理
const handleClick = () => {
  if (props.disabled) return
  
  emit('click', {
    index: props.index,
    text: props.text
  })
}

const handleTouchStart = () => {
  if (props.hover && !props.disabled) {
    isPressed.value = true
  }
}

const handleTouchEnd = () => {
  if (props.hover) {
    isPressed.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 1;
  white-space: nowrap;
  padding: 16rpx 26rpx; // 默认内边距
  transition: all $transition-duration-base $transition-timing-function-ease;
  
  // 基础形状样式
  &--square {
    border-radius: $border-radius-xs;
  }
  
  &--circle {
    border-radius: 999rpx;
  }
  
  &--circleLeft {
    border-radius: 999rpx 0 0 999rpx;
  }
  
  &--circleRight {
    border-radius: 0 999rpx 999rpx 0;
  }
  
  // 实心标签样式
  &--primary {
    background-color: $color-primary;
    color: $color-white;
    border: 2rpx solid $color-primary;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-primary;
    }
  }
  
  &--white {
    background-color: $color-white;
    color: $color-text-primary;
    border: 2rpx solid $color-border-primary;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-text-primary;
    }
  }
  
  &--danger {
    background-color: $color-danger;
    color: $color-white;
    border: 2rpx solid $color-danger;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-danger;
    }
  }
  
  &--pink {
    background-color: #ff69b4;
    color: $color-white;
    border: 2rpx solid #ff69b4;
    
    &.y-tag--plain {
      background-color: transparent;
      color: #ff69b4;
    }
  }
  
  &--warning {
    background-color: $color-warning;
    color: $color-white;
    border: 2rpx solid $color-warning;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-warning;
    }
  }
  
  &--green {
    background-color: $color-success;
    color: $color-white;
    border: 2rpx solid $color-success;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-success;
    }
  }
  
  &--gray {
    background-color: $color-text-secondary;
    color: $color-white;
    border: 2rpx solid $color-text-secondary;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-text-secondary;
    }
  }
  
  &--black {
    background-color: $color-text-primary;
    color: $color-white;
    border: 2rpx solid $color-text-primary;
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-text-primary;
    }
  }
  
  // 浅色标签样式
  &--light-danger {
    background-color: rgba($color-danger, 0.1);
    color: $color-danger;
    border: 2rpx solid rgba($color-danger, 0.2);
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-danger;
      border-color: rgba($color-danger, 0.3);
    }
  }
  
  &--light-blue {
    background-color: rgba($color-primary, 0.1);
    color: $color-primary;
    border: 2rpx solid rgba($color-primary, 0.2);
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-primary;
      border-color: rgba($color-primary, 0.3);
    }
  }
  
  &--light-brownish {
    background-color: rgba(#8b4513, 0.1);
    color: #8b4513;
    border: 2rpx solid rgba(#8b4513, 0.2);
    
    &.y-tag--plain {
      background-color: transparent;
      color: #8b4513;
      border-color: rgba(#8b4513, 0.3);
    }
  }
  
  &--light-orange {
    background-color: rgba($color-warning, 0.1);
    color: $color-warning;
    border: 2rpx solid rgba($color-warning, 0.2);
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-warning;
      border-color: rgba($color-warning, 0.3);
    }
  }
  
  &--light-green {
    background-color: rgba($color-success, 0.1);
    color: $color-success;
    border: 2rpx solid rgba($color-success, 0.2);
    
    &.y-tag--plain {
      background-color: transparent;
      color: $color-success;
      border-color: rgba($color-success, 0.3);
    }
  }
  
  // 禁用状态
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // 按压效果
  &--pressed {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
</style>