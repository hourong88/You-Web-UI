<template>
  <div class="y-cascade-selection">
    <div 
      class="y-selection-header-wrapper"
      :class="{ 'y-btm-none': !headerLine }"
      :style="{ backgroundColor: headerBgColor }"
    >
      <div 
        class="y-selection-header"
        :style="{ height: tabsHeight, backgroundColor: backgroundColor }"
        ref="headerRef"
      >
        <div
          v-for="(item, idx) in selectedArr"
          :key="idx"
          class="y-header-item"
          :class="{ 'y-font-bold': idx === currentTab && bold }"
          :style="{ 
            color: idx === currentTab ? getActiveColor : color, 
            fontSize: size + 'px' 
          }"
          @click="switchNav(idx)"
        >
          {{ item[textField] }}
          <div 
            v-if="idx === currentTab && showLine"
            class="y-active-line" 
            :style="{ backgroundColor: getLineColor }"
          ></div>
        </div>
      </div>
    </div>
    
    <div 
      class="y-selection-content"
      :style="{ height: height, backgroundColor: backgroundColor }"
    >
      <div
        v-for="(item, index) in selectedArr"
        :key="index"
        v-show="index === currentTab"
        class="y-selection-panel"
        :style="{ height: height }"
      >
        <div class="y-first-item" :style="{ height: firstItemTop }"></div>
        <div
          v-for="(subItem, subIndex) in item.list"
          :key="subIndex"
          class="y-selection-cell"
          :style="{ padding: padding, backgroundColor: backgroundColor }"
          @click="change(index, subIndex, subItem)"
        >
          <div 
            v-if="item.index === subIndex"
            class="y-icon-success"
            :style="{ 
              color: getCkMarkColor,
              fontSize: checkMarkSize + 'px'
            }"
          >✓</div>
          <img 
            v-if="subItem[srcField]"
            :src="subItem[srcField]"
            class="y-cell-img"
            :style="{ 
              width: imgWidth, 
              height: imgHeight, 
              borderRadius: radius 
            }"
          />
          <div 
            class="y-cell-title"
            :class="{ 
              'y-font-bold': item.index === subIndex && textBold, 
              'y-flex-shrink': nowrap 
            }"
            :style="{ 
              color: item.index === subIndex ? textActiveColor : textColor, 
              fontSize: textSize + 'px' 
            }"
          >
            {{ subItem[textField] }}
          </div>
          <div 
            v-if="subItem[subTextField]"
            class="y-cell-sub-title" 
            :style="{ 
              color: subTextColor, 
              fontSize: subTextSize + 'px' 
            }"
          >
            {{ subItem[subTextField] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'

export interface CascadeItem {
  [key: string]: any
}

export interface SelectedItem {
  [key: string]: any
  index: number
  list: CascadeItem[]
}

export interface CascadeSelectionProps {
  itemList?: CascadeItem[]
  srcField?: string
  textField?: string
  subTextField?: string
  valueField?: string
  childrenField?: string
  defaultItemList?: any[]
  defaultKey?: string
  headerLine?: boolean
  headerBgColor?: string
  tabsHeight?: string
  text?: string
  size?: number
  color?: string
  activeColor?: string
  bold?: boolean
  showLine?: boolean
  lineColor?: string
  checkMarkSize?: number
  checkMarkColor?: string
  imgWidth?: string
  imgHeight?: string
  radius?: string
  textColor?: string
  textActiveColor?: string
  textBold?: boolean
  textSize?: number
  nowrap?: boolean
  subTextColor?: string
  subTextSize?: number
  padding?: string
  firstItemTop?: string
  height?: string
  backgroundColor?: string
  request?: boolean
  receiveData?: CascadeItem[]
  reset?: number | string
}

const props = withDefaults(defineProps<CascadeSelectionProps>(), {
  itemList: () => [],
  srcField: 'src',
  textField: 'text',
  subTextField: 'subText',
  valueField: 'value',
  childrenField: 'children',
  defaultItemList: () => [],
  defaultKey: 'text',
  headerLine: true,
  headerBgColor: '#FFFFFF',
  tabsHeight: '44px',
  text: '请选择',
  size: 14,
  color: '#555',
  activeColor: '',
  bold: true,
  showLine: true,
  lineColor: '',
  checkMarkSize: 15,
  checkMarkColor: '',
  imgWidth: '20px',
  imgHeight: '20px',
  radius: '50%',
  textColor: '#333',
  textActiveColor: '#333',
  textBold: true,
  textSize: 14,
  nowrap: false,
  subTextColor: '#999',
  subTextSize: 12,
  padding: '10px 15px',
  firstItemTop: '10px',
  height: '300px',
  backgroundColor: '#FFFFFF',
  request: false,
  receiveData: () => [],
  reset: 0
})

const emit = defineEmits<{
  change: [data: { layer: number; subIndex: number; [key: string]: any }]
  complete: [data: { 
    result: any[]; 
    [key: string]: any 
  }]
}>()

const currentTab = ref(0)
const selectedArr = ref<SelectedItem[]>([])
const headerRef = ref<HTMLElement>()

const getActiveColor = computed(() => {
  return props.activeColor || '#5677fc'
})

const getLineColor = computed(() => {
  return props.lineColor || '#5677fc'
})

const getCkMarkColor = computed(() => {
  return props.checkMarkColor || '#5677fc'
})

const setDefaultData = (val: any[]) => {
  const defaultItemList = JSON.parse(JSON.stringify(val || []))
  if (defaultItemList.length > 0) {
    if ((typeof defaultItemList[0] === 'string' || typeof defaultItemList[0] === 'number') && !props.request) {
      let subi = -1
      const selectedArray: SelectedItem[] = []
      
      for (let j = 0, len = defaultItemList.length; j < len; j++) {
        const item = defaultItemList[j]
        let list: CascadeItem[] = []
        
        if (j === 0) {
          list = getItemList(-1)
        } else {
          list = getItemList(j - 1, subi, selectedArray)
        }
        
        subi = getDefaultIndex(list, item)
        if (subi !== -1) {
          const obj = list[subi]
          selectedArray.push({
            [props.textField]: obj[props.textField] || props.text,
            [props.valueField]: obj[props.valueField] || '',
            [props.srcField]: obj[props.srcField] || '',
            [props.subTextField]: obj[props.subTextField] || '',
            index: subi,
            list: list
          })
        }
        
        if (subi === -1) break
      }
      
      selectedArr.value = selectedArray
      nextTick(() => {
        setTimeout(() => {
          currentTab.value = selectedArray.length - 1
        }, 20)
      })
    } else {
      selectedArr.value = defaultItemList
      nextTick(() => {
        setTimeout(() => {
          currentTab.value = defaultItemList.length - 1
        }, 20)
      })
    }
  } else {
    initData(props.itemList, -1)
  }
}

const getDefaultIndex = (arr: CascadeItem[], val: any): number => {
  if (!arr || arr.length === 0 || val === undefined) return -1
  let index = -1
  const key = props.defaultKey || 'text'
  
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][key] == val) {
      index = i
      break
    }
  }
  return index
}

const initData = (data: CascadeItem[], layer: number) => {
  if (!data || data.length === 0) return
  
  if (props.request) {
    subLevelData(data, layer)
  } else {
    subLevelData(getItemList(layer, -1), layer)
  }
}

const removeChildren = (data: CascadeItem[]): CascadeItem[] => {
  return data.map(item => {
    const newItem = { ...item }
    delete newItem[props.childrenField]
    return newItem
  })
}

const getItemList = (layer: number, index?: number, selectedArray?: SelectedItem[]): CascadeItem[] => {
  let list: CascadeItem[] = []
  const arr = JSON.parse(JSON.stringify(props.itemList))
  const currentSelectedArr = selectedArray || selectedArr.value
  
  if (layer === -1) {
    list = removeChildren(arr)
  } else {
    let value = currentSelectedArr[0]?.index
    value = value === undefined || value === -1 ? index : value
    
    if (arr[value!] && arr[value!][props.childrenField]) {
      list = arr[value!][props.childrenField]
    }
    
    if (layer > 0) {
      for (let i = 1; i < layer + 1; i++) {
        const val = layer === i ? index : currentSelectedArr[i]?.index
        list = val === -1 ? [] : (list[val!]?.[props.childrenField] || [])
        if (list.length === 0) break
      }
    }
    list = removeChildren(list)
  }
  return list
}

const switchNav = (cur: number) => {
  if (currentTab.value !== cur) {
    currentTab.value = cur
  }
}

const change = (index: number, subIndex: number, subItem: CascadeItem) => {
  const item = selectedArr.value[index]
  if (item.index === subIndex) return
  
  item.index = subIndex
  item[props.textField] = subItem[props.textField]
  item[props.valueField] = subItem[props.valueField]
  item[props.subTextField] = subItem[props.subTextField] || ''
  item[props.srcField] = subItem[props.srcField] || ''
  
  emit('change', {
    layer: index,
    subIndex: subIndex,
    ...subItem
  })
  
  if (!props.request) {
    const data = getItemList(index, subIndex)
    subLevelData(data, index)
  }
}

const subLevelData = (data: CascadeItem[], layer: number) => {
  if (!data || data.length === 0) {
    if (layer === -1) return
    
    // 完成选择
    const arr = selectedArr.value
    if (layer < arr.length - 1) {
      const newArr = arr.slice(0, layer + 1)
      selectedArr.value = newArr
    }
    
    const result = JSON.parse(JSON.stringify(selectedArr.value))
    const lastItem = result[result.length - 1] || {}
    let text = ''
    
    result.forEach(item => {
      text += item[props.textField]
      delete item.list
    })
    
    emit('complete', {
      result: result,
      [props.valueField]: lastItem[props.valueField],
      [props.textField]: text,
      [props.subTextField]: lastItem[props.subTextField],
      [props.srcField]: lastItem[props.srcField]
    })
  } else {
    // 重置数据
    const item: SelectedItem[] = [{
      [props.textField]: props.text,
      [props.subTextField]: '',
      [props.valueField]: '',
      [props.srcField]: '',
      index: -1,
      list: data
    }]
    
    if (layer === -1) {
      selectedArr.value = item
    } else {
      const retainArr = selectedArr.value.slice(0, layer + 1) || []
      selectedArr.value = retainArr.concat(item)
    }
    
    const current = selectedArr.value.length - 1
    nextTick(() => {
      setTimeout(() => {
        currentTab.value = current
      }, 50)
    })
  }
}

watch(() => props.itemList, (val) => {
  initData(val, -1)
})

watch(() => props.receiveData, (val) => {
  subLevelData(val, currentTab.value)
})

watch(() => props.reset, () => {
  initData(props.itemList, -1)
})

watch(() => props.defaultItemList, (val) => {
  setDefaultData(val)
})

onMounted(() => {
  setDefaultData(props.defaultItemList)
})
</script>

<style scoped lang="scss">
$color-primary: #5677fc;
$color-text-primary: #333;
$color-text-secondary: #666;
$color-border-light: #eee;

.y-cascade-selection {
  width: 100%;
  box-sizing: border-box;
}

.y-selection-header-wrapper {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  
  &::after {
    width: 100%;
    content: '';
    position: absolute;
    border-bottom: 1px solid #eaeef1;
    transform: scaleY(0.5) translateZ(0);
    transform-origin: 0 100%;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  }
  
  &.y-btm-none::after {
    border-bottom: 0 !important;
  }
}

.y-selection-header {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

.y-header-item {
  max-width: 120px;
  padding: 8px 15px;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

.y-font-bold {
  font-weight: bold;
}

.y-active-line {
  width: 30px;
  height: 3px;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.y-selection-content {
  position: relative;
  overflow: hidden;
}

.y-selection-panel {
  overflow-y: auto;
  overflow-x: hidden;
}

.y-selection-cell {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.y-icon-success {
  margin-right: 6px;
  font-weight: bold;
  flex-shrink: 0;
}

.y-cell-img {
  margin-right: 6px;
  flex-shrink: 0;
  object-fit: cover;
}

.y-cell-title {
  word-break: break-all;
  flex: 1;
}

.y-flex-shrink {
  flex-shrink: 0;
}

.y-cell-sub-title {
  margin-left: 10px;
  word-break: break-all;
  flex-shrink: 0;
}

.y-first-item {
  width: 100%;
}
</style>