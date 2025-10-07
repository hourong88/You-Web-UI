# ❓ 常见问题

本文档收集了使用 You-Web UI 过程中的常见问题和解决方案。

## 📦 安装相关

### Q: 安装时提示 peer dependency 错误？

**A:** 确保安装了正确版本的 Vue 3：

```bash
npm install vue@^3.0.0 @you-web/ui-core
```

### Q: 使用 pnpm 安装失败？

**A:** 尝试使用 `--shamefully-hoist` 参数：

```bash
pnpm install @you-web/ui-core --shamefully-hoist
```

## 🎨 样式相关

### Q: 组件样式不生效？

**A:** 确保正确引入了样式文件：

```typescript
// main.ts
import '@you-web/ui-core/dist/style.css'
```

### Q: 如何自定义主题颜色？

**A:** 通过 CSS 变量覆盖默认主题：

```scss
:root {
  --y-primary-color: #your-color;
  --y-success-color: #your-success-color;
}
```

### Q: 深色主题如何配置？

**A:** 使用主题系统：

```vue
<script setup>
import { useTheme } from '@you-web/ui-core'

const { setTheme } = useTheme()

// 切换到深色主题
setTheme('dark')
</script>
```

## 🔧 使用相关

### Q: 如何按需引入组件？

**A:** 直接从包中导入需要的组件：

```typescript
import { YButton, YCard } from '@you-web/ui-core'
```

### Q: TypeScript 类型提示不生效？

**A:** 确保 tsconfig.json 配置正确：

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true
  }
}
```

### Q: 在 Nuxt 3 中如何使用？

**A:** 创建插件文件：

```typescript
// plugins/you-web-ui.client.ts
import YouWebUI from '@you-web/ui-core'
import '@you-web/ui-core/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YouWebUI)
})
```

## 📱 兼容性相关

### Q: 支持哪些浏览器版本？

**A:** 支持以下浏览器：
- Chrome >= 80
- Firefox >= 78
- Safari >= 14
- Edge >= 80

### Q: 在移动端使用有什么注意事项？

**A:** 
1. 确保设置正确的 viewport
2. 使用响应式设计
3. 注意触摸事件的处理

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 🚀 性能相关

### Q: 如何减小打包体积？

**A:** 
1. 使用按需引入
2. 配置 Tree Shaking
3. 使用生产环境构建

```typescript
// 推荐：按需引入
import { YButton } from '@you-web/ui-core'

// 不推荐：全量引入
import YouWebUI from '@you-web/ui-core'
```

### Q: 组件渲染性能如何优化？

**A:**
1. 合理使用 v-show 和 v-if
2. 避免不必要的响应式数据
3. 使用 KeepAlive 缓存组件

## 🔄 更新相关

### Q: 如何升级到最新版本？

**A:**

```bash
# 查看当前版本
npm list @you-web/ui-core

# 升级到最新版本
npm update @you-web/ui-core

# 或指定版本
npm install @you-web/ui-core@latest
```

### Q: 升级后组件样式异常？

**A:**
1. 清除缓存重新安装
2. 检查是否有破坏性更新
3. 查看 [更新日志](../CHANGELOG.md)

```bash
# 清除缓存
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🐛 调试相关

### Q: 如何开启调试模式？

**A:** 在开发环境中，组件会自动提供更详细的错误信息。

### Q: 组件事件不触发？

**A:** 检查以下几点：
1. 事件名称是否正确
2. 是否正确绑定了事件处理函数
3. 组件是否处于禁用状态

```vue
<!-- 正确的事件绑定 -->
<YButton @click="handleClick">按钮</YButton>

<!-- 检查处理函数 -->
<script setup>
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

## 📚 开发相关

### Q: 如何贡献代码？

**A:** 
1. Fork 项目到你的 GitHub
2. 创建特性分支
3. 提交代码并创建 PR
4. 参考 [贡献指南](../CONTRIBUTING.md)

### Q: 如何本地开发和调试？

**A:**

```bash
# 克隆项目
git clone https://github.com/hourong88/You-Web-UI.git
cd You-Web-UI

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动 Storybook
pnpm --filter @you-web/docs dev
```

### Q: 如何添加新组件？

**A:** 
1. 在 `packages/you-ui-core/src/components` 创建组件目录
2. 编写组件代码和类型定义
3. 添加到导出文件
4. 编写文档和示例
5. 添加测试用例

## 🔗 相关链接

- [GitHub 仓库](https://github.com/hourong88/You-Web-UI)
- [在线文档](http://localhost:6006/)
- [更新日志](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)

## 📞 获取帮助

如果以上内容没有解决您的问题，请：

1. 搜索 [已有 Issues](https://github.com/hourong88/You-Web-UI/issues)
2. 提交 [新 Issue](https://github.com/hourong88/You-Web-UI/issues/new)
3. 参与 [社区讨论](https://github.com/hourong88/You-Web-UI/discussions)

我们会尽快为您提供帮助！