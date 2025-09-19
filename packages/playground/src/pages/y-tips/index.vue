<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="back-button" @click="goBack">← 返回</div>
      <div class="page-title">YTips 消息提示</div>
    </div>

    <!-- 顶部提示 -->
    <div class="demo-section">
      <div class="section-title">顶部提示</div>
      <div class="button-group">
        <button class="demo-button" @click="showTopTips">显示顶部提示</button>
        <button class="demo-button" @click="showTopCustomTips">自定义顶部提示</button>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="demo-section">
      <div class="section-title">底部提示</div>
      <div class="button-group">
        <button class="demo-button" @click="showBottomTips">显示底部提示</button>
        <button class="demo-button" @click="showBottomLongTips">长文本底部提示</button>
      </div>
    </div>

    <!-- 居中提示 -->
    <div class="demo-section">
      <div class="section-title">居中提示</div>
      <div class="button-group">
        <button class="demo-button" @click="showCenterTips">显示居中提示</button>
        <button class="demo-button" @click="showCenterCustomTips">自定义居中提示</button>
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <div class="button-group">
        <button class="demo-button" @click="showSuccessTips">成功提示</button>
        <button class="demo-button" @click="showErrorTips">错误提示</button>
        <button class="demo-button" @click="showWarningTips">警告提示</button>
      </div>
    </div>

    <!-- 持续时间控制 -->
    <div class="demo-section">
      <div class="section-title">持续时间控制</div>
      <div class="button-group">
        <button class="demo-button" @click="showShortTips">短时间提示 (1s)</button>
        <button class="demo-button" @click="showLongTips">长时间提示 (5s)</button>
        <button class="demo-button" @click="showPersistentTips">手动关闭提示</button>
      </div>
    </div>

    <!-- YTips 组件实例 -->
    <YTips ref="topTipsRef" position="top" />
    <YTips ref="bottomTipsRef" position="bottom" />
    <YTips ref="centerTipsRef" position="center" />
    <YTips ref="successTipsRef" position="center" background-color="#28a745" />
    <YTips ref="errorTipsRef" position="center" background-color="#dc3545" />
    <YTips ref="warningTipsRef" position="center" background-color="#ffc107" color="#333" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { YTips } from '@you-ui/core'

// 组件引用
const topTipsRef = ref<InstanceType<typeof YTips>>()
const bottomTipsRef = ref<InstanceType<typeof YTips>>()
const centerTipsRef = ref<InstanceType<typeof YTips>>()
const successTipsRef = ref<InstanceType<typeof YTips>>()
const errorTipsRef = ref<InstanceType<typeof YTips>>()
const warningTipsRef = ref<InstanceType<typeof YTips>>()

// 顶部提示
const showTopTips = () => {
  topTipsRef.value?.showTips({
    msg: '这是一个顶部提示消息',
    duration: 2000
  })
}

const showTopCustomTips = () => {
  topTipsRef.value?.showTips({
    msg: '自定义顶部提示，支持较长的文本内容展示',
    duration: 3000
  })
}

// 底部提示
const showBottomTips = () => {
  bottomTipsRef.value?.showTips({
    msg: '这是一个底部提示消息',
    duration: 2000
  })
}

const showBottomLongTips = () => {
  bottomTipsRef.value?.showTips({
    msg: '这是一个很长的底部提示消息，用来测试文本换行和显示效果，看看是否能够正常显示',
    duration: 4000
  })
}

// 居中提示
const showCenterTips = () => {
  centerTipsRef.value?.showTips({
    msg: '这是一个居中提示消息',
    duration: 2000
  })
}

const showCenterCustomTips = () => {
  centerTipsRef.value?.showTips({
    msg: '居中提示支持多行文本显示',
    duration: 3000
  })
}

// 自定义样式提示
const showSuccessTips = () => {
  successTipsRef.value?.showTips({
    msg: '操作成功！',
    duration: 2000
  })
}

const showErrorTips = () => {
  errorTipsRef.value?.showTips({
    msg: '操作失败，请重试',
    duration: 2000
  })
}

const showWarningTips = () => {
  warningTipsRef.value?.showTips({
    msg: '请注意检查输入内容',
    duration: 2000
  })
}

// 持续时间控制
const showShortTips = () => {
  centerTipsRef.value?.showTips({
    msg: '短时间提示',
    duration: 1000
  })
}

const showLongTips = () => {
  centerTipsRef.value?.showTips({
    msg: '长时间提示，5秒后自动消失',
    duration: 5000
  })
}

const showPersistentTips = () => {
  centerTipsRef.value?.showTips({
    msg: '点击其他按钮可关闭此提示',
    duration: 10000
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.demo-button {
  padding: 24rpx 32rpx;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:active {
    background-color: #004085;
  }
}
</style>