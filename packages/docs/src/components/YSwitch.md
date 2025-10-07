# YSwitch 开关组件

开关选择器。用于在两个互斥对象进行选择，比如开/关。

## 基础用法

```vue
<template>
  <YSwitch v-model="checked" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 不同类型

使用 `type` 属性定义开关的样式类型。

```vue
<template>
  <div>
    <!-- Switch 类型（默认） -->
    <YSwitch v-model="switchValue" type="switch" />
    
    <!-- Checkbox 类型 -->
    <YSwitch v-model="checkboxValue" type="checkbox" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
const checkboxValue = ref(true)
</script>
```

## 禁用状态

使用 `disabled` 属性禁用开关。

```vue
<template>
  <div>
    <YSwitch :disabled="true" :checked="false" />
    <YSwitch :disabled="true" :checked="true" />
  </div>
</template>
```

## 自定义颜色

使用 `color` 属性自定义开关的选中颜色。

```vue
<template>
  <div>
    <YSwitch v-model="value1" color="#ff4757" />
    <YSwitch v-model="value2" color="#2ed573" />
    <YSwitch v-model="value3" color="#ffa726" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
</script>
```

## Checkbox 自定义样式

对于 Checkbox 类型，可以自定义边框颜色和对号颜色。

```vue
<template>
  <YSwitch 
    v-model="checked" 
    type="checkbox" 
    color="#e74c3c"
    border-color="#e74c3c"
    check-mark-color="#fff"
  />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
```

## 不同尺寸

使用 `scale-ratio` 属性控制开关的大小。

```vue
<template>
  <div>
    <YSwitch v-model="value1" :scale-ratio="0.8" />
    <YSwitch v-model="value2" :scale-ratio="1" />
    <YSwitch v-model="value3" :scale-ratio="1.2" />
    <YSwitch v-model="value4" :scale-ratio="1.5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
</script>
```

## 事件监听

开关状态改变时会触发 `change` 事件。

```vue
<template>
  <YSwitch v-model="checked" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)

const handleChange = (event) => {
  console.log('开关状态变更为:', event.detail.value)
}
</script>
```

## 表单集成

开关组件支持 `v-model` 双向绑定，可以方便地集成到表单中。

```vue
<template>
  <form>
    <div class="form-item">
      <label>接收通知</label>
      <YSwitch v-model="formData.notification" name="notification" />
    </div>
    <div class="form-item">
      <label>自动保存</label>
      <YSwitch v-model="formData.autoSave" name="autoSave" />
    </div>
    <div class="form-item">
      <label>深色模式</label>
      <YSwitch v-model="formData.darkMode" name="darkMode" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  notification: true,
  autoSave: false,
  darkMode: false
})
</script>
```

## API

### Props

| 属性名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| name | String | 开关选择器名称 | - |
| checked | Boolean | 是否选中 | false |
| modelValue | Boolean | 绑定值（双向绑定） | false |
| disabled | Boolean | 是否禁用 | false |
| type | String | 样式，有效值：switch, checkbox | switch |
| color | String | switch选中颜色 | #5677fc |
| borderColor | String | 边框颜色，type=checkbox时生效 | #ccc |
| checkMarkColor | String | 对号颜色，type=checkbox时生效 | #fff |
| scaleRatio | Number \| String | 缩放倍数，改变大小 | 1 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | checked 改变时触发 change 事件 | event.detail={ value:checked} |
| update:modelValue | 双向绑定更新事件 | value: boolean |

### Slots

YSwitch 组件不支持插槽。

## 主题定制

YSwitch 组件支持通过 CSS 变量进行主题定制：

```css
:root {
  --y-switch-track-bg: #dfdfdf;
  --y-switch-track-bg-checked: #5677fc;
  --y-switch-thumb-bg: #fdfdfd;
  --y-switch-border-color: #dfdfdf;
  --y-switch-disabled-opacity: 0.5;
}
```

## 无障碍访问

YSwitch 组件支持键盘操作和屏幕阅读器：

- 使用 `Tab` 键聚焦到开关
- 使用 `Space` 或 `Enter` 键切换开关状态
- 支持 `aria-checked` 属性
- 支持 `aria-disabled` 属性