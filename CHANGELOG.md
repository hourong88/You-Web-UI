# You-Web UI 更新日志

本文档记录了 You-Web UI 项目的所有重要变更。

基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 格式，本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [未发布]

### 变更
- 项目重新定位为 Vue 3 Web 组件库
- 更新项目名称为 You-Web UI
- 更新平台支持说明，专注于现代浏览器支持
- 完善开源项目文档结构
- 添加贡献指南 (CONTRIBUTING.md)
- 添加行为准则 (CODE_OF_CONDUCT.md)
- 配置 GitHub Issue 和 PR 模板
- 添加更新日志文档

## [1.0.0] - 2024-01-XX

### 新增
- 🎉 项目初始化
- ✨ 基础组件库架构搭建
- 📦 Monorepo 项目结构 (pnpm workspace)
- 🔧 开发工具链配置 (TypeScript, ESLint, Prettier, Husky)

#### 核心组件
- **YButton** - 按钮组件
  - 支持多种类型：primary, secondary, success, warning, danger
  - 支持不同尺寸：small, medium, large
  - 支持加载状态和禁用状态
  - 支持图标按钮

- **YCard** - 卡片容器组件
  - 支持标题、副标题、内容区域
  - 支持操作区域自定义
  - 支持阴影效果配置
  - 响应式设计

- **YCell** - 单元格组件
  - 支持标题、描述、值显示
  - 支持左侧图标和右侧箭头
  - 支持点击事件
  - 适用于列表和表单场景

- **YInput** - 输入框组件
  - 支持多种输入类型
  - 支持占位符和标签
  - 支持清除按钮
  - 支持禁用和只读状态
  - 完整的表单验证支持

- **YList** - 列表组件
  - 支持基础列表展示
  - 与 YCell 组件完美配合
  - 支持分组和分割线

- **YLoading** - 加载组件
  - 多种加载动画效果
  - 支持自定义颜色和尺寸
  - 支持文本提示
  - 支持全屏和局部加载

- **YSwipeAction** - 滑动操作组件
  - 支持左滑显示操作按钮
  - 支持多个操作按钮
  - 支持自定义按钮样式和图标
  - 支持禁用滑动功能
  - 修复 action.name undefined 问题

#### 开发环境
- **Playground** - 组件预览和测试环境
  - 基于 Vite + Vue 3 构建
  - 实时预览组件效果
  - 支持热更新开发

- **Storybook 文档系统**
  - 完整的组件文档和 API 说明
  - 交互式组件演示
  - 支持多种使用场景展示
  - 响应式文档界面

#### 项目配置
- **多端支持**：H5、微信小程序、支付宝小程序、App
- **TypeScript**：完整的类型支持
- **构建工具**：Vite 构建，支持 Tree Shaking
- **代码质量**：ESLint + Prettier + Husky 预提交检查
- **包管理**：pnpm workspace 管理多包项目

#### 文档和示例
- 📖 完整的 README 文档
- 🖼️ 组件效果截图展示
- 📚 Storybook 组件文档
- 🎯 使用示例和最佳实践

### 技术栈
- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **包管理**：pnpm
- **代码规范**：ESLint + Prettier
- **Git 钩子**：Husky + lint-staged
- **文档系统**：Storybook
- **CSS 处理**：PostCSS + Sass

### 平台支持
- ✅ H5 (现代浏览器)
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ uni-app 原生应用
- 🔄 其他小程序平台 (持续适配中)

---

## 版本说明

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

请查看 [贡献指南](CONTRIBUTING.md) 了解更多信息。