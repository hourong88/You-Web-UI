import type { Meta, StoryObj } from '@storybook/vue3'
import YSteps from '../../../you-ui-core/src/components/YSteps/YSteps.vue'

const meta = {
  title: '导航组件/YSteps',
  component: YSteps,
  parameters: {
    docs: {
      description: {
        component: 'YSteps 是一个灵活的步骤条组件，支持水平和垂直布局，可以显示当前进度和步骤状态。'
      }
    }
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 5 },
      description: '当前步骤索引'
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: '步骤条方向'
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'number'],
      description: '步骤条类型'
    },
    spacing: {
      control: { type: 'text' },
      description: '步骤间距'
    }
  }
} satisfies Meta<typeof YSteps>

export default meta
type Story = StoryObj<typeof meta>

const basicSteps = [
  { title: '步骤一', desc: '这是步骤一的描述信息' },
  { title: '步骤二', desc: '这是步骤二的描述信息' },
  { title: '步骤三', desc: '这是步骤三的描述信息' },
  { title: '步骤四', desc: '这是步骤四的描述信息' }
]

export const Default: Story = {
  args: {
    current: 1,
    direction: 'row',
    type: 'default',
    spacing: '25%',
    items: basicSteps
  }
}

export const Vertical: Story = {
  args: {
    current: 2,
    direction: 'column',
    type: 'default',
    spacing: '120rpx',
    items: basicSteps
  }
}

export const NumberType: Story = {
  args: {
    current: 1,
    direction: 'row',
    type: 'number',
    spacing: '25%',
    items: basicSteps
  }
}