import { YCard } from '@you-web/ui-core'

export default {
  title: '基础组件/Card 卡片',
  component: YCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '卡片容器，用于承载信息、图片、段落，常用于后台概览页面。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '卡片标题'
    },
    subtitle: {
      control: { type: 'text' },
      description: '卡片副标题'
    },
    extra: {
      control: { type: 'text' },
      description: '卡片右上角的操作区域'
    },
    shadow: {
      control: { type: 'select' },
      options: ['always', 'hover', 'never'],
      description: '设置阴影显示时机'
    },
    bodyStyle: {
      control: { type: 'object' },
      description: '内容区域自定义样式'
    },
    headStyle: {
      control: { type: 'object' },
      description: '头部区域自定义样式'
    }
  },
  args: {
    title: '卡片标题'
  }
}

// 基础用法
export const Default = {
  args: {
    title: '卡片标题'
  },
  render: (args) => ({
    components: { YCard },
    setup() {
      return { args }
    },
    template: `
      <YCard v-bind="args">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </YCard>
    `
  })
}

// 简单卡片
export const Simple = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard>
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </YCard>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '包含标题，内容，操作区域。'
      }
    }
  }
}

// 带标题的卡片
export const WithTitle = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard title="卡片标题">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </YCard>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `title` 属性来设置卡片标题。'
      }
    }
  }
}

// 带副标题的卡片
export const WithSubtitle = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard title="卡片标题" subtitle="卡片副标题">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </YCard>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `subtitle` 属性来设置卡片副标题。'
      }
    }
  }
}

// 带操作区域的卡片
export const WithExtra = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard title="卡片标题" extra="更多">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </YCard>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `extra` 属性来设置卡片右上角的操作区域。'
      }
    }
  }
}

// 阴影效果
export const Shadow = {
  render: () => ({
    components: { YCard },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YCard title="总是显示" shadow="always" style="width: 200px;">
          <p>卡片内容</p>
        </YCard>
        <YCard title="鼠标悬浮" shadow="hover" style="width: 200px;">
          <p>卡片内容</p>
        </YCard>
        <YCard title="从不显示" shadow="never" style="width: 200px;">
          <p>卡片内容</p>
        </YCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `shadow` 属性来设置卡片阴影出现的时机。`always` 为总是显示，`hover` 为鼠标悬浮时显示，`never` 为从不显示。'
      }
    }
  }
}

// 自定义样式
export const CustomStyle = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard 
        title="自定义样式" 
        :head-style="{ background: '#f5f5f5', color: '#333' }"
        :body-style="{ padding: '20px', background: '#fafafa' }"
      >
        <p>自定义头部和内容区域样式</p>
        <p>卡片内容</p>
      </YCard>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '可以通过 `head-style` 和 `body-style` 属性来自定义头部和内容区域的样式。'
      }
    }
  }
}