<template>
  <view v-if="show" :class="['y-picker-overlay']" :style="overlayStyle" @click="handleMaskClick">
    <view 
      :class="['y-picker-container', { 'y-picker-radius': radius }]" 
      :style="containerStyle"
      @click.stop
    >
      <!-- 头部 -->
      <view class="y-picker-header" :style="headerStyle">
        <view 
          class="y-picker-cancel" 
          :style="cancelStyle"
          @click="handleCancel"
        >
          {{ cancelText }}
        </view>
        <view class="y-picker-title" :style="titleStyle">
          {{ title }}
        </view>
        <view 
          class="y-picker-confirm" 
          :style="confirmStyle"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </view>
      </view>

      <!-- 选择器内容 -->
      <view class="y-picker-content" :style="contentStyle">
        <!-- 遮罩层 -->
        <view class="y-picker-mask" :style="maskStyle"></view>
        <!-- 选择指示器 -->
        <view class="y-picker-indicator" :style="indicatorStyle"></view>
        
        <!-- 滚动列 -->
        <view class="y-picker-columns">
          <!-- 第一级 -->
          <div 
            v-if="layerNum >= 1"
            class="y-picker-column"
            ref="column1Ref"
          >
            <div class="y-picker-scroll-container">
              <div 
                v-for="(item, index) in firstLevelData" 
                :key="index"
                :class="[
                  'y-picker-item',
                  { 'y-picker-item-selected': selectedIndexes[0] === index }
                ]"
                :style="itemStyle"
                @click="handleItemClick(0, index)"
              >
                {{ item[textField] }}
              </div>
            </div>
          </div>

          <!-- 第二级 -->
          <div 
            v-if="layerNum >= 2"
            class="y-picker-column"
            ref="column2Ref"
          >
            <div class="y-picker-scroll-container">
              <div 
                v-for="(item, index) in secondLevelData" 
                :key="index"
                :class="[
                  'y-picker-item',
                  { 'y-picker-item-selected': selectedIndexes[1] === index }
                ]"
                :style="itemStyle"
                @click="handleItemClick(1, index)"
              >
                {{ item[textField] }}
              </div>
            </div>
          </div>

          <!-- 第三级 -->
          <div 
            v-if="layerNum >= 3"
            class="y-picker-column"
            ref="column3Ref"
          >
            <div class="y-picker-scroll-container">
              <div 
                v-for="(item, index) in thirdLevelData" 
                :key="index"
                :class="[
                  'y-picker-item',
                  { 'y-picker-item-selected': selectedIndexes[2] === index }
                ]"
                :style="itemStyle"
                @click="handleItemClick(2, index)"
              >
                {{ item[textField] }}
              </div>
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface PickerItem {
  [key: string]: any
}

interface Props {
  // 基础配置
  layer?: number | string
  pickerData?: PickerItem[]
  textField?: string
  valueField?: string
  childrenField?: string
  show?: boolean
  value?: string[]
  
  // 样式配置
  indicatorStyle?: Record<string, any>
  maskStyle?: Record<string, any>
  radius?: boolean
  headerBgColor?: string
  
  // 标题配置
  title?: string
  titleSize?: string
  titleColor?: string
  
  // 按钮配置
  confirmText?: string
  confirmColor?: string
  confirmSize?: string
  cancelText?: string
  cancelColor?: string
  cancelSize?: string
  
  // 内容样式
  backgroundColor?: string
  color?: string
  size?: string
  
  // 交互配置
  maskClosable?: boolean
  params?: any
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  layer: 1,
  pickerData: () => [],
  textField: 'text',
  valueField: 'value',
  childrenField: 'children',
  show: false,
  value: () => [],
  radius: false,
  headerBgColor: '#ffffff',
  title: '请选择',
  titleSize: '16px',
  titleColor: '#333333',
  confirmText: '确定',
  confirmColor: '#007aff',
  confirmSize: '16px',
  cancelText: '取消',
  cancelColor: '#666666',
  cancelSize: '16px',
  backgroundColor: '#ffffff',
  color: '#333333',
  size: '16px',
  maskClosable: true,
  zIndex: 1000
})

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'update:value', value: string[]): void
  (e: 'change', data: { 
    selectedItems: PickerItem[], 
    selectedValues: any[], 
    selectedTexts: string[],
    params?: any 
  }): void
  (e: 'confirm', data: { 
    selectedItems: PickerItem[], 
    selectedValues: any[], 
    selectedTexts: string[],
    params?: any 
  }): void
  (e: 'cancel', params?: any): void
  (e: 'hide', params?: any): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const selectedIndexes = ref<number[]>([0, 0, 0])
const currentSelectedItems = ref<PickerItem[]>([])

// 列引用
const column1Ref = ref<HTMLElement>()
const column2Ref = ref<HTMLElement>()
const column3Ref = ref<HTMLElement>()

// 计算属性
const layerNum = computed(() => {
  const num = typeof props.layer === 'string' ? parseInt(props.layer) : props.layer
  return Math.max(1, Math.min(3, num))
})

// 第一级数据
const firstLevelData = computed(() => {
  return props.pickerData || []
})

// 第二级数据
const secondLevelData = computed(() => {
  if (layerNum.value < 2) return []
  const firstItem = firstLevelData.value[selectedIndexes.value[0]]
  return firstItem?.[props.childrenField] || []
})

// 第三级数据
const thirdLevelData = computed(() => {
  if (layerNum.value < 3) return []
  const secondItem = secondLevelData.value[selectedIndexes.value[1]]
  return secondItem?.[props.childrenField] || []
})

// 样式计算
const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center'
}))

const containerStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  width: '100%',
  maxHeight: '50vh',
  borderTopLeftRadius: props.radius ? '12px' : '0',
  borderTopRightRadius: props.radius ? '12px' : '0'
}))

const headerStyle = computed(() => ({
  backgroundColor: props.headerBgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0',
  borderTopLeftRadius: props.radius ? '12px' : '0',
  borderTopRightRadius: props.radius ? '12px' : '0'
}))

const titleStyle = computed(() => ({
  fontSize: props.titleSize,
  color: props.titleColor,
  fontWeight: '500',
  textAlign: 'center',
  flex: 1
}))

const confirmStyle = computed(() => ({
  fontSize: props.confirmSize,
  color: props.confirmColor,
  padding: '8px 12px',
  cursor: 'pointer'
}))

const cancelStyle = computed(() => ({
  fontSize: props.cancelSize,
  color: props.cancelColor,
  padding: '8px 12px',
  cursor: 'pointer'
}))

const contentStyle = computed(() => ({
  position: 'relative',
  height: '240px',
  overflow: 'hidden'
}))

const itemStyle = computed(() => ({
  fontSize: props.size,
  color: props.color,
  textAlign: 'center',
  height: '40px',
  lineHeight: '40px',
  padding: '0 16px'
}))

// 方法
const handleMaskClick = () => {
  if (props.maskClosable) {
    emit('hide', props.params)
    emit('update:show', false)
  }
}

const handleCancel = () => {
  emit('cancel', props.params)
  emit('hide', props.params)
  emit('update:show', false)
}

const handleConfirm = () => {
  const result = getCurrentSelection()
  emit('confirm', result)
  emit('update:value', result.selectedTexts)
  emit('update:show', false)
}

const handleItemClick = (columnIndex: number, itemIndex: number) => {
  selectedIndexes.value[columnIndex] = itemIndex
  
  // 重置后续列的选择
  if (columnIndex === 0 && layerNum.value > 1) {
    selectedIndexes.value[1] = 0
    if (layerNum.value > 2) {
      selectedIndexes.value[2] = 0
    }
  } else if (columnIndex === 1 && layerNum.value > 2) {
    selectedIndexes.value[2] = 0
  }
  
  // 触发change事件
  const result = getCurrentSelection()
  emit('change', result)
  
  // 滚动到选中项
  scrollToSelected(columnIndex)
}

const scrollToSelected = (columnIndex: number) => {
  // 延迟执行以确保DOM更新
  setTimeout(() => {
    const columnRefs = [column1Ref, column2Ref, column3Ref]
    const columnRef = columnRefs[columnIndex]?.value
    if (!columnRef) return
    
    const container = columnRef.querySelector('.y-picker-scroll-container')
    const selectedItem = columnRef.querySelector('.y-picker-item-selected')
    
    if (container && selectedItem) {
      const containerHeight = container.clientHeight
      const itemHeight = selectedItem.clientHeight
      const itemOffsetTop = selectedItem.offsetTop
      
      // 计算滚动位置，使选中项居中
      const scrollTop = itemOffsetTop - (containerHeight / 2) + (itemHeight / 2)
      
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      })
    }
  }, 50)
}

const getCurrentSelection = () => {
  const selectedItems: PickerItem[] = []
  const selectedValues: any[] = []
  const selectedTexts: string[] = []
  
  // 第一级
  if (layerNum.value >= 1 && firstLevelData.value.length > 0) {
    const firstItem = firstLevelData.value[selectedIndexes.value[0]]
    if (firstItem) {
      selectedItems.push(firstItem)
      selectedValues.push(firstItem[props.valueField])
      selectedTexts.push(firstItem[props.textField])
    }
  }
  
  // 第二级
  if (layerNum.value >= 2 && secondLevelData.value.length > 0) {
    const secondItem = secondLevelData.value[selectedIndexes.value[1]]
    if (secondItem) {
      selectedItems.push(secondItem)
      selectedValues.push(secondItem[props.valueField])
      selectedTexts.push(secondItem[props.textField])
    }
  }
  
  // 第三级
  if (layerNum.value >= 3 && thirdLevelData.value.length > 0) {
    const thirdItem = thirdLevelData.value[selectedIndexes.value[2]]
    if (thirdItem) {
      selectedItems.push(thirdItem)
      selectedValues.push(thirdItem[props.valueField])
      selectedTexts.push(thirdItem[props.textField])
    }
  }
  
  return {
    selectedItems,
    selectedValues,
    selectedTexts,
    params: props.params
  }
}

// 初始化选中值
const initializeSelection = () => {
  if (!props.value || props.value.length === 0) {
    selectedIndexes.value = [0, 0, 0]
    return
  }
  
  // 根据传入的value初始化选中状态
  const newIndexes = [0, 0, 0]
  
  // 查找第一级
  if (props.value[0] && firstLevelData.value.length > 0) {
    const firstIndex = firstLevelData.value.findIndex(
      item => item[props.textField] === props.value[0]
    )
    if (firstIndex >= 0) {
      newIndexes[0] = firstIndex
    }
  }
  
  // 查找第二级
  if (layerNum.value >= 2 && props.value[1]) {
    const secondData = firstLevelData.value[newIndexes[0]]?.[props.childrenField] || []
    const secondIndex = secondData.findIndex(
      item => item[props.textField] === props.value[1]
    )
    if (secondIndex >= 0) {
      newIndexes[1] = secondIndex
    }
  }
  
  // 查找第三级
  if (layerNum.value >= 3 && props.value[2]) {
    const secondData = firstLevelData.value[newIndexes[0]]?.[props.childrenField] || []
    const thirdData = secondData[newIndexes[1]]?.[props.childrenField] || []
    const thirdIndex = thirdData.findIndex(
      item => item[props.textField] === props.value[2]
    )
    if (thirdIndex >= 0) {
      newIndexes[2] = thirdIndex
    }
  }
  
  selectedIndexes.value = newIndexes
}

// 监听数据变化
watch(() => props.pickerData, () => {
  initializeSelection()
}, { immediate: true, deep: true })

watch(() => props.value, () => {
  initializeSelection()
}, { deep: true })

onMounted(() => {
  initializeSelection()
  // 初始化滚动位置
  setTimeout(() => {
    for (let i = 0; i < layerNum.value; i++) {
      scrollToSelected(i)
    }
  }, 100)
})

// 监听选中索引变化，自动滚动
watch(selectedIndexes, (newIndexes, oldIndexes) => {
  newIndexes.forEach((newIndex, columnIndex) => {
    if (newIndex !== oldIndexes?.[columnIndex]) {
      scrollToSelected(columnIndex)
    }
  })
}, { deep: true })
</script>

<style lang="scss" scoped>
.y-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.y-picker-container {
  background-color: #ffffff;
  width: 100%;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
}

.y-picker-radius {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.y-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
}

.y-picker-title {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  text-align: center;
  flex: 1;
}

.y-picker-cancel,
.y-picker-confirm {
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.7;
  }
}

.y-picker-content {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.y-picker-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.6) 40%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.6) 60%,
    rgba(255, 255, 255, 0.9) 100%
  );
  pointer-events: none;
  z-index: 2;
}

.y-picker-indicator {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 40px;
  margin-top: -20px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  z-index: 3;
}

.y-picker-columns {
  display: flex;
  height: 100%;
  position: relative;
}

.y-picker-column {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.y-picker-scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 100px 0; // 上下留白，让选中项能居中
  
  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
}

.y-picker-item {
  font-size: 16px;
  color: #333333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.y-picker-item-selected {
  color: var(--color-primary, #007aff);
  font-weight: 600;
  background-color: rgba(0, 122, 255, 0.1);
  
  &:hover {
    background-color: rgba(0, 122, 255, 0.15);
  }
}

// 主题适配
:root[data-theme="dark"] {
  .y-picker-container {
    background-color: var(--color-background-primary);
  }
  
  .y-picker-header {
    background-color: var(--color-background-primary);
    border-bottom-color: var(--color-border-primary);
  }
  
  .y-picker-title {
    color: var(--color-text-primary);
  }
  
  .y-picker-item {
    color: var(--color-text-primary);
  }
  
  .y-picker-indicator {
    border-color: var(--color-border-primary);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .y-picker-header {
    padding: 10px 12px;
  }
  
  .y-picker-title {
    font-size: 14px;
  }
  
  .y-picker-cancel,
  .y-picker-confirm {
    font-size: 14px;
    padding: 6px 8px;
  }
  
  .y-picker-item {
    font-size: 14px;
    padding: 0 12px;
  }
}
</style>