import type { Meta, StoryObj } from '@storybook/vue3'
import { YTag } from '@you-web/ui-core'

const meta: Meta<typeof YTag> = {
  title: '展示组件/YTag 标签',
  component: YTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '用于标记和分类的标签组件，支持多种样式和形状。'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: '标签文本内容'
    },
    type: {
      control: 'select',
      options: [
        'primary', 'white', 'danger', 'pink', 'warning', 
        'green', 'gray', 'black', 'light-danger', 'light-blue', 
        'light-brownish', 'light-orange', 'light-green'
      ],
      description: '标签样式类型'
    },
    shape: {
      control: 'select',
      options: ['square', 'circle', 'circleLeft', 'circleRight'],
      description: '标签形状'
    },
    plain: {
      control: 'boolean',
      description: '是否为空心样式'
    },
    hover: {
      control: 'boolean',
      description: '是否启用点击效果'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    scaleMultiple: {
      control: { type: 'range', min: 0.5, max: 1.5, step: 0.1 },
      description: '缩放倍数'
    },
    originLeft: {
      control: 'boolean',
      description: '变换原点是否在左侧'
    },
    originRight: {
      control: 'boolean',
      description: '变换原点是否在右侧'
    }
  },
  args: {
    text: '标签',
    type: 'primary',
    shape: 'square',
    plain: false,
    hover: false,
    disabled: false,
    scaleMultiple: 1,
    originLeft: false,
    originRight: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Default: Story = {
  name: '基础用法',
  args: {
    text: '默认标签'
  }
}

// 不同类型
export const Types: Story = {
  name: '不同类型',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="主要" type="primary" />
        <YTag text="白色" type="white" />
        <YTag text="危险" type="danger" />
        <YTag text="粉色" type="pink" />
        <YTag text="警告" type="warning" />
        <YTag text="绿色" type="green" />
        <YTag text="灰色" type="gray" />
        <YTag text="黑色" type="black" />
      </div>
    `
  })
}

// 浅色类型
export const LightTypes: Story = {
  name: '浅色类型',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="浅危险" type="light-danger" />
        <YTag text="浅蓝色" type="light-blue" />
        <YTag text="浅棕色" type="light-brownish" />
        <YTag text="浅橙色" type="light-orange" />
        <YTag text="浅绿色" type="light-green" />
      </div>
    `
  })
}

// 空心样式
export const Plain: Story = {
  name: '空心样式',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="空心主要" type="primary" :plain="true" />
        <YTag text="空心危险" type="danger" :plain="true" />
        <YTag text="空心警告" type="warning" :plain="true" />
        <YTag text="空心绿色" type="green" :plain="true" />
      </div>
    `
  })
}

// 不同形状
export const Shapes: Story = {
  name: '不同形状',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="方形" shape="square" />
        <YTag text="圆形" shape="circle" />
        <YTag text="左圆角" shape="circleLeft" />
        <YTag text="右圆角" shape="circleRight" />
      </div>
    `
  })
}

// 点击效果
export const Interactive: Story = {
  name: '点击效果',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="点击我" :hover="true" @click="handleClick" />
        <YTag text="缩放效果" :hover="true" :scaleMultiple="0.9" @click="handleClick" />
      </div>
    `,
    methods: {
      handleClick(payload: any) {
        console.log('标签被点击:', payload)
        alert(`点击了标签: ${payload.text}`)
      }
    }
  })
}

// 禁用状态
export const Disabled: Story = {
  name: '禁用状态',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <YTag text="正常状态" type="primary" />
        <YTag text="禁用状态" type="primary" :disabled="true" />
        <YTag text="空心禁用" type="danger" :plain="true" :disabled="true" />
      </div>
    `
  })
}

// 自定义样式
export const CustomStyle: Story = {
  name: '自定义样式',
  args: {
    text: '自定义标签',
    type: 'primary',
    customStyle: {
      fontSize: '16px',
      padding: '8px 16px',
      borderRadius: '20px'
    }
  }
}

// 组合示例
export const Playground: Story = {
  name: '组合示例',
  render: () => ({
    components: { YTag },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="margin-bottom: 12px;">基础标签</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <YTag text="新品" type="danger" />
            <YTag text="热销" type="warning" />
            <YTag text="推荐" type="primary" />
            <YTag text="限时" type="pink" />
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">状态标签</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <YTag text="进行中" type="green" shape="circle" />
            <YTag text="已完成" type="gray" shape="circle" />
            <YTag text="已取消" type="danger" :plain="true" shape="circle" />
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">分类标签</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <YTag text="前端" type="light-blue" />
            <YTag text="后端" type="light-green" />
            <YTag text="设计" type="light-orange" />
            <YTag text="产品" type="light-brownish" />
          </div>
        </div>
      </div>
    `
  })
}