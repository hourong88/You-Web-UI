<template>
  <div class="demo-container">
    <div class="page-header">
      <div class="back-button" @click="goBack">
        <span class="back-icon">←</span>
      </div>
      <h1 class="page-title">YRadio 单选框</h1>
    </div>
    
    <!-- 默认样式 -->
    <div class="demo-section">
      <h2>默认样式</h2>
      <YRadioGroup v-model="basicValue" @change="onBasicChange">
        <YRadio value="selected" label="选中" />
        <YRadio value="unselected" label="未选中" />
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ basicValue }}</p>
      </div>
    </div>

    <!-- 推荐展示｜改变颜色 -->
    <div class="demo-section">
      <h2>推荐展示｜改变颜色</h2>
      <YRadioGroup v-model="colorValue" color="#07c160" @change="onColorChange">
        <YRadio value="china" label="中国" />
        <YRadio value="usa" label="美国" />
        <YRadio value="russia" label="俄罗斯" />
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ colorValue }}</p>
      </div>
    </div>

    <!-- 推荐展示｜改变大小 -->
    <div class="demo-section">
      <h2>推荐展示｜改变大小</h2>
      <YRadioGroup v-model="sizeValue" @change="onSizeChange">
        <div class="size-demo">
          <div class="size-item">
            <YRadio 
              value="china" 
              label="中国" 
              color="#ff4757"
              :scale-ratio="1.5"
            />
            <span class="size-label">大尺寸 (1.5x)</span>
          </div>
          <div class="size-item">
            <YRadio 
              value="usa" 
              label="美国" 
              color="#4ecdc4"
              :scale-ratio="1.2"
            />
            <span class="size-label">中等尺寸 (1.2x)</span>
          </div>
          <div class="size-item">
            <YRadio 
              value="russia" 
              label="俄罗斯" 
              color="#5677fc"
              :scale-ratio="1"
            />
            <span class="size-label">标准尺寸 (1x)</span>
          </div>
        </div>
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ sizeValue }}</p>
      </div>
    </div>

    <!-- 水平排列 -->
    <div class="demo-section">
      <h2>水平排列</h2>
      <YRadioGroup v-model="horizontalValue" direction="horizontal" @change="onHorizontalChange">
        <YRadio value="option1" label="选项1" />
        <YRadio value="option2" label="选项2" />
        <YRadio value="option3" label="选项3" />
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ horizontalValue }}</p>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <YRadioGroup v-model="disabledValue" disabled>
        <YRadio value="disabled1" label="禁用选项1" />
        <YRadio value="disabled2" label="禁用选项2" />
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ disabledValue }}</p>
      </div>
    </div>

    <!-- 自定义样式组合 -->
    <div class="demo-section">
      <h2>自定义样式组合</h2>
      <YRadioGroup 
        v-model="customValue" 
        color="#9c88ff" 
        border-color="#ddd"
        check-mark-color="#fff"
        :scale-ratio="1.3"
        @change="onCustomChange"
      >
        <YRadio value="purple1" label="紫色主题选项1" />
        <YRadio value="purple2" label="紫色主题选项2" />
        <YRadio value="purple3" label="紫色主题选项3" />
      </YRadioGroup>
      <div class="result">
        <p>选择结果: {{ customValue }}</p>
      </div>
    </div>

    <!-- 单独使用Radio -->
    <div class="demo-section">
      <h2>单独使用Radio</h2>
      <div class="single-radio-demo">
        <YRadio 
          v-model="singleValue1" 
          value="single1" 
          label="单独的Radio 1" 
          color="#ff6b6b"
          @change="onSingleChange1"
        />
        <YRadio 
          v-model="singleValue2" 
          value="single2" 
          label="单独的Radio 2" 
          color="#4ecdc4"
          @change="onSingleChange2"
        />
      </div>
      <div class="result">
        <p>Radio 1: {{ singleValue1 }}</p>
        <p>Radio 2: {{ singleValue2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YRadio, YRadioGroup } from '../../../you-ui-core/src/components/YRadio'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 响应式数据
const basicValue = ref('selected')
const colorValue = ref('china')
const sizeValue = ref('china')
const horizontalValue = ref('option1')
const disabledValue = ref('disabled1')
const customValue = ref('purple1')
const singleValue1 = ref('')
const singleValue2 = ref('')

// 事件处理函数
const onBasicChange = (value: string | number) => {
  console.log('Basic change:', value)
}

const onColorChange = (value: string | number) => {
  console.log('Color change:', value)
}

const onSizeChange = (value: string | number) => {
  console.log('Size change:', value)
}

const onHorizontalChange = (value: string | number) => {
  console.log('Horizontal change:', value)
}

const onCustomChange = (value: string | number) => {
  console.log('Custom change:', value)
}

const onSingleChange1 = (value: string | number | boolean) => {
  console.log('Single 1 change:', value)
}

const onSingleChange2 = (value: string | number | boolean) => {
  console.log('Single 2 change:', value)
}
</script>

<style scoped lang="scss">
$color-primary: #5677fc;
$color-text-primary: #333;
$color-text-secondary: #666;
$color-border-light: #eee;

.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid $color-border-light;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $color-primary;
  color: white;
  cursor: pointer;
  margin-right: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: color-mix(in srgb, $color-primary 90%, black 10%);
    transform: translateX(-2px);
  }
}

.back-icon {
  font-size: 18px;
  font-weight: bold;
}

.page-title {
  color: $color-text-primary;
  margin: 0;
  font-size: 24px;
}

h1 {
  color: $color-text-primary;
  margin-bottom: 30px;
  text-align: center;
}

.demo-section {
  margin-bottom: 40px;
  padding: 24px;
  border: 1px solid $color-border-light;
  border-radius: 8px;
  background: #fff;

  h2 {
    color: $color-text-secondary;
    margin-bottom: 20px;
    font-size: 18px;
  }
}

.result {
  margin-top: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid $color-primary;

  p {
    margin: 0;
    color: $color-text-secondary;
    font-size: 14px;
    
    & + p {
      margin-top: 4px;
    }
  }
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.size-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.size-label {
  font-size: 12px;
  color: $color-text-secondary;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
}

.single-radio-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>