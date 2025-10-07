# 🚀 快速开始

本指南将帮助您在 5 分钟内快速上手 You-Web UI 组件库。

## 📦 安装

```bash
# 使用 npm
npm install @you-web/ui-core

# 使用 yarn  
yarn add @you-web/ui-core

# 使用 pnpm (推荐)
pnpm add @you-web/ui-core
```

## 🔧 配置

### 1. 全局引入 (推荐新手)

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import YouWebUI from '@you-web/ui-core'
import '@you-web/ui-core/dist/style.css'

const app = createApp(App)
app.use(YouWebUI)
app.mount('#app')
```

### 2. 按需引入 (推荐生产环境)

```vue
<template>
  <div>
    <YButton type="primary">主要按钮</YButton>
    <YCard title="卡片标题">
      <p>卡片内容</p>
    </YCard>
  </div>
</template>

<script setup lang="ts">
import { YButton, YCard } from '@you-web/ui-core'
</script>
```

## 🎯 第一个示例

创建一个简单的登录表单：

```vue
<template>
  <div class="login-form">
    <YCard title="用户登录" style="width: 400px; margin: 50px auto;">
      <div class="form-item">
        <YInput
          v-model="form.username"
          placeholder="请输入用户名"
          prefix-icon="user"
        />
      </div>
      
      <div class="form-item">
        <YInput
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="lock"
        />
      </div>
      
      <div class="form-item">
        <YCheckbox v-model="form.remember">
          记住密码
        </YCheckbox>
      </div>
      
      <div class="form-actions">
        <YButton 
          type="primary" 
          :loading="loading"
          @click="handleLogin"
          block
        >
          登录
        </YButton>
      </div>
    </YCard>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { YCard, YInput, YCheckbox, YButton } from '@you-web/ui-core'

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  // 模拟登录请求
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  console.log('登录信息:', form)
  loading.value = false
}
</script>

<style scoped>
.form-item {
  margin-bottom: 16px;
}

.form-actions {
  margin-top: 24px;
}
</style>
```

## 🎨 主题定制

### 自定义主题色

```scss
// 在你的全局样式文件中
:root {
  --y-primary-color: #1890ff;
  --y-success-color: #52c41a;
  --y-warning-color: #faad14;
  --y-error-color: #f5222d;
}
```

### 深色主题

```vue
<template>
  <div :class="{ 'dark-theme': isDark }">
    <YButton @click="toggleTheme">
      切换主题
    </YButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<style>
.dark-theme {
  --y-bg-color: #1f1f1f;
  --y-text-color: #ffffff;
  --y-border-color: #434343;
}
</style>
```

## 📱 常用组件示例

### 按钮组件

```vue
<template>
  <!-- 基础按钮 -->
  <YButton>默认按钮</YButton>
  <YButton type="primary">主要按钮</YButton>
  <YButton type="success">成功按钮</YButton>
  <YButton type="warning">警告按钮</YButton>
  <YButton type="error">危险按钮</YButton>
  
  <!-- 不同尺寸 -->
  <YButton size="small">小按钮</YButton>
  <YButton size="medium">中按钮</YButton>
  <YButton size="large">大按钮</YButton>
  
  <!-- 状态按钮 -->
  <YButton :loading="true">加载中</YButton>
  <YButton :disabled="true">禁用按钮</YButton>
</template>
```

### 表单组件

```vue
<template>
  <div class="form-demo">
    <!-- 输入框 -->
    <YInput v-model="inputValue" placeholder="请输入内容" />
    
    <!-- 多行文本 -->
    <YTextarea 
      v-model="textareaValue" 
      placeholder="请输入多行文本"
      :rows="4"
    />
    
    <!-- 复选框 -->
    <YCheckbox v-model="checkboxValue">
      同意用户协议
    </YCheckbox>
    
    <!-- 单选框 -->
    <YRadio v-model="radioValue" :options="radioOptions" />
    
    <!-- 开关 -->
    <YSwitch v-model="switchValue" />
    
    <!-- 选择器 -->
    <YPicker 
      v-model="pickerValue"
      :picker-data="pickerData"
      :show="showPicker"
      @confirm="handlePickerConfirm"
      @cancel="showPicker = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const textareaValue = ref('')
const checkboxValue = ref(false)
const radioValue = ref('option1')
const switchValue = ref(false)
const pickerValue = ref([])
const showPicker = ref(false)

const radioOptions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
]

const pickerData = [
  {
    text: '北京',
    value: 'beijing',
    children: [
      { text: '朝阳区', value: 'chaoyang' },
      { text: '海淀区', value: 'haidian' }
    ]
  },
  {
    text: '上海',
    value: 'shanghai',
    children: [
      { text: '浦东新区', value: 'pudong' },
      { text: '黄浦区', value: 'huangpu' }
    ]
  }
]

const handlePickerConfirm = (value) => {
  pickerValue.value = value
  showPicker.value = false
}
</script>
```

## 🔧 开发调试

### 启动开发环境

```bash
# 克隆项目
git clone https://github.com/hourong88/You-Web-UI.git
cd You-Web-UI

# 安装依赖
pnpm install

# 启动 playground
pnpm --filter playground dev

# 启动 Storybook 文档
pnpm --filter docs dev
```

### 查看组件文档

访问 http://localhost:6006 查看 Storybook 文档，包含：
- 📚 完整的 API 文档
- 🎮 交互式示例
- 🎨 样式定制指南
- 💡 最佳实践

## 📚 下一步

现在您已经掌握了基础用法，可以：

1. 📖 **深入学习**: 查看 [完整文档](./OVERVIEW.md)
2. 🎯 **查看示例**: 浏览 [playground](../packages/playground) 中的示例
3. 🎨 **定制主题**: 了解 [主题系统](./THEMING.md)
4. 🤝 **参与贡献**: 阅读 [贡献指南](../CONTRIBUTING.md)

## ❓ 遇到问题？

- 📋 查看 [常见问题](./FAQ.md)
- 🐛 提交 [Issue](https://github.com/hourong88/You-Web-UI/issues)
- 💬 参与 [讨论](https://github.com/hourong88/You-Web-UI/discussions)

## 🎉 开始构建

恭喜！您已经成功配置了 You-Web UI。现在可以开始构建您的应用程序了！

```vue
<template>
  <div class="app">
    <h1>欢迎使用 You-Web UI！</h1>
    <YButton type="primary" @click="celebrate">
      🎉 开始构建
    </YButton>
  </div>
</template>

<script setup>
const celebrate = () => {
  console.log('🚀 开始您的 Vue 3 之旅！')
}
</script>
```

祝您开发愉快！✨