import type { Meta, StoryObj } from '@storybook/vue3'
import YCascadeSelection from '../../../you-ui-core/src/components/YCascadeSelection/YCascadeSelection.vue'

const meta: Meta<typeof YCascadeSelection> = {
  title: 'Components/YCascadeSelection',
  component: YCascadeSelection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '级联选择器组件，支持多级数据选择、自定义字段映射、图片展示等功能。'
      }
    }
  },
  argTypes: {
    itemList: {
      control: 'object',
      description: '级联数据列表'
    },
    textField: {
      control: 'text',
      description: '显示文本字段名',
      defaultValue: 'text'
    },
    valueField: {
      control: 'text',
      description: '值字段名',
      defaultValue: 'value'
    },
    childrenField: {
      control: 'text',
      description: '子级字段名',
      defaultValue: 'children'
    },
    defaultItemList: {
      control: 'object',
      description: '默认选中项列表'
    },
    activeColor: {
      control: 'color',
      description: '激活状态颜色',
      defaultValue: '#007aff'
    },
    lineColor: {
      control: 'color',
      description: '分割线颜色',
      defaultValue: '#e5e5e5'
    },
    checkMarkColor: {
      control: 'color',
      description: '选中标记颜色',
      defaultValue: '#007aff'
    },
    textActiveColor: {
      control: 'color',
      description: '激活文本颜色',
      defaultValue: '#007aff'
    },
    height: {
      control: 'text',
      description: '组件高度',
      defaultValue: '300px'
    },
    size: {
      control: 'number',
      description: '选中标记大小',
      defaultValue: 14
    },
    textSize: {
      control: 'number',
      description: '文本字体大小',
      defaultValue: 14
    },
    tabsHeight: {
      control: 'text',
      description: '标签页高度',
      defaultValue: '44px'
    },
    backgroundColor: {
      control: 'color',
      description: '背景颜色',
      defaultValue: '#ffffff'
    },
    headerBgColor: {
      control: 'color',
      description: '头部背景颜色',
      defaultValue: '#ffffff'
    },
    headerLine: {
      control: 'boolean',
      description: '是否显示头部分割线',
      defaultValue: true
    },
    compact: {
      control: 'boolean',
      description: '紧凑模式',
      defaultValue: false
    }
  },
  decorators: [
    () => ({
      template: '<div style="width: 375px; height: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;"><story/></div>'
    })
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    itemList: [
      {
        text: '广东省',
        value: 'guangdong',
        children: [
          {
            text: '广州市',
            value: 'guangzhou',
            children: [
              { text: '天河区', value: 'tianhe' },
              { text: '越秀区', value: 'yuexiu' },
              { text: '海珠区', value: 'haizhu' }
            ]
          },
          {
            text: '深圳市',
            value: 'shenzhen',
            children: [
              { text: '南山区', value: 'nanshan' },
              { text: '福田区', value: 'futian' },
              { text: '罗湖区', value: 'luohu' }
            ]
          }
        ]
      },
      {
        text: '北京市',
        value: 'beijing',
        children: [
          {
            text: '北京市',
            value: 'beijing_city',
            children: [
              { text: '朝阳区', value: 'chaoyang' },
              { text: '海淀区', value: 'haidian' },
              { text: '西城区', value: 'xicheng' }
            ]
          }
        ]
      }
    ]
  }
}

// 自定义样式
export const WithCustomStyle: Story = {
  args: {
    ...Basic.args,
    activeColor: '#ff6b6b',
    lineColor: '#ff6b6b',
    checkMarkColor: '#ff6b6b',
    textActiveColor: '#ff6b6b',
    size: 16,
    textSize: 16,
    height: '250px'
  }
}

// 带图片的选项
export const WithImages: Story = {
  args: {
    itemList: [
      {
        text: '水果',
        value: 'fruit',
        imgUrl: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=🍎',
        children: [
          {
            text: '苹果',
            value: 'apple',
            imgUrl: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=🍎',
            children: [
              { text: '红富士', value: 'hongfushi', imgUrl: 'https://via.placeholder.com/40x40/ff0000/ffffff?text=红' },
              { text: '青苹果', value: 'qingpingguo', imgUrl: 'https://via.placeholder.com/40x40/00ff00/ffffff?text=青' }
            ]
          },
          {
            text: '香蕉',
            value: 'banana',
            imgUrl: 'https://via.placeholder.com/40x40/ffff00/000000?text=🍌',
            children: [
              { text: '进口香蕉', value: 'imported_banana', imgUrl: 'https://via.placeholder.com/40x40/ffff00/000000?text=进' },
              { text: '本地香蕉', value: 'local_banana', imgUrl: 'https://via.placeholder.com/40x40/ffff00/000000?text=本' }
            ]
          }
        ]
      },
      {
        text: '蔬菜',
        value: 'vegetable',
        imgUrl: 'https://via.placeholder.com/40x40/00ff00/ffffff?text=🥬',
        children: [
          {
            text: '叶菜类',
            value: 'leafy',
            imgUrl: 'https://via.placeholder.com/40x40/00ff00/ffffff?text=叶',
            children: [
              { text: '白菜', value: 'cabbage', imgUrl: 'https://via.placeholder.com/40x40/90EE90/000000?text=白' },
              { text: '菠菜', value: 'spinach', imgUrl: 'https://via.placeholder.com/40x40/228B22/ffffff?text=菠' }
            ]
          }
        ]
      }
    ]
  }
}

// 默认选中
export const WithDefaultSelection: Story = {
  args: {
    ...Basic.args,
    defaultItemList: [
      { text: '广东省', value: 'guangdong' },
      { text: '广州市', value: 'guangzhou' },
      { text: '天河区', value: 'tianhe' }
    ]
  }
}

// 自定义字段名
export const WithCustomFields: Story = {
  args: {
    textField: 'name',
    valueField: 'id',
    childrenField: 'subItems',
    itemList: [
      {
        name: '技术部',
        id: 'tech',
        subItems: [
          {
            name: '前端组',
            id: 'frontend',
            subItems: [
              { name: 'Vue开发', id: 'vue' },
              { name: 'React开发', id: 'react' },
              { name: 'Angular开发', id: 'angular' }
            ]
          },
          {
            name: '后端组',
            id: 'backend',
            subItems: [
              { name: 'Java开发', id: 'java' },
              { name: 'Python开发', id: 'python' },
              { name: 'Node.js开发', id: 'nodejs' }
            ]
          }
        ]
      },
      {
        name: '产品部',
        id: 'product',
        subItems: [
          {
            name: '产品设计',
            id: 'design',
            subItems: [
              { name: 'UI设计', id: 'ui' },
              { name: 'UX设计', id: 'ux' }
            ]
          }
        ]
      }
    ]
  }
}

// 紧凑模式
export const CompactMode: Story = {
  args: {
    ...Basic.args,
    compact: true,
    height: '200px',
    textSize: 12,
    size: 12,
    tabsHeight: '36px'
  }
}

// 无头部分割线
export const WithoutHeaderLine: Story = {
  args: {
    ...Basic.args,
    headerLine: false
  }
}

// 自定义背景色
export const WithCustomBackground: Story = {
  args: {
    ...Basic.args,
    backgroundColor: '#f8f9fa',
    headerBgColor: '#e9ecef'
  }
}