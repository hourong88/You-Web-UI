import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入页面组件
import Home from './pages/index/index.vue'
import Button from './pages/button/index.vue'
import Components from './pages/components/index.vue'

// 创建路由
const routes = [
  { path: '/', component: Home },
  { path: '/button', component: Button },
  { path: '/components', component: Components }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建应用
const app = createApp(App)
app.use(router)

// 挂载应用
app.mount('#app')