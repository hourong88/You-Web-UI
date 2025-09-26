# 主题系统和设计令牌

## 概述

我们为 You-Web UI Playground 项目实现了完整的主题系统和设计令牌，支持浅色主题、深色主题和跟随系统主题。

## 功能特性

### 🎨 设计令牌系统
- **统一的设计语言**：基于现代设计系统的令牌化方法
- **完整的颜色系统**：包含主色调、语义色、中性色等完整色彩体系
- **响应式间距**：标准化的间距系统
- **字体系统**：统一的字体族、大小、行高和字重
- **组件令牌**：针对不同组件的专用设计令牌

### 🌓 主题切换功能
- **三种主题模式**：
  - 浅色主题（Light）
  - 深色主题（Dark）  
  - 跟随系统（Auto）
- **智能切换**：自动检测系统主题偏好
- **持久化存储**：主题选择自动保存到本地存储
- **平滑过渡**：主题切换时的流畅动画效果

## 文件结构

```
packages/playground/src/
├── styles/
│   ├── design-tokens.scss     # 设计令牌定义
│   ├── variables.scss         # 兼容性变量（更新为使用CSS变量）
│   └── common.scss           # 公共样式
├── composables/
│   └── useTheme.ts           # 主题管理逻辑
└── components/
    └── ThemeToggle.vue       # 主题切换组件
```

## 使用方法

### 1. 在组件中使用设计令牌

```scss
.my-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
  transition: all var(--transition-base);
}
```

### 2. 在Vue组件中使用主题管理

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { currentTheme, appliedTheme, setTheme, toggleTheme } = useTheme()
</script>
```

### 3. 添加主题切换按钮

```vue
<template>
  <ThemeToggle />
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
```

## 设计令牌分类

### 颜色令牌
- **品牌色**：`--color-primary-*` 系列
- **语义色**：`--color-success-*`、`--color-warning-*`、`--color-error-*`
- **中性色**：`--color-gray-*` 系列
- **文本色**：`--color-text-*` 系列
- **背景色**：`--color-bg-*` 系列
- **边框色**：`--color-border-*` 系列

### 间距令牌
- 基础间距：`--spacing-1` 到 `--spacing-24`
- 语义化间距：适用于不同场景的间距值

### 字体令牌
- **字体族**：`--font-family-sans`、`--font-family-mono`
- **字体大小**：`--font-size-xs` 到 `--font-size-4xl`
- **字重**：`--font-weight-light` 到 `--font-weight-bold`
- **行高**：`--line-height-tight`、`--line-height-normal`、`--line-height-relaxed`

### 其他令牌
- **圆角**：`--radius-*` 系列
- **阴影**：`--shadow-*` 系列
- **过渡**：`--transition-*` 系列
- **层级**：`--z-*` 系列

## 主题定制

### 浅色主题
```scss
:root[data-theme="light"] {
  --color-primary: var(--color-primary-500);
  --color-text-primary: var(--color-gray-900);
  --color-bg-primary: #ffffff;
  // ... 更多变量
}
```

### 深色主题
```scss
:root[data-theme="dark"] {
  --color-primary: var(--color-primary-400);
  --color-text-primary: var(--color-gray-100);
  --color-bg-primary: var(--color-gray-900);
  // ... 更多变量
}
```

## 最佳实践

1. **优先使用设计令牌**：避免硬编码颜色和尺寸值
2. **语义化命名**：使用语义化的令牌名称而非具体值
3. **保持一致性**：在整个项目中使用统一的设计令牌
4. **响应式设计**：利用令牌系统实现一致的响应式体验
5. **主题兼容**：确保组件在所有主题下都有良好的视觉效果

## 技术实现

- **CSS 变量**：使用原生CSS变量实现主题切换
- **Vue 3 Composition API**：使用组合式API管理主题状态
- **TypeScript**：完整的类型支持
- **本地存储**：主题偏好持久化
- **系统主题检测**：自动检测用户系统主题偏好

## 浏览器兼容性

- 现代浏览器：完全支持
- IE 11+：基础支持（需要CSS变量polyfill）
- 移动端：完全支持

---

通过这套主题系统，You-Web UI 项目现在具备了现代化的主题切换能力和统一的设计语言系统。

主题系统实现

完整的设计令牌系统：创建了统一的颜色、间距、字体、动效令牌
三种主题模式：浅色、深色、跟随系统主题
全局主题切换：主页和所有内页都正确响应主题切换
智能主题管理：自动检测系统偏好，持久化存储用户选择
组件库集成：you-ui-core 组件库完全支持主题切换
平滑过渡动画：所有元素都有流畅的主题切换效果

📝 文档完善

主题系统介绍：详细说明了主题特性和效果预览
使用指南：提供了完整的集成和使用示例
设计令牌文档：展示了颜色、间距、动效令牌的定义
自定义主题指南：说明如何创建自定义品牌主题
中英文双语：完整的中英文文档支持

🎯 技术亮点

CSS变量驱动：使用原生CSS变量实现主题切换
Vue 3 Composition API：现代化的状态管理
TypeScript支持：完整的类型定义
响应式设计：移动端完美适配
无障碍支持：符合现代Web标准