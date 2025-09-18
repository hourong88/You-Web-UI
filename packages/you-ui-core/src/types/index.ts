// You-UniApp UI 类型定义

// 组件尺寸类型
export type ComponentSize = 'small' | 'medium' | 'large'
export type ComponentSizeAlias = 'sm' | 'base' | 'lg'

// 组件类型（按钮、输入框等）
export type ComponentType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

// 主题类型
export type ThemeMode = 'light' | 'dark' | 'auto'

// 位置类型
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center'

// 对齐方式
export type Alignment = 'left' | 'center' | 'right' | 'justify'

// 方向类型
export type Direction = 'horizontal' | 'vertical'

// 加载状态
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// 组件基础属性接口
export interface ComponentBaseProps {
  /** 组件类名 */
  customClass?: string
  /** 组件样式 */
  customStyle?: string | Record<string, any>
  /** 是否禁用 */
  disabled?: boolean
}

// YCell 组件事件类型
export interface YCellClickEvent {
  index: number
}

// 按钮组件属性
export interface ButtonProps extends ComponentBaseProps {
  /** 按钮类型 */
  type?: ComponentType
  /** 按钮尺寸 */
  size?: ComponentSize
  /** 是否为朴素按钮 */
  plain?: boolean
  /** 是否为圆形按钮 */
  round?: boolean
  /** 是否为圆角按钮 */
  square?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 图标名称 */
  icon?: string
  /** 图标位置 */
  iconPosition?: 'left' | 'right'
}

// 图标组件属性
export interface IconProps extends ComponentBaseProps {
  /** 图标名称 */
  name: string
  /** 图标大小 */
  size?: string | number
  /** 图标颜色 */
  color?: string
  /** 是否为加载图标 */
  loading?: boolean
}

// Toast 组件属性
export interface ToastProps {
  /** 提示内容 */
  message: string
  /** 提示类型 */
  type?: ComponentType
  /** 显示时长 */
  duration?: number
  /** 位置 */
  position?: Position
  /** 是否显示遮罩 */
  overlay?: boolean
  /** 图标 */
  icon?: string
  /** 是否可关闭 */
  closable?: boolean
}

// 主题配置接口
export interface ThemeConfig {
  /** 主题模式 */
  mode: ThemeMode
  /** 主色调 */
  primaryColor?: string
  /** 成功色 */
  successColor?: string
  /** 警告色 */
  warningColor?: string
  /** 危险色 */
  dangerColor?: string
  /** 信息色 */
  infoColor?: string
  /** 自定义 CSS 变量 */
  cssVars?: Record<string, string>
}

// 组件库配置接口
export interface YouUIConfig {
  /** 主题配置 */
  theme?: ThemeConfig
  /** 组件默认属性 */
  componentDefaults?: {
    button?: Partial<ButtonProps>
    icon?: Partial<IconProps>
    toast?: Partial<ToastProps>
  }
  /** 国际化配置 */
  locale?: string
  /** 是否开启调试模式 */
  debug?: boolean
}

// 事件类型
export interface ComponentEvents {
  /** 点击事件 */
  click?: (event: Event) => void
  /** 长按事件 */
  longpress?: (event: Event) => void
  /** 触摸开始 */
  touchstart?: (event: TouchEvent) => void
  /** 触摸结束 */
  touchend?: (event: TouchEvent) => void
}

// 插槽类型
export interface ComponentSlots {
  /** 默认插槽 */
  default?: () => any
  /** 前缀插槽 */
  prefix?: () => any
  /** 后缀插槽 */
  suffix?: () => any
}

// ==================== 智能组件库类型定义 ====================

// 通用数据项接口
export interface DataItem {
  id: string | number
  [key: string]: any
}

// 基础数据项类型，用于不需要额外字段的场景
export interface BaseDataItem {
  id: string | number
  label?: string
  value?: string | number
  disabled?: boolean
}

// 字段配置接口
export interface FieldConfig {
  key: string      // 对应 DataItem 中的字段名
  label: string    // 显示的标题/标签
  type?: 'text' | 'image' | 'price' | 'status' | 'custom' // 渲染类型
  width?: string   // 仅 YouTable 使用，列宽
  align?: Alignment // 列对齐方式
  sortable?: boolean // 是否可排序
  filterable?: boolean // 是否可筛选
  slotName?: string // 自定义渲染插槽名
}

// 分页配置接口
export interface PaginationConfig {
  pageSize: number
  currentPage: number
  total: number
  showSizeChanger?: boolean
}

// 视图模式类型
export type ViewMode = 'auto' | 'table' | 'list' | 'card'

// 排序配置
export interface SortConfig {
  field?: string
  order?: 'asc' | 'desc'
}



// 设备信息接口
export interface DeviceInfo {
  isMobile: boolean
  isPC: boolean
  isH5: boolean
  isApp: boolean
  isMiniProgram: boolean
  platform: 'h5' | 'app' | 'mp-weixin' | 'mp-alipay' | 'unknown'
  screenWidth: number
}