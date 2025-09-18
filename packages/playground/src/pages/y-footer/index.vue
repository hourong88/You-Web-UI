<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YFooter 页脚组件</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="demo-container">
        <YFooter 
          :navigate="basicLinks"
          copyright="© 2024 You-UniApp. All Rights Reserved."
        />
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <div class="demo-container">
        <YFooter 
          :navigate="basicLinks"
          copyright="© 2024 自定义样式示例"
          color="#666666"
          :size="26"
          backgroundColor="#f8f9fa"
          linkColor="#007bff"
        />
      </div>
    </div>

    <!-- 不固定底部 -->
    <div class="demo-section">
      <div class="section-title">不固定底部</div>
      <div class="demo-container">
        <YFooter 
          :navigate="basicLinks"
          copyright="© 2024 非固定页脚"
          :fixed="false"
        />
      </div>
    </div>

    <!-- 仅版权信息 -->
    <div class="demo-section">
      <div class="section-title">仅版权信息</div>
      <div class="demo-container">
        <YFooter 
          copyright="© 2024 仅显示版权信息"
          :fixed="false"
        />
      </div>
    </div>

    <!-- 多链接示例 -->
    <div class="demo-section">
      <div class="section-title">多链接示例</div>
      <div class="demo-container">
        <YFooter 
          :navigate="moreLinks"
          copyright="© 2024 多链接页脚示例"
          :fixed="false"
          @linkClick="handleLinkClick"
        />
      </div>
    </div>

    <!-- 占位空间，避免被固定页脚遮挡 -->
    <div style="height: 200rpx;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { YFooter } from '@you-ui/core'

// 基础链接数据
const basicLinks = ref([
  {
    text: '首页',
    url: '/pages/index/index',
    type: 'switchTab'
  },
  {
    text: '关于我们',
    url: '/pages/about/index',
    type: 'navigate'
  },
  {
    text: '联系我们',
    url: '/pages/contact/index',
    type: 'navigate'
  }
])

// 更多链接数据
const moreLinks = ref([
  {
    text: '首页',
    url: '/pages/index/index',
    type: 'switchTab'
  },
  {
    text: '产品',
    url: '/pages/product/index',
    type: 'navigate'
  },
  {
    text: '服务',
    url: '/pages/service/index',
    type: 'navigate'
  },
  {
    text: '关于',
    url: '/pages/about/index',
    type: 'navigate'
  },
  {
    text: '联系',
    url: '/pages/contact/index',
    type: 'navigate'
  }
])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 处理链接点击事件
const handleLinkClick = (payload: any) => {
  console.log('链接点击:', payload)
  uni.showToast({
    title: `点击了: ${payload.item.text}`,
    icon: 'none'
  })
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.demo-container {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  
  .y-footer {
    position: relative !important; // 演示页面中取消固定定位
  }
}
</style>