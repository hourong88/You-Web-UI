<template>
  <div class="demo-container">
    <h1>YCascadeSelection 级联选择器</h1>
    
    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <YCascadeSelection
        :item-list="basicData"
        @change="onBasicChange"
        @complete="onBasicComplete"
      />
      <div class="result">
        <p>选择结果: {{ basicResult }}</p>
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <h2>自定义样式</h2>
      <YCascadeSelection
        :item-list="basicData"
        active-color="#ff6b6b"
        line-color="#ff6b6b"
        check-mark-color="#ff6b6b"
        text-active-color="#ff6b6b"
        :size="16"
        :text-size="16"
        height="250px"
        @change="onStyledChange"
        @complete="onStyledComplete"
      />
      <div class="result">
        <p>选择结果: {{ styledResult }}</p>
      </div>
    </div>

    <!-- 带图片的选项 -->
    <div class="demo-section">
      <h2>带图片选项</h2>
      <YCascadeSelection
        :item-list="imageData"
        img-width="32px"
        img-height="32px"
        radius="8px"
        @change="onImageChange"
        @complete="onImageComplete"
      />
      <div class="result">
        <p>选择结果: {{ imageResult }}</p>
      </div>
    </div>

    <!-- 默认选中 -->
    <div class="demo-section">
      <h2>默认选中</h2>
      <YCascadeSelection
        :item-list="basicData"
        :default-item-list="['广东省', '深圳市', '南山区']"
        @change="onDefaultChange"
        @complete="onDefaultComplete"
      />
      <div class="result">
        <p>选择结果: {{ defaultResult }}</p>
      </div>
    </div>

    <!-- 异步加载数据 -->
    <div class="demo-section">
      <h2>异步加载数据</h2>
      <YCascadeSelection
        :item-list="asyncData"
        :receive-data="asyncReceiveData"
        :request="true"
        @change="onAsyncChange"
        @complete="onAsyncComplete"
      />
      <div class="result">
        <p>选择结果: {{ asyncResult }}</p>
      </div>
    </div>

    <!-- 自定义字段名 -->
    <div class="demo-section">
      <h2>自定义字段名</h2>
      <YCascadeSelection
        :item-list="customFieldData"
        text-field="name"
        value-field="id"
        children-field="items"
        sub-text-field="desc"
        @change="onCustomFieldChange"
        @complete="onCustomFieldComplete"
      />
      <div class="result">
        <p>选择结果: {{ customFieldResult }}</p>
      </div>
    </div>

    <!-- 无底部线条 -->
    <div class="demo-section">
      <h2>无底部线条和指示线</h2>
      <YCascadeSelection
        :item-list="basicData"
        :header-line="false"
        :show-line="false"
        @change="onNoLineChange"
        @complete="onNoLineComplete"
      />
      <div class="result">
        <p>选择结果: {{ noLineResult }}</p>
      </div>
    </div>

    <!-- 紧凑模式 -->
    <div class="demo-section">
      <h2>紧凑模式</h2>
      <YCascadeSelection
        :item-list="basicData"
        tabs-height="36px"
        height="200px"
        :size="12"
        :text-size="12"
        padding="8px 12px"
        first-item-top="8px"
        @change="onCompactChange"
        @complete="onCompactComplete"
      />
      <div class="result">
        <p>选择结果: {{ compactResult }}</p>
      </div>
    </div>

    <!-- 8级异步数据加载 -->
    <div class="demo-section">
      <h2>8级异步数据加载</h2>
      <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
        演示深度级联选择，支持8级数据异步加载。每次选择时会动态请求下一级数据。
      </p>
      <YCascadeSelection
        :item-list="deepAsyncData"
        :receive-data="deepAsyncReceiveData"
        :request="true"
        height="350px"
        @change="onDeepAsyncChange"
        @complete="onDeepAsyncComplete"
      />
      <div class="result">
        <p>选择结果: {{ deepAsyncResult }}</p>
        <p style="margin-top: 5px; font-size: 12px; color: #999;">
          当前级别: {{ currentLevel }}/8
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import YCascadeSelection from '../../../you-ui-core/src/components/YCascadeSelection/YCascadeSelection.vue'

// 基础数据
const basicData = ref([
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
          { text: '海珠区', value: 'haizhu' }
        ]
      },
      {
        text: '深圳市',
        value: 'shenzhen',
        children: [
          { text: '南山区', value: 'nanshan' },
          { text: '福田区', value: 'futian' },
          { text: '罗湖区', value: 'luohu' }
        ]
      }
    ]
  },
  {
    text: '北京市',
    value: 'beijing',
    children: [
      {
        text: '北京市',
        value: 'beijing_city',
        children: [
          { text: '朝阳区', value: 'chaoyang' },
          { text: '海淀区', value: 'haidian' },
          { text: '西城区', value: 'xicheng' }
        ]
      }
    ]
  }
])

// 带图片的数据
const imageData = ref([
  {
    text: '电子产品',
    value: 'electronics',
    src: 'https://via.placeholder.com/32x32/007bff/ffffff?text=E',
    children: [
      {
        text: '手机',
        value: 'phone',
        src: 'https://via.placeholder.com/32x32/28a745/ffffff?text=P',
        children: [
          { text: 'iPhone', value: 'iphone', src: 'https://via.placeholder.com/32x32/000000/ffffff?text=i' },
          { text: 'Android', value: 'android', src: 'https://via.placeholder.com/32x32/34ce57/ffffff?text=A' }
        ]
      },
      {
        text: '电脑',
        value: 'computer',
        src: 'https://via.placeholder.com/32x32/ffc107/000000?text=C',
        children: [
          { text: '笔记本', value: 'laptop', src: 'https://via.placeholder.com/32x32/6c757d/ffffff?text=L' },
          { text: '台式机', value: 'desktop', src: 'https://via.placeholder.com/32x32/dc3545/ffffff?text=D' }
        ]
      }
    ]
  }
])

// 自定义字段数据
const customFieldData = ref([
  {
    name: '技术部',
    id: 'tech',
    desc: '技术开发部门',
    items: [
      {
        name: '前端组',
        id: 'frontend',
        desc: '前端开发',
        items: [
          { name: 'Vue开发', id: 'vue', desc: 'Vue.js开发' },
          { name: 'React开发', id: 'react', desc: 'React.js开发' }
        ]
      },
      {
        name: '后端组',
        id: 'backend',
        desc: '后端开发',
        items: [
          { name: 'Java开发', id: 'java', desc: 'Java后端开发' },
          { name: 'Node.js开发', id: 'nodejs', desc: 'Node.js开发' }
        ]
      }
    ]
  }
])

// 异步数据
const asyncData = ref([
  { text: '省份1', value: 'province1' },
  { text: '省份2', value: 'province2' }
])

const asyncReceiveData = ref([])

// 8级异步数据
const deepAsyncData = ref([
  { text: '中国', value: 'china' },
  { text: '美国', value: 'usa' },
  { text: '日本', value: 'japan' }
])

const deepAsyncReceiveData = ref([])
const currentLevel = ref(0)

// 结果状态
const basicResult = ref('')
const styledResult = ref('')
const imageResult = ref('')
const defaultResult = ref('')
const asyncResult = ref('')
const customFieldResult = ref('')
const noLineResult = ref('')
const compactResult = ref('')
const deepAsyncResult = ref('')

// 事件处理函数
const onBasicChange = (data: any) => {
  console.log('Basic change:', data)
}

const onBasicComplete = (data: any) => {
  basicResult.value = data.text || '未选择'
  console.log('Basic complete:', data)
}

const onStyledChange = (data: any) => {
  console.log('Styled change:', data)
}

const onStyledComplete = (data: any) => {
  styledResult.value = data.text || '未选择'
  console.log('Styled complete:', data)
}

const onImageChange = (data: any) => {
  console.log('Image change:', data)
}

const onImageComplete = (data: any) => {
  imageResult.value = data.text || '未选择'
  console.log('Image complete:', data)
}

const onDefaultChange = (data: any) => {
  console.log('Default change:', data)
}

const onDefaultComplete = (data: any) => {
  defaultResult.value = data.text || '未选择'
  console.log('Default complete:', data)
}

const onAsyncChange = (data: any) => {
  console.log('Async change:', data)
  // 模拟异步加载数据
  setTimeout(() => {
    if (data.layer === 0) {
      asyncReceiveData.value = [
        { text: '城市1-1', value: 'city1-1' },
        { text: '城市1-2', value: 'city1-2' }
      ]
    } else if (data.layer === 1) {
      asyncReceiveData.value = [
        { text: '区域1-1-1', value: 'area1-1-1' },
        { text: '区域1-1-2', value: 'area1-1-2' }
      ]
    }
  }, 500)
}

const onAsyncComplete = (data: any) => {
  asyncResult.value = data.text || '未选择'
  console.log('Async complete:', data)
}

const onCustomFieldChange = (data: any) => {
  console.log('Custom field change:', data)
}

const onCustomFieldComplete = (data: any) => {
  customFieldResult.value = data.name || '未选择'
  console.log('Custom field complete:', data)
}

const onNoLineChange = (data: any) => {
  console.log('No line change:', data)
}

const onNoLineComplete = (data: any) => {
  noLineResult.value = data.text || '未选择'
  console.log('No line complete:', data)
}

const onCompactChange = (data: any) => {
  console.log('Compact change:', data)
}

const onCompactComplete = (data: any) => {
  compactResult.value = data.text || '未选择'
  console.log('Compact complete:', data)
}

// 8级异步数据加载事件处理
const onDeepAsyncChange = (data: any) => {
  console.log('Deep async change:', data)
  currentLevel.value = data.layer + 1
  
  // 模拟异步加载8级数据
  setTimeout(() => {
    const levelNames = ['省份', '城市', '区县', '街道', '社区', '小区', '楼栋', '单元']
    const level = data.layer
    
    if (level < 7) { // 最多8级，索引0-7
      const nextLevelData = []
      const count = Math.floor(Math.random() * 4) + 2 // 每级2-5个选项
      
      for (let i = 1; i <= count; i++) {
        const levelName = levelNames[level + 1] || '选项'
        nextLevelData.push({
          text: `${levelName}${i}`,
          value: `${data.value}_${level + 1}_${i}`,
          level: level + 1
        })
      }
      
      deepAsyncReceiveData.value = nextLevelData
      console.log(`第${level + 2}级数据加载完成:`, nextLevelData)
    }
  }, 800) // 模拟网络延迟
}

const onDeepAsyncComplete = (data: any) => {
  deepAsyncResult.value = data.text || '未选择'
  console.log('Deep async complete:', data)
}
</script>

<style scoped lang="scss">
$color-primary: #5677fc;
$color-text-primary: #333;
$color-text-secondary: #666;
$color-border-light: #eee;

.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: $color-text-primary;
  margin-bottom: 30px;
  text-align: center;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid $color-border-light;
  border-radius: 8px;
  background: #fff;

  h2 {
    color: $color-text-secondary;
    margin-bottom: 20px;
    font-size: 18px;
  }
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid $color-primary;

  p {
    margin: 0;
    color: $color-text-secondary;
    font-size: 14px;
  }
}
</style>