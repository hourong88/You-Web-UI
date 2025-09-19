import type { Meta, StoryObj } from '@storybook/vue3'
import YFooter from '../../../you-ui-core/src/components/YFooter/YFooter.vue'

const meta = {
  title: '导航组件/YFooter 页脚',
  component: YFooter,
  parameters: {
    docs: {
      description: {
        component: 'YFooter 是一个灵活的页脚组件，支持导航链接和版权信息展示，可以固定在页面底部或作为普通内容区域使用。'
      }
    }
  },
  argTypes: {
    navigate: {
      control: 'object',
      description: '导航链接数组'
    },
    urlField: {
      control: 'text',
      description: 'URL 字段名',
      defaultValue: 'url'
    },
    textField: {
      control: 'text',
      description: '文本字段名',
      defaultValue: 'text'
    },
    copyright: {
      control: 'text',
      description: '版权信息文本',
      defaultValue: 'All Rights Reserved.'
    },
    color: {
      control: 'color',
      description: '版权信息字体颜色',
      defaultValue: '#A7A7A7'
    },
    size: {
      control: { type: 'number', min: 20, max: 40, step: 2 },
      description: '版权信息字体大小',
      defaultValue: 24
    },
    backgroundColor: {
      control: 'color',
      description: '背景颜色',
      defaultValue: 'transparent'
    },
    linkColor: {
      control: 'color',
      description: '链接颜色',
      defaultValue: ''
    },
    fixed: {
      control: 'boolean',
      description: '是否固定在底部',
      defaultValue: true
    }
  }
} satisfies Meta<typeof YFooter>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Default: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '关于我们', url: '/pages/about/index', type: 'navigate' },
      { text: '联系我们', url: '/pages/contact/index', type: 'navigate' }
    ],
    copyright: '© 2024 You-Web UI. All Rights Reserved.',
    fixed: false
  }
}

// 自定义样式
export const CustomStyle: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '产品', url: '/pages/product/index', type: 'navigate' },
      { text: '服务', url: '/pages/service/index', type: 'navigate' }
    ],
    copyright: '© 2024 自定义样式示例',
    color: '#666666',
    size: 26,
    backgroundColor: '#f8f9fa',
    linkColor: '#007bff',
    fixed: false
  }
}

// 仅版权信息
export const CopyrightOnly: Story = {
  args: {
    navigate: [],
    copyright: '© 2024 仅显示版权信息',
    fixed: false
  }
}

// 多链接示例
export const MultipleLinks: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '产品', url: '/pages/product/index', type: 'navigate' },
      { text: '服务', url: '/pages/service/index', type: 'navigate' },
      { text: '关于', url: '/pages/about/index', type: 'navigate' },
      { text: '联系', url: '/pages/contact/index', type: 'navigate' }
    ],
    copyright: '© 2024 多链接页脚示例',
    fixed: false
  }
}

// 固定底部
export const FixedBottom: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '关于', url: '/pages/about/index', type: 'navigate' }
    ],
    copyright: '© 2024 固定在底部的页脚',
    fixed: true
  },
  parameters: {
    docs: {
      description: {
        story: '固定在页面底部的页脚，适用于需要始终显示页脚信息的场景。'
      }
    }
  }
}

// 深色主题
export const DarkTheme: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '关于', url: '/pages/about/index', type: 'navigate' },
      { text: '联系', url: '/pages/contact/index', type: 'navigate' }
    ],
    copyright: '© 2024 深色主题页脚',
    color: '#ffffff',
    backgroundColor: '#343a40',
    linkColor: '#ffffff',
    fixed: false
  }
}

// 交互示例
export const Interactive: Story = {
  args: {
    navigate: [
      { text: '首页', url: '/pages/index/index', type: 'switchTab' },
      { text: '关于', url: '/pages/about/index', type: 'navigate' }
    ],
    copyright: '© 2024 交互示例',
    fixed: false
  },
  render: (args) => ({
    components: { YFooter },
    setup() {
      const handleLinkClick = (payload: any) => {
        alert(`点击了链接: ${payload.item.text}`)
      }

      return { args, handleLinkClick }
    },
    template: `
      <YFooter 
        v-bind="args" 
        @linkClick="handleLinkClick"
      />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '展示页脚组件的交互功能，点击链接时会触发事件。'
      }
    }
  }
}