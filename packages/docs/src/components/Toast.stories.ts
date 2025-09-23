import type { Meta, StoryObj } from '@storybook/vue3'
import YToast from '../../../you-ui-core/src/components/YToast'
import { ref } from 'vue'

const meta: Meta<typeof YToast> = {
  title: 'Components/YToast',
  component: YToast,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    zIndex: {
      control: { type: 'number' },
      description: 'Toast的层级'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '提示',
          duration: 2000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示基础Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithContent: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '操作成功',
          content: '您的操作已成功完成',
          duration: 3000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          显示带内容Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithSuccessIcon: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          成功Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithErrorIcon: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '错误',
          icon: 'error',
          duration: 2000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
          错误Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithWarningIcon: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '警告',
          icon: 'warning',
          duration: 2000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #ffc107; color: #212529; border: none; border-radius: 4px; cursor: pointer;">
          警告Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithLoadingIcon: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '加载中...',
          icon: 'loading',
          duration: 3000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">
          加载Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const WithCustomImage: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '自定义图标',
          imgUrl: 'https://via.placeholder.com/40x40/007bff/ffffff?text=UI',
          duration: 2000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;">
          自定义图标Toast
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const LongDuration: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef = ref()

      const showToast = () => {
        toastRef.value?.show({
          title: '长时间显示',
          content: '这个Toast会显示5秒钟',
          icon: 'success',
          duration: 5000
        })
      }

      return { args, toastRef, showToast }
    },
    template: `
      <div>
        <button @click="showToast" style="padding: 8px 16px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;">
          长时间Toast (5秒)
        </button>
        <YToast ref="toastRef" v-bind="args" />
      </div>
    `
  }),
  args: {
    zIndex: 1000
  }
}

export const MultipleToasts: Story = {
  render: (args) => ({
    components: { YToast },
    setup() {
      const toastRef1 = ref()
      const toastRef2 = ref()
      const toastRef3 = ref()

      const showMultiple = () => {
        toastRef1.value?.show({
          title: '第一个Toast',
          icon: 'success',
          duration: 2000
        })

        setTimeout(() => {
          toastRef2.value?.show({
            title: '第二个Toast',
            icon: 'warning',
            duration: 2000
          })
        }, 500)

        setTimeout(() => {
          toastRef3.value?.show({
            title: '第三个Toast',
            icon: 'error',
            duration: 2000
          })
        }, 1000)
      }

      return { args, toastRef1, toastRef2, toastRef3, showMultiple }
    },
    template: `
      <div>
        <button @click="showMultiple" style="padding: 8px 16px; background: #fd7e14; color: white; border: none; border-radius: 4px; cursor: pointer;">
          连续显示多个Toast
        </button>
        <YToast ref="toastRef1" :z-index="1000" />
        <YToast ref="toastRef2" :z-index="1001" />
        <YToast ref="toastRef3" :z-index="1002" />
      </div>
    `
  })
}