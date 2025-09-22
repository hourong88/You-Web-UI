import type { Meta, StoryObj } from '@storybook/vue3'
import YModal from '../../../you-ui-core/src/components/YModal/YModal.vue'

const meta: Meta<typeof YModal> = {
  title: 'Components/YModal',
  component: YModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '弹窗组件，用于显示重要信息、确认操作或收集用户输入。支持多种样式和自定义内容。'
      }
    }
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示弹窗'
    },
    title: {
      control: 'text',
      description: '弹窗标题'
    },
    content: {
      control: 'text',
      description: '弹窗内容'
    },
    width: {
      control: 'text',
      description: '弹窗宽度'
    },
    backgroundColor: {
      control: 'color',
      description: '背景色'
    },
    padding: {
      control: 'text',
      description: '内边距'
    },
    radius: {
      control: 'text',
      description: '圆角'
    },
    color: {
      control: 'color',
      description: '内容字体颜色'
    },
    size: {
      control: 'number',
      description: '内容字体大小'
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: '形状'
    },
    maskClosable: {
      control: 'boolean',
      description: '点击遮罩是否可关闭'
    },
    mask: {
      control: 'boolean',
      description: '是否显示遮罩'
    },
    maskColor: {
      control: 'color',
      description: '遮罩颜色'
    },
    fadeIn: {
      control: 'boolean',
      description: '淡入效果'
    },
    custom: {
      control: 'boolean',
      description: '自定义弹窗内容'
    },
    zIndex: {
      control: 'number',
      description: '容器层级'
    },
    maskZIndex: {
      control: 'number',
      description: '遮罩层级'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// 基础弹窗
export const Basic: Story = {
  args: {
    visible: true,
    title: '提示',
    content: '这是一个基础弹窗示例',
    buttons: [
      { text: '取消', type: 'gray', plain: false },
      { text: '确定', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '最基本的弹窗用法，包含标题、内容和操作按钮。'
      }
    }
  }
}

// 无标题弹窗
export const NoTitle: Story = {
  args: {
    visible: true,
    title: '',
    content: '这是一个无标题的弹窗，只显示内容部分。',
    buttons: [
      { text: '知道了', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '不显示标题的弹窗，适用于简单的提示信息。'
      }
    }
  }
}

// 成功提示
export const Success: Story = {
  args: {
    visible: true,
    title: '操作成功',
    content: '您的操作已经成功完成！',
    buttons: [
      { text: '取消', type: 'gray', plain: false },
      { text: '确定', type: 'green', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '成功状态的弹窗，使用绿色按钮表示成功操作。'
      }
    }
  }
}

// 警告提示
export const Warning: Story = {
  args: {
    visible: true,
    title: '警告',
    content: '请注意，此操作可能会产生一些影响。',
    buttons: [
      { text: '取消', type: 'gray', plain: false },
      { text: '继续', type: 'warning', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '警告状态的弹窗，使用橙色按钮提醒用户注意。'
      }
    }
  }
}

// 危险操作
export const Danger: Story = {
  args: {
    visible: true,
    title: '危险操作',
    content: '此操作不可逆，请谨慎操作！',
    buttons: [
      { text: '取消', type: 'gray', plain: false },
      { text: '删除', type: 'danger', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '危险操作的弹窗，使用红色按钮警示用户。'
      }
    }
  }
}

// 单个按钮
export const SingleButton: Story = {
  args: {
    visible: true,
    title: '通知',
    content: '这是一个只有一个按钮的弹窗。',
    buttons: [
      { text: '知道了', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '只有一个按钮的弹窗，适用于纯信息展示。'
      }
    }
  }
}

// 多个按钮
export const MultipleButtons: Story = {
  args: {
    visible: true,
    title: '选择操作',
    content: '请选择您要执行的操作。',
    buttons: [
      { text: '选项一', type: 'primary', plain: true },
      { text: '选项二', type: 'green', plain: true },
      { text: '选项三', type: 'warning', plain: true },
      { text: '确定', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '包含多个操作按钮的弹窗，按钮会垂直排列。'
      }
    }
  }
}

// 圆角样式
export const CircleShape: Story = {
  args: {
    visible: true,
    title: '圆角弹窗',
    content: '这是一个圆角样式的弹窗。',
    shape: 'circle',
    buttons: [
      { text: '取消', type: 'gray', plain: false },
      { text: '确定', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '圆角样式的弹窗，按钮也会变成圆角样式。'
      }
    }
  }
}

// 自定义尺寸
export const CustomSize: Story = {
  args: {
    visible: true,
    title: '自定义尺寸',
    content: '这是一个自定义尺寸的弹窗，宽度更小，内边距也不同。',
    width: '70%',
    padding: '30px 40px',
    buttons: [
      { text: '关闭', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '可以自定义弹窗的宽度和内边距。'
      }
    }
  }
}

// 不可关闭
export const NonClosable: Story = {
  args: {
    visible: true,
    title: '重要提示',
    content: '这个弹窗点击遮罩无法关闭，必须点击按钮才能关闭。',
    maskClosable: false,
    buttons: [
      { text: '我知道了', type: 'primary', plain: false }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '设置 maskClosable 为 false，点击遮罩无法关闭弹窗。'
      }
    }
  }
}

// 自定义内容
export const CustomContent: Story = {
  args: {
    visible: true,
    custom: true,
    width: '90%',
    padding: '30px'
  },
  render: (args) => ({
    components: { YModal },
    setup() {
      return { args }
    },
    template: `
      <YModal v-bind="args">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
          <h3 style="margin: 0 0 16px 0; color: #333; font-size: 18px;">自定义内容弹窗</h3>
          <p style="margin: 0 0 24px 0; color: #666; line-height: 1.5;">
            这里可以放置任何自定义内容，比如表单、图片、复杂布局等。
          </p>
          <div style="margin-bottom: 24px;">
            <input type="text" placeholder="请输入内容" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; margin-bottom: 12px; box-sizing: border-box;" />
            <textarea placeholder="请输入备注" style="width: 100%; height: 80px; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; resize: vertical; box-sizing: border-box;"></textarea>
          </div>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button style="flex: 1; padding: 12px 24px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; background-color: #f4f4f5; color: #606266;">取消</button>
            <button style="flex: 1; padding: 12px 24px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; background-color: #5677fc; color: white;">确定</button>
          </div>
        </div>
      </YModal>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 custom 属性和插槽可以完全自定义弹窗内容。'
      }
    }
  }
}