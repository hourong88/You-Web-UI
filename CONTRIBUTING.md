# 贡献指南

感谢您对 You-Web UI 项目的关注和贡献！本指南将帮助您了解如何参与项目开发。

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0
- Git

### 本地开发

1. **Fork 并克隆项目**

```bash
# Fork 项目到您的 GitHub 账户
# 然后克隆到本地
git clone https://github.com/YOUR_USERNAME/You-Web-UI.git
cd You-Web-UI
```

2. **安装依赖**

```bash
# 使用 pnpm 安装依赖
pnpm install
```

3. **启动开发服务器**

```bash
# 启动 Playground 演示
pnpm --filter @you-web/playground dev

# 启动 Storybook 文档
pnpm --filter @you-web/docs dev

# 构建组件库
pnpm --filter @you-web/ui-core build
```

## 📋 项目结构

```
You-Web-UI/
├── packages/
│   ├── you-ui-core/          # 核心组件库
│   │   ├── src/
│   │   │   ├── components/   # 组件源码
│   │   │   ├── styles/       # 样式文件
│   │   │   └── utils/        # 工具函数
│   │   └── dist/             # 构建输出
│   ├── playground/           # 演示项目
│   │   ├── src/
│   │   │   ├── pages/        # 演示页面
│   │   │   └── components/   # 演示组件
│   └── docs/                 # Storybook 文档
│       └── src/
│           └── components/   # 组件文档
├── projectImg/               # 项目图片
└── README.md                 # 项目说明
```

## 🎯 贡献类型

### 1. 新组件开发

#### 组件开发流程

1. **创建组件目录**

```bash
# 在 packages/you-ui-core/src/components/ 下创建新组件
mkdir packages/you-ui-core/src/components/YNewComponent
```

2. **组件文件结构**

```
YNewComponent/
├── YNewComponent.vue         # 组件主文件
├── index.ts                  # 导出文件
└── README.md                 # 组件说明（可选）
```

3. **组件模板**

```vue
<!-- YNewComponent.vue -->
<template>
  <div :class="['y-new-component', componentClass]" :style="componentStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 定义组件属性
  type?: 'default' | 'primary' | 'success'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  disabled: false
})

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const emit = defineEmits<Emits>()

// 计算属性
const componentClass = computed(() => ({
  [`y-new-component--${props.type}`]: true,
  [`y-new-component--${props.size}`]: true,
  'y-new-component--disabled': props.disabled
}))

const componentStyle = computed(() => ({
  // 动态样式
}))

// 方法
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.y-new-component {
  // 组件样式
  
  // 主题适配
  :root[data-theme="dark"] & {
    // 深色主题样式
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    // 移动端样式
  }
}
</style>
```

4. **导出文件**

```typescript
// index.ts
import YNewComponent from './YNewComponent.vue'

export default YNewComponent
export { YNewComponent }
```

5. **添加到组件库**

```typescript
// packages/you-ui-core/src/components/index.ts
export { default as YNewComponent } from './YNewComponent'

// packages/you-ui-core/src/index.ts
export { default as YNewComponent } from './components/YNewComponent'
```

#### 组件开发规范

1. **命名规范**
   - 组件名：Y + PascalCase（如 YButton、YDatePicker）
   - 文件名：与组件名保持一致
   - CSS 类名：y- + kebab-case（如 y-button、y-date-picker）

2. **TypeScript 支持**
   - 所有 Props 必须有类型定义
   - 所有 Events 必须有类型定义
   - 导出组件类型供外部使用

3. **样式规范**
   - 使用 SCSS 编写样式
   - 支持主题系统（浅色/深色）
   - 支持响应式设计
   - 使用 CSS 变量进行样式定制

4. **无障碍支持**
   - 添加适当的 ARIA 属性
   - 支持键盘导航
   - 提供屏幕阅读器支持

### 2. 演示页面开发

1. **创建演示页面**

```bash
# 在 packages/playground/src/pages/ 下创建演示页面
mkdir packages/playground/src/pages/y-new-component
```

2. **演示页面模板**

```vue
<!-- packages/playground/src/pages/y-new-component/index.vue -->
<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-button" @click="goBack">←</button>
      <h1>YNewComponent 新组件</h1>
    </div>

    <div class="demo-content">
      <!-- 基础用法 -->
      <div class="demo-section">
        <h3>基础用法</h3>
        <p class="demo-desc">组件的基本使用方式</p>
        <div class="demo-item">
          <YNewComponent @click="handleClick">
            基础示例
          </YNewComponent>
        </div>
      </div>

      <!-- 更多示例... -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { YNewComponent } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const handleClick = () => {
  console.log('组件被点击')
}
</script>

<style lang="scss" scoped>
// 演示页面样式
</style>
```

3. **添加路由配置**

```json
// packages/playground/src/pages.json
{
  "pages": [
    // ... 其他页面
    {
      "path": "pages/y-new-component/index",
      "style": {
        "navigationBarTitleText": "YNewComponent 新组件"
      }
    }
  ]
}
```

```typescript
// packages/playground/src/main.ts
import YNewComponent from './pages/y-new-component/index.vue'

const routes = [
  // ... 其他路由
  { path: '/y-new-component', component: YNewComponent }
]
```

4. **添加到主页**

```vue
<!-- packages/playground/src/pages/index/index.vue -->
<div class="component-item" @click="navigateTo('/y-new-component')">
  <span class="component-icon">🆕</span>
  <span class="component-name">YNewComponent</span>
  <span class="component-desc">新组件描述</span>
</div>
```

### 3. 文档编写

#### Storybook 文档

```typescript
// packages/docs/src/components/NewComponent.stories.ts
import { YNewComponent } from '@you-web/ui-core'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof YNewComponent> = {
  title: 'Components/YNewComponent',
  component: YNewComponent,
  parameters: {
    docs: {
      description: {
        component: '新组件的描述信息'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success'],
      description: '组件类型'
    }
  }
}

export default meta
type Story = StoryObj<typeof YNewComponent>

export const Default: Story = {
  args: {
    type: 'default'
  }
}

export const Primary: Story = {
  args: {
    type: 'primary'
  }
}
```

#### Markdown 文档

```markdown
<!-- packages/docs/src/components/YNewComponent.md -->
# YNewComponent 新组件

组件描述和使用说明。

## API 文档

### Props

| 属性名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| type | string | 组件类型 | 'default' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: MouseEvent) |

## 使用示例

\`\`\`vue
<template>
  <YNewComponent type="primary" @click="handleClick">
    示例内容
  </YNewComponent>
</template>
\`\`\`
```

### 4. Bug 修复

1. **问题定位**
   - 复现问题
   - 确定影响范围
   - 分析根本原因

2. **修复方案**
   - 编写测试用例
   - 实施修复
   - 验证修复效果

3. **回归测试**
   - 确保修复不影响其他功能
   - 更新相关文档

## 🔍 代码规范

### 1. 代码风格

- 使用 ESLint + Prettier 进行代码格式化
- 遵循 Vue 3 Composition API 最佳实践
- 使用 TypeScript 进行类型检查

### 2. 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能开发
git commit -m "feat: 添加 YNewComponent 组件"

# Bug 修复
git commit -m "fix: 修复 YButton 点击事件问题"

# 文档更新
git commit -m "docs: 更新 YPicker 组件文档"

# 样式调整
git commit -m "style: 优化 YCard 组件样式"

# 重构代码
git commit -m "refactor: 重构 YModal 组件逻辑"

# 性能优化
git commit -m "perf: 优化 YList 组件渲染性能"

# 测试相关
git commit -m "test: 添加 YInput 组件测试用例"

# 构建相关
git commit -m "build: 更新构建配置"

# 其他杂项
git commit -m "chore: 更新依赖版本"
```

### 3. 分支管理

- `main`: 主分支，稳定版本
- `develop`: 开发分支，最新功能
- `feature/xxx`: 功能分支
- `fix/xxx`: 修复分支
- `docs/xxx`: 文档分支

## 🧪 测试

### 1. 单元测试

```bash
# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage
```

### 2. 组件测试

```typescript
// 测试示例
import { mount } from '@vue/test-utils'
import YNewComponent from '../YNewComponent.vue'

describe('YNewComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(YNewComponent, {
      props: {
        type: 'primary'
      }
    })
    
    expect(wrapper.classes()).toContain('y-new-component--primary')
  })
  
  it('emits click event', async () => {
    const wrapper = mount(YNewComponent)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## 📝 Pull Request 流程

### 1. 准备工作

1. Fork 项目到您的 GitHub 账户
2. 创建功能分支：`git checkout -b feature/new-component`
3. 进行开发工作

### 2. 提交 PR

1. **确保代码质量**
   ```bash
   # 代码检查
   pnpm lint
   
   # 类型检查
   pnpm type-check
   
   # 运行测试
   pnpm test
   
   # 构建检查
   pnpm build
   ```

2. **编写 PR 描述**
   ```markdown
   ## 📋 变更类型
   - [ ] 新功能
   - [ ] Bug 修复
   - [ ] 文档更新
   - [ ] 样式调整
   - [ ] 重构
   - [ ] 性能优化
   - [ ] 其他

   ## 📝 变更说明
   简要描述本次变更的内容和目的。

   ## 🔍 测试说明
   描述如何测试这些变更。

   ## 📸 截图（如适用）
   添加相关截图。

   ## ✅ 检查清单
   - [ ] 代码遵循项目规范
   - [ ] 已添加必要的测试
   - [ ] 已更新相关文档
   - [ ] 所有测试通过
   - [ ] 构建成功
   ```

3. **提交 PR**
   - 推送分支：`git push origin feature/new-component`
   - 在 GitHub 上创建 Pull Request
   - 等待代码审查

### 3. 代码审查

1. **审查要点**
   - 代码质量和规范
   - 功能完整性
   - 测试覆盖率
   - 文档完整性
   - 性能影响

2. **反馈处理**
   - 及时回应审查意见
   - 根据建议修改代码
   - 更新 PR 描述

### 4. 合并流程

1. 通过所有检查
2. 获得维护者批准
3. 合并到主分支
4. 删除功能分支

## 🎯 开发建议

### 1. 组件设计原则

- **单一职责**：每个组件只负责一个功能
- **可复用性**：组件应该易于在不同场景中使用
- **可扩展性**：支持通过 Props 和 Slots 进行扩展
- **一致性**：与现有组件保持设计和交互一致

### 2. 性能优化

- 使用 `v-memo` 优化列表渲染
- 合理使用 `computed` 和 `watch`
- 避免不必要的响应式数据
- 使用 `shallowRef` 优化大对象

### 3. 用户体验

- 提供清晰的视觉反馈
- 支持键盘导航
- 适配移动端操作
- 考虑加载状态和错误处理

### 4. 文档编写

- 提供完整的 API 文档
- 包含丰富的使用示例
- 说明常见问题和解决方案
- 保持文档与代码同步

## 🤝 社区参与

### 1. 讨论和建议

- 使用 GitHub Issues 报告问题
- 使用 GitHub Discussions 进行讨论
- 参与代码审查

### 2. 帮助他人

- 回答社区问题
- 分享使用经验
- 提供改进建议

### 3. 推广项目

- 在社交媒体分享
- 编写技术文章
- 参与技术会议

## 📞 联系我们

如果您有任何问题或建议，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/hourong88/You-Web-UI/issues)
- 发起 [Discussion](https://github.com/hourong88/You-Web-UI/discussions)
- 发送邮件至项目维护者

感谢您的贡献！🎉