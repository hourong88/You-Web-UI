import type { Meta, StoryObj } from '@storybook/vue3'
import { YRadio, YRadioGroup } from '../../../you-ui-core/src/components/YRadio'

const meta: Meta<typeof YRadio> = {
  title: '表单组件/YRadio',
  component: YRadio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '单选框组件，支持单独使用或配合YRadioGroup使用，提供丰富的自定义选项。'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: '选项的值'
    },
    label: {
      control: 'text',
      description: '选项标签文本'
    },
    modelValue: {
      control: 'text',
      description: '是否选中，用于双向绑定'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      defaultValue: false
    },
    color: {
      control: 'color',
      description: '选中时的颜色',
      defaultValue: '#5677fc'
    },
    borderColor: {
      control: 'color',
      description: '未选中时边框颜色',
      defaultValue: '#ccc'
    },
    scaleRatio: {
      control: 'number',
      description: '缩放比例，用于改变大小',
      defaultValue: 1
    },
    checkMarkColor: {
      control: 'color',
      description: '内部圆点颜色',
      defaultValue: '#fff'
    }
  },
  decorators: [
    () => ({
      template: '<div style="padding: 20px;"><story/></div>'
    })
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    value: 'basic',
    label: '基础选项',
    modelValue: 'basic'
  }
}

// 未选中状态
export const Unselected: Story = {
  args: {
    value: 'unselected',
    label: '未选中选项',
    modelValue: ''
  }
}

// 自定义颜色
export const CustomColor: Story = {
  args: {
    value: 'custom',
    label: '自定义颜色',
    modelValue: 'custom',
    color: '#07c160'
  }
}

// 不同尺寸
export const DifferentSizes: Story = {
  render: () => ({
    components: { YRadio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <YRadio value="large" label="大尺寸" :modelValue="'large'" color="#ff4757" :scaleRatio="1.5" />
        <YRadio value="medium" label="中等尺寸" :modelValue="''" :scaleRatio="1.2" />
        <YRadio value="small" label="标准尺寸" :modelValue="''" :scaleRatio="1" />
      </div>
    `
  })
}

// 禁用状态
export const Disabled: Story = {
  args: {
    value: 'disabled',
    label: '禁用选项',
    modelValue: 'disabled',
    disabled: true
  }
}

// RadioGroup 基础用法
export const RadioGroupBasic: Story = {
  render: () => ({
    components: { YRadio, YRadioGroup },
    data() {
      return {
        selectedValue: 'option1'
      }
    },
    template: `
      <div>
        <YRadioGroup v-model="selectedValue">
          <YRadio value="option1" label="选项1" />
          <YRadio value="option2" label="选项2" />
          <YRadio value="option3" label="选项3" />
        </YRadioGroup>
        <p style="margin-top: 16px; color: #666;">选中值: {{ selectedValue }}</p>
      </div>
    `
  })
}

// RadioGroup 水平排列
export const RadioGroupHorizontal: Story = {
  render: () => ({
    components: { YRadio, YRadioGroup },
    data() {
      return {
        selectedValue: 'horizontal1'
      }
    },
    template: `
      <div>
        <YRadioGroup v-model="selectedValue" direction="horizontal">
          <YRadio value="horizontal1" label="选项1" />
          <YRadio value="horizontal2" label="选项2" />
          <YRadio value="horizontal3" label="选项3" />
        </YRadioGroup>
        <p style="margin-top: 16px; color: #666;">选中值: {{ selectedValue }}</p>
      </div>
    `
  })
}

// RadioGroup 自定义颜色
export const RadioGroupCustomColor: Story = {
  render: () => ({
    components: { YRadio, YRadioGroup },
    data() {
      return {
        selectedValue: 'china'
      }
    },
    template: `
      <div>
        <YRadioGroup v-model="selectedValue" color="#07c160">
          <YRadio value="china" label="中国" />
          <YRadio value="usa" label="美国" />
          <YRadio value="russia" label="俄罗斯" />
        </YRadioGroup>
        <p style="margin-top: 16px; color: #666;">选中值: {{ selectedValue }}</p>
      </div>
    `
  })
}

// RadioGroup 禁用状态
export const RadioGroupDisabled: Story = {
  render: () => ({
    components: { YRadio, YRadioGroup },
    data() {
      return {
        selectedValue: 'disabled1'
      }
    },
    template: `
      <div>
        <YRadioGroup v-model="selectedValue" disabled>
          <YRadio value="disabled1" label="禁用选项1" />
          <YRadio value="disabled2" label="禁用选项2" />
        </YRadioGroup>
        <p style="margin-top: 16px; color: #666;">选中值: {{ selectedValue }}</p>
      </div>
    `
  })
}

// 自定义样式组合
export const CustomStyleCombination: Story = {
  render: () => ({
    components: { YRadio, YRadioGroup },
    data() {
      return {
        selectedValue: 'purple1'
      }
    },
    template: `
      <div>
        <YRadioGroup 
          v-model="selectedValue" 
          color="#9c88ff" 
          borderColor="#ddd"
          checkMarkColor="#fff"
          :scaleRatio="1.3"
        >
          <YRadio value="purple1" label="紫色主题选项1" />
          <YRadio value="purple2" label="紫色主题选项2" />
          <YRadio value="purple3" label="紫色主题选项3" />
        </YRadioGroup>
        <p style="margin-top: 16px; color: #666;">选中值: {{ selectedValue }}</p>
      </div>
    `
  })
}