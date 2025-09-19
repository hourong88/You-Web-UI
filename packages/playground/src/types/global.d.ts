// 全局类型声明文件

// Web 环境全局对象声明
declare const window: Window & typeof globalThis
declare const document: Document

// 自定义 Toast 接口
interface ToastOptions {
  title: string
  icon?: 'success' | 'error' | 'loading' | 'none'
  duration?: number
  mask?: boolean
}

declare const showToast: (options: ToastOptions) => void

// Vue 模板类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export { }