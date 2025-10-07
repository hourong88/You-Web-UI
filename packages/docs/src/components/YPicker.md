# YPicker 联动选择器组件

YPicker 是一个功能强大的联动选择器组件，支持一级、二级和三级联动选择，提供丰富的自定义选项和流畅的交互体验。

## 特性概览

- 🎯 **多级联动**：支持1-3级数据联动选择
- 🎨 **高度自定义**：丰富的样式和交互配置选项
- 📱 **跨平台兼容**：完美支持桌面端和移动端
- 🔄 **流畅交互**：平滑滚动动画和智能居中
- 🎭 **主题适配**：完整的主题系统支持
- ♿ **无障碍友好**：支持键盘操作和屏幕阅读器

## 快速开始

### 基础用法

```vue
<template>
  <div>
    <button @click="showPicker">选择地区</button>
    
    <YPicker
      v-model:show="pickerShow"
      v-model:value="selectedValue"
      :layer="2"
      :picker-data="areaData"
      title="选择省市"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { YPicker } from '@you-web/ui-core'

const pickerShow = ref(false)
const selectedValue = ref([])

const areaData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      { text: '广州市', value: 'guangzhou' },
      { text: '深圳市', value: 'shenzhen' }
    ]
  }
]

const showPicker = () => {
  pickerShow.value = true
}

const handleConfirm = (data) => {
  console.log('选择结果:', data)
}

const handleCancel = () => {
  console.log('取消选择')
}
</script>
```

## API 文档

### Props

| 属性名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| `layer` | `number \| string` | 数据层级（1-3） | `1` |
| `pickerData` | `Array<PickerItem>` | 数据数组（一次性传入所有数据） | `[]` |
| `textField` | `string` | 显示文本的字段名 | `'text'` |
| `valueField` | `string` | 值的字段名 | `'value'` |
| `childrenField` | `string` | 子级数据的字段名 | `'children'` |
| `show` | `boolean` | 是否显示选择器 | `false` |
| `value` | `Array<string>` | 初始化显示数据（text集合数组） | `[]` |
| `indicatorStyle` | `object` | 选择器选中框样式 | `{}` |
| `maskStyle` | `object` | 蒙层样式 | `{}` |
| `radius` | `boolean` | 是否显示圆角 | `false` |
| `headerBgColor` | `string` | 头部背景色 | `'#ffffff'` |
| `title` | `string` | 标题文本 | `'请选择'` |
| `titleSize` | `string` | 标题字体大小 | `'16px'` |
| `titleColor` | `string` | 标题颜色 | `'#333333'` |
| `confirmText` | `string` | 确认按钮文本 | `'确定'` |
| `confirmColor` | `string` | 确认按钮颜色 | `'#007aff'` |
| `confirmSize` | `string` | 确认按钮字体大小 | `'16px'` |
| `cancelText` | `string` | 取消按钮文本 | `'取消'` |
| `cancelColor` | `string` | 取消按钮颜色 | `'#666666'` |
| `cancelSize` | `string` | 取消按钮字体大小 | `'16px'` |
| `backgroundColor` | `string` | 内容区背景色 | `'#ffffff'` |
| `color` | `string` | 内容区文字颜色 | `'#333333'` |
| `size` | `string` | 内容区字体大小 | `'16px'` |
| `maskClosable` | `boolean` | 点击遮罩是否关闭 | `true` |
| `params` | `any` | 自定义参数 | `undefined` |
| `zIndex` | `number` | 层级控制 | `1000` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `update:show` | 显示状态更新 | `(show: boolean)` |
| `update:value` | 选中值更新 | `(value: string[])` |
| `change` | 选择变化时触发 | `(data: SelectionData)` |
| `confirm` | 确认选择时触发 | `(data: SelectionData)` |
| `cancel` | 取消选择时触发 | `(params?: any)` |
| `hide` | 选择器隐藏时触发 | `(params?: any)` |

### SelectionData 类型

```typescript
interface SelectionData {
  selectedItems: PickerItem[]    // 选中的完整数据项
  selectedValues: any[]          // 选中项的值数组
  selectedTexts: string[]        // 选中项的文本数组
  params?: any                   // 自定义参数
}
```

### PickerItem 类型

```typescript
interface PickerItem {
  text: string                   // 显示文本
  value: any                     // 值
  children?: PickerItem[]        // 子级数据（可选）
  [key: string]: any            // 其他自定义字段
}
```

## 使用示例

### 一级选择器

```vue
<template>
  <YPicker
    v-model:show="colorShow"
    v-model:value="colorValue"
    :layer="1"
    :picker-data="colorData"
    title="选择颜色"
    @confirm="handleColorConfirm"
  />
</template>

<script setup>
const colorData = [
  { text: '红色', value: 'red' },
  { text: '绿色', value: 'green' },
  { text: '蓝色', value: 'blue' }
]
</script>
```

### 二级联动选择器

```vue
<template>
  <YPicker
    v-model:show="areaShow"
    v-model:value="areaValue"
    :layer="2"
    :picker-data="areaData"
    title="选择省市"
    @confirm="handleAreaConfirm"
    @change="handleAreaChange"
  />
</template>

<script setup>
const areaData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      { text: '广州市', value: 'guangzhou' },
      { text: '深圳市', value: 'shenzhen' },
      { text: '珠海市', value: 'zhuhai' }
    ]
  },
  {
    text: '江苏省',
    value: 'jiangsu',
    children: [
      { text: '南京市', value: 'nanjing' },
      { text: '苏州市', value: 'suzhou' },
      { text: '无锡市', value: 'wuxi' }
    ]
  }
]
</script>
```

### 三级联动选择器

```vue
<template>
  <YPicker
    v-model:show="fullAreaShow"
    v-model:value="fullAreaValue"
    :layer="3"
    :picker-data="fullAreaData"
    title="选择省市区"
    @confirm="handleFullAreaConfirm"
  />
</template>

<script setup>
const fullAreaData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      {
        text: '广州市',
        value: 'guangzhou',
        children: [
          { text: '天河区', value: 'tianhe' },
          { text: '越秀区', value: 'yuexiu' },
          { text: '海珠区', value: 'haizhu' }
        ]
      },
      {
        text: '深圳市',
        value: 'shenzhen',
        children: [
          { text: '南山区', value: 'nanshan' },
          { text: '福田区', value: 'futian' },
          { text: '罗湖区', value: 'luohu' }
        ]
      }
    ]
  }
]
</script>
```

### 自定义样式

```vue
<template>
  <YPicker
    v-model:show="customShow"
    v-model:value="customValue"
    :layer="2"
    :picker-data="categoryData"
    title="选择分类"
    :radius="true"
    header-bg-color="#ff6b6b"
    title-color="#ffffff"
    confirm-color="#ffffff"
    cancel-color="#ffffff"
    background-color="#f8f9fa"
    color="#495057"
    @confirm="handleCustomConfirm"
  />
</template>

<script setup>
const categoryData = [
  {
    text: '电子产品',
    value: 'electronics',
    children: [
      { text: '手机', value: 'phone' },
      { text: '电脑', value: 'computer' },
      { text: '平板', value: 'tablet' }
    ]
  }
]
</script>
```

### 自定义字段名

```vue
<template>
  <YPicker
    v-model:show="customFieldShow"
    v-model:value="customFieldValue"
    :layer="2"
    :picker-data="customFieldData"
    text-field="name"
    value-field="id"
    children-field="subItems"
    title="自定义字段"
  />
</template>

<script setup>
const customFieldData = [
  {
    name: '分类A',
    id: 'categoryA',
    subItems: [
      { name: '子项A1', id: 'itemA1' },
      { name: '子项A2', id: 'itemA2' }
    ]
  }
]
</script>
```

### 禁用遮罩关闭

```vue
<template>
  <YPicker
    v-model:show="noMaskShow"
    v-model:value="noMaskValue"
    :layer="2"
    :picker-data="timeData"
    title="选择时间"
    :mask-closable="false"
    @confirm="handleNoMaskConfirm"
    @cancel="handleNoMaskCancel"
  />
</template>

<script setup>
// 当 maskClosable 为 false 时，只能通过确认或取消按钮关闭
const handleNoMaskCancel = () => {
  noMaskShow.value = false
}
</script>
```

### 事件监听

```vue
<template>
  <YPicker
    v-model:show="eventShow"
    v-model:value="eventValue"
    :layer="3"
    :picker-data="areaData"
    title="事件监听"
    :params="{ source: 'event-demo' }"
    @confirm="handleEventConfirm"
    @cancel="handleEventCancel"
    @change="handleEventChange"
    @hide="handleEventHide"
  />
</template>

<script setup>
const handleEventConfirm = (data) => {
  console.log('确认选择:', data)
  // data.selectedItems - 选中的完整数据项
  // data.selectedValues - 选中项的值数组
  // data.selectedTexts - 选中项的文本数组
  // data.params - 自定义参数
}

const handleEventCancel = (params) => {
  console.log('取消选择:', params)
}

const handleEventChange = (data) => {
  console.log('选择变化:', data)
}

const handleEventHide = (params) => {
  console.log('选择器隐藏:', params)
}
</script>
```

## 高级用法

### 动态数据加载

```vue
<template>
  <YPicker
    v-model:show="dynamicShow"
    v-model:value="dynamicValue"
    :layer="3"
    :picker-data="dynamicData"
    title="动态数据"
    @confirm="handleDynamicConfirm"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dynamicData = ref([])

const loadData = async () => {
  try {
    const response = await fetch('/api/area-data')
    dynamicData.value = await response.json()
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

onMounted(loadData)
</script>
```

### 条件联动

```vue
<template>
  <YPicker
    v-model:show="conditionalShow"
    v-model:value="conditionalValue"
    :layer="2"
    :picker-data="conditionalData"
    title="条件联动"
    @change="handleConditionalChange"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const userLevel = ref('basic') // basic, premium, enterprise

const conditionalData = computed(() => {
  const baseData = [
    {
      text: '基础功能',
      value: 'basic',
      children: [
        { text: '功能A', value: 'featureA' },
        { text: '功能B', value: 'featureB' }
      ]
    }
  ]
  
  if (userLevel.value === 'premium' || userLevel.value === 'enterprise') {
    baseData.push({
      text: '高级功能',
      value: 'premium',
      children: [
        { text: '高级功能A', value: 'premiumA' },
        { text: '高级功能B', value: 'premiumB' }
      ]
    })
  }
  
  if (userLevel.value === 'enterprise') {
    baseData.push({
      text: '企业功能',
      value: 'enterprise',
      children: [
        { text: '企业功能A', value: 'enterpriseA' },
        { text: '企业功能B', value: 'enterpriseB' }
      ]
    })
  }
  
  return baseData
})
</script>
```

### 数据验证

```vue
<template>
  <YPicker
    v-model:show="validationShow"
    v-model:value="validationValue"
    :layer="2"
    :picker-data="validationData"
    title="数据验证"
    @confirm="handleValidationConfirm"
  />
</template>

<script setup>
const validateSelection = (data) => {
  // 自定义验证逻辑
  if (data.selectedValues.length < 2) {
    alert('请选择完整的省市信息')
    return false
  }
  
  // 检查特定组合
  if (data.selectedValues[0] === 'beijing' && data.selectedValues[1] === 'dongcheng') {
    alert('该地区暂不支持服务')
    return false
  }
  
  return true
}

const handleValidationConfirm = (data) => {
  if (validateSelection(data)) {
    console.log('验证通过:', data)
    validationShow.value = false
  }
}
</script>
```

## 样式定制

### CSS 变量

YPicker 组件支持通过 CSS 变量进行样式定制：

```scss
.custom-picker {
  // 容器样式
  --picker-bg-color: #ffffff;
  --picker-border-radius: 12px;
  --picker-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  // 头部样式
  --picker-header-bg: #f8f9fa;
  --picker-header-border: #e9ecef;
  --picker-title-color: #495057;
  --picker-title-size: 16px;
  --picker-title-weight: 600;
  
  // 按钮样式
  --picker-confirm-color: #007bff;
  --picker-cancel-color: #6c757d;
  --picker-button-size: 16px;
  --picker-button-weight: 500;
  
  // 内容区样式
  --picker-content-bg: #ffffff;
  --picker-item-height: 40px;
  --picker-item-color: #495057;
  --picker-item-size: 16px;
  --picker-item-selected-color: #007bff;
  --picker-item-selected-bg: rgba(0, 123, 255, 0.1);
  --picker-item-hover-bg: rgba(0, 0, 0, 0.05);
  
  // 指示器样式
  --picker-indicator-border: #e9ecef;
  --picker-indicator-bg: rgba(255, 255, 255, 0.1);
  
  // 遮罩样式
  --picker-mask-bg: rgba(0, 0, 0, 0.5);
  
  // 滚动条样式
  --picker-scrollbar-width: 4px;
  --picker-scrollbar-thumb: rgba(0, 0, 0, 0.1);
  --picker-scrollbar-thumb-hover: rgba(0, 0, 0, 0.2);
}
```

### 主题适配

组件完全支持主题系统，会自动适配浅色和深色主题：

```scss
// 浅色主题
:root[data-theme="light"] {
  --picker-bg-color: #ffffff;
  --picker-header-bg: #f8f9fa;
  --picker-item-color: #495057;
  --picker-indicator-border: #e9ecef;
}

// 深色主题
:root[data-theme="dark"] {
  --picker-bg-color: #2d3748;
  --picker-header-bg: #1a202c;
  --picker-item-color: #e2e8f0;
  --picker-indicator-border: #4a5568;
}
```

### 自定义样式示例

```vue
<template>
  <YPicker
    v-model:show="styledShow"
    v-model:value="styledValue"
    :layer="2"
    :picker-data="styledData"
    class="custom-styled-picker"
    title="自定义样式"
  />
</template>

<style scoped>
.custom-styled-picker {
  --picker-bg-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --picker-header-bg: rgba(255, 255, 255, 0.1);
  --picker-title-color: #ffffff;
  --picker-confirm-color: #ffffff;
  --picker-cancel-color: rgba(255, 255, 255, 0.8);
  --picker-item-color: #ffffff;
  --picker-item-selected-color: #ffd700;
  --picker-item-selected-bg: rgba(255, 215, 0, 0.2);
}
</style>
```

## 最佳实践

### 1. 数据结构设计

```javascript
// ✅ 推荐的数据结构
const goodData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      {
        text: '广州市',
        value: 'guangzhou',
        children: [
          { text: '天河区', value: 'tianhe' }
        ]
      }
    ]
  }
]

// ❌ 避免的数据结构
const badData = [
  {
    name: '广东省', // 不一致的字段名
    id: 'guangdong',
    subItems: [      // 不一致的字段名
      {
        title: '广州市', // 不一致的字段名
        code: 'guangzhou'
      }
    ]
  }
]
```

### 2. 事件处理

```javascript
// ✅ 推荐的事件处理
const handleConfirm = (data) => {
  // 使用解构获取需要的数据
  const { selectedValues, selectedTexts, selectedItems } = data
  
  // 进行数据验证
  if (selectedValues.length < requiredLevel) {
    showError('请选择完整信息')
    return
  }
  
  // 处理业务逻辑
  submitForm({
    area: selectedValues,
    areaText: selectedTexts.join(' - ')
  })
}

// ❌ 避免的事件处理
const badHandleConfirm = (data) => {
  // 直接使用未验证的数据
  submitForm(data.selectedValues[0]) // 可能为 undefined
}
```

### 3. 性能优化

```javascript
// ✅ 大数据量优化
const optimizedData = computed(() => {
  // 懒加载子级数据
  return baseData.map(item => ({
    ...item,
    children: item.children || []
  }))
})

// ✅ 防抖处理
import { debounce } from 'lodash-es'

const debouncedChange = debounce((data) => {
  handleChange(data)
}, 300)
```

### 4. 错误处理

```javascript
// ✅ 完善的错误处理
const handlePickerError = (error) => {
  console.error('选择器错误:', error)
  
  // 显示用户友好的错误信息
  showToast('选择器加载失败，请重试')
  
  // 重置状态
  pickerShow.value = false
  selectedValue.value = []
}
```

### 5. 无障碍支持

```vue
<template>
  <!-- ✅ 添加无障碍属性 -->
  <button 
    @click="showPicker"
    :aria-label="`当前选择: ${selectedText || '未选择'}`"
    aria-haspopup="dialog"
  >
    选择地区
  </button>
  
  <YPicker
    v-model:show="pickerShow"
    :title="pickerTitle"
    role="dialog"
    :aria-label="pickerTitle"
  />
</template>
```

## 常见问题

### Q: 如何实现异步数据加载？

```javascript
const asyncData = ref([])
const loading = ref(false)

const loadAsyncData = async () => {
  loading.value = true
  try {
    const response = await api.getAreaData()
    asyncData.value = response.data
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

// 在需要时加载数据
const showAsyncPicker = () => {
  if (asyncData.value.length === 0) {
    loadAsyncData()
  }
  pickerShow.value = true
}
```

### Q: 如何限制选择层级？

```javascript
const handleChange = (data) => {
  // 限制必须选择到第三级
  if (data.selectedValues.length < 3) {
    // 不允许确认，可以显示提示
    return
  }
  
  // 允许的选择逻辑
  console.log('选择完成:', data)
}
```

### Q: 如何自定义选择器高度？

```scss
.custom-height-picker {
  .y-picker-content {
    height: 300px; // 自定义高度
  }
  
  .y-picker-scroll-container {
    padding: 130px 0; // 调整上下留白
  }
}
```

### Q: 如何处理数据更新？

```javascript
// 监听数据变化，自动重置选择
watch(() => props.pickerData, (newData) => {
  if (newData.length > 0) {
    // 重置选择状态
    selectedValue.value = []
    // 或者保持之前的选择（如果数据中存在）
    validateAndKeepSelection()
  }
}, { deep: true })
```

### Q: 如何实现搜索功能？

```javascript
const searchKeyword = ref('')
const filteredData = computed(() => {
  if (!searchKeyword.value) {
    return originalData.value
  }
  
  return originalData.value.filter(item => 
    item.text.includes(searchKeyword.value)
  ).map(item => ({
    ...item,
    children: item.children?.filter(child =>
      child.text.includes(searchKeyword.value)
    )
  }))
})
```

## 更新日志

### v1.2.0
- ✅ 优化弹窗交互设计，修复选择项渲染问题
- ✅ 完善滚动功能，支持平滑滚动和自动居中
- ✅ 增强跨平台兼容性，改进移动端体验
- ✅ 添加自定义滚动条样式

### v1.1.0
- ✅ 新增三级联动支持
- ✅ 优化数据联动逻辑
- ✅ 改进事件系统
- ✅ 增强样式自定义能力

### v1.0.0
- ✅ 基础的一级、二级联动功能
- ✅ 完整的Props和Events支持
- ✅ 主题系统集成
- ✅ TypeScript类型支持

---

## 相关组件

- [YRadio 单选框组件](./YRadio.md) - 单选功能
- [YCheckbox 多选框组件](./YCheckbox.md) - 多选功能
- [YCascadeSelection 级联选择器](./YCascadeSelection.md) - 另一种级联选择实现