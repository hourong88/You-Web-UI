<template>
  <div 
    class="y-radio-group"
    :class="{
      'y-radio-group--disabled': disabled,
      [`y-radio-group--${direction}`]: direction
    }"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, toRefs } from 'vue'

export interface RadioGroupProps {
  /** 选中的值，用于双向绑定 */
  modelValue?: string | number
  /** 表单中的名称 */
  name?: string
  /** 是否禁用整个组 */
  disabled?: boolean
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 选中时的颜色 */
  color?: string
  /** 未选中时边框颜色 */
  borderColor?: string
  /** 缩放比例，用于改变大小 */
  scaleRatio?: number | string
  /** 内部圆点颜色 */
  checkMarkColor?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: '',
  name: '',
  disabled: false,
  direction: 'vertical',
  color: '#5677fc',
  borderColor: '#ccc',
  scaleRatio: 1,
  checkMarkColor: '#fff'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

// 更新选中值的方法
const updateValue = (value: string | number) => {
  if (props.disabled) return
  
  emit('update:modelValue', value)
  emit('change', value)
}

// 提供给子组件的上下文
provide('YRadioGroup', {
  ...toRefs(props),
  updateValue
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  &--vertical {
    flex-direction: column;
    gap: 12px;
  }
  
  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

// 移除最后一个radio的右边距
.y-radio-group--horizontal :deep(.y-radio:last-child) {
  margin-right: 0;
}
</style>