<template>
  <view
    :class="[
      'y-checkbox-group',
      `y-checkbox-group--${direction}`
    ]"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

interface Props {
  modelValue?: (string | number)[]
  disabled?: boolean
  direction?: 'vertical' | 'horizontal'
  color?: string
  borderColor?: string
  isCheckMark?: boolean
  checkMarkColor?: string
  scaleRatio?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  disabled: false,
  direction: 'vertical',
  color: '#5677fc',
  borderColor: '#ccc',
  isCheckMark: false,
  checkMarkColor: '#fff',
  scaleRatio: 1
})

interface Emits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}

const emit = defineEmits<Emits>()

// 更新选中值
const updateValue = (value: string | number, checked: boolean) => {
  const currentValue = [...(props.modelValue || [])]
  
  if (checked) {
    // 添加到选中列表
    if (!currentValue.includes(value)) {
      currentValue.push(value)
    }
  } else {
    // 从选中列表移除
    const index = currentValue.indexOf(value)
    if (index > -1) {
      currentValue.splice(index, 1)
    }
  }
  
  emit('update:modelValue', currentValue)
  emit('change', currentValue)
}

// 提供给子组件的上下文
provide('checkboxGroup', {
  modelValue: computed(() => props.modelValue || []),
  updateValue,
  disabled: computed(() => props.disabled),
  color: computed(() => props.color),
  borderColor: computed(() => props.borderColor),
  isCheckMark: computed(() => props.isCheckMark),
  checkMarkColor: computed(() => props.checkMarkColor),
  scaleRatio: computed(() => props.scaleRatio)
})
</script>

<style lang="scss" scoped>
.y-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3, 12px);
  
  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-4, 16px);
  }
  
  &--vertical {
    flex-direction: column;
    gap: var(--spacing-3, 12px);
  }
}
</style>