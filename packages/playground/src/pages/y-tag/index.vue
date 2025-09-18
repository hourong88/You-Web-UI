<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YTag 标签组件</text>
    </view>

    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="tag-group">
        <YTag>默认标签</YTag>
        <YTag type="primary">主要标签</YTag>
        <YTag type="danger">危险标签</YTag>
        <YTag type="warning">警告标签</YTag>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">样式类型</div>
      <div class="tag-group">
        <YTag type="white">白色</YTag>
        <YTag type="pink">粉色</YTag>
        <YTag type="green">绿色</YTag>
        <YTag type="gray">灰色</YTag>
        <YTag type="black">黑色</YTag>
      </div>
      <div class="tag-group">
        <YTag type="light-danger">浅红</YTag>
        <YTag type="light-blue">浅蓝</YTag>
        <YTag type="light-brownish">浅棕</YTag>
        <YTag type="light-orange">浅橙</YTag>
        <YTag type="light-green">浅绿</YTag>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">空心样式</div>
      <div class="tag-group">
        <YTag type="primary" :plain="true">空心主要</YTag>
        <YTag type="danger" :plain="true">空心危险</YTag>
        <YTag type="warning" :plain="true">空心警告</YTag>
        <YTag type="green" :plain="true">空心绿色</YTag>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">不同形状</div>
      <div class="tag-group">
        <YTag shape="square">方形</YTag>
        <YTag shape="circle">圆形</YTag>
        <YTag shape="circleLeft">左圆角</YTag>
        <YTag shape="circleRight">右圆角</YTag>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">点击效果</div>
      <div class="tag-group">
        <YTag :hover="true" @click="handleClick">点击我</YTag>
        <YTag :hover="true" :scaleMultiple="0.9" @click="handleClick">缩放效果</YTag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { YTag } from '@you-ui/core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const handleClick = () => {
  uni.showToast({
    title: '标签被点击了',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-base; // 24rpx
  align-items: center;
  margin-bottom: $spacing-base; // 24rpx

  &:last-child {
    margin-bottom: 0;
  }

  .y-tag {
    margin: 0;
    padding: 5px; // 为演示效果添加默认内边距
  }
}




</style>