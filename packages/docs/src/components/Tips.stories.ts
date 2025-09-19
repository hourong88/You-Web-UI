import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import YTips from '../../../you-ui-core/src/components/YTips/YTips.vue'

const meta = {
  title: '反馈组件/YTips 消息提示',
  component: YTips,
  parameters: {
    docs: {
      description: {
        component: 'YTips 是一个消息提示组件，支持顶部、底部和居中三种位置显示，可自定义样式和持续时间。'
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'center'],
      description: '显示位置',
      defaultValue: 'top'
    },
    backgroundColor: {
      control: 'color',
      description: '背景颜色',
      defaultValue: 'rgba(0, 0, 0, 0.7)'
    },
    color: {
      control: 'color',
      description: '文字颜色',
      defaultValue: '#fff'
    },
    size: {
      control: 'number',
      description: '字体大小',
      defaultValue: 30
    }
  }
} satisfies Meta<typeof YTips>

export default meta
type Story = StoryObj<typeof meta>

// 顶部提示
export const TopTips: Story = {
  args: {
    position: 'top',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '这是一个顶部提示消息',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示顶部提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 底部提示
export const BottomTips: Story = {
  args: {
    position: 'bottom',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '这是一个底部提示消息',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示底部提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 居中提示
export const CenterTips: Story = {
  args: {
    position: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '这是一个居中提示消息',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示居中提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 成功提示
export const SuccessTips: Story = {
  args: {
    position: 'center',
    backgroundColor: '#28a745',
    color: '#fff',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '操作成功！',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示成功提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 错误提示
export const ErrorTips: Story = {
  args: {
    position: 'center',
    backgroundColor: '#dc3545',
    color: '#fff',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '操作失败，请重试',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示错误提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 警告提示
export const WarningTips: Story = {
  args: {
    position: 'center',
    backgroundColor: '#ffc107',
    color: '#333',
    size: 30
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '请注意检查输入内容',
          duration: 2000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #ffc107; color: #333; border: none; border-radius: 4px; cursor: pointer;">
          显示警告提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}

// 长文本提示
export const LongTextTips: Story = {
  args: {
    position: 'bottom',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    size: 28
  },
  render: (args) => ({
    components: { YTips },
    setup() {
      const tipsRef = ref<InstanceType<typeof YTips>>()

      const showTips = () => {
        tipsRef.value?.showTips({
          msg: '这是一个很长的提示消息，用来测试文本换行和显示效果，看看是否能够正常显示多行文本内容',
          duration: 4000
        })
      }

      return { args, tipsRef, showTips }
    },
    template: `
      <div>
        <button @click="showTips" style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示长文本提示
        </button>
        <YTips ref="tipsRef" v-bind="args" />
      </div>
    `
  })
}