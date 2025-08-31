import { YButton } from '@you-uniapp/ui-core'

export default {
  title: '基础组件/Button 按钮',
  component: YButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '按钮用于开始一个即时操作。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '按钮类型'
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'mini'],
      description: '按钮尺寸'
    },
    plain: {
      control: { type: 'boolean' },
      description: '是否为朴素按钮'
    },
    round: {
      control: { type: 'boolean' },
      description: '是否为圆角按钮'
    },
    circle: {
      control: { type: 'boolean' },
      description: '是否为圆形按钮'
    },
    block: {
      control: { type: 'boolean' },
      description: '是否为块级按钮'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用'
    },
    loading: {
      control: { type: 'boolean' },
      description: '是否加载中'
    },
    text: {
      control: { type: 'text' },
      description: '按钮文本'
    }
  },
  args: {
    text: '按钮'
  }
}

// 基础用法
export const Default = {
  args: {
    text: '默认按钮'
  }
}

// 按钮类型
export const Types = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <YButton text="默认按钮" />
        <YButton type="primary" text="主要按钮" />
        <YButton type="success" text="成功按钮" />
        <YButton type="warning" text="警告按钮" />
        <YButton type="danger" text="危险按钮" />
        <YButton type="info" text="信息按钮" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `type` 属性来定义按钮的样式。'
      }
    }
  }
}

// 朴素按钮
export const Plain = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <YButton plain text="朴素按钮" />
        <YButton plain type="primary" text="主要按钮" />
        <YButton plain type="success" text="成功按钮" />
        <YButton plain type="warning" text="警告按钮" />
        <YButton plain type="danger" text="危险按钮" />
        <YButton plain type="info" text="信息按钮" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '朴素按钮，通过添加 `plain` 属性，它们看起来像普通按钮，但是背景颜色是透明的。'
      }
    }
  }
}

// 按钮尺寸
export const Sizes = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <YButton size="large" type="primary" text="大型按钮" />
        <YButton type="primary" text="默认按钮" />
        <YButton size="mini" type="primary" text="小型按钮" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `size` 属性额外配置尺寸，可使用 `large`、`default`、`mini` 三种值。'
      }
    }
  }
}

// 圆角和圆形按钮
export const Shapes = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <YButton type="primary" text="默认按钮" />
        <YButton round type="primary" text="圆角按钮" />
        <YButton circle type="primary" text="圆" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `round` 属性来定义圆角按钮，使用 `circle` 属性来定义圆形按钮。'
      }
    }
  }
}

// 禁用状态
export const Disabled = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <YButton disabled text="禁用按钮" />
        <YButton disabled type="primary" text="主要按钮" />
        <YButton disabled plain text="朴素按钮" />
        <YButton disabled plain type="primary" text="主要按钮" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `disabled` 属性来定义按钮是否被禁用。'
      }
    }
  }
}

// 加载状态
export const Loading = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <YButton loading type="primary" text="加载中" />
        <YButton loading type="primary" loading-text="提交中..." />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `loading` 属性来定义按钮的加载状态，可以通过 `loading-text` 自定义加载文本。'
      }
    }
  }
}

// 块级按钮
export const Block = {
  render: () => ({
    components: { YButton },
    template: `
      <div style="width: 300px;">
        <YButton block type="primary" text="块级按钮" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `block` 属性将按钮拉伸至父元素100%的宽度。'
      }
    }
  }
}