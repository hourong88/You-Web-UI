<template>
  <teleport to="body">
    <div
      class="y-toast"
      :class="[
        visible ? 'y-toast-show' : '',
        content ? 'y-toast-padding' : '',
        icon ? '' : 'y-unicon-padding'
      ]"
      :style="{
        width: getWidth(icon, content),
        zIndex: zIndex
      }"
    >
      <img
        v-if="icon"
        :src="imgUrl"
        class="y-toast-img"
        alt="toast icon"
      />
      <div
        class="y-toast-text"
        :class="{ 'y-unicon': !icon }"
      >
        {{ title }}
      </div>
      <div
        v-if="content && icon"
        class="y-toast-text y-content-ptop"
      >
        {{ content }}
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface YToastProps {
  /** z-index层级 */
  zIndex?: number
}

export interface YToastOptions {
  /** 显示标题 */
  title?: string
  /** 显示内容 */
  content?: string
  /** 显示时长，单位毫秒 */
  duration?: number
  /** 是否显示图标 */
  icon?: boolean
  /** 图标URL */
  imgUrl?: string
}

const props = withDefaults(defineProps<YToastProps>(), {
  zIndex: 99999
})

// 响应式数据
const timer = ref<NodeJS.Timeout | null>(null)
const visible = ref(false)
const title = ref('操作成功')
const content = ref('')
const icon = ref(false)
const imgUrl = ref('')

// 计算宽度
const getWidth = (hasIcon: boolean, hasContent: string): string => {
  let width = 'auto'
  if (hasIcon) {
    width = hasContent ? '210px' : '180px' // 420rpx -> 210px, 360rpx -> 180px
  }
  return width
}

// 显示Toast
const show = (options: YToastOptions) => {
  const {
    duration = 2000,
    icon: hasIcon = false
  } = options

  if (timer.value) {
    clearTimeout(timer.value)
  }

  visible.value = true
  title.value = options.title || ''
  content.value = options.content || ''
  icon.value = hasIcon

  if (hasIcon && options.imgUrl) {
    imgUrl.value = options.imgUrl
  }

  timer.value = setTimeout(() => {
    visible.value = false
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }, duration)
}

// 隐藏Toast
const hide = () => {
  visible.value = false
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

// 暴露方法
defineExpose({
  show,
  hide
})
</script>

<style scoped lang="scss">
.y-toast {
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px; // 10rpx -> 5px
  position: fixed;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
  transition-property: opacity, visibility;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px 27px 10px; // 60rpx 20rpx 54rpx 20rpx -> 30px 10px 27px 10px
  box-sizing: border-box;
}

.y-toast-padding {
  padding-top: 25px !important; // 50rpx -> 25px
  padding-bottom: 25px !important; // 50rpx -> 25px
}

.y-unicon-padding {
  padding: 12px 20px !important; // 24rpx 40rpx -> 12px 20px
  word-break: break-all;
}

.y-toast-show {
  visibility: visible;
  opacity: 1;
}

.y-toast-img {
  width: 60px; // 120rpx -> 60px
  height: 60px; // 120rpx -> 60px
  display: block;
  margin-bottom: 14px; // 28rpx -> 14px
}

.y-toast-text {
  font-size: 15px; // 30rpx -> 15px
  line-height: 15px; // 30rpx -> 15px
  font-weight: 400;
  color: #fff;
  text-align: center;
}

.y-unicon {
  line-height: 20px !important; // 40rpx -> 20px
  font-size: 16px !important; // 32rpx -> 16px
}

.y-content-ptop {
  padding-top: 5px; // 10rpx -> 5px
  font-size: 13px !important; // 26rpx -> 13px
}
</style>