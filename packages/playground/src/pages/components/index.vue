<template>
  <div class="container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">组件展示</text>
    </view>
    <div class="header">
      <h1 class="title">组件展示</h1>
      <p class="subtitle">You-UniApp UI 组件库</p>
    </div>

    <div class="content">
      <div class="category" v-for="category in componentCategories" :key="category.name">
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="component-grid">
          <div class="component-card" v-for="component in category.components" :key="component.name"
            @click="navigateToComponent(component)">
            <div class="component-icon">{{ component.icon }}</div>
            <h3 class="component-name">{{ component.name }}</h3>
            <p class="component-desc">{{ component.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const goBack = () => {
  router.push('/')
}

const router = useRouter()

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
      { name: 'Button', desc: '按钮组件', icon: '🔘', path: '/button' },
      { name: 'Icon', desc: '图标组件', icon: '⭐' },
      { name: 'Text', desc: '文本组件', icon: '📝' },
      { name: 'Image', desc: '图片组件', icon: '🖼️' },
      { name: 'YList', desc: '移动端列表组件', icon: '📝', path: '/you-list' },
    ],
  },
  {
    name: '表单组件',
    components: [
      { name: 'Input', desc: '输入框', icon: '📝', path: '/input' },
      { name: 'Textarea', desc: '多行输入', icon: '📄' },
      { name: 'Switch', desc: '开关', icon: '🔄' },
      { name: 'Checkbox', desc: '复选框', icon: '☑️' },
      { name: 'Radio', desc: '单选框', icon: '🔘' },
      { name: 'Picker', desc: '选择器', icon: '📋' },
    ],
  },
  {
    name: '布局组件',
    components: [
      { name: 'Layout', desc: '布局容器', icon: '📐' },
      { name: 'Grid', desc: '栅格系统', icon: '⚏' },
      { name: 'Card', desc: '卡片', icon: '🃏' },
      { name: 'YCard', desc: 'YCard 卡片组件', icon: '🎴', path: '/pages/you-card/index' },
      { name: 'YCard预览', desc: 'YCard 组件预览', icon: '👁️', path: '/pages/y-card-preview/index' },
      { name: 'Divider', desc: '分割线', icon: '➖' },
    ],
  },
  {
    name: '导航组件',
    components: [
      { name: 'Navbar', desc: '导航栏', icon: '🧭' },
      { name: 'Tabbar', desc: '标签栏', icon: '📑' },
      { name: 'Tabs', desc: '选项卡', icon: '📂' },
      { name: 'Breadcrumb', desc: '面包屑', icon: '🍞' },
      { name: 'YSwipeAction', desc: '左滑菜单', icon: '👈', path: '/pages/y-swipe-action/index' },
    ],
  },
  {
    name: '反馈组件',
    components: [
      { name: 'Toast', desc: '轻提示', icon: '💬' },
      { name: 'Modal', desc: '模态框', icon: '🔲' },
      { name: 'Loading', desc: '加载中', icon: '⏳', path: '/you-loading' },
      { name: 'Progress', desc: '进度条', icon: '📊' },
    ],
  },
  {
    name: '展示组件',
    components: [
      { name: 'Avatar', desc: '头像', icon: '👤' },
      { name: 'Badge', desc: '徽标', icon: '🏷️' },
      { name: 'Tag', desc: '标签', icon: '🏷️' },
      { name: 'Timeline', desc: '时间轴', icon: '⏰' },
    ],
  },

  {
    name: '工具函数',
    components: [{ name: 'Utils', desc: 'rpx转换函数', icon: '🔧', path: '/utils' }],
  },
])

const navigateToComponent = (component: Component) => {
  if (component.path) {
    router.push(component.path)
  } else {
    alert(`${component.name} 组件演示页面开发中`)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';
.container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 20px;
  margin-bottom: 40px;
  color: white;
}

.title {
  font-size: 44px;
  font-weight: bold;
  display: block;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 26px;
  opacity: 0.8;
  display: block;
}

.content {
  padding: 0 20px;
}

.category {
  margin-bottom: 60px;
}

.category-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  display: block;
  padding-left: 20px;
  border-left: 6px solid #4facfe;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.component-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  border: 2px solid transparent;
  cursor: pointer;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: #4facfe;
}

.component-icon {
  font-size: 60px;
  margin-bottom: 20px;
  display: block;
}

.component-name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 12px;
}

.component-desc {
  font-size: 24px;
  color: #666;
  display: block;
}
</style>
