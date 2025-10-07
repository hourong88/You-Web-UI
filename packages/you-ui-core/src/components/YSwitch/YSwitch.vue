<template>
  <view
    :class="[
      'y-switch',
      `y-switch--${type}`,
      { 'y-switch--disabled': disabled },
      { 'y-switch--checked': currentChecked }
    ]"
    :style="switchStyle"
    @click="handleClick"
  >
    <!-- Switch 样式 -->
    <view v-if="type === 'switch'" class="y-switch__track" :style="trackStyle">
      <view class="y-switch__thumb" :style="thumbStyle"></view>
    </view>
    
    <!-- Checkbox 样式 -->
    <view v-else-if="type === 'checkbox'" class="y-switch__checkbox" :style="checkboxStyle">
      <view v-if="currentChecked" class="y-switch__checkmark" :style="checkmarkStyle">✓</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, withDefaults } from 'vue'

// Props 接口定义
interface Props {
  /** 开关选择器名称 */
  name?: string
  /** 是否选中 */
  checked?: boolean
  /** 双向绑定值 */
  modelValue?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 样式类型 */
  type?: 'switch' | 'checkbox'
  /** switch选中颜色 */
  color?: string
  /** 边框颜色，type=checkbox时生效 */
  borderColor?: string
  /** 对号颜色，type=checkbox时生效 */
  checkMarkColor?: string
  /** 缩放倍数，改变大小 */
  scaleRatio?: number | string
}

interface YSwitchChangeEvent {
  detail: {
    value: boolean
  }
}

interface Emits {
  (e: 'change', event: YSwitchChangeEvent): void
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  checked: false,
  modelValue: false,
  disabled: false,
  type: 'switch',
  color: '#5677fc',
  borderColor: '#ccc',
  checkMarkColor: '#fff',
  scaleRatio: 1
})

const emit = defineEmits<Emits>()

// 响应式数据
const currentChecked = ref(false)

// 计算属性
const actualValue = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : props.checked
})

// 监听值变化
watch(
  () => actualValue.value,
  (newVal) => {
    currentChecked.value = newVal
  },
  { immediate: true }
)

// 样式计算
const switchStyle = computed(() => {
  const scale = Number(props.scaleRatio)
  return {
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'left center'
  }
})

const trackStyle = computed(() => {
  if (props.type !== 'switch') return {}
  
  return {
    backgroundColor: currentChecked.value 
      ? props.color 
      : '#dfdfdf',
    borderColor: currentChecked.value 
      ? props.color 
      : '#dfdfdf'
  }
})

const thumbStyle = computed(() => {
  // 不再需要，使用CSS伪元素处理
  return {}
})

const checkboxStyle = computed(() => {
  if (props.type !== 'checkbox') return {}
  
  return {
    backgroundColor: currentChecked.value 
      ? props.color 
      : 'transparent',
    borderColor: currentChecked.value 
      ? props.color 
      : props.borderColor
  }
})

const checkmarkStyle = computed(() => {
  if (props.type !== 'checkbox') return {}
  
  return {
    color: props.checkMarkColor
  }
})

// 事件处理
const handleClick = () => {
  if (props.disabled) return
  
  const newValue = !currentChecked.value
  currentChecked.value = newValue
  
  // 发射事件
  const event: YSwitchChangeEvent = {
    detail: { value: newValue }
  }
  
  emit('change', event)
  emit('update:modelValue', newValue)
}
</script>

<style lang="scss" scoped>

.y-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  // Switch 轨道样式
  &__track {
    position: relative;
    width: 52px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #dfdfdf;
    background-color: #5677fc;
    box-sizing: border-box;
    transition: background-color 0.1s ease, border-color 0.1s ease;
    overflow: hidden;
    
    // 使用伪元素创建滑块
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 30px;
      border-radius: 15px;
      background-color: #5677fc;
      transition: transform 0.3s ease;
      transform: translateX(-18px);
    }
    
    &::after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
      transform: translateX(1px);
      z-index: 1;
    }
  }
  
  // 移除原来的滑块样式，现在使用伪元素
  &__thumb {
    display: none;
  }
  
  // Checkbox 样式
  &__checkbox {
    position: relative;
    width: 32rpx;
    height: 32rpx;
    border: 2rpx solid var(--you-color-border-secondary, #ccc);
    border-radius: var(--you-border-radius-sm, 4rpx);
    background-color: transparent;
    transition: all var(--you-transition-base, 0.2s ease-out);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  
  // Checkbox 对勾样式
  &__checkmark {
    font-size: 20rpx;
    font-weight: bold;
    color: var(--you-color-white, #fff);
    line-height: 1;
  }
  
  // 选中状态
  &--checked {
    .y-switch__track {
      background-color: var(--you-color-primary, #007aff);
      border-color: var(--you-color-primary, #007aff);
      
      &::before {
        transform: translateX(0);
      }
      
      &::after {
        transform: translateX(21px);
      }
    }
    
    .y-switch__checkbox {
      background-color: var(--you-color-primary, #5677fc);
      border-color: var(--you-color-primary, #5677fc);
    }
  }
  
  // 禁用状态
  &--disabled {
    .y-switch__track,
    .y-switch__checkbox {
      opacity: 0.6;
    }
    
    .y-switch__thumb {
      opacity: 0.8;
    }
  }
  
  // Switch 类型特定样式
  &--switch {
    .y-switch__track {
      &:active {
        transform: scale(0.98);
      }
      
      // 自定义颜色支持
      &[data-color] {
        &::before {
          background-color:#60a5fa;
        }
      }
    }
  }
  
  // Checkbox 类型特定样式
  &--checkbox {
    .y-switch__checkbox:active {
      transform: scale(0.9);
    }
  }
  
  // 响应式设计
  @media (max-width: 750px) {
    &__track {
      width: 48px;
      height: 28px;
      border-radius: 14px;
      
      &::before {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        transform: translateX(-16px);
      }
      
      &::after {
        width: 26px;
        height: 26px;
        border-radius: 13px;
        transform: translateX(1px);
      }
    }
    
    .y-switch--checked &__track {
      &::before {
        transform: translateX(0);
      }
      
      &::after {
        transform: translateX(21px);
      }
    }
    
    &__checkbox {
      width: 28px;
      height: 28px;
    }
    
    &__checkmark {
      font-size: 16px;
    }
  }
}

// 主题适配
:root[data-theme="dark"] {
  .y-switch {
    &__track {
      background-color: var(--you-color-bg-secondary, #374151);
      border-color: var(--you-color-border-primary, #4b5563);
    }
    
    &__checkbox {
      border-color: var(--you-color-border-primary, #4b5563);
    }
    
    &--checked {
      .y-switch__track {
        background-color: var(--you-color-primary, #60a5fa);
        border-color: var(--you-color-primary, #60a5fa);
      }
      
      .y-switch__checkbox {
        background-color: var(--you-color-primary, #60a5fa);
        border-color: var(--you-color-primary, #60a5fa);
      }
    }
  }
}
</style>