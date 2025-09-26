<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YCell 单元格</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="y-component-display-group">
        <YCell>基础单元格</YCell>
        <YCell>
          带描述的单元格
          <template #description>这是一个描述信息</template>
        </YCell>
      </div>
    </div>

    <!-- 带图标 -->
    <div class="demo-section">
      <div class="section-title">带图标</div>
      <div class="y-component-display-group">
        <YCell>
          <template #icon>
            <view class="demo-icon" style="background-color: #ff6b6b">💰</view>
          </template>
          我的钱包
        </YCell>
        <YCell>
          <template #icon>
            <view class="demo-icon" style="background-color: #4ecdc4">⭐</view>
          </template>
          服务窗
        </YCell>
        <YCell>
          <template #icon>
            <view class="demo-icon" style="background-color: #45b7d1">🔍</view>
          </template>
          发现
          <template #extra>探索发现</template>
        </YCell>
      </div>
    </div>

    <!-- 带箭头和点击效果 -->
    <div class="demo-section">
      <div class="section-title">带箭头和点击效果</div>
      <div class="y-component-display-group">
        <YCell arrow hover @click="handleCellClick">
          <template #icon>
            <view class="demo-icon" style="background-color: #ff9f43">🛍️</view>
          </template>
          我的店铺
          <template #extra>进入店铺</template>
        </YCell>
        <YCell arrow hover @click="handleCellClick">
          关于
          <template #extra>Thor UI</template>
        </YCell>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="demo-section">
      <div class="section-title">消息列表</div>
      <div class="y-component-display-group">
        <YCell>
          <template #icon>
            <view class="demo-avatar">
              <img src="https://via.placeholder.com/40x40/ff6b6b/ffffff?text=呼" alt="头像" />
            </view>
          </template>
          呼噜猪
          <template #description>上线打游戏了！</template>
          <template #extra>
            <view class="demo-time">10:22</view>
            <view class="demo-badge">9</view>
          </template>
        </YCell>
        <YCell>
          <template #icon>
            <view class="demo-avatar">
              <img src="https://via.placeholder.com/40x40/4ecdc4/ffffff?text=腾" alt="头像" />
            </view>
          </template>
          腾讯金融VIP交流3群
          <template #description>[分享]我很看好的这款金融产品，推荐给...</template>
          <template #extra>
            <view class="demo-time">09:08</view>
            <view class="demo-badge secondary">2</view>
          </template>
        </YCell>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <div class="section-title">禁用状态</div>
      <div class="y-component-display-group">
        <YCell arrow disabled>
          <template #icon>
            <view class="demo-icon" style="background-color: #ddd">🔒</view>
          </template>
          禁用的单元格
          <template #description>此功能暂不可用</template>
        </YCell>
      </div>
    </div>

    <!-- 隐藏分割线 -->
    <div class="demo-section">
      <div class="section-title">隐藏分割线</div>
      <div class="y-component-display-group">
        <YCell :unlined="true" arrow @click="handleCellClick">无分割线单元格</YCell>
        <YCell :unlined="true" arrow @click="handleCellClick">另一个无分割线</YCell>
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <div class="y-component-display-group">
        <YCell arrow backgroundColor="#f0f8ff" line-color="#4ecdc4" :line-left="0" @click="handleCellClick">
          <template #icon>
            <view class="demo-icon" style="background-color: #4ecdc4">🎨</view>
          </template>
          自定义背景和分割线
          <template #description>蓝色主题样式</template>
        </YCell>
        <YCell arrow backgroundColor="#fff5f5" line-color="#ff6b6b" :line-left="0" @click="handleCellClick">
          <template #icon>
            <view class="demo-icon" style="background-color: #ff6b6b">❤️</view>
          </template>
          红色主题样式
          <template #description>温暖的红色调</template>
        </YCell>
      </div>
    </div>

    <!-- 点击事件演示 -->
    <div class="demo-section">
      <div class="section-title">点击事件演示</div>
      <div class="y-component-display-group">
        <YCell :arrow="true" :index="1" @click="handleIndexClick"> 点击查看索引 (index: 1) </YCell>
        <YCell :arrow="true" :index="2" @click="handleIndexClick"> 点击查看索引 (index: 2) </YCell>
      </div>
    </div>

    <!-- 点击反馈信息 -->
    <div v-if="clickMessage" class="demo-section">
      <div class="section-title">点击反馈</div>
      <div class="y-component-display-group">
        <view class="click-message">{{ clickMessage }}</view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YCell } from '@you-web/ui-core'
import type { YCellClickEvent } from '@you-web/ui-core'

const router = useRouter()
const clickMessage = ref('')

const goBack = () => {
  router.push('/')
}

const handleCellClick = (event: YCellClickEvent) => {
  clickMessage.value = `单元格被点击了！索引: ${event.index}`
  setTimeout(() => {
    clickMessage.value = ''
  }, 2000)
}

const handleIndexClick = (event: YCellClickEvent) => {
  clickMessage.value = `点击了索引为 ${event.index} 的单元格`
  setTimeout(() => {
    clickMessage.value = ''
  }, 3000)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.demo-page-container {
  padding: $spacing-xl; // 40rpx
  background-color: #f5f5f5;
  min-height: 100vh;
}

.y-component-display-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.click-message {
  padding: 24rpx;
  background-color: #e8f5e8;
  color: #2d8659;
  border-radius: 12rpx;
  text-align: center;
  font-size: 28rpx;
  border: 2rpx solid #a8d8a8;
}

// 演示样式
.demo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  font-size: 24rpx;
  color: white;
  font-weight: 500;
}

.demo-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.demo-time {
  font-size: 24rpx;
  color: #999;
  margin-right: 12rpx;
}

.demo-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  background-color: #ff4757;
  color: white;
  font-size: 20rpx;
  font-weight: 500;
  border-radius: 16rpx;

  &.secondary {
    background-color: #ddd;
    color: #666;
  }
}
</style>
