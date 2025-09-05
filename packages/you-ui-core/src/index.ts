// You-UniApp UI 组件库主入口文件
// 统一导出所有组件和工具函数

// 导入样式
import './styles/index.scss'

// 导入工具函数
export * from './utils'
export { useDevice } from './utils/useDevice'

// 导入类型定义
export * from './types'

// 组件导出
export { default as YButton } from './components/YButton'
export { default as YInput } from './components/YInput'
export { default as YList } from './components/YList'
export { default as YCard } from './components/YCard'
export { default as YLoading } from './components/YLoading'
// export { default as YIcon } from './components/YIcon'
// export { default as YToast } from './components/YToast'

// 版本信息
export const version = '1.0.0'

// 默认导出（用于全量引入）
export default {
  version
  // install 方法将在后续添加，用于 Vue.use() 全局注册
}