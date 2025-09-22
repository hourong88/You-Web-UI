<template>
  <div
    ref="tabsContainer"
    class="y-tabs-view"
    :class="[
      isFixed ? 'y-tabs-fixed' : 'y-tabs-relative',
      unlined ? 'y-unlined' : ''
    ]"
    :style="{
      width: getContainerWidth,
      height: height + 'px',
      padding: `0 ${padding}px`,
      background: backgroundColor,
      top: isFixed ? top + 'px' : 'auto',
      zIndex: isFixed ? zIndex : 'auto'
    }"
  >
    <!-- 标签项 -->
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="y-tabs-item"
      :style="{
        width: getItemWidth,
        height: height + 'px'
      }"
      @click.stop="switchTabs(index)"
    >
      <div
        class="y-tabs-title"
        :class="{ 'y-tabs-disabled': item.disabled }"
        :style="{
          color: currentTab === index ? getSelectedColor : color,
          fontSize: size + 'px',
          fontWeight: bold && currentTab === index ? 'bold' : 'normal',
          transform: `scale(${currentTab === index ? scale : 1})`
        }"
      >
        {{ item[field] }}
        <!-- 徽章 -->
        <div
          v-if="item[badgeField] || item.isDot"
          :class="[item.isDot ? 'y-badge-dot' : 'y-tabs-badge']"
          :style="{
            color: badgeColor,
            backgroundColor: getBadgeBgColor
          }"
        >
          {{ item.isDot ? '' : item[badgeField] }}
        </div>
      </div>
    </div>

    <!-- 滑块 -->
    <div
      v-if="isSlider"
      class="y-tabs-slider"
      :style="{
        transform: 'translateX(' + scrollLeft + 'px)',
        width: sliderWidth + 'px',
        height: sliderHeight + 'px',
        borderRadius: sliderRadius,
        bottom: bottom,
        background: getSliderBgColor,
        marginBottom: bottom === '50%' ? '-' + sliderHeight / 2 + 'px' : 0
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

export interface TabItem {
  [key: string]: any
  disabled?: boolean
  isDot?: boolean
}

export interface YTabsProps {
  /** 标签页数据 */
  tabs?: TabItem[]
  /** 显示文本字段名称 */
  field?: string
  /** 徽章字段名称 */
  badgeField?: string
  /** tabs宽度，不传值则默认使用窗口宽度，单位px */
  width?: number | string
  /** 高度，单位px */
  height?: number
  /** 左右内边距，单位px */
  padding?: number
  /** 背景色 */
  backgroundColor?: string
  /** 是否固定定位 */
  isFixed?: boolean
  /** 固定定位时的top值，单位px */
  top?: number
  /** 是否去掉底部线条 */
  unlined?: boolean
  /** 当前选中的标签索引 */
  currentTab?: number
  /** 是否显示滑块 */
  isSlider?: boolean
  /** 滑块宽度，单位px */
  sliderWidth?: number
  /** 滑块高度，单位px */
  sliderHeight?: number
  /** 滑块背景颜色 */
  sliderBgColor?: string
  /** 滑块圆角 */
  sliderRadius?: string
  /** 滑块bottom位置 */
  bottom?: string
  /** 标签项宽度 */
  itemWidth?: string
  /** 字体颜色 */
  color?: string
  /** 选中后字体颜色 */
  selectedColor?: string
  /** 字体大小，单位px */
  size?: number
  /** 选中后是否加粗 */
  bold?: boolean
  /** 选中后缩放比例 */
  scale?: number | string
  /** 徽章字体颜色 */
  badgeColor?: string
  /** 徽章背景颜色 */
  badgeBgColor?: string
  /** z-index层级 */
  zIndex?: number | string
}

const props = withDefaults(defineProps<YTabsProps>(), {
  tabs: () => [],
  field: 'name',
  badgeField: 'num',
  width: 0,
  height: 40,
  padding: 15,
  backgroundColor: '#FFFFFF',
  isFixed: false,
  top: 0,
  unlined: false,
  currentTab: 0,
  isSlider: true,
  sliderWidth: 34,
  sliderHeight: 3,
  sliderBgColor: '',
  sliderRadius: '25px',
  bottom: '0',
  itemWidth: '',
  color: '#666',
  selectedColor: '',
  size: 14,
  bold: false,
  scale: 1,
  badgeColor: '#fff',
  badgeBgColor: '',
  zIndex: 996
})

const emit = defineEmits<{
  change: [{ index: number; item: TabItem }]
}>()

// 响应式数据
const winWidth = ref(0)
const tabsWidth = ref(0)
const scrollLeft = ref(0)
const tabsContainer = ref<HTMLElement>()

// 计算属性
const getContainerWidth = computed(() => {
  // 如果传入了具体的width值，使用px单位
  if (props.width && props.width !== 0) {
    return typeof props.width === 'number' ? props.width + 'px' : props.width
  }
  // 否则使用100%宽度
  return '100%'
})

const getItemWidth = computed(() => {
  if (props.itemWidth) {
    return props.itemWidth
  }
  // 确保每个tab平分容器宽度，避免超出
  const tabCount = props.tabs.length || 1
  const width = Math.floor(10000 / tabCount) / 100 // 保留2位小数，避免精度问题
  return width + '%'
})

const getSliderBgColor = computed(() => {
  return props.sliderBgColor || '#5677fc'
})

const getSelectedColor = computed(() => {
  return props.selectedColor || '#5677fc'
})

const getBadgeBgColor = computed(() => {
  return props.badgeBgColor || '#f74d54'
})

// 检查滑块位置
const checkCor = () => {
  nextTick(() => {
    const tabsNum = props.tabs.length
    if (tabsNum === 0) return
    
    const padding = props.padding
    // 获取实际容器宽度
    const containerWidth = tabsWidth.value || 0
    const contentWidth = containerWidth - padding * 2
    const itemWidth = contentWidth / tabsNum
    const left = (itemWidth - props.sliderWidth) / 2 + padding
    let newScrollLeft = left

    if (props.currentTab > 0) {
      newScrollLeft = newScrollLeft + itemWidth * props.currentTab
    }
    
    scrollLeft.value = newScrollLeft
  })
}

// 切换标签
const switchTabs = (index: number) => {
  const item = props.tabs[index]
  if (item && item.disabled) return
  if (props.currentTab === index) return

  emit('change', {
    index: Number(index),
    item: item
  })
}

// 监听器
watch(() => props.currentTab, () => {
  nextTick(() => {
    checkCor()
  })
})

watch(() => props.tabs, () => {
  nextTick(() => {
    checkCor()
  })
}, { deep: true })

watch(() => props.width, (val) => {
  if (val && val !== 0) {
    tabsWidth.value = Number(val)
  } else if (tabsContainer.value) {
    tabsWidth.value = tabsContainer.value.clientWidth
  } else {
    tabsWidth.value = winWidth.value
  }
  nextTick(() => {
    checkCor()
  })
})

// 组件挂载
onMounted(() => {
  nextTick(() => {
    if (typeof window !== 'undefined') {
      winWidth.value = window.innerWidth
      // 如果传入了具体的width值，使用该值，否则使用容器实际宽度
      if (props.width && props.width !== 0) {
        tabsWidth.value = Number(props.width)
      } else if (tabsContainer.value) {
        tabsWidth.value = tabsContainer.value.clientWidth
      } else {
        tabsWidth.value = winWidth.value
      }
      checkCor()
    }
  })
})
</script>

<style scoped lang="scss">
.y-tabs-view {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden; /* 防止内容超出 */
}

.y-tabs-relative {
  position: relative;
}

.y-tabs-fixed {
  position: fixed;
  left: 0;
}

.y-tabs-fixed::before,
.y-tabs-relative::before {
  content: '';
  position: absolute;
  border-bottom: 0.5px solid #eaeef1;
  transform: scaleY(0.5) translateZ(0);
  transform-origin: 0 100%;
  bottom: 0;
  right: 0;
  left: 0;
}

.y-unlined::before {
  border-bottom: 0 !important;
}

.y-tabs-item {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 防止内容超出 */
  cursor: pointer;
  flex-shrink: 0; /* 防止被压缩 */
  box-sizing: border-box;
}

.y-tabs-disabled {
  opacity: 0.6;
}

.y-tabs-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
  white-space: nowrap; /* 防止文本换行 */
  text-overflow: ellipsis; /* 长文本显示省略号 */
  width: 100%;
  box-sizing: border-box;
}

.y-tabs-slider {
  position: absolute;
  left: 0;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  transform-style: preserve-3d;
}

.y-tabs-badge {
  position: absolute;
  font-size: 12px;
  height: 16px;
  min-width: 10px;
  padding: 0 3px;
  border-radius: 20px;
  right: 0;
  top: 0;
  transform: translate(88%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 4;
  font-weight: normal !important;
}

.y-badge-dot {
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  right: -5px;
  top: -5px;
  z-index: 4;
}
</style>