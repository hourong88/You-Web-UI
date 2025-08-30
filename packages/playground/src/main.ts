import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  
  // 这里可以注册全局组件、插件等
  // app.use(YouUICore)
  
  return {
    app
  }
}