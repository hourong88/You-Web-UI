<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YRadio 单选框</text>
    </view>
    
    <!-- 默认样式 -->
    <div class="demo-section">
      <div class="section-title">默认样式</div>
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
      <div class="section-title">推荐展示｜改变颜色</div>
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
      <div class="section-title">推荐展示｜改变大小</div>
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
      <div class="section-title">水平排列</div>
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
      <div class="section-title">禁用状态</div>
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
      <div class="section-title">自定义样式组合</div>
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
      <div class="section-title">单独使用Radio</div>
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
import { YRadio, YRadioGroup } from '@you-web/ui-core'

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

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.result {
  margin-top: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid $color-primary;

  p {
    margin: 0;
    color: #666;
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
  color: #666;
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