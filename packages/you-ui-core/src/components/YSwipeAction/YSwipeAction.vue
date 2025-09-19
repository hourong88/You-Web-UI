<template>
  <div class="y-swipe-action" :style="{ backgroundColor: backgroundColor }">
    <div class="y-swipe-action__item" :class="[isShowBtn ? 'y-swipe-action__item--show' : '']"
      :style="{ transform: 'translate(' + position.pageX + 'px,0)' }">
      <div class="y-swipe-action__content" @touchstart="handlerTouchstart" @touchmove="handlerTouchmove"
        @touchend="handlerTouchend" @mousedown="handlerTouchstart" @mousemove="handlerTouchmove"
        @mouseup="handlerTouchend" @mouseleave="handlerTouchend">
        <slot name="content"></slot>
      </div>
      <div class="y-swipe-action__button-group" v-if="actions.length > 0" @touchend.stop="loop">
        <div class="y-swipe-action__button-item" v-for="(item, index) in actions" :key="index" :style="{
          backgroundColor: item.background || '#f7f7f7',
          color: item.color || color,
          width: (item.width || width) + 'px',
        }" :data-index="index" @click="handlerButton">
          <img :src="item[iconField]" v-if="item[iconField]"
            :style="{ width: px(item.imgWidth || 48), height: px(item.imgHeight || 48) }" />
          <span :style="{ fontSize: px(item.fontsize || 32) }">{{ item[nameField] }}</span>
        </div>
      </div>
      <!--actions长度设置为0，可直接传按钮进来-->
      <div class="y-swipe-action__button-group" @touchend.stop="loop" @click="handlerParentButton"
        v-if="actions.length === 0" :style="{ width: operateWidth + 'px', right: '-' + operateWidth + 'px' }">
        <slot name="button"></slot>
      </div>
    </div>
    <div v-if="isShowBtn && showMask" class="y-swipe-action__mask" @click.stop="closeButtonGroup"
      @touchstart.stop.prevent="closeButtonGroup"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'

// 定义接口
interface SwipeActionItem {
  name?: string
  icon?: string
  color?: string
  background?: string
  width?: number
  fontsize?: number
  imgWidth?: number
  imgHeight?: number
  [key: string]: any
}

interface Position {
  pageX: number
  pageY: number
}

// 声明uni对象类型
declare const uni: {
  upx2px: (num: number) => number
}

type SwipeDirection = 'Left' | 'Right' | 'Up' | 'Down'

// 定义 props
interface Props {
  actions?: SwipeActionItem[]
  nameField?: string
  color?: string
  iconField?: string
  width?: string | number
  closable?: boolean
  showMask?: boolean
  operateWidth?: number
  params?: Record<string, any>
  forbid?: boolean
  open?: boolean
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  actions: () => [],
  nameField: 'name',
  color: '#fff',
  iconField: 'icon',
  width: 70,
  closable: true,
  showMask: true,
  operateWidth: 80,
  params: () => ({}),
  forbid: false,
  open: false,
  backgroundColor: '#fff',
})

// 定义 emits
interface EmitEvents {
  click: [payload: { index: number; item: Record<string, any> }]
}

const emit = defineEmits<EmitEvents>()

// 响应式数据
const tStart = reactive<Position>({
  pageX: 0,
  pageY: 0,
})

const position = reactive<Position>({
  pageX: 0,
  pageY: 0,
})

const limitMove = ref<number>(0)
const isShowBtn = ref<boolean>(false)
const move = ref<boolean>(false)

// 方法
const swipeDirection = (x1: number, x2: number, y1: number, y2: number): SwipeDirection => {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
    ? x1 - x2 > 0
      ? 'Left'
      : 'Right'
    : y1 - y2 > 0
      ? 'Up'
      : 'Down'
}

// 阻止事件冒泡
const loop = (): void => { }

const updateButtonSize = (): void => {
  const actions = props.actions
  if (actions.length > 0) {
    let limitMovePosition = 0
    actions.forEach((item: SwipeActionItem) => {
      limitMovePosition += item.width || (props.width as number)
    })
    limitMove.value = limitMovePosition
  } else {
    limitMove.value = props.operateWidth
  }
}

const handlerTouchstart = (event: any): void => {
  if (props.forbid) return
  event.preventDefault() // 防止默认行为
  let touches = event.touches
  if (touches && touches.length > 1) return
  move.value = true
  touches = touches ? event.touches : undefined
  const touch = touches?.[0]
  if (!touch || (touch.pageX === undefined && touch.pageY === undefined)) {
    const fallbackTouch = {
      pageX: event.pageX || event.clientX || 0,
      pageY: event.pageY || event.clientY || 0,
    }
    tStart.pageX = fallbackTouch.pageX
    tStart.pageY = fallbackTouch.pageY
  } else {
    tStart.pageX = touch.pageX
    tStart.pageY = touch.pageY
  }
}

const swipper = (touches: { pageX: number; pageY: number }): void => {
  const start = tStart
  const spacing = {
    pageX: touches.pageX - start.pageX,
    pageY: touches.pageY - start.pageY,
  }
  // 限制滑动距离，向左滑动时spacing.pageX为负值
  if (spacing.pageX < 0 && Math.abs(spacing.pageX) > limitMove.value) {
    spacing.pageX = -limitMove.value
  } else if (spacing.pageX > 0) {
    spacing.pageX = 0 // 不允许向右滑动超出初始位置
  }
  position.pageX = spacing.pageX
  position.pageY = spacing.pageY
}

const handlerTouchmove = (event: any): void => {
  if (props.forbid || !move.value) return
  event.preventDefault() // 防止页面滚动
  const start = tStart
  let touches = event.touches ? event.touches[0] : undefined
  let touchData: { pageX: number; pageY: number }
  if (!touches || (touches.pageX === undefined && touches.pageY === undefined)) {
    touchData = {
      pageX: event.pageX || event.clientX || 0,
      pageY: event.pageY || event.clientY || 0,
    }
  } else {
    touchData = {
      pageX: touches.pageX,
      pageY: touches.pageY,
    }
  }

  const direction = swipeDirection(start.pageX, touchData.pageX, start.pageY, touchData.pageY)
  // 允许左滑和回滑
  if (direction === 'Left' || (direction === 'Right' && position.pageX < 0)) {
    swipper(touchData)
  }
}

const handlerTouchend = (event: any): void => {
  if (props.forbid || !move.value) return
  move.value = false
  const start = tStart
  let touches = event.changedTouches ? event.changedTouches[0] : undefined
  let touchData: { pageX: number; pageY: number }
  if (!touches || (touches.pageX === undefined && touches.pageY === undefined)) {
    touchData = {
      pageX: event.pageX || event.clientX || 0,
      pageY: event.pageY || event.clientY || 0,
    }
  } else {
    touchData = {
      pageX: touches.pageX,
      pageY: touches.pageY,
    }
  }

  const direction = swipeDirection(start.pageX, touchData.pageX, start.pageY, touchData.pageY)
  const spacing = {
    pageX: touchData.pageX - start.pageX,
    pageY: touchData.pageY - start.pageY,
  }
  if (Math.abs(spacing.pageX) >= 40 && direction === 'Left') {
    spacing.pageX = spacing.pageX < 0 ? -limitMove.value : limitMove.value
    isShowBtn.value = true
  } else {
    spacing.pageX = 0
  }
  if (spacing.pageX === 0) {
    isShowBtn.value = false
  }
  position.pageX = spacing.pageX
  position.pageY = spacing.pageY
}

const handlerButton = (event: any): void => {
  if (props.closable) {
    closeButtonGroup()
  }
  const dataset = event.currentTarget?.dataset
  if (dataset) {
    const index = Number(dataset.index)
    emit('click', {
      index,
      item: props.actions[index],
    })
  }
}

const closeButtonGroup = (): void => {
  position.pageX = 0
  position.pageY = 0
  isShowBtn.value = false
}

// 控制自定义按钮菜单
const handlerParentButton = (_event: any): void => {
  if (props.closable) {
    closeButtonGroup()
  }
}

const manualSwitch = (isOpen: boolean): void => {
  let x = 0
  if (isOpen) {
    if (props.actions.length === 0) {
      x = props.operateWidth
    } else {
      let width = 0
      props.actions.forEach((item: SwipeActionItem) => {
        width += item.width || (props.width as number)
      })
      x = width
    }
  }
  position.pageX = -x
  position.pageY = 0
}

const px = (num: number): string => {
  // Web 环境处理
  if (false) {
    // 不会执行到这里
    return num + 'px'
  }
  // 在普通web环境中，直接使用px值
  return num + 'px'
}

// 监听器
watch(
  () => props.actions,
  () => {
    updateButtonSize()
  },
  { deep: true }
)

watch(
  () => props.open,
  (newValue: boolean) => {
    manualSwitch(newValue)
  }
)

// 生命周期
onMounted(() => {
  updateButtonSize()
})
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-swipe-action {
  position: relative;
  overflow: hidden;
  background-color: $color-bg-primary;
}

.y-swipe-action__item--show {
  position: relative;
  z-index: $z-index-modal;
}

.y-swipe-action__item {
  width: 100%;
  box-sizing: border-box;
  transition: transform $transition-duration-base ease;
  font-size: $font-size-base;
  cursor: pointer;
}

.y-swipe-action__content {
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-y;
  position: relative;
  z-index: 2;
}

.y-swipe-action__button-group {
  position: absolute;
  right: -100%;
  top: 0;
  height: 100%;
  z-index: 1;
  width: 100%;
  display: flex;
}

.y-swipe-action__button-item {
  height: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;

  img {
    margin-bottom: $spacing-xs;
  }

  span {
    font-size: $font-size-base;
    line-height: $line-height-base;
  }
}

.y-swipe-action__mask {
  display: block;
  opacity: 0;
  position: fixed;
  z-index: calc(#{$z-index-modal} - 1);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
