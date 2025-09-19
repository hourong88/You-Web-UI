<template>
  <div 
    class="y-footer" 
    :class="{ 'y-footer--fixed': fixed }"
    :style="footerStyle"
  >
    <!-- 导航链接区域 -->
    <div v-if="navigate.length > 0" class="y-footer__links" :style="{ color: linkColorValue }">
      <a
        v-for="(item, index) in navigate"
        :key="index"
        class="y-footer__link"
        :style="getLinkStyle(item)"
        :href="item[urlField]"
        :target="item.target || '_self'"
        @click="handleLinkClick(item, index)"
      >
        {{ item[textField] }}
      </a>
    </div>

    <!-- 版权信息区域 -->
    <div class="y-footer__copyright" :style="copyrightStyle">
      {{ copyright }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentBaseProps } from '../../types'

// 导航链接项接口
interface NavigateItem {
  /** 链接类型 */
  type?: 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'navigateBack'
  /** 链接地址 */
  url?: string
  /** 链接文本 */
  text?: string
  /** 链接颜色 */
  color?: string
  /** 字体大小 */
  size?: number
  /** 跳转目标 */
  target?: string
  /** 返回层数 */
  delta?: number


  /** 额外数据 */
  extraData?: Record<string, any>
  /** 成功回调 */
  onSuccess?: (res: any) => void
  /** 失败回调 */
  onFail?: (res: any) => void
  /** 索引签名，支持动态字段访问 */
  [key: string]: any
}

// 组件 Props 接口
interface YFooterProps extends ComponentBaseProps {
  /** 导航链接数组 */
  navigate?: NavigateItem[]
  /** URL 字段名 */
  urlField?: string
  /** 文本字段名 */
  textField?: string
  /** 版权信息文本 */
  copyright?: string
  /** 版权信息字体颜色 */
  color?: string
  /** 版权信息字体大小 */
  size?: number
  /** 背景颜色 */
  backgroundColor?: string
  /** 链接颜色 */
  linkColor?: string
  /** 是否固定在底部 */
  fixed?: boolean
}

// Props 定义
const props = withDefaults(defineProps<YFooterProps>(), {
  navigate: () => [],
  urlField: 'url',
  textField: 'text',
  copyright: 'All Rights Reserved.',
  color: '#A7A7A7',
  size: 24,
  backgroundColor: 'transparent',
  linkColor: '',
  fixed: true
})

// 事件定义
const emit = defineEmits<{
  linkClick: [payload: { item: NavigateItem; index: number }]
}>()

// 计算属性 - Footer 样式
const footerStyle = computed(() => ({
  backgroundColor: props.backgroundColor
}))

// 计算属性 - 链接颜色
const linkColorValue = computed(() => {
  return props.linkColor || '#586c94'
})

// 计算属性 - 版权信息样式
const copyrightStyle = computed(() => ({
  color: props.color,
  fontSize: `${props.size}rpx`
}))

// 获取单个链接样式
const getLinkStyle = (item: NavigateItem) => ({
  color: item.color || linkColorValue.value,
  fontSize: `${item.size || 28}rpx`
})

// 处理链接点击
const handleLinkClick = (item: NavigateItem, index: number) => {
  emit('linkClick', { item, index })
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-footer {
  width: 100%;
  overflow: hidden;
  padding: $spacing-lg $spacing-base;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &--fixed {
    position: fixed;
    z-index: $z-index-sticky;
    bottom: 0;
    left: 0;
  }
}

.y-footer__links {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #999999;
}

.y-footer__link {
  position: relative;
  padding: 0 16rpx;
  line-height: 1;
  text-decoration: none;
  
  &::before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #eee;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  
  &:last-child::before {
    border-right: 0 !important;
  }
  
  &--hover {
    opacity: 0.5;
  }
}

.y-footer__copyright {
  font-size: 24rpx;
  color: #adb5bd;
  line-height: 1;
  text-align: center;
  padding-top: 16rpx;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>