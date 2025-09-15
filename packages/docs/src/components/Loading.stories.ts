import { YLoading } from '@you-web/ui-core'

export default {
  title: '反馈组件/Loading 加载',
  component: YLoading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '加载数据时显示动效。'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['spinner', 'circular', 'dots'],
      description: '加载动画类型'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '加载图标大小'
    },
    color: {
      control: { type: 'color' },
      description: '加载图标颜色'
    },
    text: {
      control: { type: 'text' },
      description: '加载文案'
    },
    textColor: {
      control: { type: 'color' },
      description: '文案颜色'
    },
    vertical: {
      control: { type: 'boolean' },
      description: '是否垂直排列图标和文字'
    },
    show: {
      control: { type: 'boolean' },
      description: '是否显示加载状态'
    },
    overlay: {
      control: { type: 'boolean' },
      description: '是否显示遮罩层'
    },
    maskClosable: {
      control: { type: 'boolean' },
      description: '点击遮罩层是否可以关闭'
    }
  },
  args: {
    show: true,
    type: 'spinner'
  },
  tags: ['autodocs']
}

// 基础用法
export const Default = {
  args: {
    show: true,
    text: '加载中...'
  }
}

// 不同动画类型
export const AnimationTypes = {
  render: () => ({
    components: { YLoading },
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <YLoading :show="true" text="默认动画" />
        <YLoading :show="true" type="spinner" text="旋转动画" />
        <YLoading :show="true" type="circular" text="圆形动画" />
        <YLoading :show="true" type="dots" text="点状动画" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `type` 属性设置不同的加载动画效果。'
      }
    }
  }
}

// 布局方式
export const Layouts = {
  render: () => ({
    components: { YLoading },
    template: `
      <div style="display: flex; gap: 40px; align-items: flex-start;">
        <div>
          <h4>垂直布局</h4>
          <YLoading :show="true" :vertical="true" text="加载中..." />
        </div>
        <div>
          <h4>水平布局</h4>
          <YLoading :show="true" :vertical="false" text="加载中..." />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `vertical` 属性控制加载图标和文本的布局方式。'
      }
    }
  }
}

// 自定义样式
export const CustomStyles = {
  render: () => ({
    components: { YLoading },
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <YLoading 
          :show="true" 
          :vertical="true" 
          text="自定义颜色" 
          color="#ff6b6b" 
          textColor="#333" 
        />
        <YLoading 
          :show="true" 
          :vertical="true" 
          text="深色主题" 
          color="#ffffff" 
          textColor="#ffffff" 
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `color` 和 `textColor` 属性自定义加载组件的颜色。'
      }
    }
  }
}

// 带遮罩层
export const WithMask = {
  render: () => ({
    components: { YLoading },
    data() {
      return {
        showLoading: true
      }
    },
    template: `
      <div style="position: relative; width: 300px; height: 200px; border: 1px solid #ddd; padding: 20px;">
        <p>这是一些内容...</p>
        <p>当显示加载状态时，会有遮罩层覆盖。</p>
        <button @click="showLoading = !showLoading" style="margin-top: 10px;">
          {{ showLoading ? '隐藏' : '显示' }}加载
        </button>
        <YLoading 
          :show="showLoading" 
          :overlay="true" 
          text="加载中..." 
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `overlay` 属性显示遮罩层。'
      }
    }
  }
}

// 点击遮罩关闭
export const MaskClosable = {
  render: () => ({
    components: { YLoading },
    data() {
      return {
        showLoading: true
      }
    },
    methods: {
      handleMaskClick() {
        this.showLoading = false
      }
    },
    template: `
      <div style="position: relative; width: 300px; height: 200px; border: 1px solid #ddd; padding: 20px;">
        <p>点击遮罩层可以关闭加载状态</p>
        <button @click="showLoading = true" style="margin-top: 10px;">
          显示加载
        </button>
        <YLoading 
          :show="showLoading" 
          :overlay="true" 
          :maskClosable="true"
          text="点击遮罩关闭" 
          @maskClick="handleMaskClick"
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 `maskClosable` 属性允许点击遮罩层关闭加载状态，配合 `maskClick` 事件使用。'
      }
    }
  }
}