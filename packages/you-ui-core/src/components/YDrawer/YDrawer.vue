<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="y-drawer-mask"
      @click="handleMaskClick"
    >
      <div
        class="y-drawer-container"
        :class="[
          `y-drawer-container--${placement}`,
          `y-drawer-container--${size}`
        ]"
        :style="drawerStyle"
        @click.stop
      >
        <div class="y-drawer-header" v-if="showHeader && title">
          <h3>{{ title }}</h3>
          <button class="y-drawer-close" @click="handleClose">×</button>
        </div>
        <div class="y-drawer-body">
          <slot></slot>
        </div>
        <div class="y-drawer-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Props {
  visible: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'small' | 'medium' | 'large'
  width?: string
  height?: string
  maskClosable?: boolean
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'right',
  size: 'medium',
  maskClosable: true,
  showHeader: true
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  close: []
  open: []
}>()

// 计算动态样式
const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  // 如果传入了自定义宽度或高度，使用自定义值
  if (props.width && (props.placement === 'left' || props.placement === 'right')) {
    style.width = props.width
  }
  
  if (props.height && (props.placement === 'top' || props.placement === 'bottom')) {
    style.height = props.height
  }
  
  return style
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

// 监听 visible 变化，触发相应事件
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    emit('open')
  }
})
</script>

<style scoped lang="scss">
.y-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.y-drawer-container {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: transform 0.3s ease-in-out;
  
  &--left {
    left: 0;
    top: 0;
    height: 100%;
    width: 400px;
    transform: translateX(-100%);
    animation: slideInLeft 0.3s ease-out forwards;
  }
  
  &--right {
    right: 0;
    top: 0;
    height: 100%;
    width: 400px;
    transform: translateX(100%);
    animation: slideInRight 0.3s ease-out forwards;
  }
  
  &--top {
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    transform: translateY(-100%);
    animation: slideInTop 0.3s ease-out forwards;
  }
  
  &--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    transform: translateY(100%);
    animation: slideInBottom 0.3s ease-out forwards;
  }

  // 尺寸变体
  &--small {
    &.y-drawer-container--left,
    &.y-drawer-container--right {
      width: 200px;
    }
    
    &.y-drawer-container--top,
    &.y-drawer-container--bottom {
      height: 200px;
    }
  }
  
  &--medium {
    &.y-drawer-container--left,
    &.y-drawer-container--right {
      width: 400px;
    }
    
    &.y-drawer-container--top,
    &.y-drawer-container--bottom {
      height: 300px;
    }
  }
  
  &--large {
    &.y-drawer-container--left,
    &.y-drawer-container--right {
      width: 600px;
    }
    
    &.y-drawer-container--top,
    &.y-drawer-container--bottom {
      height: 500px;
    }
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideInBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.y-drawer-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: $text-color;
  }
}

.y-drawer-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
}

.y-drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.y-drawer-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  
  // 小尺寸抽屉的按钮布局优化
  .y-drawer-container--small & {
    .demo-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .y-button {
        width: 100%;
        max-width: none;
      }
    }
  }
}
</style>