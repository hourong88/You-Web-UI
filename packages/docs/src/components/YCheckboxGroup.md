# YCheckboxGroup 多选框组合组件

YCheckboxGroup 是 YCheckbox 的容器组件，用于管理多个复选框的状态，提供统一的配置和事件处理。

## 快速开始

```vue
<template>
  <YCheckboxGroup v-model="selectedValues">
    <YCheckbox value="option1" label="选项1" />
    <YCheckbox value="option2" label="选项2" />
    <YCheckbox value="option3" label="选项3" />
  </YCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'
import { YCheckboxGroup, YCheckbox } from '@you-web/ui-core'

const selectedValues = ref(['option1'])
</script>
```

## 主要特性

- 🎯 **统一管理**：集中管理多个复选框的状态
- 🎨 **批量配置**：统一设置样式和行为
- 📐 **灵活布局**：支持水平和垂直排列
- 🔄 **双向绑定**：完整的 v-model 支持
- 🎭 **主题适配**：完美支持主题系统

## API 参考

详细的 API 文档请参考 [YCheckbox 组件文档](./YCheckbox.md#api-文档)。

## 使用场景

### 1. 兴趣爱好选择
```vue
<template>
  <div class="hobby-selector">
    <h3>选择你的兴趣爱好：</h3>
    <YCheckboxGroup v-model="hobbies" direction="horizontal">
      <YCheckbox value="reading" label="📚 阅读" />
      <YCheckbox value="music" label="🎵 音乐" />
      <YCheckbox value="sports" label="⚽ 运动" />
      <YCheckbox value="travel" label="✈️ 旅行" />
      <YCheckbox value="cooking" label="🍳 烹饪" />
      <YCheckbox value="photography" label="📷 摄影" />
    </YCheckboxGroup>
  </div>
</template>
```

### 2. 权限配置
```vue
<template>
  <div class="permission-config">
    <h3>用户权限配置：</h3>
    <YCheckboxGroup v-model="permissions">
      <YCheckbox value="read" label="🔍 查看权限" />
      <YCheckbox value="write" label="✏️ 编辑权限" />
      <YCheckbox value="delete" label="🗑️ 删除权限" />
      <YCheckbox value="admin" label="👑 管理员权限" />
    </YCheckboxGroup>
  </div>
</template>
```

### 3. 商品筛选
```vue
<template>
  <div class="product-filter">
    <h3>商品筛选：</h3>
    
    <!-- 品牌筛选 -->
    <div class="filter-group">
      <h4>品牌：</h4>
      <YCheckboxGroup v-model="selectedBrands" direction="horizontal">
        <YCheckbox value="apple" label="Apple" />
        <YCheckbox value="samsung" label="Samsung" />
        <YCheckbox value="huawei" label="Huawei" />
        <YCheckbox value="xiaomi" label="Xiaomi" />
      </YCheckboxGroup>
    </div>
    
    <!-- 价格区间 -->
    <div class="filter-group">
      <h4>价格区间：</h4>
      <YCheckboxGroup v-model="priceRanges">
        <YCheckbox value="0-1000" label="0-1000元" />
        <YCheckbox value="1000-3000" label="1000-3000元" />
        <YCheckbox value="3000-5000" label="3000-5000元" />
        <YCheckbox value="5000+" label="5000元以上" />
      </YCheckboxGroup>
    </div>
  </div>
</template>
```

## 高级用法

### 动态选项加载
```vue
<template>
  <div class="dynamic-options">
    <YCheckboxGroup v-model="selectedOptions" :disabled="loading">
      <YCheckbox 
        v-for="option in options" 
        :key="option.id"
        :value="option.value" 
        :label="option.label" 
      />
    </YCheckboxGroup>
    <YLoading v-if="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedOptions = ref([])
const options = ref([])
const loading = ref(true)

const loadOptions = async () => {
  loading.value = true
  try {
    // 模拟 API 调用
    const response = await fetch('/api/options')
    options.value = await response.json()
  } finally {
    loading.value = false
  }
}

onMounted(loadOptions)
</script>
```

### 条件禁用
```vue
<template>
  <YCheckboxGroup v-model="selectedFeatures">
    <YCheckbox 
      v-for="feature in features" 
      :key="feature.value"
      :value="feature.value" 
      :label="feature.label"
      :disabled="isFeatureDisabled(feature)"
    />
  </YCheckboxGroup>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFeatures = ref([])
const userLevel = ref('basic') // basic, premium, enterprise

const features = [
  { value: 'basic-feature', label: '基础功能', requiredLevel: 'basic' },
  { value: 'advanced-feature', label: '高级功能', requiredLevel: 'premium' },
  { value: 'enterprise-feature', label: '企业功能', requiredLevel: 'enterprise' }
]

const levelHierarchy = { basic: 0, premium: 1, enterprise: 2 }

const isFeatureDisabled = (feature) => {
  return levelHierarchy[userLevel.value] < levelHierarchy[feature.requiredLevel]
}
</script>
```

## 样式定制示例

### 卡片式布局
```vue
<template>
  <YCheckboxGroup v-model="cardSelection" class="card-checkbox-group">
    <YCheckbox 
      v-for="plan in plans" 
      :key="plan.value"
      :value="plan.value" 
      :label="plan.name"
      class="card-checkbox"
    >
      <template #label>
        <div class="plan-card">
          <h4>{{ plan.name }}</h4>
          <p class="price">{{ plan.price }}</p>
          <ul class="features">
            <li v-for="feature in plan.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
        </div>
      </template>
    </YCheckbox>
  </YCheckboxGroup>
</template>

<style scoped>
.card-checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.card-checkbox {
  border: 2px solid var(--color-border-primary);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.card-checkbox:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-checkbox.checked {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.plan-card h4 {
  margin: 0 0 8px 0;
  color: var(--color-text-primary);
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0 0 16px 0;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  padding: 4px 0;
  color: var(--color-text-secondary);
}

.features li::before {
  content: '✓';
  color: var(--color-success);
  margin-right: 8px;
}
</style>
```

## 相关链接

- [YCheckbox 单个复选框](./YCheckbox.md)
- [YRadio 单选框组件](./YRadio.md)
- [YSwitch 开关组件](./YSwitch.md)