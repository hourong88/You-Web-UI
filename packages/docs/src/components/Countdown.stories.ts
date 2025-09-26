import type { Meta, StoryObj } from '@storybook/vue3'
import { YCountdown } from '../../../you-ui-core/src'

const meta: Meta<typeof YCountdown> = {
  title: '展示组件/YCountdown',
  component: YCountdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => ({
      template: '<div style="width: 400px; padding: 20px;"><story/></div>'
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'number',
      description: '剩余时间（秒）'
    },
    width: {
      control: 'number',
      description: '数字框宽度（px）'
    },
    height: {
      control: 'number',
      description: '数字框高度（px）'
    },
    borderColor: {
      control: 'color',
      description: '数字框边框颜色'
    },
    backgroundColor: {
      control: 'color',
      description: '数字框背景颜色'
    },
    size: {
      control: 'number',
      description: '数字框字体大小（px）'
    },
    color: {
      control: 'color',
      description: '数字框字体颜色'
    },
    scale: {
      control: 'boolean',
      description: '是否缩放至0.9倍'
    },
    colonSize: {
      control: 'number',
      description: '冒号大小（px）'
    },
    colonColor: {
      control: 'color',
      description: '冒号颜色'
    },
    days: {
      control: 'boolean',
      description: '是否包含天数'
    },
    hours: {
      control: 'boolean',
      description: '是否包含小时'
    },
    minutes: {
      control: 'boolean',
      description: '是否包含分钟'
    },
    seconds: {
      control: 'boolean',
      description: '是否包含秒数'
    },
    unitEn: {
      control: 'boolean',
      description: '单位用英文缩写'
    },
    isColon: {
      control: 'boolean',
      description: '是否使用冒号分隔'
    },
    returnTime: {
      control: 'boolean',
      description: '是否返回剩余时间'
    },
    isMs: {
      control: 'boolean',
      description: '是否显示毫秒'
    },
    msWidth: {
      control: 'number',
      description: '毫秒框宽度（px）'
    },
    msSize: {
      control: 'number',
      description: '毫秒字体大小（px）'
    },
    msColor: {
      control: 'color',
      description: '毫秒字体颜色'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    time: 60,
    hours: true,
    minutes: true,
    seconds: true
  },
}

export const WithDays: Story = {
  args: {
    time: 172800, // 2天
    days: true,
    hours: true,
    minutes: true,
    seconds: true
  },
}

export const CustomStyle: Story = {
  args: {
    time: 300,
    width: 40,
    height: 40,
    size: 18,
    backgroundColor: '#ff6b35',
    color: '#fff',
    borderColor: '#ff6b35',
    colonColor: '#ff6b35'
  },
}

export const TextSeparator: Story = {
  args: {
    time: 3661, // 1小时1分1秒
    days: true,
    isColon: false,
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd'
  },
}

export const WithScale: Story = {
  args: {
    time: 180,
    scale: true,
    width: 50,
    height: 50,
    size: 24,
    backgroundColor: '#07c160',
    color: '#fff',
    borderColor: '#07c160',
    colonColor: '#07c160'
  },
}

export const WithMilliseconds: Story = {
  args: {
    time: 30,
    isMs: true,
    msWidth: 40,
    msSize: 20,
    msColor: '#333',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7'
  },
}

export const SecondsOnly: Story = {
  args: {
    time: 120,
    hours: false,
    minutes: false,
    seconds: true,
    unitEn: true,
    width: 60,
    height: 40,
    size: 20,
    backgroundColor: '#6c5ce7',
    color: '#fff',
    borderColor: '#6c5ce7'
  },
}

export const TransparentBorder: Story = {
  args: {
    time: 90,
    borderColor: 'transparent',
    backgroundColor: '#fd79a8',
    color: '#fff',
    colonColor: '#fd79a8'
  },
}

export const LargeCountdown: Story = {
  args: {
    time: 7200, // 2小时
    width: 60,
    height: 60,
    size: 28,
    colonSize: 32,
    backgroundColor: '#2d3748',
    color: '#fff',
    borderColor: '#2d3748',
    colonColor: '#4a5568'
  },
}

export const MinimalStyle: Story = {
  args: {
    time: 45,
    width: 24,
    height: 24,
    size: 14,
    colonSize: 16,
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    borderColor: '#cbd5e0',
    colonColor: '#718096'
  },
}