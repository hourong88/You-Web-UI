/**
 * 统一错误处理机制
 * 提供组件库内部统一的错误处理、日志记录和降级策略
 */

// 错误级别枚举
export enum ErrorLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

// 错误类型枚举
export enum ErrorType {
  NETWORK = 'network',
  VALIDATION = 'validation',
  RUNTIME = 'runtime',
  PLATFORM = 'platform',
  COMPONENT = 'component'
}

// 错误信息接口
export interface ErrorInfo {
  level: ErrorLevel
  type: ErrorType
  message: string
  code?: string | number
  context?: Record<string, any>
  timestamp?: number
  stack?: string
}

// 错误处理配置
export interface ErrorHandlerConfig {
  enableConsoleLog: boolean
  enableReporting: boolean
  reportUrl?: string
  maxRetries: number
  fallbackValues: Record<string, any>
}

// 默认配置
const defaultConfig: ErrorHandlerConfig = {
  enableConsoleLog: process.env.NODE_ENV === 'development',
  enableReporting: false,
  maxRetries: 3,
  fallbackValues: {
    windowWidth: 375,
    windowHeight: 667,
    screenWidth: 375,
    platform: 'unknown'
  }
}

class ErrorHandler {
  private config: ErrorHandlerConfig
  private errorQueue: ErrorInfo[] = []
  private retryCount: Map<string, number> = new Map()

  constructor(config: Partial<ErrorHandlerConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * 处理错误
   */
  handle(errorInfo: Partial<ErrorInfo>, fallbackValue?: any): any {
    const fullErrorInfo: ErrorInfo = {
      level: ErrorLevel.ERROR,
      type: ErrorType.RUNTIME,
      message: 'Unknown error',
      timestamp: Date.now(),
      ...errorInfo
    }

    // 记录错误
    this.logError(fullErrorInfo)

    // 添加到错误队列
    this.errorQueue.push(fullErrorInfo)

    // 上报错误（如果启用）
    if (this.config.enableReporting) {
      this.reportError(fullErrorInfo)
    }

    // 返回降级值
    return this.getFallbackValue(fullErrorInfo, fallbackValue)
  }

  /**
   * 安全执行函数，自动处理异常
   */
  safeExecute<T>(
    fn: () => T,
    fallbackValue: T,
    errorContext?: Partial<ErrorInfo>
  ): T {
    try {
      return fn()
    } catch (error) {
      return this.handle({
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        ...errorContext
      }, fallbackValue)
    }
  }

  /**
   * 异步安全执行
   */
  async safeExecuteAsync<T>(
    fn: () => Promise<T>,
    fallbackValue: T,
    errorContext?: Partial<ErrorInfo>
  ): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      return this.handle({
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        ...errorContext
      }, fallbackValue)
    }
  }

  /**
   * 带重试的安全执行
   */
  safeExecuteWithRetry<T>(
    fn: () => T,
    fallbackValue: T,
    retryKey: string,
    errorContext?: Partial<ErrorInfo>
  ): T {
    const currentRetries = this.retryCount.get(retryKey) || 0

    try {
      const result = fn()
      // 成功后重置重试计数
      this.retryCount.delete(retryKey)
      return result
    } catch (error) {
      if (currentRetries < this.config.maxRetries) {
        this.retryCount.set(retryKey, currentRetries + 1)
        // 延迟重试
        setTimeout(() => {
          return this.safeExecuteWithRetry(fn, fallbackValue, retryKey, errorContext)
        }, Math.pow(2, currentRetries) * 1000) // 指数退避
      }

      return this.handle({
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        context: { retries: currentRetries },
        ...errorContext
      }, fallbackValue)
    }
  }

  /**
   * 记录错误日志
   */
  private logError(errorInfo: ErrorInfo): void {
    if (!this.config.enableConsoleLog) return

    const logMessage = `[You-UniApp UI] ${errorInfo.level.toUpperCase()}: ${errorInfo.message}`

    switch (errorInfo.level) {
      case ErrorLevel.INFO:
        console.info(logMessage, errorInfo.context)
        break
      case ErrorLevel.WARN:
        console.warn(logMessage, errorInfo.context)
        break
      case ErrorLevel.ERROR:
      case ErrorLevel.FATAL:
        console.error(logMessage, errorInfo.context, errorInfo.stack)
        break
    }
  }

  /**
   * 上报错误
   */
  private async reportError(errorInfo: ErrorInfo): Promise<void> {
    if (!this.config.reportUrl) return

    try {
      await fetch(this.config.reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorInfo)
      })
    } catch (error) {
      // 上报失败时不再递归处理，避免无限循环
      if (this.config.enableConsoleLog) {
        console.warn('[You-UniApp UI] Failed to report error:', error)
      }
    }
  }

  /**
   * 获取降级值
   */
  private getFallbackValue(errorInfo: ErrorInfo, customFallback?: any): any {
    if (customFallback !== undefined) {
      return customFallback
    }

    // 根据错误类型返回合适的默认值
    switch (errorInfo.type) {
      case ErrorType.PLATFORM:
        return this.config.fallbackValues.platform
      case ErrorType.NETWORK:
        return null
      case ErrorType.VALIDATION:
        return false
      default:
        return null
    }
  }

  /**
   * 获取错误统计
   */
  getErrorStats(): {
    total: number
    byLevel: Record<ErrorLevel, number>
    byType: Record<ErrorType, number>
  } {
    const stats = {
      total: this.errorQueue.length,
      byLevel: {} as Record<ErrorLevel, number>,
      byType: {} as Record<ErrorType, number>
    }

    // 初始化计数器
    Object.values(ErrorLevel).forEach(level => {
      stats.byLevel[level] = 0
    })
    Object.values(ErrorType).forEach(type => {
      stats.byType[type] = 0
    })

    // 统计错误
    this.errorQueue.forEach(error => {
      stats.byLevel[error.level]++
      stats.byType[error.type]++
    })

    return stats
  }

  /**
   * 清空错误队列
   */
  clearErrors(): void {
    this.errorQueue = []
    this.retryCount.clear()
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<ErrorHandlerConfig>): void {
    this.config = { ...this.config, ...config }
  }
}

// 创建全局错误处理器实例
export const globalErrorHandler = new ErrorHandler()

// 导出便捷方法
export const handleError = (errorInfo: Partial<ErrorInfo>, fallbackValue?: any) =>
  globalErrorHandler.handle(errorInfo, fallbackValue)

export const safeExecute = <T>(
  fn: () => T,
  fallbackValue: T,
  errorContext?: Partial<ErrorInfo>
): T => globalErrorHandler.safeExecute(fn, fallbackValue, errorContext)

export const safeExecuteAsync = <T>(
  fn: () => Promise<T>,
  fallbackValue: T,
  errorContext?: Partial<ErrorInfo>
): Promise<T> => globalErrorHandler.safeExecuteAsync(fn, fallbackValue, errorContext)

// 导出错误处理器类，供高级用户自定义使用
export { ErrorHandler }