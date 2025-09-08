import { YCell } from '@you-uniapp/ui-core'

export default {
  title: 'Components/YCell',
  component: YCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    arrow: {
      control: 'boolean',
      description: '是否显示右箭头',
    },
    hover: {
      control: 'boolean',
      description: '是否有点击效果',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    unlined: {
      control: 'boolean',
      description: '隐藏线条',
    },
    lineColor: {
      control: 'color',
      description: '线条颜色',
    },
    arrowColor: {
      control: 'color',
      description: '箭头颜色',
    },
    padding: {
      control: 'text',
      description: '内边距',
    },
    backgroundColor: {
      control: 'color',
      description: '背景颜色',
    },
  },
}

// 基础用法
export const Default = {
  args: {
    default: '基础单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 带箭头
export const WithArrow = {
  args: {
    arrow: true,
    default: '带箭头的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 无点击效果
export const NoHover = {
  args: {
    hover: false,
    default: '无点击效果的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 禁用状态
export const Disabled = {
  args: {
    disabled: true,
    arrow: true,
    default: '禁用状态的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 隐藏线条
export const NoLine = {
  args: {
    unlined: true,
    arrow: true,
    default: '隐藏线条的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 自定义样式
export const CustomStyle = {
  args: {
    arrow: true,
    lineColor: '#ff6b6b',
    arrowColor: '#4ecdc4',
    backgroundColor: '#f8f9fa',
    padding: '20px 30px',
    default: '自定义样式的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      return { args }
    },
    template: '<YCell v-bind="args">{{ args.default }}</YCell>',
  }),
}

// 点击事件
export const WithClickEvent = {
  args: {
    arrow: true,
    default: '可点击的单元格',
  },
  render: (args) => ({
    components: { YCell },
    setup() {
      const handleClick = (event) => {
        alert(`单元格被点击了！索引: ${event.index}`)
      }
      return { args, handleClick }
    },
    template: '<YCell v-bind="args" @click="handleClick">{{ args.default }}</YCell>',
  }),
}

// 多个单元格组合
export const CellGroup = {
  render: () => ({
    components: { YCell },
    template: `
      <div style="width: 300px;">
        <YCell arrow>个人信息</YCell>
        <YCell arrow>账户设置</YCell>
        <YCell arrow>消息通知</YCell>
        <YCell arrow>隐私设置</YCell>
        <YCell :hover="false" :unlined="true">关于我们</YCell>
      </div>
    `,
  }),
}