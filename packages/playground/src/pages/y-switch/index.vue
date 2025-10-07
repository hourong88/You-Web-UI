<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YSwitch 开关组件</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2 class="section-title">基础用法</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">默认开关</span>
          <YSwitch v-model="basicValue" @change="handleChange" />
        </div>
        <div class="demo-item">
          <span class="demo-label">默认选中</span>
          <YSwitch v-model="checkedValue" />
        </div>
        <div class="demo-item">
          <span class="demo-label">禁用状态</span>
          <YSwitch :disabled="true" />
        </div>
        <div class="demo-item">
          <span class="demo-label">禁用选中</span>
          <YSwitch :disabled="true" :checked="true" />
        </div>
      </div>
    </div>

    <!-- 不同类型 -->
    <div class="demo-section">
      <h2 class="section-title">不同类型</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">Switch 类型</span>
          <YSwitch v-model="switchValue" type="switch" />
        </div>
        <div class="demo-item">
          <span class="demo-label">Checkbox 类型</span>
          <YSwitch v-model="checkboxValue" type="checkbox" />
        </div>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h2 class="section-title">自定义颜色</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">红色主题</span>
          <YSwitch v-model="redValue" color="#ff4757" />
        </div>
        <div class="demo-item">
          <span class="demo-label">绿色主题</span>
          <YSwitch v-model="greenValue" color="#2ed573" />
        </div>
        <div class="demo-item">
          <span class="demo-label">橙色主题</span>
          <YSwitch v-model="orangeValue" color="#ffa726" />
        </div>
      </div>
    </div>

    <!-- Checkbox 自定义颜色 -->
    <div class="demo-section">
      <h2 class="section-title">Checkbox 自定义样式</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">自定义边框</span>
          <YSwitch 
            v-model="customCheckbox1" 
            type="checkbox" 
            color="#e74c3c"
            border-color="#e74c3c"
            check-mark-color="#fff"
          />
        </div>
        <div class="demo-item">
          <span class="demo-label">自定义对号</span>
          <YSwitch 
            v-model="customCheckbox2" 
            type="checkbox" 
            color="#9b59b6"
            border-color="#9b59b6"
            check-mark-color="#f1c40f"
          />
        </div>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2 class="section-title">不同尺寸</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">小尺寸 (0.8倍)</span>
          <YSwitch v-model="sizeValue1" :scale-ratio="0.8" />
        </div>
        <div class="demo-item">
          <span class="demo-label">默认尺寸 (1倍)</span>
          <YSwitch v-model="sizeValue2" :scale-ratio="1" />
        </div>
        <div class="demo-item">
          <span class="demo-label">大尺寸 (1.2倍)</span>
          <YSwitch v-model="sizeValue3" :scale-ratio="1.2" />
        </div>
        <div class="demo-item">
          <span class="demo-label">超大尺寸 (1.5倍)</span>
          <YSwitch v-model="sizeValue4" :scale-ratio="1.5" />
        </div>
      </div>
    </div>

    <!-- 事件监听 -->
    <div class="demo-section">
      <h2 class="section-title">事件监听</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="demo-label">监听变化</span>
          <YSwitch v-model="eventValue" @change="handleEventChange" />
        </div>
        <div class="event-log">
          <p class="log-title">事件日志：</p>
          <div class="log-content">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单集成 -->
    <div class="demo-section">
      <h2 class="section-title">表单集成</h2>
      <div class="demo-block">
        <div class="form-demo">
          <div class="form-item">
            <label class="form-label">接收通知</label>
            <YSwitch v-model="formData.notification" name="notification" />
          </div>
          <div class="form-item">
            <label class="form-label">自动保存</label>
            <YSwitch v-model="formData.autoSave" name="autoSave" />
          </div>
          <div class="form-item">
            <label class="form-label">深色模式</label>
            <YSwitch v-model="formData.darkMode" name="darkMode" />
          </div>
          <div class="form-result">
            <p class="result-title">表单数据：</p>
            <pre class="result-content">{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { YSwitch } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础用法
const basicValue = ref(false)
const checkedValue = ref(true)

// 不同类型
const switchValue = ref(false)
const checkboxValue = ref(false)

// 自定义颜色
const redValue = ref(true)
const greenValue = ref(true)
const orangeValue = ref(true)

// Checkbox 自定义样式
const customCheckbox1 = ref(true)
const customCheckbox2 = ref(true)

// 不同尺寸
const sizeValue1 = ref(true)
const sizeValue2 = ref(true)
const sizeValue3 = ref(true)
const sizeValue4 = ref(true)

// 事件监听
const eventValue = ref(false)
const eventLogs = ref<string[]>([])

// 表单集成
const formData = reactive({
  notification: true,
  autoSave: false,
  darkMode: false
})

// 事件处理
const handleChange = (event: any) => {
  console.log('Switch changed:', event.detail.value)
}

const handleEventChange = (event: any) => {
  const timestamp = new Date().toLocaleTimeString()
  const log = `${timestamp} - Switch changed to: ${event.detail.value}`
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
  align-items: center;
  justify-content: space-between;
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

.form-demo {
  padding: var(--spacing-4, 16px);
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3, 12px) 0;
  border-bottom: 1px solid var(--color-border-lighter);
  
  &:last-of-type {
    border-bottom: none;
    margin-bottom: var(--spacing-4, 16px);
  }
}

.form-label {
  font-size: var(--font-size-base, 14px);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium, 500);
}

.form-result {
  margin-top: var(--spacing-4, 16px);
  padding: var(--spacing-4, 16px);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-base, 8px);
  border: 1px solid var(--color-border-light);
}

.result-title {
  font-size: var(--font-size-sm, 12px);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2, 8px);
  font-weight: var(--font-weight-medium, 500);
}

.result-content {
  font-size: var(--font-size-xs, 11px);
  color: var(--color-text-tertiary);
  font-family: var(--font-family-mono, 'Courier New', monospace);
  background: var(--color-bg-tertiary);
  padding: var(--spacing-2, 8px);
  border-radius: var(--border-radius-sm, 4px);
  border: 1px solid var(--color-border-lighter);
  white-space: pre-wrap;
  overflow-x: auto;
}
</style>