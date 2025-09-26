<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YDrawer 抽屉</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="drawer-group">
        <button class="demo-btn demo-btn--primary" @click="showDrawer('right')">
          右侧抽屉
        </button>
        <button class="demo-btn demo-btn--primary" @click="showDrawer('left')">
          左侧抽屉
        </button>
        <button class="demo-btn demo-btn--primary" @click="showDrawer('top')">
          顶部抽屉
        </button>
        <button class="demo-btn demo-btn--primary" @click="showDrawer('bottom')">
          底部抽屉
        </button>
      </div>
    </div>

    <!-- 自定义尺寸 -->
    <div class="demo-section">
      <div class="section-title">自定义尺寸</div>
      <div class="drawer-group">
        <button class="demo-btn demo-btn--secondary" @click="showLargeDrawer">
          大尺寸抽屉
        </button>
        <button class="demo-btn demo-btn--secondary" @click="showSmallDrawer">
          小尺寸抽屉
        </button>
      </div>
    </div>

    <!-- 无头部抽屉 -->
    <div class="demo-section">
      <div class="section-title">无头部抽屉</div>
      <div class="drawer-group">
        <button class="demo-btn demo-btn--secondary" @click="showNoHeaderDrawer">
          无头部抽屉
        </button>
      </div>
    </div>

    <!-- 不可关闭抽屉 -->
    <div class="demo-section">
      <div class="section-title">不可关闭抽屉</div>
      <div class="drawer-group">
        <button class="demo-btn demo-btn--warning" @click="showNonClosableDrawer">
          点击遮罩不关闭
        </button>
      </div>
    </div>

    <!-- 抽屉组件 -->
    <YDrawer
      v-model:visible="drawerVisible"
      :title="drawerConfig.title"
      :placement="drawerConfig.placement"
      :width="drawerConfig.width"
      :height="drawerConfig.height"
      :mask-closable="drawerConfig.maskClosable"
      :show-header="drawerConfig.showHeader"
      @close="handleDrawerClose"
      @open="handleDrawerOpen"
    >
      <template #default>
        <div class="drawer-content">
          <h3>抽屉内容</h3>
          <p>这是一个 {{ drawerConfig.placement }} 方向的抽屉组件。</p>
          <p>您可以在这里放置任何内容，比如表单、列表、详情等。</p>
          
          <div class="content-demo">
            <h4>示例内容</h4>
            <div class="demo-list">
              <div class="demo-item" v-for="i in 10" :key="i">
                <div class="item-title">列表项 {{ i }}</div>
                <div class="item-desc">这是第 {{ i }} 个列表项的描述信息</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer>
        <div class="drawer-footer">
          <button class="demo-btn demo-btn--secondary" @click="drawerVisible = false">
            取消
          </button>
          <button class="demo-btn demo-btn--primary" @click="handleConfirm">
            确定
          </button>
        </div>
      </template>
    </YDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { YDrawer } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 抽屉显示状态
const drawerVisible = ref(false)

// 抽屉配置
const drawerConfig = reactive({
  title: '抽屉标题',
  placement: 'right' as 'left' | 'right' | 'top' | 'bottom',
  width: '300px',
  height: '300px',
  maskClosable: true,
  showHeader: true
})

// 显示基础抽屉
const showDrawer = (placement: 'left' | 'right' | 'top' | 'bottom') => {
  // 如果当前抽屉已打开且方向不同，先关闭再打开
  if (drawerVisible.value && drawerConfig.placement !== placement) {
    drawerVisible.value = false
    setTimeout(() => {
      openDrawerWithConfig(placement, '300px', '300px', `${placement === 'left' ? '左侧' : placement === 'right' ? '右侧' : placement === 'top' ? '顶部' : '底部'}抽屉`)
    }, 350) // 等待关闭动画完成
  } else if (drawerVisible.value && drawerConfig.placement === placement) {
    // 如果是相同方向，直接关闭
    drawerVisible.value = false
  } else {
    // 如果没有打开，直接打开
    openDrawerWithConfig(placement, '300px', '300px', `${placement === 'left' ? '左侧' : placement === 'right' ? '右侧' : placement === 'top' ? '顶部' : '底部'}抽屉`)
  }
}

// 统一的抽屉打开方法
const openDrawerWithConfig = (placement: 'left' | 'right' | 'top' | 'bottom', width: string, height: string, title: string, maskClosable = true, showHeader = true) => {
  // 先更新配置，再显示抽屉，确保 DOM 有正确的类
  drawerConfig.title = title
  drawerConfig.placement = placement
  drawerConfig.width = width
  drawerConfig.height = height
  drawerConfig.maskClosable = maskClosable
  drawerConfig.showHeader = showHeader
  
  // 使用 nextTick 确保 DOM 更新后再显示
  nextTick(() => {
    drawerVisible.value = true
  })
}

// 显示大尺寸抽屉
const showLargeDrawer = () => {
  if (drawerVisible.value && drawerConfig.placement !== 'right') {
    drawerVisible.value = false
    setTimeout(() => {
      openDrawerWithConfig('right', '90%', '90%', '大尺寸抽屉')
    }, 350)
  } else if (drawerVisible.value) {
    drawerVisible.value = false
  } else {
    openDrawerWithConfig('right', '90%', '90%', '大尺寸抽屉')
  }
}

// 显示小尺寸抽屉
const showSmallDrawer = () => {
  if (drawerVisible.value && drawerConfig.placement !== 'right') {
    drawerVisible.value = false
    setTimeout(() => {
      openDrawerWithConfig('right', '200px', '200px', '小尺寸抽屉')
    }, 350)
  } else if (drawerVisible.value) {
    drawerVisible.value = false
  } else {
    openDrawerWithConfig('right', '200px', '200px', '小尺寸抽屉')
  }
}

// 显示无头部抽屉
const showNoHeaderDrawer = () => {
  if (drawerVisible.value && drawerConfig.placement !== 'right') {
    drawerVisible.value = false
    setTimeout(() => {
      openDrawerWithConfig('right', '300px', '300px', '', true, false)
    }, 350)
  } else if (drawerVisible.value) {
    drawerVisible.value = false
  } else {
    openDrawerWithConfig('right', '300px', '300px', '', true, false)
  }
}

// 显示不可关闭抽屉
const showNonClosableDrawer = () => {
  if (drawerVisible.value && drawerConfig.placement !== 'right') {
    drawerVisible.value = false
    setTimeout(() => {
      openDrawerWithConfig('right', '300px', '300px', '不可关闭抽屉', false)
    }, 350)
  } else if (drawerVisible.value) {
    drawerVisible.value = false
  } else {
    openDrawerWithConfig('right', '300px', '300px', '不可关闭抽屉', false)
  }
}

// 处理抽屉关闭
const handleDrawerClose = () => {
  // 抽屉关闭回调
}

// 处理抽屉打开
const handleDrawerOpen = () => {
  // 抽屉打开回调
}

// 处理确定按钮
const handleConfirm = () => {
  drawerVisible.value = false
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.drawer-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-base;
  align-items: center;
}

.demo-btn {
  padding: $spacing-sm $spacing-base;
  border: none;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200rpx;
  
  &--primary {
    background-color: $color-primary;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &--secondary {
    background-color: #f4f4f5;
    color: #606266;
    border: 1px solid #dcdfe6;
    
    &:hover {
      background-color: #ecf5ff;
      border-color: $color-primary;
      color: $color-primary;
    }
  }
  
  &--warning {
    background-color: #faad14;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

// 抽屉内容样式
.drawer-content {
  h3 {
    margin: 0 0 32rpx 0;
    color: $text-color;
    font-size: $font-size-lg;
  }
  
  p {
    margin: 0 0 24rpx 0;
    color: $color-text-secondary;
    line-height: 1.5;
  }
}

.content-demo {
  margin-top: 48rpx;
  
  h4 {
    margin: 0 0 24rpx 0;
    color: $text-color;
    font-size: $font-size-base;
  }
}

.demo-list {
  max-height: 600rpx;
  overflow-y: auto;
}

.demo-item {
  padding: 24rpx 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.item-title {
  font-size: $font-size-base;
  color: $text-color;
  margin-bottom: 8rpx;
}

.item-desc {
  font-size: $font-size-sm;
  color: $color-text-tertiary;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 4px;
  
  .demo-btn {
    flex: 1;
    min-width: 0;
    max-width: none;
    padding: 8px 12px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    // 确保按钮不会超出容器
    &:first-child {
      margin-right: 4px;
    }
    
    &:last-child {
      margin-left: 4px;
    }
  }
}

// 针对小尺寸抽屉的特殊处理
:deep(.y-drawer-container) {
  .drawer-footer {
    .demo-btn {
      padding: 6px 8px;
      font-size: 12px;
      
      // 当抽屉宽度很小时，使用更紧凑的布局
      &:first-child {
        margin-right: 2px;
      }
      
      &:last-child {
        margin-left: 2px;
      }
    }
  }
}
</style>