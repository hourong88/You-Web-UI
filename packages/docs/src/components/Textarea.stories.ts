import type { Meta, StoryObj } from '@storybook/vue3'
import { YTextarea } from '../../../you-ui-core/src/components/YTextarea'

const meta: Meta<typeof YTextarea> = {
  title: '表单组件/YTextarea',
  component: YTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '多行文本输入框组件，支持自动调整高度、字数限制、禁用状态等功能。'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: '输入框的值，用于双向绑定'
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
      defaultValue: '请输入内容'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      defaultValue: false
    },
    readonly: {
      control: 'boolean',
      description: '是否只读',
      defaultValue: false
    },
    rows: {
      control: 'number',
      description: '显示行数',
      defaultValue: 3
    },
    maxlength: {
      control: 'number',
      description: '最大输入长度'
    },
    showWordLimit: {
      control: 'boolean',
      description: '是否显示字数统计',
      defaultValue: false
    },
    autosize: {
      control: 'boolean',
      description: '是否自动调整高度',
      defaultValue: false
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: '是否可拖拽调整尺寸',
      defaultValue: 'vertical'
    }
  },
  decorators: [
    () => ({
      template: '<div style="padding: 20px; width: 400px;"><story/></div>'
    })
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    placeholder: '请输入内容',
    modelValue: ''
  }
}

// 带默认值
export const WithDefaultValue: Story = {
  args: {
    modelValue: '这是默认的文本内容',
    placeholder: '请输入内容'
  }
}

// 禁用状态
export const Disabled: Story = {
  args: {
    modelValue: '这是禁用状态的文本',
    disabled: true,
    placeholder: '请输入内容'
  }
}

// 只读状态
export const Readonly: Story = {
  args: {
    modelValue: '这是只读状态的文本，不能编辑',
    readonly: true,
    placeholder: '请输入内容'
  }
}

// 自定义行数
export const CustomRows: Story = {
  args: {
    rows: 5,
    placeholder: '这是一个5行高的文本框',
    modelValue: ''
  }
}

// 字数限制
export const WithMaxLength: Story = {
  args: {
    maxlength: 100,
    showWordLimit: true,
    placeholder: '最多输入100个字符',
    modelValue: '这是一段示例文本，用来展示字数限制功能。'
  }
}

// 自动调整高度
export const Autosize: Story = {
  args: {
    autosize: true,
    placeholder: '输入内容时会自动调整高度',
    modelValue: '这是第一行\n这是第二行\n这是第三行\n继续输入会自动增加高度'
  }
}

// 不可调整尺寸
export const NoResize: Story = {
  args: {
    resize: 'none',
    placeholder: '不能拖拽调整尺寸',
    modelValue: ''
  }
}

// 水平调整尺寸
export const HorizontalResize: Story = {
  args: {
    resize: 'horizontal',
    placeholder: '只能水平调整尺寸',
    modelValue: ''
  }
}

// 完整功能演示
export const FullFeatures: Story = {
  render: () => ({
    components: { YTextarea },
    data() {
      return {
        content: '这是一个功能完整的文本框示例'
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="margin-bottom: 10px;">完整功能演示</h3>
          <YTextarea
            v-model="content"
            placeholder="请输入您的反馈内容"
            :maxlength="200"
            :showWordLimit="true"
            :autosize="true"
            rows="3"
          />
        </div>
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <strong>当前内容：</strong>
          <p style="margin: 8px 0 0 0; color: #666;">{{ content || '暂无内容' }}</p>
        </div>
      </div>
    `
  })
}