<template>
  <div 
    class="y-textarea-container textarea__wrap" 
    :class="[
      containerClass,
      { 'textarea__flex-start': flexStart || label }
    ]" 
    :style="containerStyle"
  >
    <!-- 标题区域 -->
    <div v-if="label" class="y-textarea-label" :class="{ 'flex-start': flexStart }">
      <span 
        class="label-text" 
        :style="labelStyle"
      >{{ label }}</span>
      <span 
        v-if="required" 
        class="required-mark" 
        :style="requiredStyle"
      >*</span>
    </div>
    
    <!-- 输入框区域 -->
    <div class="y-textarea-wrapper" :style="wrapperStyle">
      <!-- 左侧插槽 -->
      <div v-if="$slots.left" class="textarea-left-slot">
        <slot name="left"></slot>
      </div>
      
      <div class="textarea-input-container" :style="inputContainerStyle">
        <textarea
          ref="textareaRef"
          v-model="inputValue"
          class="y-textarea-input"
          :style="textareaStyle"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :disabled="disabled"
          :maxlength="maxlength === -1 ? undefined : maxlength"
          :name="name"
          :focus="focus"
          :auto-height="autoHeight"
          :fixed="fixed"
          :cursor-spacing="cursorSpacing"
          :show-confirm-bar="showConfirmBar"
          :cursor="cursor"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :adjust-position="adjustPosition"
          :hold-keyboard="holdKeyboard"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @click="handleClick"
          @linechange="handleLineChange"
        />
      </div>
      
      <!-- 右侧插槽 -->
      <div v-if="$slots.right" class="textarea-right-slot">
        <slot name="right"></slot>
      </div>
    </div>
    
    <!-- 字符计数 -->
    <div v-if="isCounter && maxlength > 0" class="character-counter" :style="counterStyle">
      {{ currentLength }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Props 定义
interface Props {
  // 基础属性
  required?: boolean
  requiredColor?: string
  requiredTop?: string
  label?: string
  labelSize?: number
  labelColor?: string
  labelWidth?: number
  focus?: boolean
  autoHeight?: boolean
  fixed?: boolean
  placeholder?: string
  placeholderStyle?: string
  name?: string
  value?: string | number
  modelValue?: string | number
  type?: string
  password?: boolean
  disabled?: boolean
  maxlength?: number
  cursorSpacing?: number
  showConfirmBar?: boolean
  cursor?: number
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  holdKeyboard?: boolean
  height?: string
  minHeight?: string
  flexStart?: boolean
  size?: number
  color?: string
  textareaBorder?: boolean
  borderColor?: string
  radius?: number | string
  borderTop?: boolean
  borderBottom?: boolean
  lineLeft?: boolean
  trim?: boolean
  textRight?: boolean
  padding?: string
  backgroundColor?: string
  marginTop?: number
  isCounter?: boolean
  counterColor?: string
  counterSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  requiredColor: '#EB0909',
  requiredTop: '32rpx',
  label: '',
  labelSize: 32,
  labelColor: '#333',
  labelWidth: 140,
  focus: false,
  autoHeight: false,
  fixed: false,
  placeholder: '',
  placeholderStyle: '',
  name: '',
  value: '',
  modelValue: '',
  type: 'text',
  password: false,
  disabled: false,
  maxlength: 140,
  cursorSpacing: 0,
  showConfirmBar: true,
  cursor: -1,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  height: '200rpx',
  minHeight: '200rpx',
  flexStart: false,
  size: 32,
  color: '#333',
  textareaBorder: false,
  borderColor: 'rgba(0, 0, 0, 0.1)',
  radius: 0,
  borderTop: true,
  borderBottom: true,
  lineLeft: true,
  trim: true,
  textRight: false,
  padding: '26rpx 30rpx',
  backgroundColor: '#FFFFFF',
  marginTop: 0,
  isCounter: false,
  counterColor: '#999',
  counterSize: 28
})

// Emits 定义
const emit = defineEmits<{
  input: [value: string | number]
  'update:modelValue': [value: string | number]
  focus: [event: any]
  blur: [event: any]
  confirm: [event: any]
  click: [event: any]
  linechange: [event: any]
}>()

// 响应式数据
const textareaRef = ref<HTMLTextAreaElement>()
const inputValue = ref<string | number>('')

// 初始化值
const initValue = computed(() => {
  return props.modelValue || props.value || ''
})

watch(initValue, (newVal) => {
  inputValue.value = newVal
}, { immediate: true })

watch(() => props.modelValue, (newVal) => {
  if (newVal !== inputValue.value) {
    inputValue.value = newVal || ''
  }
})

// 计算属性
const currentLength = computed(() => {
  return String(inputValue.value).length
})

const containerClass = computed(() => {
  return {
    'y-textarea--disabled': props.disabled,
    'y-textarea--border': props.textareaBorder,
    'y-textarea--border-top': props.borderTop && !props.textareaBorder,
    'y-textarea--border-bottom': props.borderBottom && !props.textareaBorder,
    'y-textarea--line-left': props.lineLeft
  }
})

const containerStyle = computed(() => {
  const style: Record<string, any> = {
    marginTop: props.marginTop ? `${props.marginTop}rpx` : '0',
    backgroundColor: props.backgroundColor !== '#FFFFFF' ? props.backgroundColor : 'transparent',
    borderRadius: typeof props.radius === 'number' ? `${props.radius}rpx` : props.radius
  }
  
  // 参考用户提供的带标题样式
  if (props.textareaBorder) {
    style.padding = '13px 16px'
    style.backgroundColor = 'rgb(255, 255, 255)'
    style.marginTop = '0px'
    style.borderRadius = '0px'
    style.borderColor = 'rgba(0, 0, 0, 0.1)'
  }
  
  return style
})

const labelStyle = computed(() => {
  return {
    minWidth: `${props.labelWidth}rpx`,
    fontSize: `${props.labelSize}rpx`,
    color: props.labelColor
  }
})

const requiredStyle = computed(() => {
  return {
    color: props.requiredColor,
    top: props.flexStart ? props.requiredTop : 'auto'
  }
})

const wrapperStyle = computed(() => {
  return {
    padding: props.padding
  }
})

const inputContainerStyle = computed(() => {
  return {
    flex: 1
  }
})

const textareaStyle = computed(() => {
  return {
    fontSize: `${props.size}rpx`,
    color: props.color,
    height: props.height,
    minHeight: props.minHeight,
    textAlign: props.textRight ? 'right' : 'left',
    borderColor: props.textareaBorder ? props.borderColor : 'transparent'
  }
})

const counterStyle = computed(() => {
  return {
    fontSize: `${props.counterSize}rpx`,
    color: props.counterColor
  }
})

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  let value = target.value
  
  if (props.trim) {
    value = value.trim()
  }
  
  inputValue.value = value
  emit('input', value)
  emit('update:modelValue', value)
}

const handleFocus = (event: any) => {
  emit('focus', event)
}

const handleBlur = (event: any) => {
  emit('blur', event)
}

const handleConfirm = (event: any) => {
  emit('confirm', event)
}

const handleClick = (event: any) => {
  emit('click', { ...event, name: props.name })
}

const handleLineChange = (event: any) => {
  emit('linechange', event)
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-textarea-container {
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 32rpx;
  padding: 32rpx 0;
  border-bottom: 2rpx solid #e0e0e0;
  transition: border-color 0.3s ease;
  background: transparent;

  &:focus-within {
    border-bottom-color: #007aff;
  }
  
  &.y-textarea--disabled {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  }
  
  &.y-textarea--border {
    border: 2rpx solid #e6e6e6;
    padding: 26rpx 30rpx;
    border-radius: 8rpx;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 200%;
      width: 200%;
      border: 2rpx solid #e6e6e6;
      transform-origin: 0 0;
      transform: scale(0.5);
      left: 0;
      top: 0;
      border-radius: 16rpx;
      pointer-events: none;
    }
  }
  
  &.y-textarea--border-top {
    border-top: 2rpx solid #e6e6e6;
  }
  
  &.y-textarea--border-bottom {
    border-bottom: 2rpx solid #e0e0e0;
  }
  
  &.y-textarea--line-left .y-textarea--border-bottom {
    margin-left: 60rpx;
  }
}

.y-textarea-label {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  font-weight: 400;
  min-width: 160rpx;
  margin-right: 32rpx;
  font-size: 32rpx;
  color: #333;
  position: relative;
  
  .label-text {
    display: block;
  }
  
  .required-mark {
    margin-right: 8rpx;
    font-weight: bold;
    color: #EB0909;
    position: relative;
  }
}

// textarea__wrap 样式 - 参考用户提供的样式
.textarea__wrap {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  position: relative;
}

// textarea__flex-start 样式 - 参考用户提供的样式
.textarea__flex-start {
  align-items: flex-start !important;
}

.y-textarea-wrapper {
  flex: 1;
  display: flex;
  align-items: flex-start;
  position: relative;
}

.textarea-left-slot,
.textarea-right-slot {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.textarea-left-slot {
  margin-right: 16rpx;
}

.textarea-right-slot {
  margin-left: 16rpx;
}

.textarea-input-container {
  flex: 1;
  position: relative;
}

.y-textarea-input {
  width: 100%;
  // 参考用户提供的textarea样式
  resize: none;
  background: none;
  color: inherit;
  opacity: 1;
  font: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-align: inherit;
  text-indent: inherit;
  text-transform: inherit;
  text-shadow: inherit;
  // 原有样式
  border: none;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0;
  
  &::placeholder {
    color: #c0c0c0;
    font-size: 32rpx;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: #999;
  }
  
  &[readonly] {
    cursor: default;
  }
}

.character-counter {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  margin-top: 8rpx;
  line-height: 1;
}

// 清除按钮样式 - 参考YInput
.y-textarea__clear {
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin-left: 16rpx;
  font-weight: bold;
  user-select: none;
  color: #bfbfbf;
  font-size: 30rpx;

  &:hover {
    background-color: #e8e8e8;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .y-textarea-wrapper {
    flex-direction: column;
  }
  
  .textarea-left-slot,
  .textarea-right-slot {
    margin: 0 0 16rpx 0;
  }
}
</style>