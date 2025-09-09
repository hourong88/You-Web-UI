# 贡献指南

感谢您对 You-UniApp 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复或新功能
- 🎨 改进 UI/UX 设计

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 本地开发

1. **Fork 项目**
   ```bash
   # 克隆你 fork 的仓库
   git clone https://github.com/hourong88/You-UniApp.git
   cd You-UniApp
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发环境**
   ```bash
   # 启动组件预览
   pnpm dev
   
   # 启动文档系统
   pnpm docs:dev
   ```

4. **项目结构**
   ```
   You-UniApp/
   ├── packages/
   │   ├── you-ui-core/     # 核心组件库
   │   ├── playground/      # 组件预览和测试
   │   └── docs/           # Storybook 文档
   ├── projectImg/         # 项目截图
   └── README.md
   ```

## 📋 贡献流程

### 1. 创建 Issue

在开始开发之前，请先创建一个 Issue 来描述你要解决的问题或添加的功能：

- 🐛 **Bug 报告**：详细描述问题、复现步骤、期望行为
- ✨ **功能请求**：说明功能需求、使用场景、实现建议
- 📚 **文档改进**：指出文档问题或改进建议

### 2. 开发规范

#### 代码规范
- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 组件命名使用 PascalCase，以 `Y` 开头（如 `YButton`）
- 文件命名使用 kebab-case

#### 提交规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(button): add loading state support

fix(card): resolve shadow display issue on iOS

docs: update installation guide
```

### 3. 组件开发

#### 新组件开发流程

1. **创建组件文件**
   ```
   packages/you-ui-core/src/components/YNewComponent/
   ├── YNewComponent.vue    # 组件实现
   ├── index.ts            # 导出文件
   └── types.ts            # 类型定义
   ```

2. **组件实现要求**
   - 完整的 TypeScript 类型支持
   - 响应式设计，支持多端适配
   - 合理的默认值和 props 验证
   - 清晰的事件定义和文档注释

3. **添加文档**
   - 在 `packages/docs/src/components/` 创建对应的 `.stories.ts` 文件
   - 包含基础用法、API 文档、交互示例

4. **测试验证**
   - 在 playground 中测试组件功能
   - 确保在不同设备和浏览器中正常工作

### 4. Pull Request

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

2. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add new component"
   git push origin feature/your-feature-name
   ```

3. **创建 PR**
   - 填写详细的 PR 描述
   - 关联相关的 Issue
   - 添加必要的截图或 GIF
   - 确保所有检查通过

## 🧪 测试

### 代码质量检查
```bash
# 代码格式检查
pnpm lint

# 自动修复格式问题
pnpm lint:fix

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

### 构建测试
```bash
# 构建组件库
pnpm build

# 构建文档
pnpm docs:build
```

## 📖 文档贡献

### Storybook 文档
- 每个组件都应该有对应的 `.stories.ts` 文件
- 包含多个使用场景的示例
- 详细的 API 文档和参数说明

### README 更新
- 新增组件需要更新组件清单
- 重要变更需要更新使用说明

## 🤝 社区

### 沟通渠道
- GitHub Issues: 问题报告和功能讨论
- GitHub Discussions: 一般性讨论和问答

### 行为准则
请遵守我们的 [行为准则](CODE_OF_CONDUCT.md)，营造友好、包容的社区环境。

## 📄 许可证

通过贡献代码，您同意您的贡献将在 [MIT 许可证](LICENSE) 下发布。

---

再次感谢您的贡献！如果您有任何问题，请随时通过 Issue 或 Discussion 与我们联系。