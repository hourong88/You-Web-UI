import { YSwipeAction } from '@you-web/ui-core'

export default {
  title: '基础组件/SwipeAction 滑动操作',
  component: YSwipeAction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '滑动操作组件，用于在列表项上提供快捷操作功能。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    actions: {
      control: { type: 'object' },
      description: '右侧滑动后显示的选项列表'
    },
    nameField: {
      control: { type: 'text' },
      description: '按钮显示文字的字段名，默认为 name'
    },
    iconField: {
      control: { type: 'text' },
      description: '按钮显示图标的字段名，默认为 icon'
    },
    width: {
      control: { type: 'number' },
      description: '按钮宽度，单位为px'
    },
    closable: {
      control: { type: 'boolean' },
      description: '点击选项后是否关闭'
    },
    showMask: {
      control: { type: 'boolean' },
      description: '是否显示遮罩'
    },
    operateWidth: {
      control: { type: 'number' },
      description: '操作按钮的宽度'
    },
    forbid: {
      control: { type: 'boolean' },
      description: '是否禁止滑动'
    },
    open: {
      control: { type: 'boolean' },
      description: '是否打开'
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '背景颜色'
    }
  },
  args: {
    actions: [
      {
        name: '删除',
        background: '#ff4757',
        color: '#fff',
        width: 80
      }
    ]
  }
}

// 基础用法
export const Default = {
  render: (args) => ({
    components: { YSwipeAction },
    setup() {
      const handleClick = (payload) => {
        console.log('点击了:', payload)
        alert(`点击了: ${payload.item.name}`)
      }
      return { args, handleClick }
    },
    template: `
      <div style="width: 300px;">
        <YSwipeAction v-bind="args" @click="handleClick">
          <div style="padding: 16px; background: #fff; border: 1px solid #eee;">
            <div style="font-weight: bold;">列表项标题</div>
            <div style="color: #666; font-size: 14px; margin-top: 4px;">向左滑动查看操作选项</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '基础的滑动操作，向左滑动显示操作按钮。'
      }
    }
  }
}

// 多个操作按钮
export const MultipleActions = {
  render: () => ({
    components: { YSwipeAction },
    setup() {
      const actions = [
        {
          name: '标记',
          background: '#3742fa',
          color: '#fff',
          width: 70
        },
        {
          name: '编辑',
          background: '#2ed573',
          color: '#fff',
          width: 70
        },
        {
          name: '删除',
          background: '#ff4757',
          color: '#fff',
          width: 70
        }
      ]
      
      const handleClick = (payload) => {
        console.log('点击了:', payload)
        alert(`点击了: ${payload.item.name}`)
      }
      
      return { actions, handleClick }
    },
    template: `
      <div style="width: 300px;">
        <YSwipeAction :actions="actions" @click="handleClick">
          <div style="padding: 16px; background: #fff; border: 1px solid #eee;">
            <div style="font-weight: bold;">多个操作按钮</div>
            <div style="color: #666; font-size: 14px; margin-top: 4px;">向左滑动查看多个操作选项</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以设置多个操作按钮，每个按钮可以有不同的颜色和宽度。'
      }
    }
  }
}

// 自定义按钮宽度
export const CustomWidth = {
  render: () => ({
    components: { YSwipeAction },
    setup() {
      const actions = [
        {
          name: '收藏',
          background: '#ffa502',
          color: '#fff',
          width: 100
        },
        {
          name: '删除',
          background: '#ff4757',
          color: '#fff',
          width: 60
        }
      ]
      
      const handleClick = (payload) => {
        console.log('点击了:', payload)
        alert(`点击了: ${payload.item.name}`)
      }
      
      return { actions, handleClick }
    },
    template: `
      <div style="width: 300px;">
        <YSwipeAction :actions="actions" @click="handleClick">
          <div style="padding: 16px; background: #fff; border: 1px solid #eee;">
            <div style="font-weight: bold;">自定义按钮宽度</div>
            <div style="color: #666; font-size: 14px; margin-top: 4px;">不同宽度的操作按钮</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `width` 属性为每个按钮设置不同的宽度。'
      }
    }
  }
}

// 带图标的按钮
export const WithIcon = {
  render: () => ({
    components: { YSwipeAction },
    setup() {
      const actions = [
        {
          name: '收藏',
          background: '#ffa502',
          color: '#fff',
          width: 80,
          icon: 'https://img.icons8.com/ios-filled/50/ffffff/star.png',
          imgWidth: 20,
          imgHeight: 20
        },
        {
          name: '删除',
          background: '#ff4757',
          color: '#fff',
          width: 80,
          icon: 'https://img.icons8.com/ios-filled/50/ffffff/trash.png',
          imgWidth: 20,
          imgHeight: 20
        }
      ]
      
      const handleClick = (payload) => {
        console.log('点击了:', payload)
        alert(`点击了: ${payload.item.name}`)
      }
      
      return { actions, handleClick }
    },
    template: `
      <div style="width: 300px;">
        <YSwipeAction :actions="actions" @click="handleClick">
          <div style="padding: 16px; background: #fff; border: 1px solid #eee;">
            <div style="font-weight: bold;">带图标的按钮</div>
            <div style="color: #666; font-size: 14px; margin-top: 4px;">操作按钮可以显示图标</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `icon` 属性为按钮添加图标，通过 `imgWidth` 和 `imgHeight` 设置图标尺寸。'
      }
    }
  }
}

// 禁用滑动
export const Disabled = {
  render: () => ({
    components: { YSwipeAction },
    setup() {
      const actions = [
        {
          name: '删除',
          background: '#ff4757',
          color: '#fff',
          width: 80
        }
      ]
      
      return { actions }
    },
    template: `
      <div style="width: 300px;">
        <YSwipeAction :actions="actions" :forbid="true">
          <div style="padding: 16px; background: #f5f5f5; border: 1px solid #eee; color: #999;">
            <div style="font-weight: bold;">禁用滑动</div>
            <div style="font-size: 14px; margin-top: 4px;">此项目不允许滑动操作</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `forbid` 属性可以禁用滑动功能。'
      }
    }
  }
}

// 列表示例
export const ListExample = {
  render: () => ({
    components: { YSwipeAction },
    setup() {
      const items = [
        { id: 1, title: '会议通知', content: '明天上午10点开会', time: '09:30' },
        { id: 2, title: '系统更新', content: '系统将在今晚进行更新', time: '昨天' },
        { id: 3, title: '新消息', content: '您有一条新的私信', time: '2天前' }
      ]
      
      const actions = [
        {
          name: '标记',
          background: '#3742fa',
          color: '#fff',
          width: 70
        },
        {
          name: '删除',
          background: '#ff4757',
          color: '#fff',
          width: 70
        }
      ]
      
      const handleClick = (payload) => {
        console.log('点击了:', payload)
        alert(`点击了: ${payload.item.name}`)
      }
      
      return { items, actions, handleClick }
    },
    template: `
      <div style="width: 350px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <YSwipeAction 
          v-for="item in items" 
          :key="item.id" 
          :actions="actions" 
          @click="handleClick"
        >
          <div style="padding: 16px; background: #fff; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
              <div style="font-weight: bold; margin-bottom: 4px;">{{ item.title }}</div>
              <div style="color: #666; font-size: 14px;">{{ item.content }}</div>
            </div>
            <div style="color: #999; font-size: 12px;">{{ item.time }}</div>
          </div>
        </YSwipeAction>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '在列表中使用滑动操作的完整示例。'
      }
    }
  }
}