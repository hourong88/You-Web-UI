declare module './YSwipeAction.vue' {
  import { DefineComponent } from 'vue'
  
  export interface SwipeActionItem {
    name?: string
    icon?: string
    color?: string
    background?: string
    width?: number
    fontsize?: number
    imgWidth?: number
    imgHeight?: number
  }
  
  const component: DefineComponent<{
    actions?: SwipeActionItem[]
    nameField?: string
    color?: string
    iconField?: string
    width?: string | number
    closable?: boolean
    showMask?: boolean
    operateWidth?: number
    params?: object
    forbid?: boolean
    open?: boolean
    backgroundColor?: string
  }>
  
  export default component
}