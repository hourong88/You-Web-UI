/**
 * 组件基类
 * 提供统一的组件属性、事件处理和生命周期管理
 */

import { ComponentBaseProps } from '../../types'

// 统一的组件 Props 基础接口
export interface StandardComponentProps extends ComponentBaseProps {
  /** 组件唯一标识 */
  id?: string
  /** 组件索引，用于列表场景 */
  index?: number
  /** 是否可见 */
  visible?: boolean
  /** 测试标识符 */
  testId?: string
}

// 统一的事件载荷接口
export interface ComponentEventPayload {
  /** 组件索引 */
  index?: number
  /** 组件ID */
  id?: string
  /** 原始事件对象 */
  originalEvent?: Event
  /** 额外数据 */
  data?: any
}

// 基础事件接口
export interface BaseComponentEvents {
  /** 点击事件 */
  click: [payload: ComponentEventPayload]
  /** 长按事件 */
  longpress: [payload: ComponentEventPayload]
  /** 组件挂载事件 */
  mounted: [payload: ComponentEventPayload]
  /** 组件卸载事件 */
  unmounted: [payload: ComponentEventPayload]
}

// 组件状态枚举
export enum ComponentState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  DISABLED = 'disabled'
}

// 组件基类抽象类
export abstract class BaseComponent {
  protected abstract componentName: string
  protected state: ComponentState = ComponentState.IDLE
  protected props: StandardComponentProps

  constructor(props: StandardComponentProps) {
    this.props = props
  }

  /**
   * 验证组件属性
   */
  protected validateProps(): boolean {
    // 基础属性验证逻辑
    if (this.props.index !== undefined && this.props.index < 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[${this.componentName}] Invalid index: ${this.props.index}`)
      }
      return false
    }
    return true
  }

  /**
   * 生成组件类名
   */
  protected generateClassName(additionalClasses: string[] = []): string {
    const baseClass = `y-${this.componentName.toLowerCase()}`
    const classes = [baseClass]

    // 添加状态类名
    if (this.state !== ComponentState.IDLE) {
      classes.push(`${baseClass}--${this.state}`)
    }

    // 添加禁用状态类名
    if (this.props.disabled) {
      classes.push(`${baseClass}--disabled`)
    }

    // 添加自定义类名
    if (this.props.customClass) {
      classes.push(this.props.customClass)
    }

    // 添加额外类名
    classes.push(...additionalClasses)

    return classes.join(' ')
  }

  /**
   * 生成组件样式
   */
  protected generateStyle(): Record<string, any> {
    const style: Record<string, any> = {}

    // 处理自定义样式
    if (this.props.customStyle) {
      if (typeof this.props.customStyle === 'string') {
        // 解析字符串样式
        const styleStr = this.props.customStyle
        styleStr.split(';').forEach(rule => {
          const [property, value] = rule.split(':').map(s => s.trim())
          if (property && value) {
            // 转换 kebab-case 到 camelCase
            const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            style[camelProperty] = value
          }
        })
      } else {
        Object.assign(style, this.props.customStyle)
      }
    }

    // 处理可见性
    if (this.props.visible === false) {
      style.display = 'none'
    }

    return style
  }

  /**
   * 创建事件载荷
   */
  protected createEventPayload(originalEvent?: Event, data?: any): ComponentEventPayload {
    return {
      index: this.props.index,
      id: this.props.id,
      originalEvent,
      data
    }
  }

  /**
   * 设置组件状态
   */
  protected setState(newState: ComponentState): void {
    this.state = newState
  }

  /**
   * 获取组件状态
   */
  protected getState(): ComponentState {
    return this.state
  }

  /**
   * 检查组件是否可交互
   */
  protected isInteractive(): boolean {
    return !this.props.disabled && this.state !== ComponentState.DISABLED && this.state !== ComponentState.LOADING
  }
}

// 组件工厂函数类型
export type ComponentFactory<T extends StandardComponentProps> = (props: T) => any

// 组件注册器
export class ComponentRegistry {
  private static components = new Map<string, ComponentFactory<any>>()

  /**
   * 注册组件
   */
  static register<T extends StandardComponentProps>(
    name: string,
    factory: ComponentFactory<T>
  ): void {
    this.components.set(name, factory)
  }

  /**
   * 获取组件
   */
  static get<T extends StandardComponentProps>(name: string): ComponentFactory<T> | undefined {
    return this.components.get(name)
  }

  /**
   * 获取所有已注册的组件名称
   */
  static getRegisteredComponents(): string[] {
    return Array.from(this.components.keys())
  }

  /**
   * 检查组件是否已注册
   */
  static isRegistered(name: string): boolean {
    return this.components.has(name)
  }
}