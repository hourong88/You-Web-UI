import { YPicker } from '@you-web/ui-core'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const meta: Meta<typeof YPicker> = {
  title: 'Components/YPicker',
  component: YPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'YPicker 是一个功能强大的联动选择器组件，支持一级、二级和三级联动选择。'
      }
    }
  },
  argTypes: {
    layer: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: '数据层级（1-3）'
    },
    show: {
      control: { type: 'boolean' },
      description: '是否显示选择器'
    },
    radius: {
      control: { type: 'boolean' },
      description: '是否显示圆角'
    },
    maskClosable: {
      control: { type: 'boolean' },
      description: '点击遮罩是否关闭'
    },
    title: {
      control: { type: 'text' },
      description: '标题文本'
    },
    titleColor: {
      control: { type: 'color' },
      description: '标题颜色'
    },
    confirmText: {
      control: { type: 'text' },
      description: '确认按钮文本'
    },
    confirmColor: {
      control: { type: 'color' },
      description: '确认按钮颜色'
    },
    cancelText: {
      control: { type: 'text' },
      description: '取消按钮文本'
    },
    cancelColor: {
      control: { type: 'color' },
      description: '取消按钮颜色'
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '内容区背景色'
    },
    headerBgColor: {
      control: { type: 'color' },
      description: '头部背景色'
    }
  }
}

export default meta
type Story = StoryObj<typeof YPicker>

// 基础数据
const colorData = [
  { text: '红色', value: 'red' },
  { text: '绿色', value: 'green' },
  { text: '蓝色', value: 'blue' },
  { text: '黄色', value: 'yellow' },
  { text: '紫色', value: 'purple' },
  { text: '橙色', value: 'orange' }
]

const areaData = [
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

// 一级选择器
export const SingleLevel: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        colorData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          选择颜色: {{ value.join(' ') || '请选择' }}
        </button>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="1"
          :picker-data="colorData"
          title="选择颜色"
          @confirm="handleConfirm"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: true
  }
}

// 二级联动选择器
export const TwoLevel: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      const handleChange = (data: any) => {
        console.log('选择变化:', data)
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        handleChange,
        areaData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          选择地区: {{ value.join(' - ') || '请选择' }}
        </button>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="2"
          :picker-data="areaData"
          title="选择省市"
          @confirm="handleConfirm"
          @change="handleChange"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: true
  }
}

// 三级联动选择器
export const ThreeLevel: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      const handleChange = (data: any) => {
        console.log('选择变化:', data)
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        handleChange,
        fullAreaData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          选择地址: {{ value.join(' - ') || '请选择' }}
        </button>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="3"
          :picker-data="fullAreaData"
          title="选择省市区"
          @confirm="handleConfirm"
          @change="handleChange"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: true
  }
}

// 自定义样式
export const CustomStyle: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

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
        }
      ]

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        categoryData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: linear-gradient(135deg, #ff6b6b, #feca57); color: white; border: none; border-radius: 12px; cursor: pointer;">
          自定义样式: {{ value.join(' - ') || '请选择' }}
        </button>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
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
          @confirm="handleConfirm"
        />
      </div>
    `
  }),
  args: {
    radius: true,
    maskClosable: true
  }
}

// 禁用遮罩关闭
export const NoMaskClose: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

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
        }
      ]

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      const handleCancel = () => {
        console.log('取消选择')
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        handleCancel,
        timeData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          禁用遮罩关闭: {{ value.join(' - ') || '请选择' }}
        </button>
        <p style="margin-top: 8px; font-size: 14px; color: #666;">点击遮罩无法关闭，只能通过按钮关闭</p>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="2"
          :picker-data="timeData"
          title="选择时间"
          :mask-closable="false"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: false
  }
}

// 事件监听
export const EventListening: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])
      const eventLogs = ref<string[]>([])

      const showPicker = () => {
        show.value = true
      }

      const addEventLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString()
        eventLogs.value.unshift(`[${timestamp}] ${message}`)
        if (eventLogs.value.length > 5) {
          eventLogs.value.pop()
        }
      }

      const handleConfirm = (data: any) => {
        addEventLog(`确认选择: ${data.selectedTexts.join(' - ')}`)
      }

      const handleCancel = (params: any) => {
        addEventLog(`取消选择 (params: ${JSON.stringify(params)})`)
      }

      const handleChange = (data: any) => {
        addEventLog(`选择变化: ${data.selectedTexts.join(' - ')}`)
      }

      const handleHide = (params: any) => {
        addEventLog(`选择器隐藏 (params: ${JSON.stringify(params)})`)
      }

      return {
        args,
        show,
        value,
        eventLogs,
        showPicker,
        handleConfirm,
        handleCancel,
        handleChange,
        handleHide,
        fullAreaData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          事件监听: {{ value.join(' - ') || '请选择' }}
        </button>
        
        <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">事件日志：</h4>
          <div v-for="(log, index) in eventLogs" :key="index" style="padding: 4px 0; font-family: monospace; font-size: 12px; color: #666; border-bottom: 1px solid #e9ecef;">
            {{ log }}
          </div>
          <div v-if="eventLogs.length === 0" style="color: #999; font-size: 12px; font-style: italic;">
            暂无事件日志
          </div>
        </div>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="3"
          :picker-data="fullAreaData"
          title="事件监听"
          :params="{ source: 'storybook-demo' }"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @change="handleChange"
          @hide="handleHide"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: true
  }
}

// 自定义字段名
export const CustomFields: Story = {
  render: (args) => ({
    components: { YPicker },
    setup() {
      const show = ref(false)
      const value = ref<string[]>([])

      const customFieldData = [
        {
          name: '分类A',
          id: 'categoryA',
          subItems: [
            { name: '子项A1', id: 'itemA1' },
            { name: '子项A2', id: 'itemA2' },
            { name: '子项A3', id: 'itemA3' }
          ]
        },
        {
          name: '分类B',
          id: 'categoryB',
          subItems: [
            { name: '子项B1', id: 'itemB1' },
            { name: '子项B2', id: 'itemB2' }
          ]
        }
      ]

      const showPicker = () => {
        show.value = true
      }

      const handleConfirm = (data: any) => {
        console.log('选择结果:', data)
      }

      return {
        args,
        show,
        value,
        showPicker,
        handleConfirm,
        customFieldData
      }
    },
    template: `
      <div>
        <button @click="showPicker" style="padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          自定义字段: {{ value.join(' - ') || '请选择' }}
        </button>
        <p style="margin-top: 8px; font-size: 14px; color: #666;">使用 name/id/subItems 作为字段名</p>
        
        <YPicker
          v-bind="args"
          v-model:show="show"
          v-model:value="value"
          :layer="2"
          :picker-data="customFieldData"
          text-field="name"
          value-field="id"
          children-field="subItems"
          title="自定义字段"
          @confirm="handleConfirm"
        />
      </div>
    `
  }),
  args: {
    radius: false,
    maskClosable: true
  }
}