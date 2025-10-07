# 📦 安装指南

本指南将详细介绍如何在不同环境中安装和配置 You-Web UI 组件库。

## 🎯 环境要求

### 基础要求
- **Node.js**: >= 16.0.0
- **Vue**: >= 3.0.0
- **TypeScript**: >= 4.5.0 (可选，但推荐)

### 包管理器
- **npm**: >= 7.0.0
- **yarn**: >= 1.22.0
- **pnpm**: >= 7.0.0 (推荐)

### 浏览器支持
- **Chrome**: >= 80
- **Firefox**: >= 78
- **Safari**: >= 14
- **Edge**: >= 80

## 📦 安装方式

### 方式一：NPM 安装（推荐）

```bash
# 使用 npm
npm install @you-web/ui-core

# 使用 yarn
yarn add @you-web/ui-core

# 使用 pnpm（推荐）
pnpm add @you-web/ui-core
```

### 方式二：CDN 引入

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@you-web/ui-core/dist/style.css">

<!-- 引入组件库 -->
<script src="https://unpkg.com/@you-web/ui-core/dist/index.umd.js"></script>
```

## 🔧 项目配置

### Vue 3 + Vite 项目

#### 1. 创建项目
```bash
npm create vue@latest my-project
cd my-project
npm install
npm install @you-web/ui-core
```

#### 2. 配置 main.ts
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import YouWebUI from '@you-web/ui-core'
import '@you-web/ui-core/dist/style.css'

const app = createApp(App)
app.use(YouWebUI)
app.mount('#app')
```

### TypeScript 项目配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve"
  }
}
```

## 🎨 样式配置

### 完整样式引入
```typescript
import '@you-web/ui-core/dist/style.css'
```

### 自定义主题变量
```scss
:root {
  --y-primary-color: #007aff;
  --y-success-color: #34c759;
  --y-warning-color: #ff9500;
  --y-error-color: #ff3b30;
}
```

## 🚀 按需引入配置

### 手动按需引入
```typescript
import { YButton, YCard, YInput } from '@you-web/ui-core'

export default {
  components: {
    YButton,
    YCard,
    YInput
  }
}
```

## 📋 安装验证

创建测试页面验证安装：

```vue
<template>
  <div class="test-page">
    <h1>You-Web UI 安装测试</h1>
    <YButton type="primary" @click="showMessage">测试按钮</YButton>
    <YCard title="测试卡片">
      <p>如果您能看到这个卡片，说明 You-Web UI 已成功安装！</p>
    </YCard>
  </div>
</template>

<script setup lang="ts">
import { YButton, YCard } from '@you-web/ui-core'

const showMessage = () => {
  alert('You-Web UI 安装成功！')
}
</script>
```

## 🐛 常见问题

### 问题 1: 安装失败
```bash
# 错误信息
npm ERR! peer dep missing: vue@^3.0.0

# 解决方案
npm install vue@^3.0.0 @you-web/ui-core
```

### 问题 2: 样式不生效
```typescript
// 确保正确引入样式文件
import '@you-web/ui-core/dist/style.css'
```

### 问题 3: TypeScript 类型错误
```bash
# 安装类型依赖
npm install @types/node -D
```

## 📞 获取帮助

如果遇到安装问题，请：
1. 查看 [常见问题文档](./FAQ.md)
2. 提交 [Issue](https://github.com/hourong88/You-Web-UI/issues)
3. 参与 [讨论](https://github.com/hourong88/You-Web-UI/discussions)