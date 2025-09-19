<template>
  <div class="demo-page-container">
    <div class="page-header">
      <div class="back-button" @click="goBack">
        <span class="back-icon">←</span>
      </div>
      <span class="page-title">YSwipeAction 左滑菜单组件</span>
    </div>

    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="swipe-group">
        <YSwipeAction :actions="basicActions" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">基础左滑菜单</span>
              <span class="item-desc">向左滑动查看操作按钮</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">多个操作按钮</div>
      <div class="swipe-group">
        <YSwipeAction :actions="multipleActions" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">多操作按钮</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">自定义按钮宽度</div>
      <div class="swipe-group">
        <YSwipeAction :actions="customWidthActions" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">自定义按钮宽度</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">带图标按钮</div>
      <div class="swipe-group">
        <YSwipeAction :actions="iconActions" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">带图标按钮</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">不自动关闭</div>
      <div class="swipe-group">
        <YSwipeAction :actions="basicActions" :closable="false" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">点击后不关闭</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">禁用滑动</div>
      <div class="swipe-group">
        <YSwipeAction :actions="basicActions" :forbid="true" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">禁用滑动</span>
            </div>
          </template>
        </YSwipeAction>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">手动控制开关</div>
      <div class="swipe-group">
        <YSwipeAction :actions="basicActions" :open="isOpen" @click="handleActionClick">
          <template #content>
            <div class="demo-item">
              <span class="item-title">手动控制开关</span>
            </div>
          </template>
        </YSwipeAction>
        <div class="control-buttons">
          <div class="control-btn" @click="toggleOpen">{{ isOpen ? '关闭' : '打开' }}菜单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YSwipeAction } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 手动控制开关状态
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

// 基础操作按钮
const basicActions = ref([
  {
    name: '删除',
    background: '#ff4757',
    color: '#fff',
    width: 80,
    fontsize: 16,
  },
])

// 多个操作按钮
const multipleActions = ref([
  {
    name: '标记',
    background: '#3742fa',
    color: '#fff',
    width: 70,
    fontsize: 16,
  },
  {
    name: '编辑',
    background: '#2ed573',
    color: '#fff',
    width: 70,
    fontsize: 16,
  },
  {
    name: '删除',
    background: '#ff4757',
    color: '#fff',
    width: 70,
    fontsize: 16,
  },
])

// 自定义按钮宽度
const customWidthActions = ref([
  {
    name: '收藏',
    background: '#ffa502',
    color: '#fff',
    width: 100,
  },
  {
    name: '删除',
    background: '#ff4757',
    color: '#fff',
    width: 60,
  },
])

// 带图标的按钮（使用icon字段）
const iconActions = ref([
  {
    name: '收藏',
    icon: '/cat.png', // 实际项目中应使用真实图标路径
    background: '#ffa502',
    color: '#fff',
    width: 100,
    fontsize: 18,
  },
  {
    name: '分享',
    icon: '/1.jpg', // 实际项目中应使用真实图标路径
    background: '#3742fa',
    color: '#fff',
    width: 100,
    fontsize: 18,
  },
  {
    name: '删除',
    background: '#ff4757',
    color: '#fff',
    width: 80,
    fontsize: 18,
  },
])

// 处理操作按钮点击
const handleActionClick = (action: any, index: number) => {
  console.log('操作按钮点击:', action, index)
  // Web 环境下的处理逻辑
  console.log(`点击了: ${action.name}`)
  // 可以替换为自定义的 toast 组件
  if (typeof window !== 'undefined') {
    uni.showToast({
      title: `点击了: ${action.name}`,
      icon: 'none',
    })
  } else {
    alert(`点击了: ${action.name}`)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.swipe-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.demo-item {
  display: flex;
  flex-direction: column;
  padding: $spacing-xs $spacing-base;
  background-color: #f8f8f8;
  border-radius: $border-radius-base;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  min-height: 80rpx;
  justify-content: center;
  pointer-events: none;
  user-select: none;
}

.item-title {
  font-size: $font-size-base;
  font-weight: 400;
  color: #333;
  margin-bottom: $spacing-xs;
}

.item-desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  line-height: 1.4;
}

.control-buttons {
  display: flex;
  justify-content: center;
  margin-top: $spacing-base;
}

.control-btn {
  padding: $spacing-sm $spacing-lg;
  background-color: $color-primary;
  color: $color-white;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($color-primary, 10%);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
