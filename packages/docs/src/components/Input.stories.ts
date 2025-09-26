import { YInput } from "@you-web/ui-core";
import { ref } from 'vue'

export default {
  title: '表单组件/YInput',
  component: YInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '输入框组件是对原生input组件的增强，内置了常用布局样式，同时包含 input 所有功能。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '输入框的值'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'digit', 'password', 'tel', 'email'],
      description: '输入框类型'
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符文本'
    },
    label: {
      control: { type: 'text' },
      description: '输入框标题'
    },
    required: {
      control: { type: 'boolean' },
      description: '是否必填'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用'
    },
    clearable: {
      control: { type: 'boolean' },
      description: '是否可清除'
    },
    password: {
      control: { type: 'boolean' },
      description: '是否为密码输入框'
    },
    textRight: {
      control: { type: 'boolean' },
      description: '文本是否右对齐'
    },
    maxlength: {
      control: { type: 'number' },
      description: '最大输入长度'
    },
    inputBorder: {
      control: { type: 'boolean' },
      description: '是否显示边框'
    },
    isFillet: {
      control: { type: 'boolean' },
      description: '是否圆角'
    }
  },
  args: {
    placeholder: '请输入内容'
  }
}

// 基础用法
export const Default = {
  render: (args) => ({
    components: { YInput },
    setup() {
      const value = ref('')
      return { value, args }
    },
    template: `
      <div style="width: 300px;">
        <YInput v-model="value" v-bind="args" />
        <p style="margin-top: 12px; color: #666; font-size: 14px;">当前值：{{ value }}</p>
      </div>
    `
  }),
  args: {
    placeholder: '请输入内容'
  }
}

// 带标题
export const WithLabel = {
  render: () => ({
    components: { YInput },
    setup() {
      const name = ref('')
      const phone = ref('')
      return { name, phone }
    },
    template: `
      <div style="width: 300px; display: flex; flex-direction: column; gap: 16px;">
        <YInput label="姓名" placeholder="请输入姓名" v-model="name" />
        <YInput label="联系电话" placeholder="请输入手机号" v-model="phone" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `label` 属性为输入框添加标题。'
      }
    }
  }
}

// 必填标识
export const Required = {
  render: () => ({
    components: { YInput },
    setup() {
      const email = ref('')
      const phone = ref('')
      return { email, phone }
    },
    template: `
      <div style="width: 300px; display: flex; flex-direction: column; gap: 16px;">
        <YInput label="邮箱" placeholder="请输入邮箱" :required="true" v-model="email" />
        <YInput label="联系电话" placeholder="请输入手机号" :required="true" v-model="phone" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `required` 属性显示必填标识。'
      }
    }
  }
}

// 可清除
export const Clearable = {
  render: () => ({
    components: { YInput },
    setup() {
      const address = ref('北京市朝阳区')
      return { address }
    },
    template: `
      <div style="width: 300px;">
        <YInput label="地址" placeholder="请输入地址" :clearable="true" v-model="address" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `clearable` 属性显示清除按钮，可以快速清空输入内容。'
      }
    }
  }
}

// 密码输入
export const Password = {
  render: () => ({
    components: { YInput },
    setup() {
      const password = ref('')
      return { password }
    },
    template: `
      <div style="width: 300px;">
        <YInput label="密码" placeholder="请输入密码" :password="true" :clearable="true" v-model="password" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `password` 属性创建密码输入框。'
      }
    }
  }
}

// 禁用状态
export const Disabled = {
  render: () => ({
    components: { YInput },
    setup() {
      const username = ref('张三')
      return { username }
    },
    template: `
      <div style="width: 300px;">
        <YInput label="用户名" placeholder="张三" :disabled="true" v-model="username" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `disabled` 属性禁用输入框。'
      }
    }
  }
}

// 不同类型
export const Types = {
  render: () => ({
    components: { YInput },
    setup() {
      const text = ref('')
      const number = ref('')
      const tel = ref('')
      const email = ref('')
      return { text, number, tel, email }
    },
    template: `
      <div style="width: 300px; display: flex; flex-direction: column; gap: 16px;">
        <YInput label="文本" type="text" placeholder="请输入文本" v-model="text" />
        <YInput label="数字" type="number" placeholder="请输入数字" v-model="number" />
        <YInput label="电话" type="tel" placeholder="请输入电话" v-model="tel" />
        <YInput label="邮箱" type="email" placeholder="请输入邮箱" v-model="email" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `type` 属性定义不同的输入类型。'
      }
    }
  }
}

// 右对齐
export const TextRight = {
  render: () => ({
    components: { YInput },
    setup() {
      const amount = ref('1000.00')
      return { amount }
    },
    template: `
      <div style="width: 300px;">
        <YInput label="金额" placeholder="0.00" type="digit" :text-right="true" v-model="amount" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `text-right` 属性让输入文本右对齐，常用于金额等数字输入。'
      }
    }
  }
}

// 字符限制
export const MaxLength = {
  render: () => ({
    components: { YInput },
    setup() {
      const intro = ref('')
      return { intro }
    },
    template: `
      <div style="width: 300px;">
        <YInput label="简介" placeholder="请输入个人简介" :maxlength="50" :clearable="true" v-model="intro" />
        <p style="margin-top: 8px; color: #666; font-size: 12px;">已输入 {{ intro.length }}/50 字符</p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `maxlength` 属性限制输入字符数量。'
      }
    }
  }
}

// 自定义样式
export const CustomStyle = {
  render: () => ({
    components: { YInput },
    setup() {
      const remark = ref('')
      return { remark }
    },
    template: `
      <div style="width: 300px;">
        <YInput 
          label="备注" 
          placeholder="请输入备注信息" 
          :input-border="true"
          :is-fillet="true"
          background-color="#f8f9fa"
          border-color="#007aff"
          v-model="remark" 
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `input-border`、`is-fillet`、`background-color`、`border-color` 等属性自定义样式。'
      }
    }
  }
}