import { YIcon } from '@you-web/ui-core'

export default {
  title: '基础组件/Icon 图标',
  component: YIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '图标组件，支持SVG图标和字体图标，提供丰富的图标库和自定义样式功能。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '图标名称'
    },
    size: {
      control: { type: 'number', min: 12, max: 100, step: 2 },
      description: '图标大小'
    },
    unit: {
      control: { type: 'select' },
      options: ['px', 'rpx'],
      description: '单位'
    },
    color: {
      control: { type: 'color' },
      description: '图标颜色'
    },
    useSvg: {
      control: { type: 'boolean' },
      description: '是否使用SVG图标'
    },
    svgBasePath: {
      control: { type: 'text' },
      description: 'SVG图标基础路径'
    },
    customPrefix: {
      control: { type: 'text' },
      description: '自定义前缀类名'
    },
    bold: {
      control: { type: 'boolean' },
      description: '是否加粗（字体图标）'
    },
    margin: {
      control: { type: 'text' },
      description: '外边距'
    }
  },
  args: {
    name: 'about-fill',
    size: 32,
    unit: 'px',
    useSvg: true,
    svgBasePath: '/icons'
  }
}

// 默认示例
export const Default = {
  args: {
    name: 'about-fill',
    size: 32
  }
}

// 常用图标展示
export const CommonIcons = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px; padding: 20px;">
        <div v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon :name="icon" :size="32" />
          <span style="font-size: 12px; color: #666; text-align: center;">{{ icon }}</span>
        </div>
      </div>
    `,
    data() {
      return {
        icons: [
          'about', 'about-fill', 'add', 'add-fill'
        ]
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: '展示常用的图标，包含填充和线性两种风格。图标库包含170+个精心设计的图标。'
      }
    }
  }
}

// 不同尺寸
export const Sizes = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="about-fill" :size="16" />
          <span style="font-size: 12px; color: #666;">16px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="about-fill" :size="24" />
          <span style="font-size: 12px; color: #666;">24px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="about-fill" :size="32" />
          <span style="font-size: 12px; color: #666;">32px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="about-fill" :size="48" />
          <span style="font-size: 12px; color: #666;">48px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="about-fill" :size="64" />
          <span style="font-size: 12px; color: #666;">64px</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `size` 属性来设置图标的大小，支持任意数值。'
      }
    }
  }
}

// 颜色定制
export const Colors = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="add-fill" :size="32" color="#ff3b30" />
          <span style="font-size: 12px; color: #666;">红色</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="add-fill" :size="32" color="#007aff" />
          <span style="font-size: 12px; color: #666;">蓝色</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="add-fill" :size="32" color="#34c759" />
          <span style="font-size: 12px; color: #666;">绿色</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="add-fill" :size="32" color="#ff9500" />
          <span style="font-size: 12px; color: #666;">橙色</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon name="add-fill" :size="32" color="#8e8e93" />
          <span style="font-size: 12px; color: #666;">灰色</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `color` 属性来设置图标颜色，支持任意CSS颜色值。SVG图标通过CSS滤镜实现颜色变换。'
      }
    }
  }
}

// 导航图标
export const NavigationIcons = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 16px;">
        <div v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon :name="icon" :size="28" color="#007aff" />
          <span style="font-size: 11px; color: #666; text-align: center;">{{ icon }}</span>
        </div>
      </div>
    `,
    data() {
      return {
        icons: [
          'about', 'about-fill', 'add', 'add-fill'
        ]
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: '导航相关的图标，包含箭头、方向指示等。'
      }
    }
  }
}

// 功能图标
export const FunctionIcons = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 16px;">
        <div v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <YIcon :name="icon" :size="28" color="#34c759" />
          <span style="font-size: 11px; color: #666; text-align: center;">{{ icon }}</span>
        </div>
      </div>
    `,
    data() {
      return {
        icons: [
          'about', 'about-fill', 'add', 'add-fill'
        ]
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: '功能操作相关的图标，涵盖增删改查、媒体操作、设置等常用功能。'
      }
    }
  }
}

// 点击事件
export const ClickEvent = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <YIcon 
          name="add-fill" 
          :size="32" 
          :color="liked ? '#ff3b30' : '#8e8e93'"
          @click="handleLike"
          style="cursor: pointer;"
        />
        <span>{{ liked ? '已点赞' : '点击点赞' }}</span>
      </div>
    `,
    data() {
      return {
        liked: false
      }
    },
    methods: {
      handleLike() {
        this.liked = !this.liked
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: '图标支持点击事件，可以用于交互操作。点击图标会触发 `click` 事件。'
      }
    }
  }
}

// 自定义间距
export const CustomMargin = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: flex; align-items: center; background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <span style="font-size: 14px; color: #666;">默认间距:</span>
        <YIcon name="about-fill" :size="24" color="#007aff" />
        <YIcon name="add-fill" :size="24" color="#007aff" />
        <YIcon name="add" :size="24" color="#007aff" />
      </div>
      <div style="display: flex; align-items: center; background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 16px;">
        <span style="font-size: 14px; color: #666;">自定义间距:</span>
        <YIcon name="about-fill" :size="24" color="#ff3b30" margin="0 20px" />
        <YIcon name="add-fill" :size="24" color="#ff3b30" margin="0 20px" />
        <YIcon name="add" :size="24" color="#ff3b30" margin="0 20px" />
      </div>
      <div style="display: flex; align-items: center; background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 16px;">
        <span style="font-size: 14px; color: #666;">大间距:</span>
        <YIcon name="about-fill" :size="24" color="#34c759" margin="0 40px" />
        <YIcon name="add-fill" :size="24" color="#34c759" margin="0 40px" />
        <YIcon name="add" :size="24" color="#34c759" margin="0 40px" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `margin` 属性可以设置图标的外边距，支持CSS margin语法，如 "10px"、"0 20px"、"10px 20px 30px 40px" 等。'
      }
    }
  }
}

// 自定义样式
export const CustomStyle = {
  render: () => ({
    components: { YIcon },
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <YIcon 
          name="about-fill" 
          :size="32" 
          color="#ff9500"
          :custom-style="{ border: '2px solid #ff9500', borderRadius: '50%', padding: '8px' }"
        />
        <YIcon 
          name="add-fill" 
          :size="32" 
          color="#ff3b30"
          :custom-style="{ backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(255,59,48,0.3)', borderRadius: '8px', padding: '8px' }"
        />
        <YIcon 
          name="add" 
          :size="32" 
          color="#007aff"
          margin="0 16px"
          :custom-style="{ transform: 'rotate(15deg)' }"
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 `custom-style` 属性可以添加自定义样式，支持边框、阴影、变换等CSS属性。'
      }
    }
  }
}