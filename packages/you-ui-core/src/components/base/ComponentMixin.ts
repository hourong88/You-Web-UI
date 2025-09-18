/**
 * Vue 组件混入
 * 提供统一的组件属性和方法
 */

// 组件事件载荷接口
export interface ComponentEventPayload {
  index?: number
  id?: string
  originalEvent?: Event
  data?: any
}

// 简化的组件混入，避免 TypeScript 类型检查问题
export const componentMixin = {
  props: {
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: [String, Object],
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: true
    },
    testId: {
      type: String,
      default: ''
    }
  },

  emits: ['click', 'longpress', 'mounted', 'unmounted']
}

// 导出类型定义供 TypeScript 使用
export interface ComponentMixinInstance {
  customClass: string
  customStyle: string | Record<string, any>
  disabled: boolean
  id: string
  index: number
  visible: boolean
  testId: string
}