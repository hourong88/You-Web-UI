import type { Meta, StoryObj } from '@storybook/vue3'
import YDrawer from '../../../you-ui-core/src/components/YDrawer/YDrawer.vue'

const meta: Meta<typeof YDrawer> = {
  title: '反馈组件/YDrawer',
  component: YDrawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '抽屉组件，从屏幕边缘滑出的浮层面板。'
      }
    }
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示抽屉'
    },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: '抽屉的方向'
    },
    width: {
      control: 'text',
      description: '抽屉宽度（当 placement 为 left 或 right 时生效）'
    },
    height: {
      control: 'text',
      description: '抽屉高度（当 placement 为 top 或 bottom 时生效）'
    },
    maskClosable: {
      control: 'boolean',
      description: '点击蒙层是否允许关闭'
    },
    showMask: {
      control: 'boolean',
      description: '是否显示遮罩层'
    },
    zIndex: {
      control: 'number',
      description: '设置抽屉的 z-index'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    visible: true,
    placement: 'right',
    width: '300px',
    maskClosable: true,
    showMask: true,
    zIndex: 1000
  },
  render: (args) => ({
    components: { YDrawer },
    setup() {
      return { args }
    },
    template: `
      <div>
        <YDrawer v-bind="args">
          <div style="padding: 20px;">
            <h3>抽屉内容</h3>
            <p>这是抽屉的内容区域</p>
            <p>可以放置任何内容</p>
          </div>
        </YDrawer>
      </div>
    `
  })
}

export const Left: Story = {
  args: {
    ...Default.args,
    placement: 'left'
  }
}

export const Top: Story = {
  args: {
    ...Default.args,
    placement: 'top',
    height: '200px'
  }
}

export const Bottom: Story = {
  args: {
    ...Default.args,
    placement: 'bottom',
    height: '200px'
  }
}

export const NoMask: Story = {
  args: {
    ...Default.args,
    showMask: false
  }
}

export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: '500px'
  }
}