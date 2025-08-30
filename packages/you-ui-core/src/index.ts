// You-UniApp UI 组件库主入口文件

import type { App } from 'vue'

// 导入样式
import './styles/index.scss'

// 导入组件类型定义
export * from './types'

// 导入工具函数
export * from './utils'

// 组件列表（待添加）
const components: any[] = [
  // 基础组件将在这里添加
  // YouButton,
  // YouIcon,
  // YouToast,
]

// 安装函数
const install = (app: App): void => {
  components.forEach(component => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

// 版本信息
const version = '1.0.0'

// 导出安装函数和版本信息
export { install, version }

// 默认导出
export default {
  install,
  version
}

// 支持按需引入
export {
  // 组件将在这里导出
  // YouButton,
  // YouIcon,
  // YouToast,
}