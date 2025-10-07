# YCheckbox 多选框组件

YCheckbox 是一个功能完整的多选框组件，支持单独使用或与 YCheckboxGroup 组合使用，提供丰富的自定义选项和完整的事件支持。

## 基础用法

### 单独使用

```vue
<template>
  <YCheckbox v-model="checked" value="agree" label="我同意用户协议" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

### 组合使用

```vue
<template>
  <YCheckboxGroup v-model="selectedValues">
    <YCheckbox value="apple" label="苹果" />
    <YCheckbox value="banana" label="香蕉" />
    <YCheckbox value="orange" label="橙子" />
  </YCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const selectedValues = ref(['apple'])
</script>
```

## 组件特性

### 🎯 核心功能
- ✅ 支持单独使用（v-model 绑定 boolean）
- ✅ 支持组合使用（YCheckboxGroup 管理多个选项）
- ✅ 完整的双向数据绑定
- ✅ 丰富的自定义样式选项
- ✅ 完整的事件系统

### 🎨 样式定制
- ✅ 自定义选中背景颜色
- ✅ 自定义边框颜色
- ✅ 自定义对号颜色
- ✅ 支持只显示对号模式
- ✅ 支持缩放调整大小
- ✅ 主题系统集成

### ♿ 无障碍支持
- ✅ 键盘导航支持
- ✅ 屏幕阅读器支持
- ✅ 焦点管理
- ✅ ARIA 属性支持

## API 文档

### YCheckbox Props

| 属性名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| `modelValue` | `boolean` | 绑定值（单独使用时） | `false` |
| `value` | `string \| number` | 选项的值（组合使用时） | - |
| `checked` | `boolean` | 当前是否选中 | `false` |
| `triggerGroup` | `boolean` | 当设置 checked 属性值时是否触发父级 change 方法 | `true` |
| `disabled` | `boolean` | 是否禁用 | `false` |
| `color` | `string` | 选中背景颜色 | `#5677fc` |
| `borderColor` | `string` | 未选中时边框颜色 | `#ccc` |
| `isCheckMark` | `boolean` | 是否只展示对号，无边框背景 | `false` |
| `checkMarkColor` | `string` | 对号颜色 | `#fff` |
| `scaleRatio` | `number \| string` | 缩放倍数，改变大小 | `1` |
| `label` | `string` | 标签文本 | - |

### YCheckbox Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中状态发生改变时触发 | `{checked: boolean, value: string \| number}` |
| `update:modelValue` | 双向绑定更新事件 | `checked: boolean` |

### YCheckboxGroup Props

| 属性名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| `modelValue` | `Array<string \| number>` | 绑定值，选中项的值数组 | `[]` |
| `disabled` | `boolean` | 是否禁用整个组 | `false` |
| `direction` | `'horizontal' \| 'vertical'` | 排列方向 | `'vertical'` |
| `color` | `string` | 统一设置选中背景颜色 | `#5677fc` |
| `borderColor` | `string` | 统一设置边框颜色 | `#ccc` |
| `isCheckMark` | `boolean` | 统一设置是否只显示对号 | `false` |
| `checkMarkColor` | `string` | 统一设置对号颜色 | `#fff` |
| `scaleRatio` | `number \| string` | 统一设置缩放倍数 | `1` |

### YCheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中状态发生改变时触发 | `selectedValues: Array<string \| number>` |
| `update:modelValue` | 双向绑定更新事件 | `selectedValues: Array<string \| number>` |

## 使用示例

### 基础多选

```vue
<template>
  <div class="demo">
    <h3>选择你喜欢的水果：</h3>
    <YCheckboxGroup v-model="fruits" @change="handleChange">
      <YCheckbox value="apple" label="🍎 苹果" />
      <YCheckbox value="banana" label="🍌 香蕉" />
      <YCheckbox value="orange" label="🍊 橙子" />
      <YCheckbox value="grape" label="🍇 葡萄" />
    </YCheckboxGroup>
    
    <p>已选择：{{ fruits.join(', ') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fruits = ref(['apple'])

const handleChange = (selectedValues) => {
  console.log('选择变化：', selectedValues)
}
</script>
```

### 水平排列

```vue
<template>
  <YCheckboxGroup v-model="hobbies" direction="horizontal">
    <YCheckbox value="reading" label="📚 阅读" />
    <YCheckbox value="music" label="🎵 音乐" />
    <YCheckbox value="sports" label="⚽ 运动" />
    <YCheckbox value="travel" label="✈️ 旅行" />
  </YCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const hobbies = ref([])
</script>
```

### 自定义颜色

```vue
<template>
  <div class="demo">
    <!-- 红色主题 -->
    <YCheckboxGroup v-model="redTheme" color="#ff4757">
      <YCheckbox value="option1" label="红色主题选项1" />
      <YCheckbox value="option2" label="红色主题选项2" />
    </YCheckboxGroup>
    
    <!-- 绿色主题 -->
    <YCheckboxGroup v-model="greenTheme" color="#2ed573">
      <YCheckbox value="option1" label="绿色主题选项1" />
      <YCheckbox value="option2" label="绿色主题选项2" />
    </YCheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const redTheme = ref([])
const greenTheme = ref(['option1'])
</script>
```

### 自定义样式

```vue
<template>
  <YCheckboxGroup 
    v-model="customStyle"
    color="#9c88ff"
    border-color="#ff6b6b"
    check-mark-color="#feca57"
  >
    <YCheckbox value="custom1" label="自定义样式1" />
    <YCheckbox value="custom2" label="自定义样式2" />
  </YCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const customStyle = ref([])
</script>
```

### 只显示对号模式

```vue
<template>
  <YCheckboxGroup v-model="checkMarkOnly" is-check-mark>
    <YCheckbox value="mark1" label="只显示对号1" />
    <YCheckbox value="mark2" label="只显示对号2" />
    <YCheckbox value="mark3" label="只显示对号3" />
  </YCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const checkMarkOnly = ref(['mark1'])
</script>
```

### 不同尺寸

```vue
<template>
  <div class="demo">
    <!-- 小尺寸 -->
    <YCheckboxGroup v-model="smallSize" scale-ratio="0.8">
      <YCheckbox value="small1" label="小尺寸选项1" />
      <YCheckbox value="small2" label="小尺寸选项2" />
    </YCheckboxGroup>
    
    <!-- 标准尺寸 -->
    <YCheckboxGroup v-model="normalSize">
      <YCheckbox value="normal1" label="标准尺寸选项1" />
      <YCheckbox value="normal2" label="标准尺寸选项2" />
    </YCheckboxGroup>
    
    <!-- 大尺寸 -->
    <YCheckboxGroup v-model="largeSize" scale-ratio="1.5">
      <YCheckbox value="large1" label="大尺寸选项1" />
      <YCheckbox value="large2" label="大尺寸选项2" />
    </YCheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const smallSize = ref([])
const normalSize = ref(['normal1'])
const largeSize = ref([])
</script>
```

### 禁用状态

```vue
<template>
  <div class="demo">
    <!-- 整组禁用 -->
    <YCheckboxGroup v-model="disabledGroup" disabled>
      <YCheckbox value="disabled1" label="整组禁用选项1" />
      <YCheckbox value="disabled2" label="整组禁用选项2" />
    </YCheckboxGroup>
    
    <!-- 单个禁用 -->
    <YCheckboxGroup v-model="partialDisabled">
      <YCheckbox value="normal" label="正常选项" />
      <YCheckbox value="disabled" label="单个禁用选项" disabled />
    </YCheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabledGroup = ref(['disabled1'])
const partialDisabled = ref(['normal'])
</script>
```

### 单独使用

```vue
<template>
  <div class="demo">
    <YCheckbox v-model="agreement" value="agree" label="我已阅读并同意用户协议" />
    <YCheckbox v-model="newsletter" value="subscribe" label="订阅邮件通知" />
    <YCheckbox v-model="privacy" value="privacy" label="我同意隐私政策" />
    
    <div class="result">
      <p>用户协议：{{ agreement ? '已同意' : '未同意' }}</p>
      <p>邮件通知：{{ newsletter ? '已订阅' : '未订阅' }}</p>
      <p>隐私政策：{{ privacy ? '已同意' : '未同意' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const agreement = ref(false)
const newsletter = ref(true)
const privacy = ref(false)
</script>
```

### 事件监听

```vue
<template>
  <div class="demo">
    <YCheckboxGroup v-model="eventDemo" @change="handleGroupChange">
      <YCheckbox 
        value="event1" 
        label="事件监听选项1" 
        @change="handleItemChange"
      />
      <YCheckbox 
        value="event2" 
        label="事件监听选项2" 
        @change="handleItemChange"
      />
    </YCheckboxGroup>
    
    <div class="event-log">
      <h4>事件日志：</h4>
      <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventDemo = ref([])
const eventLogs = ref([])

const handleGroupChange = (selectedValues) => {
  eventLogs.value.unshift(`组变化: [${selectedValues.join(', ')}]`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

const handleItemChange = ({ checked, value }) => {
  eventLogs.value.unshift(`单项变化: ${value} = ${checked}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}
</script>

<style scoped>
.event-log {
  margin-top: 20px;
  padding: 16px;
  background: var(--color-background-secondary);
  border-radius: 8px;
}

.log-item {
  padding: 4px 0;
  font-family: monospace;
  font-size: 14px;
  color: var(--color-text-secondary);
}
</style>
```

## 样式定制

### CSS 变量

YCheckbox 组件支持通过 CSS 变量进行样式定制：

```scss
.custom-checkbox {
  --checkbox-size: 20px;
  --checkbox-border-radius: 4px;
  --checkbox-border-width: 2px;
  --checkbox-transition: all 0.2s ease;
  
  // 选中状态
  --checkbox-checked-bg: #5677fc;
  --checkbox-checked-border: #5677fc;
  --checkbox-checkmark-color: #ffffff;
  
  // 未选中状态
  --checkbox-unchecked-bg: transparent;
  --checkbox-unchecked-border: #cccccc;
  
  // 禁用状态
  --checkbox-disabled-bg: #f5f5f5;
  --checkbox-disabled-border: #e0e0e0;
  --checkbox-disabled-text: #999999;
  
  // 悬停状态
  --checkbox-hover-border: #5677fc;
  --checkbox-hover-shadow: 0 0 0 2px rgba(86, 119, 252, 0.1);
}
```

### 主题适配

组件完全支持主题系统，会自动适配浅色和深色主题：

```scss
// 浅色主题
:root[data-theme="light"] {
  --checkbox-unchecked-border: #e5e7eb;
  --checkbox-disabled-bg: #f9fafb;
  --checkbox-text-color: #374151;
}

// 深色主题
:root[data-theme="dark"] {
  --checkbox-unchecked-border: #4b5563;
  --checkbox-disabled-bg: #1f2937;
  --checkbox-text-color: #d1d5db;
}
```

## 最佳实践

### 1. 选项数量建议
- **少量选项（2-5个）**：推荐垂直排列
- **中等选项（6-10个）**：可考虑水平排列或分组
- **大量选项（10+个）**：建议使用搜索或分类功能

### 2. 标签文本
- 使用清晰、简洁的标签文本
- 避免过长的标签，必要时使用省略号
- 考虑添加图标或emoji增强可读性

### 3. 默认选中
- 谨慎设置默认选中项
- 考虑用户的常见选择
- 避免预选可能产生费用的选项

### 4. 禁用状态
- 明确告知用户为什么某个选项被禁用
- 考虑使用工具提示说明禁用原因
- 禁用的选项应该在视觉上明显区分

### 5. 响应式设计
- 在移动端考虑增大点击区域
- 合理调整组件间距
- 考虑使用水平滚动处理过多选项

## 无障碍支持

YCheckbox 组件遵循 WCAG 2.1 标准，提供完整的无障碍支持：

### 键盘导航
- `Tab` / `Shift + Tab`：在选项间切换焦点
- `Space`：切换当前焦点项的选中状态
- `Arrow Keys`：在组内快速导航（可选）

### 屏幕阅读器
- 正确的 `role` 和 `aria-*` 属性
- 选中状态的语音反馈
- 禁用状态的明确提示

### 焦点管理
- 清晰的焦点指示器
- 合理的焦点顺序
- 焦点陷阱处理

## 常见问题

### Q: 如何实现全选/取消全选功能？

```vue
<template>
  <div>
    <YCheckbox 
      v-model="selectAll" 
      label="全选" 
      @change="handleSelectAll"
    />
    <YCheckboxGroup v-model="selectedItems" @change="handleItemsChange">
      <YCheckbox 
        v-for="item in allItems" 
        :key="item.value"
        :value="item.value" 
        :label="item.label" 
      />
    </YCheckboxGroup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const allItems = [
  { value: 'item1', label: '选项1' },
  { value: 'item2', label: '选项2' },
  { value: 'item3', label: '选项3' }
]

const selectedItems = ref([])

const selectAll = computed({
  get: () => selectedItems.value.length === allItems.length,
  set: (value) => {
    selectedItems.value = value ? allItems.map(item => item.value) : []
  }
})

const handleSelectAll = ({ checked }) => {
  selectedItems.value = checked ? allItems.map(item => item.value) : []
}

const handleItemsChange = (values) => {
  // 自动更新全选状态
}
</script>
```

### Q: 如何限制最大选择数量？

```vue
<template>
  <YCheckboxGroup v-model="limitedSelection" @change="handleLimitedChange">
    <YCheckbox 
      v-for="item in items" 
      :key="item.value"
      :value="item.value" 
      :label="item.label"
      :disabled="isItemDisabled(item.value)"
    />
  </YCheckboxGroup>
  <p>已选择 {{ limitedSelection.length }}/{{ maxSelection }} 项</p>
</template>

<script setup>
import { ref } from 'vue'

const maxSelection = 3
const limitedSelection = ref([])
const items = [
  { value: 'item1', label: '选项1' },
  { value: 'item2', label: '选项2' },
  { value: 'item3', label: '选项3' },
  { value: 'item4', label: '选项4' },
  { value: 'item5', label: '选项5' }
]

const isItemDisabled = (value) => {
  return limitedSelection.value.length >= maxSelection && 
         !limitedSelection.value.includes(value)
}

const handleLimitedChange = (values) => {
  if (values.length <= maxSelection) {
    limitedSelection.value = values
  }
}
</script>
```

### Q: 如何实现动态选项？

```vue
<template>
  <div>
    <button @click="addOption">添加选项</button>
    <YCheckboxGroup v-model="dynamicSelection">
      <YCheckbox 
        v-for="option in dynamicOptions" 
        :key="option.id"
        :value="option.value" 
        :label="option.label" 
      />
    </YCheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dynamicSelection = ref([])
const dynamicOptions = ref([
  { id: 1, value: 'option1', label: '选项1' }
])

let nextId = 2

const addOption = () => {
  dynamicOptions.value.push({
    id: nextId,
    value: `option${nextId}`,
    label: `选项${nextId}`
  })
  nextId++
}
</script>
```

## 更新日志

### v2.2.0
- ✅ 新增 `triggerGroup` 属性，控制是否触发父级change方法
- ✅ 优化响应式数据处理
- ✅ 改进主题系统集成
- ✅ 增强无障碍支持

### v2.1.0
- ✅ 新增 YCheckboxGroup 组件
- ✅ 支持水平/垂直布局
- ✅ 新增批量样式配置

### v2.0.0
- ✅ 基于 Vue 3 重构
- ✅ 完整的 TypeScript 支持
- ✅ 新增主题系统支持
- ✅ 优化性能和体验

---

## 相关组件

- [YRadio 单选框组件](./YRadio.md) - 单选功能
- [YSwitch 开关组件](./YSwitch.md) - 开关切换
- [YButton 按钮组件](./YButton.md) - 按钮操作