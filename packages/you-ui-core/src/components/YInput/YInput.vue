<template>
  <div 
    class="y-input"
    :style="{
      marginTop: marginTop ? `${marginTop}rpx` : '0',
      backgroundColor: backgroundColor !== '#FFFFFF' ? backgroundColor : 'transparent',
      padding: inputBorder ? padding : '32rpx 0',
      borderRadius: radius ? `${radius}rpx` : (isFillet ? '24rpx' : '0')
    }"
    :class="{
      'y-input--border': inputBorder,
      'y-input--border-top': borderTop,
      'y-input--border-bottom': borderBottom && !inputBorder,
      'y-input--line-left': lineLeft,
      'y-input--disabled': disabled
    }"
    @click="handleClick"
  >
    <!-- 左侧标题 -->
    <div 
      v-if="label" 
      class="y-input__label"
      :style="{
          minWidth: `${labelWidth}rpx`,
          fontSize: `${labelSize}rpx`,
          color: labelColor
        }"
    >
      <span v-if="required" class="y-input__required" :style="{ color: requiredColor }">*</span>
      {{ label }}
    </div>

    <!-- 输入框容器 -->
    <div class="y-input__wrapper">
      <input
        ref="inputRef"
        class="y-input__field"
        :type="password ? 'password' : type"
        :name="name"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength === -1 ? undefined : maxlength"
        :min="min"
        :max="max"
        :readonly="disabled"
        :style="{
          fontSize: `${size}rpx`,
          color,
          textAlign: textRight ? 'right' : 'left',
          ...placeholderStyle ? { placeholderStyle } : {}
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleConfirm"
      />

      <!-- 清除按钮 -->
      <div 
        v-if="clearable && currentValue && !disabled" 
        class="y-input__clear"
        :style="{
          fontSize: `${clearSize}rpx`,
          color: clearColor
        }"
        @click.stop="handleClear"
      >
        ×
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// Props 定义
const props = defineProps({
  // 必填标识
  required: {
    type: Boolean,
    default: false
  },
  requiredColor: {
    type: String,
    default: '#EB0909'
  },
  // 标题相关
  label: {
    type: String,
    default: ''
  },
  labelSize: {
    type: Number,
    default: 32 // 32rpx
  },
  labelColor: {
    type: String,
    default: '#333'
  },
  labelWidth: {
    type: Number,
    default: 140 // 140rpx
  },
  // 清除按钮
  clearable: {
    type: Boolean,
    default: false
  },
  clearSize: {
    type: Number,
    default: 30 // 30rpx
  },
  clearColor: {
    type: String,
    default: '#bfbfbf'
  },
  // 输入框基础属性
  focus: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  placeholderStyle: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String],
    default: ''
  },
  modelValue: {
    type: [Number, String],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  password: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [Number, String],
    default: 140
  },
  min: {
    type: [Number, String],
    default: NaN
  },
  max: {
    type: [Number, String],
    default: NaN
  },
  // 键盘相关
  cursorSpacing: {
    type: Number,
    default: 0
  },
  confirmType: {
    type: String,
    default: 'done'
  },
  confirmHold: {
    type: Boolean,
    default: false
  },
  cursor: {
    type: Number,
    default: -1
  },
  selectionStart: {
    type: Number,
    default: -1
  },
  selectionEnd: {
    type: Number,
    default: -1
  },
  adjustPosition: {
    type: Boolean,
    default: true
  },
  holdKeyboard: {
    type: Boolean,
    default: false
  },
  autoBlur: {
    type: Boolean,
    default: false
  },
  // 样式相关
  size: {
    type: [Number, String],
    default: 32 // 32rpx
  },
  color: {
    type: String,
    default: '#333'
  },
  inputBorder: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.1)'
  },
  isFillet: {
    type: Boolean,
    default: false
  },
  borderTop: {
    type: Boolean,
    default: false
  },
  borderBottom: {
    type: Boolean,
    default: true
  },
  lineLeft: {
    type: Boolean,
    default: true
  },
  trim: {
    type: Boolean,
    default: true
  },
  textRight: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: '26rpx 30rpx'
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  radius: {
    type: [Number, String],
    default: 0
  },
  marginTop: {
    type: [Number, String],
    default: 0
  }
})

// Emits 定义
const emit = defineEmits([
  'input',
  'update:modelValue',
  'focus',
  'blur',
  'confirm',
  'click',
  'keyboardheightchange'
])

// 响应式数据
const inputRef = ref(null)
const currentValue = ref('')

// 计算属性
const actualValue = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : props.value
})

// 监听值变化
watch(
  () => actualValue.value,
  (newVal) => {
    currentValue.value = newVal || ''
  },
  { immediate: true }
)

// 监听 focus 属性
watch(
  () => props.focus,
  (newVal) => {
    if (newVal && inputRef.value) {
      nextTick(() => {
        inputRef.value.focus()
      })
    }
  },
  { immediate: true }
)

// 事件处理函数
const handleInput = (event) => {
  let value = event.target.value
  
  // 自动去除空格
  if (props.trim) {
    value = value.trim()
  }
  
  // 数值类型验证
  if (props.type === 'number' || props.type === 'digit') {
    const numValue = Number(value)
    if (!isNaN(props.min) && numValue < props.min) {
      value = props.min
    }
    if (!isNaN(props.max) && numValue > props.max) {
      value = props.max
    }
  }
  
  currentValue.value = value
  
  // 发射事件
  emit('input', value)
  emit('update:modelValue', value)
}

const handleFocus = (_event) => {
  const detail = {
    value: currentValue.value,
    height: 0 // 在实际应用中可能需要获取键盘高度
  }
  emit('focus', { detail })
}

const handleBlur = (_event) => {
  const detail = {
    value: currentValue.value
  }
  emit('blur', { detail })
}

const handleConfirm = (_event) => {
  const detail = {
    value: currentValue.value
  }
  emit('confirm', { detail })
}

const handleClick = (_event) => {
  emit('click', { name: props.name })
}

const handleClear = () => {
  currentValue.value = ''
  emit('input', '')
  emit('update:modelValue', '')
  
  // 清除后聚焦
  if (inputRef.value) {
    inputRef.value.focus()
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-input {
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 32rpx;
  padding: 32rpx 0;
  border-bottom: 2rpx solid #e0e0e0;
  transition: border-color 0.3s ease;
  background: transparent;
  
  &:focus-within {
    border-bottom-color: #007AFF;
  }
}

.y-input--border {
  border: $border-width-thin solid #e6e6e6; // 2rpx
  padding: $spacing-lg $spacing-md; // 40rpx 32rpx
  border-radius: $border-radius-sm; // 8rpx
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
    border-radius: $border-radius-md; // 16rpx
    pointer-events: none;
  }
}

.y-input--border-top {
  border-top: $border-width-thin solid #e6e6e6; // 2rpx
}

.y-input--border-bottom {
  border-bottom: $border-width-thin solid #e0e0e0; // 2rpx
}

.y-input--line-left .y-input--border-bottom {
  margin-left: 60rpx;
}

.y-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.y-input__label {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
  min-width: 160rpx;
  margin-right: 32rpx;
  font-size: 32rpx;
  color: #333;
}

.y-input__required {
  margin-right: $spacing-xs; // 8rpx
  font-weight: $font-weight-bold;
  color: $color-danger;
}

.y-input__wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.y-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  font-size: 32rpx;
  color: #333;
  padding: 0;
  
  &::placeholder {
    color: #c0c0c0;
    font-size: 32rpx;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: #999;
  }
}

.y-input__clear {
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: $color-gray-100;
  margin-left: $spacing-sm; // 16rpx
  font-weight: $font-weight-bold;
  user-select: none;
  color: $color-text-secondary;
  
  &:hover {
    background-color: $color-gray-200;
  }
}

// 文本右对齐样式
.tui-text-right {
  text-align: right;
}

// Textarea 相关样式
.tui-textarea {
  height: 210rpx;
  width: 100%;
  color: #666;
  font-size: $font-size-base; // 28rpx
  z-index: 2;
}

.tui-phcolor-color {
  color: #ccc !important;
}

.tui-textarea-counter {
  font-size: $font-size-sm; // 24rpx
  color: #999;
  text-align: right;
  height: 80rpx;
  line-height: 80rpx;
  padding-top: $spacing-xs; // 8rpx
}

// 参考 demo-button.vue 添加的通用样式类
.tui-btn {
  width: 100%;
  position: relative;
  border: 0 !important;
  box-sizing: border-box;
  border-radius: 6rpx;
  padding-left: 0;
  padding-right: 0;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-btn::after {
  border: 0;
}

.tui-btn__flex-1 {
  flex: 1;
}

.tui-text-bold {
  font-weight: bold;
}

.tui-dark-disabled {
  opacity: 0.6 !important;
  color: #fafbfc !important;
}

.tui-dark-disabled-outline {
  opacity: 0.5 !important;
}

.tui-gray-disabled {
  background: #f3f3f3 !important;
  color: #919191 !important;
  box-shadow: none;
}

// 圆角样式
.tui-fillet {
  border-radius: 220rpx !important;
}

.tui-fillet::after {
  border-radius: 220rpx !important;
}

.tui-outline-fillet {
  border-radius: 220rpx !important;
}

.tui-outline-fillet::after {
  border-radius: 220rpx !important;
}

// 平角样式
.tui-rightAngle {
  border-radius: 0 !important;
}

.tui-rightAngle::after {
  border-radius: 0 !important;
}

.tui-outline-rightAngle {
  border-radius: 0 !important;
}

.tui-outline-rightAngle::after {
  border-radius: 0 !important;
}

.tui-btn__link::after {
  border: 0 !important;
}

// 按钮颜色样式
.tui-btn-primary {
  background-color: $color-primary;
  color: #fff;
}

.tui-btn-white {
  background-color: #fff;
  color: #333;
}

.tui-btn-danger {
  background-color: $color-danger;
  color: #fff;
}

.tui-btn-warning {
  background-color: $color-warning;
  color: #fff;
}

.tui-btn-success {
  background-color: $color-success;
  color: #fff;
}

.tui-btn-info {
  background-color: $color-info;
  color: #fff;
}

// 轮廓按钮样式
.tui-primary-outline {
  border: 2rpx solid $color-primary !important;
  color: $color-primary;
  background: transparent;
}

.tui-danger-outline {
  border: 2rpx solid $color-danger !important;
  color: $color-danger;
  background: transparent;
}

.tui-warning-outline {
  border: 2rpx solid $color-warning !important;
  color: $color-warning;
  background: transparent;
}

.tui-success-outline {
  border: 2rpx solid $color-success !important;
  color: $color-success;
  background: transparent;
}

.tui-info-outline {
  border: 2rpx solid $color-info !important;
  color: $color-info;
  background: transparent;
}
</style>