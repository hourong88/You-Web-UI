<template>
  <view class="y-icon-wrapper" :style="wrapperStyle" @click="handleClick">
    <!-- SVG 图标 -->
    <img v-if="svgPath" :src="svgPath" :style="iconStyle" class="y-icon-svg" />
    <!-- 字体图标 -->
    <text v-else :class="['y-icon', customPrefix ? customPrefix : '', customPrefix && name ? name : '']"
      :style="iconStyle">
      {{ iconContent }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed, CSSProperties, withDefaults } from 'vue'
import { icons } from './icons'

// H5环境下的组件类型声明
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    view: any
    img: any
    text: any
  }
}

// 移除字体注册代码，使用SVG图标

// Props 定义
interface Props {
  name?: string // 图标名称
  customPrefix?: string // 自定义前缀类名
  size?: string | number // 图标大小
  unit?: 'px' | 'rpx' // 单位
  color?: string // 图标颜色
  bold?: boolean // 是否加粗
  margin?: string // 外边距
  index?: number // 索引，用于事件回调
  customStyle?: string | CSSProperties // 自定义样式
  useSvg?: boolean // 是否使用SVG图标
  svgBasePath?: string // SVG图标基础路径
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  customPrefix: '',
  size: 32,
  unit: 'px',
  color: '',
  bold: false,
  margin: '0',
  index: 0,
  customStyle: () => ({}),
  useSvg: true,
  svgBasePath: '/icons',
})

// Emits 定义
const emit = defineEmits<{
  click: [payload: { index: number }]
}>()

// 计算属性
const svgPath = computed(() => {
  if (props.useSvg && props.name) {
    return `${props.svgBasePath}/${props.name}.svg`
  }
  return ''
})

const iconContent = computed(() => {
  if (props.customPrefix) {
    return '' // 使用自定义字体时不显示内容
  }
  return (icons as Record<string, string>)[props.name] || ''
})

const wrapperStyle = computed(() => {
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: props.margin,
  }
  return style
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}

  // SVG图标样式
  if (props.useSvg) {
    // 设置SVG图标的尺寸
    style.width = `${props.size}${props.unit}`
    console.log('svgPath', svgPath.value)
    console.log('props.size', props.size)
    console.log('props.unit', style.width)
    style.height = `${props.size}${props.unit}`
    style.display = 'block'
    style.objectFit = 'contain'

    // 对于SVG图标，设置颜色通过CSS filter
    if (props.color) {
      style.filter = `brightness(0) saturate(100%) ${getColorFilter(props.color)}`
    }
  } else {
    // 字体图标样式
    style.width = `${props.size}${props.unit}`
    style.height = `${props.size}${props.unit}`
    style.color = props.color || 'var(--y-color-text-secondary)'
    style.fontSize = `${props.size}${props.unit}`
    style.fontWeight = props.bold ? 'bold' : 'normal'
    style.lineHeight = '1'
    style.textAlign = 'center'
  }

  // 合并自定义样式
  if (typeof props.customStyle === 'object') {
    Object.assign(style, props.customStyle)
  }

  return style
})

// 颜色转换为CSS filter的辅助函数
const getColorFilter = (color: string): string => {
  // 简化的颜色过滤器实现
  const colorMap: Record<string, string> = {
    '#007aff':
      'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
    '#ff3b30':
      'invert(8%) sepia(100%) saturate(7444%) hue-rotate(4deg) brightness(102%) contrast(118%)',
    '#ff9500':
      'invert(64%) sepia(88%) saturate(6151%) hue-rotate(3deg) brightness(106%) contrast(101%)',
    '#34c759':
      'invert(64%) sepia(98%) saturate(3394%) hue-rotate(130deg) brightness(100%) contrast(85%)',
  }
  return colorMap[color] || ''
}

// 事件处理
const handleClick = () => {
  emit('click', {
    index: props.index,
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  // 点击态效果
  &:active {
    opacity: 0.7;
    transition: opacity $transition-duration-fast $transition-timing-function-ease;
  }
}

.y-icon-svg {
  display: block;
  transition: all $transition-duration-base $transition-timing-function-ease;
}

// 移除损坏的字体文件，专注于SVG图标实现

.y-icon {
  font-family: 'y-icon-font', sans-serif;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  transition: color $transition-duration-base $transition-timing-function-ease;

  // 确保图标在不同平台下的一致性
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // 防止文本选择
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

// #ifdef APP-NVUE
// NVUE 环境下的字体注册在 JavaScript 中处理
// #endif</style>
