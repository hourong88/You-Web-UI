// 全局类型声明文件

// UniApp 全局对象声明
declare const uni: {
  showToast: (options: {
    title: string
    icon?: 'success' | 'error' | 'loading' | 'none'
    duration?: number
    mask?: boolean
  }) => void
  // 可以根据需要添加更多 uni API
}

// Vue 模板类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export {}