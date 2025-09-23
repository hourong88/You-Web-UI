<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YCountdown 倒计时</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <YCountdown :time="basicTime" @end="handleBasicEnd" />
      <div class="demo-desc">默认显示时分秒，60秒倒计时</div>
    </div>

    <!-- 包含天数 -->
    <div class="demo-section">
      <div class="section-title">包含天数</div>
      <YCountdown 
        :time="dayTime" 
        :days="true"
        @end="handleDayEnd" 
      />
      <div class="demo-desc">显示天时分秒，2天倒计时</div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <YCountdown
        :time="customTime"
        :width="40"
        :height="40"
        :size="18"
        background-color="#ff6b35"
        color="#fff"
        border-color="#ff6b35"
        colon-color="#ff6b35"
        @end="handleCustomEnd"
      />
      <div class="demo-desc">自定义颜色和尺寸</div>
    </div>

    <!-- 文字分隔符 -->
    <div class="demo-section">
      <div class="section-title">文字分隔符</div>
      <YCountdown
        :time="textTime"
        :days="true"
        :is-colon="false"
        background-color="#f0f0f0"
        border-color="#ddd"
        @end="handleTextEnd"
      />
      <div class="demo-desc">使用文字作为分隔符</div>
    </div>

    <!-- 缩放效果 -->
    <div class="demo-section">
      <div class="section-title">缩放效果</div>
      <YCountdown
        :time="scaleTime"
        :scale="true"
        :width="50"
        :height="50"
        :size="24"
        background-color="#07c160"
        color="#fff"
        border-color="#07c160"
        colon-color="#07c160"
        @end="handleScaleEnd"
      />
      <div class="demo-desc">数字缩放至0.9倍</div>
    </div>

    <!-- 毫秒显示 -->
    <div class="demo-section">
      <div class="section-title">毫秒显示</div>
      <YCountdown
        :time="msTime"
        :is-ms="true"
        :ms-width="40"
        :ms-size="20"
        ms-color="#333"
        background-color="#fff3cd"
        border-color="#ffeaa7"
        @end="handleMsEnd"
      />
      <div class="demo-desc">显示毫秒动画效果</div>
    </div>

    <!-- 只显示秒数 -->
    <div class="demo-section">
      <div class="section-title">只显示秒数</div>
      <YCountdown
        :time="secondTime"
        :hours="false"
        :minutes="false"
        :unit-en="true"
        :width="60"
        :height="40"
        :size="20"
        background-color="#6c5ce7"
        color="#fff"
        border-color="#6c5ce7"
        @end="handleSecondEnd"
      />
      <div class="demo-desc">只显示秒数，使用英文单位</div>
    </div>

    <!-- 透明边框 -->
    <div class="demo-section">
      <div class="section-title">透明边框</div>
      <YCountdown
        :time="transparentTime"
        border-color="transparent"
        background-color="#fd79a8"
        color="#fff"
        colon-color="#fd79a8"
        @end="handleTransparentEnd"
      />
      <div class="demo-desc">无边框样式</div>
    </div>

    <!-- 控制按钮 -->
    <div class="demo-section">
      <div class="section-title">手动控制</div>
      <YCountdown
        ref="countdownRef"
        :time="controlTime"
        :return-time="true"
        @end="handleControlEnd"
        @time="handleTimeChange"
      />
      <div class="control-buttons">
        <YButton type="primary" @click="resetCountdown">重置倒计时</YButton>
        <YButton type="gray" @click="stopCountdown">停止倒计时</YButton>
      </div>
      <div class="demo-desc">
        剩余时间：{{ remainingTime }}秒
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { YCountdown, YButton } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 各种倒计时时间
const basicTime = ref(60)
const dayTime = ref(2 * 24 * 60 * 60) // 2天
const customTime = ref(300) // 5分钟
const textTime = ref(3661) // 1小时1分1秒
const scaleTime = ref(180) // 3分钟
const msTime = ref(30) // 30秒
const secondTime = ref(120) // 120秒
const transparentTime = ref(90) // 90秒
const controlTime = ref(600) // 10分钟

// 手动控制相关
const countdownRef = ref()
const remainingTime = ref(600)

// 事件处理
const handleBasicEnd = () => {
  console.log('基础倒计时结束')
}

const handleDayEnd = () => {
  console.log('天数倒计时结束')
}

const handleCustomEnd = () => {
  console.log('自定义样式倒计时结束')
}

const handleTextEnd = () => {
  console.log('文字分隔符倒计时结束')
}

const handleScaleEnd = () => {
  console.log('缩放效果倒计时结束')
}

const handleMsEnd = () => {
  console.log('毫秒显示倒计时结束')
}

const handleSecondEnd = () => {
  console.log('秒数倒计时结束')
}

const handleTransparentEnd = () => {
  console.log('透明边框倒计时结束')
}

const handleControlEnd = () => {
  console.log('手动控制倒计时结束')
  remainingTime.value = 0
}

const handleTimeChange = ({ seconds }: { seconds: number }) => {
  remainingTime.value = seconds
}

// 控制方法
const resetCountdown = () => {
  if (countdownRef.value) {
    countdownRef.value.reset(600)
    remainingTime.value = 600
  }
}

const stopCountdown = () => {
  if (countdownRef.value) {
    countdownRef.value.clearTimer()
  }
}

onMounted(() => {
  // 组件挂载后的初始化操作
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/common.scss';

.demo-desc {
  margin-top: $spacing-base;
  padding: $spacing-base;
  background-color: #f8f9fa;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  text-align: center;
}

.control-buttons {
  display: flex;
  gap: $spacing-base;
  margin-top: $spacing-base;
  justify-content: center;
  
  :deep(.y-button) {
    flex: 1;
    max-width: 120px;
  }
}

// 自定义倒计时组件样式
:deep(.y-countdown-box) {
  justify-content: center;
  margin: $spacing-base 0;
}
</style>