<template>
  <view v-if="position === 'top'" class="y-tips y-tips--top" :class="{ 'y-tips--show': show }" :style="topTipsStyle">
    {{ msg }}
  </view>
  <view v-else class="y-tips y-tips--toast" :class="[positionClass, { 'y-tips--show': show }]">
    <view class="y-tips__content" :style="contentStyle">
      {{ msg }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { ComponentBaseProps } from '../../types'

// 组件 Props 接口
interface YTipsProps extends ComponentBaseProps {
  /** 显示位置：top | bottom | center */
  position?: 'top' | 'bottom' | 'center'
  /** 背景颜色 */
  backgroundColor?: string
  /** 文字颜色 */
  color?: string
  /** 字体大小 */
  size?: number
}

// Props 定义
const props = withDefaults(defineProps<YTipsProps>(), {
  position: 'top',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  size: 30
})

// 事件定义
const emit = defineEmits<{
  show: []
  hide: []
}>()

// 响应式数据
const show = ref(false)
const msg = ref('无法连接到服务器~')
const timer = ref<NodeJS.Timeout | null>(null)

// 计算属性 - 位置类名
const positionClass = computed(() => {
  return props.position === 'center' ? 'y-tips--center' : 'y-tips--bottom'
})

// 计算属性 - 顶部提示样式
const topTipsStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.color,
  fontSize: `${props.size}rpx`
}))

// 计算属性 - 内容样式
const contentStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.color,
  fontSize: `${props.size}rpx`
}))

// 显示提示方法
const showTips = (options: { msg: string; duration?: number }) => {
  const { duration = 2000 } = options
  
  // 清除之前的定时器
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  
  // 设置消息并显示
  msg.value = options.msg
  show.value = true
  emit('show')
  
  // 设置自动隐藏
  timer.value = setTimeout(() => {
    show.value = false
    emit('hide')
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }, duration)
}

// 手动隐藏提示
const hideTips = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  show.value = false
  emit('hide')
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
})

// 暴露方法给父组件
defineExpose({
  showTips,
  hideTips
})
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-tips {
  word-break: break-all;
  z-index: $z-index-toast;
  transition: all 0.3s ease-in-out;
  
  // 顶部提示样式
  &--top {
    width: 100%;
    padding: 18rpx 30rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateZ(0) translateY(-100%);
    
    &.y-tips--show {
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  
  // Toast 提示样式
  &--toast {
    width: 80%;
    box-sizing: border-box;
    position: fixed;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.y-tips--show {
      visibility: visible;
      opacity: 1;
    }
  }
  
  // 底部位置
  &--bottom {
    bottom: 120rpx;
    transform: translateX(-50%);
  }
  
  // 居中位置
  &--center {
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.y-tips__content {
  word-wrap: break-word;
  word-break: break-all;
  border-radius: $border-radius-sm;
  padding: 18rpx 30rpx;
}
</style>