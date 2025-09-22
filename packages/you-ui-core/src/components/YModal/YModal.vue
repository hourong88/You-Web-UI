<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="y-modal-container"
      :class="{ 'y-modal-show': visible }"
      :style="{ zIndex: zIndex }"
      @touchmove.stop.prevent
    >
      <!-- 遮罩层 -->
      <div
        v-if="mask"
        class="y-modal-mask"
        :class="{ 'y-mask-show': visible }"
        :style="{ zIndex: maskZIndex, background: maskColor }"
        @click="handleMaskClick"
      />
      
      <!-- 弹窗主体 -->
      <div
        class="y-modal-box"
        :class="[
          fadeIn || visible ? 'y-modal-normal' : 'y-modal-scale',
          visible ? 'y-modal-show' : '',
          shape === 'circle' ? 'y-modal-circle' : ''
        ]"
        :style="{
          width: width,
          padding: padding,
          borderRadius: radius,
          backgroundColor: backgroundColor,
          zIndex: zIndex + 1
        }"
      >
        <!-- 默认内容 -->
        <div v-if="!custom">
          <!-- 标题 -->
          <div v-if="title" class="y-modal-title">{{ title }}</div>
          
          <!-- 内容 -->
          <div
            class="y-modal-content"
            :class="{ 'y-mtop': !title }"
            :style="{ color: color, fontSize: size + 'px' }"
          >
            {{ content }}
          </div>
          
          <!-- 按钮组 -->
          <div
            class="y-modal-btn-box"
            :class="{ 'y-flex-column': buttons.length !== 2 }"
          >
            <button
              v-for="(item, index) in buttons"
              :key="index"
              class="y-modal-btn"
              :class="[
                buttons.length !== 2 ? 'y-btn-width' : '',
                buttons.length > 2 ? 'y-mbtm' : '',
                shape === 'circle' ? 'y-circle-btn' : ''
              ]"
              :style="{
                background: getColor(item.type, true, item.plain),
                color: getTextColor(item.type, item.plain)
              }"
              @click="handleClick(index)"
            >
              {{ item.text || '确定' }}
              <div
                v-if="item.plain"
                class="y-modal-border"
                :class="{ 'y-circle-border': shape === 'circle' }"
                :style="{ borderColor: getColor(item.type) }"
              />
            </button>
          </div>
        </div>
        
        <!-- 自定义内容 -->
        <div v-else>
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ModalButton {
  text?: string
  type?: 'primary' | 'green' | 'warning' | 'danger' | 'red' | 'pink' | 'white' | 'gray'
  plain?: boolean
}

export interface YModalProps {
  /** 是否显示弹窗 */
  visible?: boolean
  /** 弹窗宽度 */
  width?: string
  /** 背景色 */
  backgroundColor?: string
  /** 内边距 */
  padding?: string
  /** 圆角 */
  radius?: string
  /** 标题 */
  title?: string
  /** 内容 */
  content?: string
  /** 内容字体颜色 */
  color?: string
  /** 内容字体大小 */
  size?: number
  /** 形状 */
  shape?: 'circle' | 'square'
  /** 按钮配置 */
  buttons?: ModalButton[]
  /** 点击遮罩是否可关闭 */
  maskClosable?: boolean
  /** 是否显示遮罩 */
  mask?: boolean
  /** 遮罩颜色 */
  maskColor?: string
  /** 淡入效果 */
  fadeIn?: boolean
  /** 自定义弹窗内容 */
  custom?: boolean
  /** 容器层级 */
  zIndex?: number
  /** 遮罩层级 */
  maskZIndex?: number
}

const props = withDefaults(defineProps<YModalProps>(), {
  visible: false,
  width: '84%',
  backgroundColor: '#fff',
  padding: '40px 64px',
  radius: '24px',
  title: '',
  content: '',
  color: '#999',
  size: 14,
  shape: 'square',
  buttons: () => [
    {
      text: '取消',
      type: 'red',
      plain: true
    },
    {
      text: '确定',
      type: 'red',
      plain: false
    }
  ],
  maskClosable: true,
  mask: true,
  maskColor: 'rgba(0, 0, 0, 0.6)',
  fadeIn: false,
  custom: false,
  zIndex: 9997,
  maskZIndex: 9990
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  click: [{ index: number }]
  cancel: []
}>()

// 颜色配置
const colorMap = {
  primary: '#5677fc',
  green: '#07c160',
  warning: '#ff7900',
  danger: '#EB0909',
  red: '#EB0909',
  pink: '#f74d54',
  white: '#fff',
  gray: '#ededed'
}

// 获取颜色
const getColor = (type: string = 'primary', isBg = false, plain = false) => {
  let color = colorMap[type as keyof typeof colorMap] || colorMap.primary
  
  if (isBg) {
    if (plain) {
      color = 'transparent'
    } else if (type === 'white') {
      color = '#fff'
    } else if (type === 'gray') {
      color = '#ededed'
    }
  }
  
  return color
}

// 获取文字颜色
const getTextColor = (type: string = 'primary', plain = false) => {
  let color = colorMap[type as keyof typeof colorMap] || colorMap.primary
  
  if (type === 'white') {
    color = '#333'
  } else if (type === 'gray') {
    color = '#999'
  } else if (!plain && type !== 'white' && type !== 'gray') {
    color = '#fff'
  }
  
  return color
}

// 处理按钮点击
const handleClick = (index: number) => {
  if (!props.visible) return
  emit('click', { index })
}

// 处理遮罩点击
const handleMaskClick = () => {
  if (!props.maskClosable) return
  emit('cancel')
  emit('update:visible', false)
}
</script>

<style scoped lang="scss">
.y-modal-container {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
}

.y-modal-box {
  position: relative;
  opacity: 0;
  visibility: hidden;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}

.y-modal-scale {
  transform: scale(0);
}

.y-modal-normal {
  transform: scale(1);
}

.y-modal-show {
  opacity: 1;
  visibility: visible;
}

.y-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.y-mask-show {
  visibility: visible;
  opacity: 1;
}

.y-modal-title {
  text-align: center;
  font-size: 17px;
  color: #333;
  padding-top: 10px;
  font-weight: bold;
}

.y-modal-content {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 30px;
}

.y-mtop {
  margin-top: 15px;
}

.y-mbtm {
  margin-bottom: 15px;
}

.y-modal-btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.y-flex-column {
  flex-direction: column;
}

.y-modal-btn {
  width: 46%;
  height: 34px;
  line-height: 34px;
  position: relative;
  border-radius: 5px;
  font-size: 13px;
  overflow: visible;
  margin-left: 0;
  margin-right: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.15);
    pointer-events: none;
    border-radius: 5px;
  }
}

.y-modal-border {
  position: absolute;
  width: 200%;
  height: 200%;
  transform-origin: 0 0;
  transform: scale(0.5, 0.5) translateZ(0);
  border: 1px solid;
  box-sizing: border-box;
  left: 0;
  top: 0;
  z-index: 2;
  border-radius: 10px;
  pointer-events: none;
}

.y-btn-width {
  width: 80% !important;
}

.y-circle-btn {
  border-radius: 20px !important;

  &:active::after {
    border-radius: 20px !important;
  }
}

.y-circle-border {
  border-radius: 40px !important;
}

.y-modal-circle {
  border-radius: 20px !important;
}
</style>