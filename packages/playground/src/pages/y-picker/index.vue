<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-button" @click="goBack">←</button>
      <h1>YPicker 联动选择器</h1>
    </div>

    <div class="demo-content">
      <!-- 一级选择器 -->
      <div class="demo-section">
        <h3>一级选择器</h3>
        <p class="demo-desc">基础的单级选择器</p>
        <div class="demo-item">
          <button class="demo-button" @click="showSinglePicker">
            选择颜色: {{ singleValue.join(' ') || '请选择' }}
          </button>
        </div>
      </div>

      <!-- 二级联动选择器 -->
      <div class="demo-section">
        <h3>二级联动选择器</h3>
        <p class="demo-desc">省市二级联动选择</p>
        <div class="demo-item">
          <button class="demo-button" @click="showDoublePicker">
            选择地区: {{ doubleValue.join(' - ') || '请选择' }}
          </button>
        </div>
      </div>

      <!-- 三级联动选择器 -->
      <div class="demo-section">
        <h3>三级联动选择器</h3>
        <p class="demo-desc">省市区三级联动选择</p>
        <div class="demo-item">
          <button class="demo-button" @click="showTriplePicker">
            选择地址: {{ tripleValue.join(' - ') || '请选择' }}
          </button>
        </div>
      </div>

      <!-- 自定义样式 -->
      <div class="demo-section">
        <h3>自定义样式</h3>
        <p class="demo-desc">自定义颜色和圆角</p>
        <div class="demo-item">
          <button class="demo-button custom-style" @click="showCustomPicker">
            自定义样式: {{ customValue.join(' - ') || '请选择' }}
          </button>
        </div>
      </div>

      <!-- 禁用遮罩关闭 -->
      <div class="demo-section">
        <h3>禁用遮罩关闭</h3>
        <p class="demo-desc">点击遮罩不会关闭选择器</p>
        <div class="demo-item">
          <button class="demo-button" @click="showNoMaskClosePicker">
            禁用遮罩关闭: {{ noMaskValue.join(' - ') || '请选择' }}
          </button>
        </div>
      </div>

      <!-- 事件监听 -->
      <div class="demo-section">
        <h3>事件监听</h3>
        <p class="demo-desc">监听选择器的各种事件</p>
        <div class="demo-item">
          <button class="demo-button" @click="showEventPicker">
            事件监听: {{ eventValue.join(' - ') || '请选择' }}
          </button>
          <div class="event-log">
            <h4>事件日志：</h4>
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 一级选择器 -->
    <YPicker
      v-model:show="singleShow"
      v-model:value="singleValue"
      :layer="1"
      :picker-data="colorData"
      title="选择颜色"
      @confirm="handleSingleConfirm"
      @cancel="handleSingleCancel"
    />

    <!-- 二级联动选择器 -->
    <YPicker
      v-model:show="doubleShow"
      v-model:value="doubleValue"
      :layer="2"
      :picker-data="provinceData"
      title="选择省市"
      @confirm="handleDoubleConfirm"
      @cancel="handleDoubleCancel"
      @change="handleDoubleChange"
    />

    <!-- 三级联动选择器 -->
    <YPicker
      v-model:show="tripleShow"
      v-model:value="tripleValue"
      :layer="3"
      :picker-data="fullAreaData"
      title="选择省市区"
      @confirm="handleTripleConfirm"
      @cancel="handleTripleCancel"
      @change="handleTripleChange"
    />

    <!-- 自定义样式选择器 -->
    <YPicker
      v-model:show="customShow"
      v-model:value="customValue"
      :layer="2"
      :picker-data="categoryData"
      title="选择分类"
      :radius="true"
      header-bg-color="#ff6b6b"
      title-color="#ffffff"
      confirm-color="#ffffff"
      cancel-color="#ffffff"
      background-color="#f8f9fa"
      color="#495057"
      @confirm="handleCustomConfirm"
    />

    <!-- 禁用遮罩关闭选择器 -->
    <YPicker
      v-model:show="noMaskShow"
      v-model:value="noMaskValue"
      :layer="2"
      :picker-data="timeData"
      title="选择时间"
      :mask-closable="false"
      @confirm="handleNoMaskConfirm"
      @cancel="handleNoMaskCancel"
    />

    <!-- 事件监听选择器 -->
    <YPicker
      v-model:show="eventShow"
      v-model:value="eventValue"
      :layer="3"
      :picker-data="fullAreaData"
      title="事件监听"
      :params="{ source: 'event-demo' }"
      @confirm="handleEventConfirm"
      @cancel="handleEventCancel"
      @change="handleEventChange"
      @hide="handleEventHide"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YPicker } from '@you-web/ui-core'

const router = useRouter()

// 返回首页
const goBack = () => {
  router.push('/')
}

// 一级选择器
const singleShow = ref(false)
const singleValue = ref<string[]>([])
const colorData = [
  { text: '红色', value: 'red' },
  { text: '绿色', value: 'green' },
  { text: '蓝色', value: 'blue' },
  { text: '黄色', value: 'yellow' },
  { text: '紫色', value: 'purple' },
  { text: '橙色', value: 'orange' }
]

const showSinglePicker = () => {
  singleShow.value = true
}

const handleSingleConfirm = (data: any) => {
  console.log('单级选择确认:', data)
}

const handleSingleCancel = () => {
  console.log('单级选择取消')
}

// 二级联动选择器
const doubleShow = ref(false)
const doubleValue = ref<string[]>([])
const provinceData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      { text: '广州市', value: 'guangzhou' },
      { text: '深圳市', value: 'shenzhen' },
      { text: '珠海市', value: 'zhuhai' },
      { text: '佛山市', value: 'foshan' }
    ]
  },
  {
    text: '江苏省',
    value: 'jiangsu',
    children: [
      { text: '南京市', value: 'nanjing' },
      { text: '苏州市', value: 'suzhou' },
      { text: '无锡市', value: 'wuxi' },
      { text: '常州市', value: 'changzhou' }
    ]
  },
  {
    text: '浙江省',
    value: 'zhejiang',
    children: [
      { text: '杭州市', value: 'hangzhou' },
      { text: '宁波市', value: 'ningbo' },
      { text: '温州市', value: 'wenzhou' },
      { text: '嘉兴市', value: 'jiaxing' }
    ]
  }
]

const showDoublePicker = () => {
  doubleShow.value = true
}

const handleDoubleConfirm = (data: any) => {
  console.log('二级联动确认:', data)
}

const handleDoubleCancel = () => {
  console.log('二级联动取消')
}

const handleDoubleChange = (data: any) => {
  console.log('二级联动变化:', data)
}

// 三级联动选择器
const tripleShow = ref(false)
const tripleValue = ref<string[]>([])
const fullAreaData = [
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      {
        text: '广州市',
        value: 'guangzhou',
        children: [
          { text: '天河区', value: 'tianhe' },
          { text: '越秀区', value: 'yuexiu' },
          { text: '海珠区', value: 'haizhu' },
          { text: '荔湾区', value: 'liwan' }
        ]
      },
      {
        text: '深圳市',
        value: 'shenzhen',
        children: [
          { text: '南山区', value: 'nanshan' },
          { text: '福田区', value: 'futian' },
          { text: '罗湖区', value: 'luohu' },
          { text: '宝安区', value: 'baoan' }
        ]
      }
    ]
  },
  {
    text: '江苏省',
    value: 'jiangsu',
    children: [
      {
        text: '南京市',
        value: 'nanjing',
        children: [
          { text: '玄武区', value: 'xuanwu' },
          { text: '秦淮区', value: 'qinhuai' },
          { text: '建邺区', value: 'jianye' },
          { text: '鼓楼区', value: 'gulou' }
        ]
      },
      {
        text: '苏州市',
        value: 'suzhou',
        children: [
          { text: '姑苏区', value: 'gusu' },
          { text: '虎丘区', value: 'huqiu' },
          { text: '吴中区', value: 'wuzhong' },
          { text: '相城区', value: 'xiangcheng' }
        ]
      }
    ]
  }
]

const showTriplePicker = () => {
  tripleShow.value = true
}

const handleTripleConfirm = (data: any) => {
  console.log('三级联动确认:', data)
}

const handleTripleCancel = () => {
  console.log('三级联动取消')
}

const handleTripleChange = (data: any) => {
  console.log('三级联动变化:', data)
}

// 自定义样式选择器
const customShow = ref(false)
const customValue = ref<string[]>([])
const categoryData = [
  {
    text: '电子产品',
    value: 'electronics',
    children: [
      { text: '手机', value: 'phone' },
      { text: '电脑', value: 'computer' },
      { text: '平板', value: 'tablet' },
      { text: '耳机', value: 'headphone' }
    ]
  },
  {
    text: '服装鞋帽',
    value: 'clothing',
    children: [
      { text: '男装', value: 'mens' },
      { text: '女装', value: 'womens' },
      { text: '童装', value: 'kids' },
      { text: '鞋子', value: 'shoes' }
    ]
  },
  {
    text: '家居用品',
    value: 'home',
    children: [
      { text: '家具', value: 'furniture' },
      { text: '厨具', value: 'kitchen' },
      { text: '装饰', value: 'decoration' },
      { text: '清洁', value: 'cleaning' }
    ]
  }
]

const showCustomPicker = () => {
  customShow.value = true
}

const handleCustomConfirm = (data: any) => {
  console.log('自定义样式确认:', data)
}

// 禁用遮罩关闭选择器
const noMaskShow = ref(false)
const noMaskValue = ref<string[]>([])
const timeData = [
  {
    text: '上午',
    value: 'am',
    children: [
      { text: '09:00', value: '09:00' },
      { text: '10:00', value: '10:00' },
      { text: '11:00', value: '11:00' }
    ]
  },
  {
    text: '下午',
    value: 'pm',
    children: [
      { text: '14:00', value: '14:00' },
      { text: '15:00', value: '15:00' },
      { text: '16:00', value: '16:00' },
      { text: '17:00', value: '17:00' }
    ]
  },
  {
    text: '晚上',
    value: 'evening',
    children: [
      { text: '19:00', value: '19:00' },
      { text: '20:00', value: '20:00' },
      { text: '21:00', value: '21:00' }
    ]
  }
]

const showNoMaskClosePicker = () => {
  noMaskShow.value = true
}

const handleNoMaskConfirm = (data: any) => {
  console.log('禁用遮罩关闭确认:', data)
}

const handleNoMaskCancel = () => {
  console.log('禁用遮罩关闭取消')
}

// 事件监听选择器
const eventShow = ref(false)
const eventValue = ref<string[]>([])
const eventLogs = ref<string[]>([])

const showEventPicker = () => {
  eventShow.value = true
}

const addEventLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

const handleEventConfirm = (data: any) => {
  addEventLog(`确认选择: ${data.selectedTexts.join(' - ')}`)
  console.log('事件监听确认:', data)
}

const handleEventCancel = (params: any) => {
  addEventLog(`取消选择 (params: ${JSON.stringify(params)})`)
  console.log('事件监听取消:', params)
}

const handleEventChange = (data: any) => {
  addEventLog(`选择变化: ${data.selectedTexts.join(' - ')}`)
  console.log('事件监听变化:', data)
}

const handleEventHide = (params: any) => {
  addEventLog(`选择器隐藏 (params: ${JSON.stringify(params)})`)
  console.log('事件监听隐藏:', params)
}
</script>

<style lang="scss" scoped>

.demo-page-container {
  min-height: 100vh;
  background: var(--color-background-primary);
}

.page-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--color-background-primary);
  border-bottom: 1px solid var(--color-border-primary);
  position: sticky;
  top: 0;
  z-index: 100;

  .back-button {
    background: none;
    border: none;
    font-size: 20px;
    color: var(--color-primary);
    cursor: pointer;
    padding: 8px;
    margin-right: 12px;
    border-radius: 6px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-background-secondary);
    }
  }

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }
}

.demo-content {
  padding: 20px;
}

.demo-section {
  margin-bottom: 32px;
  padding: 20px;
  background: var(--color-background-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border-primary);

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .demo-desc {
    margin: 0 0 16px 0;
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-button {
  padding: 12px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  min-height: 44px;
  display: flex;
  align-items: center;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &.custom-style {
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    
    &:hover {
      background: linear-gradient(135deg, #ff5252, #ffb74d);
    }
  }
}

.event-log {
  margin-top: 16px;
  padding: 16px;
  background: var(--color-background-primary);
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);

  h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
  }
}

.log-item {
  padding: 6px 0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border-secondary);
  
  &:last-child {
    border-bottom: none;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .demo-content {
    padding: 16px;
  }

  .demo-section {
    padding: 16px;
    margin-bottom: 24px;
  }

  .page-header {
    padding: 12px 16px;

    h1 {
      font-size: 16px;
    }
  }
}
</style>