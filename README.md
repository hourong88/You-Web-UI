# You-UniApp

🚀 轻量、简洁的移动端组件库，基于最新技术栈构建，支持多端使用

## ✨ 特性

- 🎯 **现代化技术栈**：基于 Vue 3 + TypeScript + Vite 构建
- 📱 **多端支持**：支持 H5、小程序、App 等多个平台
- 🎨 **轻量简洁**：组件设计简洁，体积小巧
- 🔧 **TypeScript**：完整的 TypeScript 类型支持
- 📖 **完善文档**：提供详细的组件文档和示例
- 🎪 **Storybook**：可视化组件展示和调试

## 🎉 项目背景

在寻找基于最新技术栈且支持多端使用的组件库时，发现市面上缺少满足需求的解决方案，因此决定自己构建一个现代化的移动端组件库。

## 📦 安装

```bash
npm install @you-uniapp/ui-core
# 或
pnpm add @you-uniapp/ui-core
# 或
yarn add @you-uniapp/ui-core
```

## 🚀 快速开始

### 全局引入

```typescript
import { createApp } from 'vue'
import YouUI from '@you-uniapp/ui-core'
import '@you-uniapp/ui-core/dist/style.css'

const app = createApp(App)
app.use(YouUI)
```

### 按需引入

```typescript
import { YButton, YCard } from '@you-uniapp/ui-core'
```

### 在模板中使用

```vue
<template>
  <YButton type="primary" @click="handleClick">点击按钮</YButton>
  <YCard title="卡片标题">
    <p>卡片内容</p>
  </YCard>
</template>
```

## 🎯 支持平台

- ✅ **H5**：完美支持现代浏览器
- ✅ **微信小程序**：支持微信小程序环境
- ✅ **支付宝小程序**：支持支付宝小程序环境
- ✅ **App**：支持 uni-app 打包的原生应用
- 🔄 **其他小程序**：持续适配中

## 📋 组件清单

### ✅ 已完成组件

| 组件 | 说明 | 状态 |
|------|------|------|
| YButton | 按钮组件 | ✅ 已完成 |
| YCard | 卡片容器 | ✅ 已完成 |
| YCell | 单元格组件 | ✅ 已完成 |
| YInput | 输入框组件 | ✅ 已完成 |
| YList | 列表组件 | ✅ 已完成 |
| YLoading | 加载组件 | ✅ 已完成 |
| YSwipeAction | 滑动操作 | ✅ 已完成 |

### 📸 组件预览

以下是组件在实际应用中的效果展示：

#### 组件页面总览
![组件页面](./projectImg/componentPage.png)

#### YCard 卡片组件
![卡片组件](./projectImg/card.png)

#### YCell 单元格组件
![单元格组件](./projectImg/cell.png)

#### YInput 输入框组件
![输入框组件](./projectImg/input.png)

#### YLoading 加载组件
![加载组件](./projectImg/loading.png)

#### YSwipeAction 滑动操作组件
![滑动操作组件](./projectImg/leftMenu.png)

#### 文档系统
![文档系统](./projectImg/doc.png)

### 🚧 待开发组件

我们计划开发以下组件，欢迎社区贡献者参与：

#### 基础组件
- [ ] YIcon - 图标组件
- [ ] YImage - 图片组件
- [ ] YText - 文本组件
- [ ] YDivider - 分割线
- [ ] YTag - 标签组件
- [ ] YBadge - 徽标组件

#### 表单组件
- [ ] YRadio - 单选框
- [ ] YCheckbox - 复选框
- [ ] YSwitch - 开关
- [ ] YSlider - 滑块
- [ ] YRate - 评分
- [ ] YPicker - 选择器
- [ ] YDatePicker - 日期选择器
- [ ] YUpload - 文件上传

#### 反馈组件
- [ ] YToast - 轻提示
- [ ] YModal - 模态框
- [ ] YActionSheet - 动作面板
- [ ] YDialog - 对话框
- [ ] YNotify - 消息通知
- [ ] YProgress - 进度条

#### 展示组件
- [ ] YCollapse - 折叠面板
- [ ] YTabs - 标签页
- [ ] YSwiper - 轮播图
- [ ] YGrid - 宫格
- [ ] YSteps - 步骤条
- [ ] YTimeline - 时间轴

#### 导航组件
- [ ] YNavBar - 导航栏
- [ ] YTabBar - 标签栏
- [ ] YSidebar - 侧边导航
- [ ] YIndexBar - 索引栏
- [ ] YPagination - 分页

#### 业务组件
- [ ] YSearch - 搜索
- [ ] YCalendar - 日历
- [ ] YAddressBook - 通讯录
- [ ] YGoodsAction - 商品导航
- [ ] YSubmitBar - 提交订单栏

## 📖 文档

- **在线文档**：[Storybook 文档](http://localhost:6006/) (本地开发)
- **组件示例**：[Playground 演示](http://localhost:3000/) (本地开发)

### 本地运行文档

```bash
# 克隆项目
git clone https://github.com/your-username/You-UniApp.git
cd You-UniApp

# 安装依赖
pnpm install

# 启动 Storybook 文档
pnpm --filter @you-uniapp/docs dev

# 启动 Playground 示例
pnpm --filter @you-uniapp/playground dev
```

## 🤝 参与贡献

我们非常欢迎社区的贡献！无论是新组件开发、bug 修复、文档完善还是功能建议，都欢迎提交 PR 或 Issue。

### 贡献指南

1. **Fork 项目**到你的 GitHub 账户
2. **创建特性分支**：`git checkout -b feature/new-component`
3. **提交更改**：`git commit -am 'Add new component'`
4. **推送分支**：`git push origin feature/new-component`
5. **提交 Pull Request**

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build

# 运行测试
pnpm test
```

### 组件开发规范

- 使用 Vue 3 Composition API
- 完整的 TypeScript 类型定义
- 遵循统一的命名规范（Y + 组件名）
- 提供完整的 Props 和 Events 文档
- 编写 Storybook 文档和示例
- 确保多端兼容性

## 📄 许可证

[MIT License](./LICENSE)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 联系我们

如果你有任何问题或建议，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/your-username/You-UniApp/issues)
- 发起 [Discussion](https://github.com/your-username/You-UniApp/discussions)

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
