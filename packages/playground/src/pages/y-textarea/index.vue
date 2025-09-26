<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YTextarea 文本域组件</text>
    </view>
    <div class="header">
      <h1 class="title">Textarea 文本域</h1>
      <p class="subtitle">用于接收用户输入的多行文本内容</p>
    </div>

    <div class="content">
      <!-- 基础用法 -->
      <div class="demo-section">
        <div class="section-title">基础用法</div>
        <div class="demo-item">
          <YTextarea placeholder="请输入内容" v-model="basicValue" />
        </div>
      </div>

      <!-- 带标题和必填标识 -->
      <div class="demo-section">
        <div class="section-title">带标题和必填标识</div>
        <div class="demo-item">
          <YTextarea 
            label="个人简介" 
            placeholder="请输入个人简介" 
            v-model="introValue" 
          />
          <YTextarea 
            label="详细描述" 
            placeholder="请输入详细描述" 
            :required="true" 
            v-model="descValue" 
          />
        </div>
      </div>

      <!-- 插槽功能 -->
      <div class="demo-section">
        <div class="section-title">插槽功能</div>
        <div class="demo-item">
          <YTextarea 
            label="带左侧图标" 
            placeholder="请输入内容" 
            v-model="slotValue1"
          >
            <template #left>
              <div class="slot-icon">📝</div>
            </template>
          </YTextarea>
          <YTextarea 
            label="带右侧按钮" 
            placeholder="请输入内容" 
            v-model="slotValue2"
          >
            <template #right>
              <button class="slot-button">发送</button>
            </template>
          </YTextarea>
        </div>
      </div>

      <!-- 高度和自动高度 -->
      <div class="demo-section">
        <div class="section-title">高度设置</div>
        <div class="demo-item">
          <YTextarea 
            label="固定高度" 
            placeholder="固定高度 120rpx" 
            height="120rpx" 
            v-model="fixedHeightValue" 
          />
          <YTextarea 
            label="自动高度" 
            placeholder="自动调整高度" 
            :autoHeight="true"
            minHeight="80rpx"
            v-model="autoHeightValue" 
          />
        </div>
      </div>

      <!-- 字符计数 -->
      <div class="demo-section">
        <div class="section-title">字符计数</div>
        <div class="demo-item">
          <YTextarea 
            label="评论内容" 
            placeholder="请输入评论内容" 
            :maxlength="200" 
            :isCounter="true"
            v-model="commentValue" 
          />
        </div>
      </div>

      <!-- 边框和圆角 -->
      <div class="demo-section">
        <div class="section-title">边框和圆角</div>
        <div class="demo-item">
          <YTextarea 
            label="带边框" 
            placeholder="带边框的文本域" 
            :textareaBorder="true" 
            borderColor="#007aff"
            radius="12rpx"
            v-model="borderValue" 
          />
          <YTextarea 
            label="仅底部边框" 
            placeholder="仅底部边框" 
            :borderBottom="true"
            :borderTop="false"
            borderColor="#52c41a"
            v-model="bottomBorderValue" 
          />
        </div>
      </div>

      <!-- 不同颜色主题 -->
      <div class="demo-section">
        <div class="section-title">颜色主题</div>
        <div class="demo-item">
          <YTextarea 
            label="成功主题" 
            placeholder="成功状态的文本域" 
            :textareaBorder="true" 
            borderColor="#52c41a"
            color="#52c41a"
            labelColor="#52c41a"
            v-model="successValue" 
          />
          <YTextarea 
            label="警告主题" 
            placeholder="警告状态的文本域" 
            :textareaBorder="true" 
            borderColor="#faad14"
            color="#faad14"
            labelColor="#faad14"
            v-model="warningValue" 
          />
          <YTextarea 
            label="错误主题" 
            placeholder="错误状态的文本域" 
            :textareaBorder="true" 
            borderColor="#ff4d4f"
            color="#ff4d4f"
            labelColor="#ff4d4f"
            :required="true"
            requiredColor="#ff4d4f"
            v-model="errorValue" 
          />
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="demo-section">
        <div class="section-title">禁用状态</div>
        <div class="demo-item">
          <YTextarea 
            label="系统信息" 
            placeholder="系统自动生成的信息" 
            :disabled="true" 
            v-model="disabledValue" 
          />
        </div>
      </div>

      <!-- 自定义样式 -->
      <div class="demo-section">
        <div class="section-title">自定义样式</div>
        <div class="demo-item">
          <YTextarea 
            label="自定义样式" 
            placeholder="自定义背景和内边距" 
            backgroundColor="#f8f9fa"
            padding="40rpx"
            :textareaBorder="true"
            borderColor="#dee2e6"
            radius="16rpx"
            labelSize="36"
            size="30"
            v-model="customValue" 
          />
        </div>
      </div>

      <!-- 右对齐和顶部对齐 -->
      <div class="demo-section">
        <div class="section-title">对齐方式</div>
        <div class="demo-item">
          <YTextarea 
            label="右对齐文本" 
            placeholder="文本右对齐显示" 
            :textRight="true"
            v-model="rightAlignValue" 
          />
          <YTextarea 
            label="顶部对齐标题" 
            placeholder="标题与输入框顶部对齐" 
            :flexStart="true"
            height="120rpx"
            v-model="topAlignValue" 
          />
        </div>
      </div>

      <!-- 聚焦状态 -->
      <div class="demo-section">
        <div class="section-title">聚焦状态</div>
        <div class="demo-item">
          <YTextarea 
            label="自动聚焦" 
            placeholder="页面加载时自动聚焦" 
            :focus="true" 
            v-model="autoFocusValue" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YTextarea } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 响应式数据
const basicValue = ref('')
const introValue = ref('')
const descValue = ref('')
const slotValue1 = ref('')
const slotValue2 = ref('')
const fixedHeightValue = ref('')
const autoHeightValue = ref('')
const commentValue = ref('')
const borderValue = ref('')
const bottomBorderValue = ref('')
const successValue = ref('')
const warningValue = ref('')
const errorValue = ref('')
const disabledValue = ref('这是系统自动生成的信息，无法编辑')
const customValue = ref('')
const rightAlignValue = ref('')
const topAlignValue = ref('')
const autoFocusValue = ref('')
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.demo-page-container {
  max-width: 1600rpx;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 40rpx 0;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

  .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
    margin: 0;
  }
}

.slot-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  background-color: #f0f0f0;
  border-radius: 8rpx;
}

.slot-button {
  padding: 16rpx 32rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056cc;
  }
  
  &:active {
    background-color: #004499;
  }
}
</style>