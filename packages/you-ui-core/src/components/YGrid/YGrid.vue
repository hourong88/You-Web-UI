<template>
  <view class="y-grid" :class="{ 'y-grid--unlined': unlined }">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { ComponentBaseProps } from '../../types'

// 组件 Props 接口
interface YGridProps extends ComponentBaseProps {
  /** 是否去掉上边线 */
  unlined?: boolean
}

// Props 定义
const props = withDefaults(defineProps<YGridProps>(), {
  unlined: false
})
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-grid {
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid $border-color-light;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 1;
  }
  
  &--unlined::before {
    border-top: 0 !important;
  }
}
</style>