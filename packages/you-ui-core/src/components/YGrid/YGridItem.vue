<template>
  <view 
    class="y-grid-item" 
    :class="[
      !bottomLine ? 'y-grid-item--no-bottom' : '',
      !border ? 'y-grid-item--no-border' : '',
      `y-grid-item--${cellCount < 2 ? 3 : cellCount}`
    ]"
    :hover-class="hover ? 'y-grid-item--hover' : ''"
    :hover-stay-time="150"
    :style="{ backgroundColor }"
    @tap="handleClick"
  >
    <view class="y-grid-item__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentBaseProps } from '../../types'

// 组件 Props 接口
interface YGridItemProps extends ComponentBaseProps {
  /** 每行显示的列数 */
  cell?: number | string
  /** 背景颜色 */
  backgroundColor?: string
  /** 是否有点击效果 */
  hover?: boolean
  /** 是否需要底部线条 */
  bottomLine?: boolean
  /** 是否需要纵向边框线条 */
  border?: boolean
  /** 索引 */
  index?: number
}

// Props 定义
const props = withDefaults(defineProps<YGridItemProps>(), {
  cell: 3,
  backgroundColor: '#fff',
  hover: true,
  bottomLine: true,
  border: true,
  index: 0
})

// 事件定义
const emit = defineEmits<{
  click: [payload: { index: number }]
}>()

// 计算属性 - 列数
const cellCount = computed(() => {
  const count = Number(props.cell)
  return isNaN(count) ? 3 : count
})

// 处理点击事件
const handleClick = () => {
  emit('click', { index: props.index })
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-grid-item {
  position: relative;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // 2列布局
  &--2 {
    width: 50%;
  }
  
  // 3列布局
  &--3 {
    width: 33.333333333%;
  }
  
  // 4列布局
  &--4 {
    width: 25%;
    padding: 30rpx 20rpx !important;
  }
  
  // 5列布局
  &--5 {
    width: 20%;
    padding: 20rpx !important;
  }
  
  // 右边框线
  &::before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid $border-color-light;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  
  // 底边框线
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid $border-color-light;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  
  // 去掉右边框
  &--no-border::before {
    width: 0 !important;
    border-right: 0 !important;
  }
  
  // 去掉底边框
  &--no-bottom::after {
    height: 0 !important;
    border-bottom: 0 !important;
  }
  
  // 点击效果
  &--hover {
    background-color: $bg-color-hover !important;
  }
  
  // 2列布局 - 每行最后一个去掉右边框
  &--2:nth-of-type(2n)::before {
    width: 0;
    border-right: 0;
  }
  
  // 3列布局 - 每行最后一个去掉右边框
  &--3:nth-of-type(3n)::before {
    width: 0;
    border-right: 0;
  }
  
  // 4列布局 - 每行最后一个去掉右边框
  &--4:nth-of-type(4n)::before {
    width: 0;
    border-right: 0;
  }
  
  // 5列布局 - 每行最后一个去掉右边框
  &--5:nth-of-type(5n)::before {
    width: 0;
    border-right: 0;
  }
}

.y-grid-item__content {
  position: relative;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}


.y-grid-item:active {
  background-color: $bg-color-hover;
}
/* #endif */
</style>