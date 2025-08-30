<template>
  <view class="container">
    <view class="header">
      <text class="title">组件展示</text>
      <text class="subtitle">You-UniApp UI 组件库</text>
    </view>
    
    <view class="content">
      <view class="category" v-for="category in componentCategories" :key="category.name">
        <text class="category-title">{{ category.name }}</text>
        <view class="component-grid">
          <view 
            class="component-card" 
            v-for="component in category.components" 
            :key="component.name"
            @click="navigateToComponent(component)"
          >
            <view class="component-icon">{{ component.icon }}</view>
            <text class="component-name">{{ component.name }}</text>
            <text class="component-desc">{{ component.desc }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Component {
  name: string
  desc: string
  icon: string
  path?: string
}

interface Category {
  name: string
  components: Component[]
}

const componentCategories = ref<Category[]>([
  {
    name: '基础组件',
    components: [
      { name: 'Button', desc: '按钮组件', icon: '🔘' },
      { name: 'Icon', desc: '图标组件', icon: '⭐' },
      { name: 'Text', desc: '文本组件', icon: '📝' },
      { name: 'Image', desc: '图片组件', icon: '🖼️' }
    ]
  },
  {
    name: '表单组件',
    components: [
      { name: 'Input', desc: '输入框', icon: '📝' },
      { name: 'Textarea', desc: '多行输入', icon: '📄' },
      { name: 'Switch', desc: '开关', icon: '🔄' },
      { name: 'Checkbox', desc: '复选框', icon: '☑️' },
      { name: 'Radio', desc: '单选框', icon: '🔘' },
      { name: 'Picker', desc: '选择器', icon: '📋' }
    ]
  },
  {
    name: '布局组件',
    components: [
      { name: 'Layout', desc: '布局容器', icon: '📐' },
      { name: 'Grid', desc: '栅格系统', icon: '⚏' },
      { name: 'Card', desc: '卡片', icon: '🃏' },
      { name: 'Divider', desc: '分割线', icon: '➖' }
    ]
  },
  {
    name: '导航组件',
    components: [
      { name: 'Navbar', desc: '导航栏', icon: '🧭' },
      { name: 'Tabbar', desc: '标签栏', icon: '📑' },
      { name: 'Tabs', desc: '选项卡', icon: '📂' },
      { name: 'Breadcrumb', desc: '面包屑', icon: '🍞' }
    ]
  },
  {
    name: '反馈组件',
    components: [
      { name: 'Toast', desc: '轻提示', icon: '💬' },
      { name: 'Modal', desc: '模态框', icon: '🔲' },
      { name: 'Loading', desc: '加载中', icon: '⏳' },
      { name: 'Progress', desc: '进度条', icon: '📊' }
    ]
  },
  {
    name: '展示组件',
    components: [
      { name: 'Avatar', desc: '头像', icon: '👤' },
      { name: 'Badge', desc: '徽标', icon: '🏷️' },
      { name: 'Tag', desc: '标签', icon: '🏷️' },
      { name: 'Timeline', desc: '时间轴', icon: '⏰' }
    ]
  }
])

const navigateToComponent = (component: Component) => {
  uni.showToast({
    title: `${component.name} 组件演示`,
    icon: 'none'
  })
  // 这里可以导航到具体的组件演示页面
  // uni.navigateTo({
  //   url: `/pages/demo/${component.name.toLowerCase()}`
  // })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40rpx 0;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  color: white;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 26rpx;
  opacity: 0.8;
  display: block;
}

.content {
  padding: 0 20rpx;
}

.category {
  margin-bottom: 60rpx;
}

.category-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  display: block;
  padding-left: 20rpx;
  border-left: 6rpx solid #4facfe;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300rpx, 1fr));
  gap: 20rpx;
}

.component-card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  text-align: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  border: 2rpx solid transparent;
}

.component-card:active {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.12);
  border-color: #4facfe;
}

.component-icon {
  font-size: 60rpx;
  margin-bottom: 20rpx;
  display: block;
}

.component-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
}

.component-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}
</style>