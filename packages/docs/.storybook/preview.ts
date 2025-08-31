import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'

// 导入组件库样式
import '@you-uniapp/ui-core/dist/style.css'

// 设置 Vue 应用
setup((app) => {
  // 这里可以添加全局插件、组件等
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
}

export default preview