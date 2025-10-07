import { YCheckbox, YCheckboxGroup } from '@you-web/ui-core'
import { ref } from 'vue'

export default {
  title: '表单组件/YCheckbox',
  component: YCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '多选框组件。用于在一组可选项中进行多项选择。支持单独使用或配合 YCheckboxGroup 使用。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'value值，当选中时会携带该值'
    },
    checked: {
      control: { type: 'boolean' },
      description: '当前是否选中'
    },
    modelValue: {
      control: { type: 'boolean' },
      description: '绑定值（双向绑定）'
    },
    triggerGroup: {
      control: { type: 'boolean' },
      description: '当设置checked属性值时是否触发父级change方法'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用'
    },
    color: {
      control: { type: 'color' },
      description: 'checkbox选中背景颜色'
    },
    borderColor: {
      control: { type: 'color' },
      description: 'checkbox未选中时边框颜色'
    },
    isCheckMark: {
      control: { type: 'boolean' },
      description: '是否只展示对号，无边框背景'
    },
    checkMarkColor: {
      control: { type: 'color' },
      description: '对号颜色'
    },
    scaleRatio: {
      control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
      description: 'checkbox缩放倍数，改变checkbox大小'
    },
    label: {
      control: { type: 'text' },
      description: '标签文本'
    }
  },
  args: {
    checked: false,
    triggerGroup: true,
    disabled: false,
    color: '#5677fc',
    borderColor: '#ccc',
    isCheckMark: false,
    checkMarkColor: '#fff',
    scaleRatio: 1,
    label: '选项'
  }
}

// 基础用法
export const Default = {
  render: (args) => ({
    components: { YCheckbox },
    setup() {
      const checked = ref(args.checked)
      return { checked, args }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <YCheckbox v-model="checked" v-bind="args" />
        <span style="color: #666; font-size: 14px;">当前状态：{{ checked ? '选中' : '未选中' }}</span>
      </div>
    `
  }),
  args: {
    value: 'option1',
    label: '默认选项'
  }
}

// 多选组合
export const CheckboxGroup = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const selectedValues = ref(['apple', 'orange'])
      return { selectedValues }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <YCheckboxGroup v-model="selectedValues">
          <YCheckbox value="apple" label="苹果" />
          <YCheckbox value="banana" label="香蕉" />
          <YCheckbox value="orange" label="橙子" />
          <YCheckbox value="grape" label="葡萄" />
        </YCheckboxGroup>
        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">选择结果：</div>
          <div style="font-size: 14px; color: #495057;">{{ selectedValues.join(', ') || '无' }}</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 YCheckboxGroup 组件可以管理一组多选框，支持多项选择。'
      }
    }
  }
}

// 水平排列
export const Horizontal = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const hobbies = ref(['reading', 'music'])
      return { hobbies }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <YCheckboxGroup v-model="hobbies" direction="horizontal">
          <YCheckbox value="reading" label="阅读" />
          <YCheckbox value="music" label="音乐" />
          <YCheckbox value="sport" label="运动" />
          <YCheckbox value="travel" label="旅行" />
        </YCheckboxGroup>
        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">兴趣爱好：</div>
          <div style="font-size: 14px; color: #495057;">{{ hobbies.join(', ') || '无' }}</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `direction="horizontal"` 属性可以让多选框水平排列。'
      }
    }
  }
}

// 禁用状态
export const Disabled = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const disabledValues = ref(['disabled1'])
      const mixedValues = ref(['normal1'])
      return { disabledValues, mixedValues }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <div style="font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 500;">整组禁用</div>
          <YCheckboxGroup v-model="disabledValues" :disabled="true">
            <YCheckbox value="disabled1" label="禁用选项1" />
            <YCheckbox value="disabled2" label="禁用选项2" />
            <YCheckbox value="disabled3" label="禁用选项3" />
          </YCheckboxGroup>
        </div>
        <div>
          <div style="font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 500;">单个禁用</div>
          <YCheckboxGroup v-model="mixedValues">
            <YCheckbox value="normal1" label="正常选项1" />
            <YCheckbox value="disabled" label="禁用选项" :disabled="true" />
            <YCheckbox value="normal2" label="正常选项2" />
          </YCheckboxGroup>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `disabled` 属性可以禁用多选框。可以禁用整组或单个选项。'
      }
    }
  }
}

// 自定义颜色
export const CustomColors = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const redValues = ref(['red1'])
      const greenValues = ref(['green2'])
      const customValues = ref(['custom1'])
      return { redValues, greenValues, customValues }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <div style="font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 500;">红色主题</div>
          <YCheckboxGroup v-model="redValues" color="#ff4757">
            <YCheckbox value="red1" label="红色选项1" />
            <YCheckbox value="red2" label="红色选项2" />
            <YCheckbox value="red3" label="红色选项3" />
          </YCheckboxGroup>
        </div>
        <div>
          <div style="font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 500;">绿色主题</div>
          <YCheckboxGroup v-model="greenValues" color="#2ed573">
            <YCheckbox value="green1" label="绿色选项1" />
            <YCheckbox value="green2" label="绿色选项2" />
            <YCheckbox value="green3" label="绿色选项3" />
          </YCheckboxGroup>
        </div>
        <div>
          <div style="font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 500;">自定义边框和对号</div>
          <YCheckboxGroup 
            v-model="customValues" 
            color="#9b59b6"
            border-color="#e74c3c"
            check-mark-color="#f1c40f"
          >
            <YCheckbox value="custom1" label="紫色背景 + 红色边框 + 黄色对号" />
            <YCheckbox value="custom2" label="自定义样式选项2" />
          </YCheckboxGroup>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `color`、`border-color`、`check-mark-color` 属性可以自定义多选框的颜色。'
      }
    }
  }
}

// 只显示对号模式
export const CheckMarkOnly = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const checkMarkValues = ref(['mark1', 'mark3'])
      return { checkMarkValues }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <YCheckboxGroup 
          v-model="checkMarkValues" 
          :is-check-mark="true"
          color="#5677fc"
        >
          <YCheckbox value="mark1" label="只显示对号1" />
          <YCheckbox value="mark2" label="只显示对号2" />
          <YCheckbox value="mark3" label="只显示对号3" />
        </YCheckboxGroup>
        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">对号模式：</div>
          <div style="font-size: 14px; color: #495057;">{{ checkMarkValues.join(', ') || '无' }}</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `is-check-mark="true"` 属性可以只显示对号，无边框背景。'
      }
    }
  }
}

// 不同尺寸
export const Sizes = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const smallValues = ref(['small1'])
      const normalValues = ref(['normal1'])
      const largeValues = ref(['large1'])
      return { smallValues, normalValues, largeValues }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <YCheckboxGroup v-model="smallValues" :scale-ratio="0.8">
            <YCheckbox value="small1" label="小尺寸 (0.8x)" />
          </YCheckboxGroup>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
          <YCheckboxGroup v-model="normalValues" :scale-ratio="1">
            <YCheckbox value="normal1" label="默认尺寸 (1x)" />
          </YCheckboxGroup>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
          <YCheckboxGroup v-model="largeValues" :scale-ratio="1.5">
            <YCheckbox value="large1" label="大尺寸 (1.5x)" />
          </YCheckboxGroup>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `scale-ratio` 属性可以控制多选框的大小，支持 0.5 到 2 倍的缩放。'
      }
    }
  }
}

// 单独使用
export const Standalone = {
  render: () => ({
    components: { YCheckbox },
    setup() {
      const agreed = ref(false)
      const subscribed = ref(true)
      const notifications = ref(false)
      return { agreed, subscribed, notifications }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <YCheckbox 
          v-model="agreed" 
          value="agree" 
          label="我同意用户协议" 
          color="#ff6b6b"
        />
        <YCheckbox 
          v-model="subscribed" 
          value="subscribe" 
          label="订阅邮件通知" 
          color="#4ecdc4"
        />
        <YCheckbox 
          v-model="notifications" 
          value="notifications" 
          label="接收推送通知" 
          color="#45b7d1"
          :is-check-mark="true"
        />
        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef;">
          <div style="font-size: 12px; color: #6c757d; margin-bottom: 8px;">状态：</div>
          <div style="font-size: 12px; color: #495057; font-family: monospace;">
            用户协议: {{ agreed ? '已同意' : '未同意' }}<br>
            邮件通知: {{ subscribed ? '已订阅' : '未订阅' }}<br>
            推送通知: {{ notifications ? '已开启' : '未开启' }}
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '多选框可以单独使用，通过 `v-model` 绑定 boolean 值。'
      }
    }
  }
}

// 事件监听
export const Events = {
  render: () => ({
    components: { YCheckbox, YCheckboxGroup },
    setup() {
      const eventValues = ref([])
      const eventLogs = ref([])
      
      const handleChange = (values) => {
        const timestamp = new Date().toLocaleTimeString()
        const log = `${timestamp} - 选择变更为: [${values.join(', ')}]`
        eventLogs.value.unshift(log)
        
        // 保持最多5条日志
        if (eventLogs.value.length > 5) {
          eventLogs.value = eventLogs.value.slice(0, 5)
        }
      }
      
      return { eventValues, eventLogs, handleChange }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <YCheckboxGroup v-model="eventValues" @change="handleChange">
          <YCheckbox value="event1" label="事件选项1" />
          <YCheckbox value="event2" label="事件选项2" />
          <YCheckbox value="event3" label="事件选项3" />
        </YCheckboxGroup>
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
        story: '多选框状态改变时会触发 `change` 事件，可以监听选择变化。'
      }
    }
  }
}