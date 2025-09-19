// You-Web UI 工具函数

import type { ComponentSize, ComponentSizeAlias } from '../types/index.js'

// 导出屏幕适配工具函数
export * from './screen'

// 导出错误处理工具
export * from './errorHandler'

/**
 * 判断是否为开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * 判断是否为生产环境
 */
export const isProd = process.env.NODE_ENV === 'production'

/**
 * 获取当前平台
 */
export const getPlatform = (): string => {
  return 'web'
}

/**
 * 判断是否为 H5 平台
 */
export const isH5 = (): boolean => getPlatform() === 'h5'

/**
 * 判断是否为小程序平台
 */
export const isMiniProgram = (): boolean => {
  const platform = getPlatform()
  return platform.startsWith('mp-')
}

/**
 * 判断是否为 App 平台
 */
export const isApp = (): boolean => {
  const platform = getPlatform()
  return platform.startsWith('app-')
}

/**
 * 生成唯一 ID
 */
export const generateId = (prefix = 'you'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * 合并对象
 */
export const merge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        merge(target[key], source[key] as Partial<T[Extract<keyof T, string>]>)
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return merge(target, ...sources)
}

/**
 * 判断是否为对象
 */
export const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 判断是否为空值
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 转换尺寸别名
 */
export const normalizeSizeAlias = (size: ComponentSize | ComponentSizeAlias): ComponentSize => {
  const sizeMap: Record<ComponentSizeAlias, ComponentSize> = {
    sm: 'small',
    base: 'medium',
    lg: 'large'
  }

  return sizeMap[size as ComponentSizeAlias] || (size as ComponentSize)
}

/**
 * 添加单位
 */
export const addUnit = (value: string | number, unit = 'px'): string => {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }
  if (typeof value === 'string') {
    if (/^\d+$/.test(value)) {
      return `${value}${unit}`
    }
  }
  return value as string
}

// Web specific utilities for component library

/**
 * 日志工具
 */
export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log('[You-Web UI]', ...args)
    }
  },
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn('[You-Web UI]', ...args)
    }
  },
  error: (...args: any[]) => {
    if (isDev) {
      console.error('[You-Web UI]', ...args)
    }
  }
}