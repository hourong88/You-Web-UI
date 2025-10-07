<template>
  <view
    :class="[
      'y-checkbox',
      {
        'y-checkbox--checked': isChecked,
        'y-checkbox--disabled': disabled,
        'y-checkbox--check-mark-only': isCheckMark
      }
    ]"
    :style="checkboxStyle"
    @click="handleClick"
  >
    <view class="y-checkbox__input" :style="inputStyle">
      <view v-if="isChecked && !isCheckMark" class="y-checkbox__checkmark" :style="checkmarkStyle">
        ✓
      </view>
      <view v-if="isChecked && isCheckMark" class="y-checkbox__checkmark-only" :style="checkmarkOnlyStyle">
        ✓
      </view>
    </view>
    <view v-if="$slots.default || label" class="y-checkbox__label">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

interface Props {
  value?: string | number
  checked?: boolean
  triggerGroup?: boolean
  disabled?: boolean
  color?: string
  borderColor?: string
  isCheckMark?: boolean
  checkMarkColor?: string
  scaleRatio?: number | string
  label?: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  triggerGroup: true,
  disabled: false,
  color: '#5677fc',
  borderColor: '#ccc',
  isCheckMark: false,
  checkMarkColor: '#fff',
  scaleRatio: 1,
  label: ''
})

interface Emits {
  (e: 'change', value: { checked: boolean; value?: string | number }): void
  (e: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<Emits>()

// 注入CheckboxGroup的上下文
const checkboxGroup = inject<{
  modelValue: (string | number)[]
  updateValue: (value: string | number, checked: boolean) => void
  disabled?: boolean
  color?: string
  borderColor?: string
  isCheckMark?: boolean
  checkMarkColor?: string
  scaleRatio?: number | string
}>('checkboxGroup', null)

// 计算是否选中
const isChecked = computed(() => {
  if (checkboxGroup && props.value !== undefined) {
    const groupValue = checkboxGroup.modelValue.value || checkboxGroup.modelValue
    return Array.isArray(groupValue) ? groupValue.includes(props.value) : false
  }
  return props.modelValue ?? props.checked
})

// 计算是否禁用
const isDisabled = computed(() => {
  const groupDisabled = checkboxGroup?.disabled
  return props.disabled || (groupDisabled?.value ?? groupDisabled) || false
})

// 计算样式
const checkboxStyle = computed(() => {
  const scale = Number((checkboxGroup?.scaleRatio?.value ?? checkboxGroup?.scaleRatio) ?? props.scaleRatio)
  return {
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'left center'
  }
})

const inputStyle = computed(() => {
  const currentColor = (checkboxGroup?.color?.value ?? checkboxGroup?.color) ?? props.color
  const currentBorderColor = (checkboxGroup?.borderColor?.value ?? checkboxGroup?.borderColor) ?? props.borderColor
  const currentIsCheckMark = (checkboxGroup?.isCheckMark?.value ?? checkboxGroup?.isCheckMark) ?? props.isCheckMark
  
  if (currentIsCheckMark) {
    return {}
  }
  
  return {
    backgroundColor: isChecked.value ? currentColor : 'transparent',
    borderColor: isChecked.value ? currentColor : currentBorderColor
  }
})

const checkmarkStyle = computed(() => {
  const currentCheckMarkColor = (checkboxGroup?.checkMarkColor?.value ?? checkboxGroup?.checkMarkColor) ?? props.checkMarkColor
  return {
    color: currentCheckMarkColor
  }
})

const checkmarkOnlyStyle = computed(() => {
  const currentColor = (checkboxGroup?.color?.value ?? checkboxGroup?.color) ?? props.color
  return {
    color: currentColor
  }
})

// 处理点击事件
const handleClick = () => {
  if (isDisabled.value) return

  const newChecked = !isChecked.value
  
  // 如果在CheckboxGroup中
  if (checkboxGroup && props.value !== undefined && props.triggerGroup) {
    checkboxGroup.updateValue(props.value, newChecked)
  } else {
    // 单独使用
    emit('update:modelValue', newChecked)
  }
  
  // 触发change事件
  emit('change', {
    checked: newChecked,
    value: props.value
  })
}
</script>

<style lang="scss" scoped>
.y-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all var(--transition-duration, 0.3s) ease;
  
  &--disabled {
    opacity: var(--disabled-opacity, 0.5);
    cursor: not-allowed;
  }
  
  &__input {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-border, #ccc);
    border-radius: var(--border-radius-sm, 3px);
    background-color: transparent;
    transition: all var(--transition-duration, 0.3s) ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  &__checkmark {
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    transform: scale(0.8);
  }
  
  &__checkmark-only {
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
  }
  
  &__label {
    margin-left: var(--spacing-2, 8px);
    font-size: var(--font-size-base, 14px);
    color: var(--color-text-primary);
    line-height: 1.4;
  }
  
  // CheckMark模式样式
  &--check-mark-only {
    .y-checkbox__input {
      border: none;
      background: none;
      width: auto;
      height: auto;
    }
  }
  
  // 主题适配
  @media (prefers-color-scheme: dark) {
    .y-checkbox__label {
      color: var(--color-text-primary-dark, #e0e0e0);
    }
  }
}

// 全局主题变量
:root {
  --y-checkbox-color: #5677fc;
  --y-checkbox-border-color: #ccc;
  --y-checkbox-checkmark-color: #fff;
  --y-checkbox-disabled-opacity: 0.5;
}

[data-theme="dark"] {
  --y-checkbox-border-color: #555;
}
</style>