import { YSwitch } from '@you-web/ui-core'
import { ref } from 'vue'

export default {
  title: '表单组件/YSwitch',
  component: YSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '开关选择器。用于在两个互斥对象进行选择，比如开/关。支持 Switch 和 Checkbox 两种样式。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: '绑定值（双向绑定）'
    },
    checked: {
      control: { type: 'boolean' },
      description: '是否选中'
    },
    name: {
      control: { type: 'text' },
      description: '开关选择器名称'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用'
    },
    type: {
      control: { type: 'select' },
      options: ['switch', 'checkbox'],
      description: '样式类型'
    },
    color: {
      control: { type: 'color' },
      description: 'switch选中颜色'
    },
    borderColor: {
      control: { type: 'color' },
      description: '边框颜色，type=checkbox时生效'
    },
    checkMarkColor: {
      control: { type: 'color' },
      description: '对号颜色，type=checkbox时生效'
    },
    scaleRatio: {
      control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
      description: '缩放倍数，改变大小'
    }
  },
  args: {
    checked: false,
    disabled: false,
    type: 'switch',
    color: '#5677fc',
    borderColor: '#ccc',
    checkMarkColor: '#fff',
    scaleRatio: 1
  }
}

// 基础用法
export const Default = {
  render: (args) => ({
    components: { YSwitch },
    setup() {
      const checked = ref(args.checked)
      return { checked, args }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <YSwitch v-model="checked" v-bind="args" />
        <span style="color: #666; font-size: 14px;">当前状态：{{ checked ? '开启' : '关闭' }}</span>
      </div>
    `
  }),
  args: {
    checked: false
  }
}

// 不同类型
export const Types = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const switchValue = ref(true)
      const checkboxValue = ref(true)
      return { switchValue, checkboxValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="switchValue" type="switch" />
          <span style="color: #666; font-size: 14px;">Switch 类型：{{ switchValue ? '开启' : '关闭' }}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="checkboxValue" type="checkbox" />
          <span style="color: #666; font-size: 14px;">Checkbox 类型：{{ checkboxValue ? '选中' : '未选中' }}</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `type` 属性定义开关的样式类型。支持 `switch`（滑动开关）和 `checkbox`（复选框）两种样式。'
      }
    }
  }
}

// 禁用状态
export const Disabled = {
  render: () => ({
    components: { YSwitch },
    setup() {
      return {}
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch :disabled="true" :checked="false" />
          <span style="color: #666; font-size: 14px;">禁用状态（关闭）</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch :disabled="true" :checked="true" />
          <span style="color: #666; font-size: 14px;">禁用状态（开启）</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch type="checkbox" :disabled="true" :checked="false" />
          <span style="color: #666; font-size: 14px;">Checkbox 禁用（未选中）</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch type="checkbox" :disabled="true" :checked="true" />
          <span style="color: #666; font-size: 14px;">Checkbox 禁用（选中）</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `disabled` 属性禁用开关，禁用后开关将无法操作。'
      }
    }
  }
}

// 自定义颜色
export const CustomColors = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const redValue = ref(true)
      const greenValue = ref(true)
      const orangeValue = ref(true)
      const purpleValue = ref(true)
      return { redValue, greenValue, orangeValue, purpleValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="redValue" color="#ff4757" />
          <span style="color: #666; font-size: 14px;">红色主题</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="greenValue" color="#2ed573" />
          <span style="color: #666; font-size: 14px;">绿色主题</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="orangeValue" color="#ffa726" />
          <span style="color: #666; font-size: 14px;">橙色主题</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="purpleValue" color="#9b59b6" />
          <span style="color: #666; font-size: 14px;">紫色主题</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `color` 属性自定义开关的选中颜色。'
      }
    }
  }
}

// Checkbox 自定义样式
export const CheckboxCustom = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const value1 = ref(true)
      const value2 = ref(true)
      const value3 = ref(true)
      return { value1, value2, value3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch 
            v-model="value1" 
            type="checkbox" 
            color="#e74c3c"
            border-color="#e74c3c"
            check-mark-color="#fff"
          />
          <span style="color: #666; font-size: 14px;">红色边框 + 白色对号</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch 
            v-model="value2" 
            type="checkbox" 
            color="#9b59b6"
            border-color="#9b59b6"
            check-mark-color="#f1c40f"
          />
          <span style="color: #666; font-size: 14px;">紫色边框 + 黄色对号</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch 
            v-model="value3" 
            type="checkbox" 
            color="#34495e"
            border-color="#95a5a6"
            check-mark-color="#ecf0f1"
          />
          <span style="color: #666; font-size: 14px;">深灰背景 + 浅灰边框</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '对于 Checkbox 类型，可以使用 `border-color` 和 `check-mark-color` 属性自定义边框颜色和对号颜色。'
      }
    }
  }
}

// 不同尺寸
export const Sizes = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const value1 = ref(true)
      const value2 = ref(true)
      const value3 = ref(true)
      const value4 = ref(true)
      return { value1, value2, value3, value4 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="value1" :scale-ratio="0.8" />
          <span style="color: #666; font-size: 14px;">小尺寸 (0.8x)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="value2" :scale-ratio="1" />
          <span style="color: #666; font-size: 14px;">默认尺寸 (1x)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="value3" :scale-ratio="1.2" />
          <span style="color: #666; font-size: 14px;">大尺寸 (1.2x)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="value4" :scale-ratio="1.5" />
          <span style="color: #666; font-size: 14px;">超大尺寸 (1.5x)</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `scale-ratio` 属性控制开关的大小，支持 0.5 到 2 倍的缩放。'
      }
    }
  }
}

// 事件监听
export const Events = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const checked = ref(false)
      const eventLogs = ref([])

      const handleChange = (event) => {
        const timestamp = new Date().toLocaleTimeString()
        const log = `${timestamp} - 开关状态变更为: ${event.detail.value ? '开启' : '关闭'}`
        eventLogs.value.unshift(log)

        // 保持最多5条日志
        if (eventLogs.value.length > 5) {
          eventLogs.value = eventLogs.value.slice(0, 5)
        }
      }

      return { checked, eventLogs, handleChange }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <YSwitch v-model="checked" @change="handleChange" />
          <span style="color: #666; font-size: 14px;">点击开关查看事件日志</span>
        </div>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 8px;">事件日志：</div>
          <div v-if="eventLogs.length === 0" style="font-size: 12px; color: #adb5bd;">暂无事件</div>
          <div v-for="(log, index) in eventLogs" :key="index" style="font-size: 11px; color: #495057; font-family: monospace; padding: 2px 0; border-bottom: 1px solid #dee2e6;">
            {{ log }}
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '开关状态改变时会触发 `change` 事件，事件参数为 `{detail: {value: boolean}}`。'
      }
    }
  }
}

// 表单集成
export const FormIntegration = {
  render: () => ({
    components: { YSwitch },
    setup() {
      const formData = ref({
        notification: true,
        autoSave: false,
        darkMode: false,
        newsletter: true
      })

      return { formData }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e9ecef;">
          <label style="font-size: 14px; color: #495057;">接收通知</label>
          <YSwitch v-model="formData.notification" name="notification" />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e9ecef;">
          <label style="font-size: 14px; color: #495057;">自动保存</label>
          <YSwitch v-model="formData.autoSave" name="autoSave" />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e9ecef;">
          <label style="font-size: 14px; color: #495057;">深色模式</label>
          <YSwitch v-model="formData.darkMode" name="darkMode" />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e9ecef;">
          <label style="font-size: 14px; color: #495057;">订阅邮件</label>
          <YSwitch v-model="formData.newsletter" name="newsletter" type="checkbox" />
        </div>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 8px;">表单数据：</div>
          <pre style="font-size: 11px; color: #495057; margin: 0; white-space: pre-wrap;">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '开关组件支持 `v-model` 双向绑定，可以方便地集成到表单中。使用 `name` 属性为开关指定名称。'
      }
    }
  }
}