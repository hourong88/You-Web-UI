import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入页面组件
import Home from './pages/index/index.vue'
import Button from './pages/y-button/index.vue'
import Input from './pages/y-input/index.vue'
import Textarea from './pages/y-textarea/index.vue'
import Components from './pages/components/index.vue'
import Utils from './pages/utils/index.vue'
import YouList from './pages/y-list/index.vue'
import YouLoading from './pages/y-loading/index.vue'
import YouCell from './pages/y-cell/index.vue'
import YouCard from './pages/y-card/index.vue'
import YSwipeAction from './pages/y-swipe-action/index.vue'
import YIcon from './pages/y-icon/index.vue'
import YTag from './pages/y-tag/index.vue'
import YFooter from './pages/y-footer/index.vue'
import YGrid from './pages/y-grid/index.vue'
import YTips from './pages/y-tips/index.vue'
import YSteps from './pages/y-steps/index.vue'
import YDrawer from './pages/y-drawer/index.vue'
import YModal from './pages/y-modal/index.vue'
import YTabs from './pages/y-tabs/index.vue'
import YCountdown from './pages/y-countdown/index.vue'
import YToast from './pages/y-toast/index.vue'
import YCascadeSelection from './pages/y-cascade-selection/index.vue'
import YRadio from './pages/y-radio/index.vue'
import YSwitch from './pages/y-switch/index.vue'
import YCheckbox from './pages/y-checkbox/index.vue'

// 创建路由
const routes = [
  { path: '/', component: Home },
  { path: '/y-button', component: Button },
  { path: '/y-input', component: Input },
  { path: '/y-textarea', component: Textarea },
  { path: '/components', component: Components },
  { path: '/utils', component: Utils },
  { path: '/y-list', component: YouList },
  { path: '/y-loading', component: YouLoading },
  { path: '/y-cell', component: YouCell },
  { path: '/pages/y-card/index', component: YouCard },
  { path: '/pages/y-swipe-action/index', component: YSwipeAction },
  { path: '/pages/y-steps/index', component: YSteps },
  { path: '/pages/y-drawer/index', component: YDrawer },
  { path: '/pages/y-modal/index', component: YModal },
  { path: '/pages/y-tabs/index', component: YTabs },
  { path: '/pages/y-countdown/index', component: YCountdown },
  { path: '/pages/y-toast/index', component: YToast },
  { path: '/pages/y-cascade-selection/index', component: YCascadeSelection },
  { path: '/pages/y-radio/index', component: YRadio },
  { path: '/y-switch', component: YSwitch },
  { path: '/y-checkbox', component: YCheckbox },
  { path: '/y-icon', component: YIcon },
  { path: '/y-tag', component: YTag },
  { path: '/y-footer', component: YFooter },
  { path: '/y-grid', component: YGrid },
  { path: '/y-tips', component: YTips },
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
