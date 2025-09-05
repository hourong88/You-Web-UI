import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入页面组件
import Home from './pages/index/index.vue'
import Button from './pages/button/index.vue'
import Input from './pages/input/index.vue'
import Components from './pages/components/index.vue'
import Utils from './pages/utils/index.vue'
import YouList from './pages/you-list/index.vue'
import YouLoading from './pages/you-loading/index.vue'

// 创建路由
const routes = [
  { path: '/', component: Home },
  { path: '/button', component: Button },
  { path: '/input', component: Input },
  { path: '/components', component: Components },
  { path: '/utils', component: Utils },
  { path: '/you-list', component: YouList },
  { path: '/you-loading', component: YouLoading },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 创建应用
const app = createApp(App)
app.use(router)

// 挂载应用
app.mount('#app')
