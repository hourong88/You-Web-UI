<template>
  <label 
    class="y-radio"
    :class="{
      'y-radio--disabled': disabled,
      'y-radio--checked': isChecked
    }"
  >
    <input
      type="radio"
      class="y-radio__input"
      :class="{
        'y-radio__input--checked': isChecked,
        'y-radio__input--disabled': disabled
      }"
      :style="radioStyle"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span 
      v-if="$slots.default || label"
      class="y-radio__label"
      :class="{
        'y-radio__label--disabled': disabled,
        'y-radio__label--checked': isChecked
      }"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface RadioProps {
  /** 选项的值 */
  value?: string | number
  /** 选项标签文本 */
  label?: string
  /** 是否选中 */
  modelValue?: string | number | boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 选中时的颜色 */
  color?: string
  /** 未选中时边框颜色 */
  borderColor?: string
  /** 缩放比例，用于改变大小 */
  scaleRatio?: number | string
  /** 内部圆点颜色 */
  checkMarkColor?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  value: '',
  label: '',
  modelValue: false,
  disabled: false,
  color: '#5677fc',
  borderColor: '#ccc',
  scaleRatio: 1,
  checkMarkColor: '#fff'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  'change': [value: string | number | boolean]
}>()

// 注入RadioGroup的上下文
const radioGroup = inject<any>('YRadioGroup', null)

// 计算是否选中
const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue === props.value || (props.modelValue === true && props.value)
})

// 计算是否禁用
const isDisabled = computed(() => {
  return props.disabled || (radioGroup && radioGroup.disabled?.value) || false
})

// 获取最终的样式属性
const finalColor = computed(() => radioGroup?.color?.value || props.color)
const finalBorderColor = computed(() => radioGroup?.borderColor?.value || props.borderColor)
const finalScaleRatio = computed(() => radioGroup?.scaleRatio?.value || props.scaleRatio)
const finalCheckMarkColor = computed(() => radioGroup?.checkMarkColor?.value || props.checkMarkColor)

// 计算样式
const radioStyle = computed(() => {
  const scale = Number(finalScaleRatio.value)
  
  return {
    transform: `scale(${scale})`,
    '--radio-color': finalColor.value,
    '--radio-border-color': finalBorderColor.value,
    '--radio-check-color': finalCheckMarkColor.value
  }
})

// 处理change事件
const handleChange = (event: Event) => {
  if (isDisabled.value) return
  
  const target = event.target as HTMLInputElement
  
  if (radioGroup) {
    // 在RadioGroup中使用 - 只能选中，不能取消选中
    if (target.checked) {
      radioGroup.updateValue(props.value)
    }
  } else {
    // 单独使用 - 可以切换选中状态
    if (target.checked) {
      emit('update:modelValue', props.value)
      emit('change', props.value)
    } else {
      emit('update:modelValue', false)
      emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 16px;
  
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &__input {
    width: 20px;
    height: 20px;
    appearance: none;
    position: relative;
    margin: 0;
    cursor: pointer;
    
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      border: 1px solid #7d7d7d;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      transition: all 0.2s ease;
    }
    
    &:checked:before {
      content: '';
      width: 20px;
      height: 20px;
      border: 1px solid var(--radio-color, #6c757d);
      background: var(--radio-color, #6c757d);
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
    }
    
    &:checked:after {
      content: '';
      width: 10px;
      height: 5px;
      border: 2px solid white;
      border-top: transparent;
      border-right: transparent;
      text-align: center;
      display: block;
      position: absolute;
      top: 6px;
      left: 5px;
      vertical-align: middle;
      transform: rotate(-45deg);
    }
    
    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  &__label {
    margin-left: 8px;
    color: $color-text-primary;
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;
    transition: color 0.2s ease;
    
    &--disabled {
      color: $color-text-disabled;
      cursor: not-allowed;
    }
    

  }
}

// 悬停效果
.y-radio:not(.y-radio--disabled):hover {
  .y-radio__input:before {
    border-color: var(--radio-color, #6c757d);
  }
}

// 焦点效果
.y-radio:not(.y-radio--disabled) {
  .y-radio__input:focus {
    outline: none;
    
    &:before {
      box-shadow: 0 0 0 2px rgba(197, 156, 90, 0.2);
    }
  }
}
</style>