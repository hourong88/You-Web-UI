<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YSteps 步骤条</text>
    </view>

    <!-- 交互式步骤条 -->
    <div class="demo-section">
      <div class="section-title">交互式步骤条</div>
      <YSteps :current="interactiveCurrent" :items="basicSteps" />
      <div class="demo-controls">
        <button 
          class="demo-btn demo-btn--secondary" 
          @click="prevStep"
          :disabled="interactiveCurrent <= 0"
        >
          上一步
        </button>
        <button 
          class="demo-btn demo-btn--primary" 
          @click="nextStep"
          :disabled="interactiveCurrent >= basicSteps.length - 1"
        >
          下一步
        </button>
      </div>
      <div class="demo-tip">当前步骤：{{ interactiveCurrent + 1 }} / {{ basicSteps.length }}</div>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法（默认小尺寸）</div>
       <div class="size-demo">
      <YSteps :current="1" :items="basicSteps" />
      </div>
    </div>

    <!-- 自定义大小 -->
    <div class="demo-section">
      <div class="section-title">自定义大小</div>
      <div class="size-demo">
        <div class="size-item">
          <div class="size-label">小尺寸 (10px)</div>
          <YSteps :current="1" :items="basicSteps" :size="10" :line-width="1" />
        </div>
        <div class="size-item">
          <div class="size-label">中等尺寸 (16px)</div>
          <YSteps :current="1" :items="basicSteps" :size="16" :line-width="2" />
        </div>
        <div class="size-item">
          <div class="size-label">大尺寸 (24px)</div>
          <YSteps :current="1" :items="basicSteps" :size="24" :line-width="3" />
        </div>
      </div>
    </div>

    <!-- 可点击步骤条 -->
    <div class="demo-section">
      <div class="section-title">可点击步骤条</div>
      <YSteps 
        :current="clickableCurrent" 
        :items="basicSteps"
        @click="handleStepClick"
      />
      <div class="demo-tip">点击步骤可跳转，当前步骤：{{ clickableCurrent + 1 }}</div>
    </div>

    <!-- 错误状态 -->
    <div class="demo-section">
      <div class="section-title">错误状态</div>
      <div class="size-demo">
      <YSteps 
        :current="1" 
        :items="errorSteps"
      />
      </div>
    </div>

    <!-- 垂直步骤条 -->
    <div class="demo-section">
      <div class="section-title">垂直步骤条 - 物流跟踪</div>
      <YSteps 
        :current="2" 
        :items="logisticsSteps" 
        direction="column"
        :size="16"
      />
      <div class="demo-tip">模拟物流跟踪场景，当前已完成前3个步骤</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YSteps } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础步骤数据
const basicSteps = ref([
  { title: '买家下单', desc: '买家创建订单' },
  { title: '商家接单', desc: '商家确认订单' },
  { title: '买家提货', desc: '买家到店提货' },
  { title: '交易完成', desc: '订单完成' }
])

// 自定义图标步骤
const iconSteps = ref([
  { title: '登录', desc: '用户登录', icon: '👤' },
  { title: '验证', desc: '身份验证', icon: '🔐' },
  { title: '完成', desc: '登录成功', icon: '✅' }
])

// 错误状态步骤
const errorSteps = ref([
  { title: '步骤一', desc: '已完成', status: 'finish' },
  { title: '步骤二', desc: '执行失败', status: 'error' },
  { title: '步骤三', desc: '等待执行', status: 'wait' },
  { title: '步骤四', desc: '等待执行', status: 'wait' }
])

// 物流跟踪步骤 - 参考 Vant 风格
const logisticsSteps = ref([
  { 
    title: '【深圳市】已揽收', 
    desc: '2024-01-15 09:30:00' 
  },
  { 
    title: '【深圳市】离开深圳转运中心，下一站广州转运中心', 
    desc: '2024-01-15 12:45:00' 
  },
  { 
    title: '【广州市】到达广州转运中心', 
    desc: '2024-01-15 18:20:00' 
  },
  { 
    title: '【广州市】离开广州转运中心，下一站北京转运中心', 
    desc: '2024-01-16 08:15:00' 
  },
  { 
    title: '【北京市】到达北京转运中心', 
    desc: '2024-01-16 15:30:00' 
  },
  { 
    title: '【北京市】快件已到达派送网点', 
    desc: '2024-01-17 08:00:00' 
  },
  { 
    title: '【北京市】快件正在派送中', 
    desc: '2024-01-17 10:30:00' 
  }
])

// 交互式步骤条当前索引
const interactiveCurrent = ref(0)

// 可点击步骤条当前索引
const clickableCurrent = ref(0)

// 下一步
const nextStep = () => {
  if (interactiveCurrent.value < basicSteps.value.length - 1) {
    interactiveCurrent.value++
  }
}

// 上一步
const prevStep = () => {
  if (interactiveCurrent.value > 0) {
    interactiveCurrent.value--
  }
}

// 处理步骤点击
const handleStepClick = ({ index }: { index: number }) => {
  clickableCurrent.value = index
  console.log('点击了步骤：', index)
}

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.demo-controls {
  display: flex;
  justify-content: center;
  gap: $spacing-base;
  margin-top: 4rem;
}

.demo-btn {
  padding: $spacing-sm $spacing-base;
  border: none;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120rpx;
  
  &--primary {
    background-color: #409eff;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #66b1ff;
    }
    
    &:disabled {
      background-color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  
  &--secondary {
    background-color: #f4f4f5;
    color: #606266;
    border: 1px solid #dcdfe6;
    
    &:hover:not(:disabled) {
      background-color: #ecf5ff;
      border-color: #409eff;
      color: #409eff;
    }
    
    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.demo-tip {
  margin-top: 20px;
  padding: $spacing-sm;
  font-size: $font-size-sm;
  color: #909399;
  background-color: #f8f9fa;
  border-radius: $border-radius-base;
  text-align: center;
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  min-height:50px;
}

.size-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom:50px;
}

.size-label {
  font-size: $font-size-sm;
  color: #909399;
  font-weight: 500;
}
</style>