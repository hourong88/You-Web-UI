import { DefineComponent } from 'vue'

export interface YDrawerProps {
  /** 是否显示抽屉 */
  visible?: boolean
  /** 抽屉标题 */
  title?: string
  /** 抽屉位置 */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /** 抽屉宽度（水平方向时有效） */
  width?: string
  /** 抽屉高度（垂直方向时有效） */
  height?: string
  /** 是否显示遮罩 */
  mask?: boolean
  /** 点击遮罩是否关闭抽屉 */
  maskClosable?: boolean
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 关闭时是否销毁子元素 */
  destroyOnClose?: boolean
  /** 抽屉层级 */
  zIndex?: number
  /** 遮罩层级 */
  maskZIndex?: number
  /** 背景色 */
  backgroundColor?: string
  /** 内容区域内边距 */
  bodyPadding?: string
  /** 是否显示头部 */
  showHeader?: boolean
}

export interface YDrawerEmits {
  'update:visible': [visible: boolean]
  close: []
  open: []
}

export interface YDrawerSlots {
  default: () => any
  footer: () => any
}

declare const YDrawer: DefineComponent<YDrawerProps, YDrawerEmits, {}, {}, {}, {}, {}, YDrawerSlots>

export default YDrawer