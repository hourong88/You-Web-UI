# You-Web UI 文档中心

欢迎来到 You-Web UI 组件库的文档中心！这里包含了完整的组件文档、使用指南和最佳实践。

## 📚 文档结构

### 🎯 组件文档

每个组件都有详细的文档，包含：

- **API 参考**：完整的 Props、Events、Slots 说明
- **使用示例**：丰富的代码示例和演示
- **最佳实践**：推荐的使用方式和注意事项
- **常见问题**：FAQ 和解决方案

#### 📋 基础组件

- [YButton](./src/components/YButton.md) - 按钮组件
- [YCard](./src/components/YCard.md) - 卡片组件
- [YIcon](./src/components/YIcon.md) - 图标组件
- [YImage](./src/components/YImage.md) - 图片组件
- [YText](./src/components/YText.md) - 文本组件

#### 📝 表单组件

- [YInput](./src/components/YInput.md) - 输入框组件
- [YTextarea](./src/components/YTextarea.md) - 多行文本框组件
- [YCheckbox](./src/components/YCheckbox.md) - 多选框组件
- [YPicker](./src/components/YPicker.md) - 联动选择器组件
- [YSwitch](./src/components/YSwitch.md) - 开关组件

#### 🎨 反馈组件

- [YModal](./src/components/YModal.md) - 模态框组件
- [YToast](./src/components/YToast.md) - 轻提示组件
- [YLoading](./src/components/YLoading.md) - 加载组件

#### 📱 布局组件

- [YContainer](./src/components/YContainer.md) - 容器组件
- [YRow](./src/components/YRow.md) - 行组件
- [YCol](./src/components/YCol.md) - 列组件

#### 🧭 导航组件

- [YNavbar](./src/components/YNavbar.md) - 导航栏组件
- [YTabbar](./src/components/YTabbar.md) - 标签栏组件
- [YBreadcrumb](./src/components/YBreadcrumb.md) - 面包屑组件

### 🎨 设计系统

#### 主题系统

You-Web UI 内置了完整的主题系统，支持：

- **浅色主题**：默认的浅色主题
- **深色主题**：适配深色模式
- **自定义主题**：通过 CSS 变量自定义主题

```css
/* 主题变量示例 */
:root {
  --y-primary-color: #007aff;
  --y-success-color: #34c759;
  --y-warning-color: #ff9500;
  --y-error-color: #ff3b30;
  --y-text-color: #000000;
  --y-background-color: #ffffff;
}

/* 深色主题 */
:root[data-theme="dark"] {
  --y-text-color: #ffffff;
  --y-background-color: #000000;
}
```

#### 设计令牌

- **颜色系统**：主色、辅助色、语义色
- **字体系统**：字体族、字号、行高
- **间距系统**：边距、内边距、间隙
- **圆角系统**：不同级别的圆角
- **阴影系统**：层次化的阴影效果

### 🚀 快速开始

#### 1. 安装

```bash
# npm
npm install @you-web/ui-core

# yarn
yarn add @you-web/ui-core

# pnpm
pnpm add @you-web/ui-core
```

#### 2. 引入

```typescript
// 完整引入
import { createApp } from 'vue'
import YouWebUI from '@you-web/ui-core'
import '@you-web/ui-core/dist/style.css'

const app = createApp(App)
app.use(YouWebUI)

// 按需引入
import { YButton, YCard } from '@you-web/ui-core'
```

#### 3. 使用

```vue
<template>
  <div>
    <YButton type="primary" @click="handleClick">
      点击按钮
    </YButton>
    
    <YCard title="卡片标题">
      <p>卡片内容</p>
    </YCard>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### 🎯 最佳实践

#### 1. 组件使用

- **合理选择组件**：根据使用场景选择合适的组件
- **遵循设计规范**：保持界面的一致性
- **考虑用户体验**：提供清晰的反馈和引导
- **支持无障碍**：确保组件可访问性

#### 2. 性能优化

- **按需引入**：只引入需要的组件
- **合理使用插槽**：利用插槽提高组件灵活性
- **避免过度嵌套**：保持组件结构简洁
- **使用缓存**：合理使用 Vue 的缓存机制

#### 3. 主题定制

- **使用 CSS 变量**：通过变量定制主题
- **保持一致性**：确保主题在整个应用中一致
- **考虑对比度**：确保文本和背景有足够对比度
- **测试多主题**：在不同主题下测试组件效果

### 🔧 开发指南

#### 1. 本地开发

```bash
# 克隆项目
git clone https://github.com/hourong88/You-Web-UI.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter @you-web/playground dev

# 启动 Storybook
pnpm --filter @you-web/docs dev
```

#### 2. 组件开发

参考 [贡献指南](../CONTRIBUTING.md) 了解如何开发新组件。

#### 3. 文档编写

- **API 文档**：详细描述组件的 Props、Events、Slots
- **使用示例**：提供丰富的代码示例
- **最佳实践**：分享使用经验和技巧
- **常见问题**：收集和解答常见问题

### 📖 Storybook 文档

我们使用 Storybook 提供交互式的组件文档：

```bash
# 启动 Storybook
pnpm --filter @you-web/docs dev

# 构建 Storybook
pnpm --filter @you-web/docs build
```

Storybook 提供：

- **交互式演示**：实时预览组件效果
- **Props 控制**：通过控件调整组件属性
- **代码示例**：自动生成的代码示例
- **文档集成**：与 Markdown 文档集成

### 🤝 社区支持

#### 获取帮助

- **GitHub Issues**：报告 Bug 和提出功能请求
- **GitHub Discussions**：参与社区讨论
- **文档反馈**：帮助改进文档质量

#### 贡献代码

- **Fork 项目**：创建您的项目副本
- **提交 PR**：贡献代码和文档
- **代码审查**：参与代码审查过程
- **测试反馈**：帮助测试新功能

### 📝 更新日志

查看 [CHANGELOG.md](../CHANGELOG.md) 了解版本更新信息。

### 📄 许可证

本项目采用 [MIT 许可证](../LICENSE)。

---

## 🎯 快速导航

- [🏠 项目主页](../README.md)
- [🚀 快速开始](#🚀-快速开始)
- [📚 组件文档](#📚-文档结构)
- [🎨 设计系统](#🎨-设计系统)
- [🔧 开发指南](#🔧-开发指南)
- [🤝 贡献指南](../CONTRIBUTING.md)

感谢您使用 You-Web UI！如果您有任何问题或建议，欢迎与我们联系。