<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YCheckbox 多选框组件</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">多选组合</span>
          <YCheckboxGroup v-model="basicValue" @change="handleBasicChange">
            <YCheckbox value="apple" label="苹果" />
            <YCheckbox value="banana" label="香蕉" />
            <YCheckbox value="orange" label="橙子" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>选择结果: {{ basicValue.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 水平排列 -->
    <div class="demo-section">
      <div class="section-title">水平排列</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">水平布局</span>
          <YCheckboxGroup v-model="horizontalValue" direction="horizontal" @change="handleHorizontalChange">
            <YCheckbox value="read" label="阅读" />
            <YCheckbox value="music" label="音乐" />
            <YCheckbox value="sport" label="运动" />
            <YCheckbox value="travel" label="旅行" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>兴趣爱好: {{ horizontalValue.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <div class="section-title">自定义颜色</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">红色主题</span>
          <YCheckboxGroup v-model="colorValue1" color="#ff4757" @change="handleColorChange1">
            <YCheckbox value="red1" label="红色选项1" />
            <YCheckbox value="red2" label="红色选项2" />
            <YCheckbox value="red3" label="红色选项3" />
          </YCheckboxGroup>
        </div>
        <div class="demo-item">
          <span class="demo-label">绿色主题</span>
          <YCheckboxGroup v-model="colorValue2" color="#2ed573" @change="handleColorChange2">
            <YCheckbox value="green1" label="绿色选项1" />
            <YCheckbox value="green2" label="绿色选项2" />
            <YCheckbox value="green3" label="绿色选项3" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>红色主题: {{ colorValue1.join(', ') || '无' }}</p>
          <p>绿色主题: {{ colorValue2.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 自定义边框和对号颜色 -->
    <div class="demo-section">
      <div class="section-title">自定义边框和对号颜色</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">自定义样式</span>
          <YCheckboxGroup 
            v-model="customValue" 
            color="#9b59b6"
            border-color="#e74c3c"
            check-mark-color="#f1c40f"
            @change="handleCustomChange"
          >
            <YCheckbox value="custom1" label="紫色背景 + 红色边框 + 黄色对号" />
            <YCheckbox value="custom2" label="自定义样式选项2" />
            <YCheckbox value="custom3" label="自定义样式选项3" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>自定义样式: {{ customValue.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 只显示对号模式 -->
    <div class="demo-section">
      <div class="section-title">只显示对号模式</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">无边框背景</span>
          <YCheckboxGroup 
            v-model="checkMarkValue" 
            :is-check-mark="true"
            color="#5677fc"
            @change="handleCheckMarkChange"
          >
            <YCheckbox value="mark1" label="只显示对号1" />
            <YCheckbox value="mark2" label="只显示对号2" />
            <YCheckbox value="mark3" label="只显示对号3" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>对号模式: {{ checkMarkValue.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <div class="section-title">不同尺寸</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">小尺寸 (0.8x)</span>
          <YCheckboxGroup v-model="sizeValue1" :scale-ratio="0.8" @change="handleSizeChange1">
            <YCheckbox value="small1" label="小尺寸选项1" />
            <YCheckbox value="small2" label="小尺寸选项2" />
          </YCheckboxGroup>
        </div>
        <div class="demo-item">
          <span class="demo-label">默认尺寸 (1x)</span>
          <YCheckboxGroup v-model="sizeValue2" :scale-ratio="1" @change="handleSizeChange2">
            <YCheckbox value="normal1" label="默认尺寸选项1" />
            <YCheckbox value="normal2" label="默认尺寸选项2" />
          </YCheckboxGroup>
        </div>
        <div class="demo-item">
          <span class="demo-label">大尺寸 (1.5x)</span>
          <YCheckboxGroup v-model="sizeValue3" :scale-ratio="1.5" @change="handleSizeChange3">
            <YCheckbox value="large1" label="大尺寸选项1" />
            <YCheckbox value="large2" label="大尺寸选项2" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>小尺寸: {{ sizeValue1.join(', ') || '无' }}</p>
          <p>默认尺寸: {{ sizeValue2.join(', ') || '无' }}</p>
          <p>大尺寸: {{ sizeValue3.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <div class="section-title">禁用状态</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">整组禁用</span>
          <YCheckboxGroup v-model="disabledValue" :disabled="true">
            <YCheckbox value="disabled1" label="禁用选项1" />
            <YCheckbox value="disabled2" label="禁用选项2" />
            <YCheckbox value="disabled3" label="禁用选项3" />
          </YCheckboxGroup>
        </div>
        <div class="demo-item">
          <span class="demo-label">单个禁用</span>
          <YCheckboxGroup v-model="singleDisabledValue" @change="handleSingleDisabledChange">
            <YCheckbox value="normal1" label="正常选项1" />
            <YCheckbox value="disabled" label="禁用选项" :disabled="true" />
            <YCheckbox value="normal2" label="正常选项2" />
          </YCheckboxGroup>
        </div>
        <div class="result">
          <p>整组禁用: {{ disabledValue.join(', ') || '无' }}</p>
          <p>单个禁用: {{ singleDisabledValue.join(', ') || '无' }}</p>
        </div>
      </div>
    </div>

    <!-- 单独使用Checkbox -->
    <div class="demo-section">
      <div class="section-title">单独使用Checkbox</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">独立复选框</span>
          <div class="single-checkbox-demo">
            <YCheckbox 
              v-model="singleValue1" 
              value="single1" 
              label="我同意用户协议" 
              color="#ff6b6b"
              @change="handleSingleChange1"
            />
            <YCheckbox 
              v-model="singleValue2" 
              value="single2" 
              label="我同意隐私政策" 
              color="#4ecdc4"
              @change="handleSingleChange2"
            />
            <YCheckbox 
              v-model="singleValue3" 
              value="single3" 
              label="接收邮件通知" 
              color="#45b7d1"
              :is-check-mark="true"
              @change="handleSingleChange3"
            />
          </div>
        </div>
        <div class="result">
          <p>用户协议: {{ singleValue1 ? '已同意' : '未同意' }}</p>
          <p>隐私政策: {{ singleValue2 ? '已同意' : '未同意' }}</p>
          <p>邮件通知: {{ singleValue3 ? '已开启' : '未开启' }}</p>
        </div>
      </div>
    </div>

    <!-- 事件监听 -->
    <div class="demo-section">
      <div class="section-title">事件监听</div>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">监听变化</span>
          <YCheckboxGroup v-model="eventValue" @change="handleEventChange">
            <YCheckbox value="event1" label="事件选项1" />
            <YCheckbox value="event2" label="事件选项2" />
            <YCheckbox value="event3" label="事件选项3" />
          </YCheckboxGroup>
        </div>
        <div class="event-log">
          <p class="log-title">事件日志：</p>
          <div class="log-content">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
            <div v-if="eventLogs.length === 0" class="log-empty">暂无事件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YCheckbox, YCheckboxGroup } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 响应式数据
const basicValue = ref<(string | number)[]>(['apple'])
const horizontalValue = ref<(string | number)[]>(['read', 'music'])
const colorValue1 = ref<(string | number)[]>(['red1'])
const colorValue2 = ref<(string | number)[]>(['green2'])
const customValue = ref<(string | number)[]>(['custom1'])
const checkMarkValue = ref<(string | number)[]>(['mark1', 'mark3'])
const sizeValue1 = ref<(string | number)[]>(['small1'])
const sizeValue2 = ref<(string | number)[]>(['normal1'])
const sizeValue3 = ref<(string | number)[]>(['large1'])
const disabledValue = ref<(string | number)[]>(['disabled1', 'disabled3'])
const singleDisabledValue = ref<(string | number)[]>(['normal1'])
const eventValue = ref<(string | number)[]>([])
const eventLogs = ref<string[]>([])

// 单独使用的Checkbox
const singleValue1 = ref(false)
const singleValue2 = ref(true)
const singleValue3 = ref(false)

// 事件处理函数
const handleBasicChange = (value: (string | number)[]) => {
  console.log('Basic change:', value)
}

const handleHorizontalChange = (value: (string | number)[]) => {
  console.log('Horizontal change:', value)
}

const handleColorChange1 = (value: (string | number)[]) => {
  console.log('Color 1 change:', value)
}

const handleColorChange2 = (value: (string | number)[]) => {
  console.log('Color 2 change:', value)
}

const handleCustomChange = (value: (string | number)[]) => {
  console.log('Custom change:', value)
}

const handleCheckMarkChange = (value: (string | number)[]) => {
  console.log('CheckMark change:', value)
}

const handleSizeChange1 = (value: (string | number)[]) => {
  console.log('Size 1 change:', value)
}

const handleSizeChange2 = (value: (string | number)[]) => {
  console.log('Size 2 change:', value)
}

const handleSizeChange3 = (value: (string | number)[]) => {
  console.log('Size 3 change:', value)
}

const handleSingleDisabledChange = (value: (string | number)[]) => {
  console.log('Single disabled change:', value)
}

const handleSingleChange1 = (event: { checked: boolean; value?: string | number }) => {
  console.log('Single 1 change:', event)
}

const handleSingleChange2 = (event: { checked: boolean; value?: string | number }) => {
  console.log('Single 2 change:', event)
}

const handleSingleChange3 = (event: { checked: boolean; value?: string | number }) => {
  console.log('Single 3 change:', event)
}

const handleEventChange = (value: (string | number)[]) => {
  const timestamp = new Date().toLocaleTimeString()
  const log = `${timestamp} - Checkbox changed to: [${value.join(', ')}]`
  eventLogs.value.unshift(log)
  
  // 保持最多10条日志
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.demo-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3, 12px);
  padding: var(--spacing-4, 16px);
  border-bottom: 1px solid var(--color-border-light);
  
  &:last-child {
    border-bottom: none;
  }
}

.demo-label {
  font-size: var(--font-size-base, 14px);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium, 500);
  margin-bottom: var(--spacing-2, 8px);
}

.result {
  margin-top: var(--spacing-4, 16px);
  padding: var(--spacing-3, 12px);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-base, 8px);
  border: 1px solid var(--color-border-light);

  p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm, 12px);
    
    & + p {
      margin-top: var(--spacing-1, 4px);
    }
  }
}

.single-checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3, 12px);
}

.event-log {
  margin-top: var(--spacing-4, 16px);
  padding: var(--spacing-4, 16px);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-base, 8px);
  border: 1px solid var(--color-border-light);
}

.log-title {
  font-size: var(--font-size-sm, 12px);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2, 8px);
  font-weight: var(--font-weight-medium, 500);
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  font-size: var(--font-size-xs, 11px);
  color: var(--color-text-tertiary);
  padding: var(--spacing-1, 4px) 0;
  font-family: var(--font-family-mono, 'Courier New', monospace);
  border-bottom: 1px solid var(--color-border-lighter);
  
  &:last-child {
    border-bottom: none;
  }
}

.log-empty {
  font-size: var(--font-size-xs, 11px);
  color: var(--color-text-placeholder);
  text-align: center;
  padding: var(--spacing-2, 8px);
}
</style>