/**
 * YTag 标签组件
 * 用于标记和分类的标签组件，支持多种样式和形状
 */

import YTag from './YTag.vue'
import type { App } from 'vue'

// 组件安装函数
YTag.install = (app: App) => {
  app.component('YTag', YTag)
}

export default YTag
export { YTag }

// 导出组件类型
export type YTagInstance = InstanceType<typeof YTag>