import YDrawer from './YDrawer.vue'
import type { App } from 'vue'

YDrawer.install = (app: App) => {
  app.component('YDrawer', YDrawer)
}

export { YDrawer }
export default YDrawer
export * from './YDrawer.vue'