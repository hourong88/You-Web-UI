import type { Meta, StoryObj } from '@storybook/vue3'
import { YGrid, YGridItem } from '../../../you-ui-core/src/components/YGrid'

const meta = {
  title: '布局组件/YGrid',
  component: YGrid,
  parameters: {
    docs: {
      description: {
        component: 'YGrid 是一个灵活的宫格布局组件，支持自定义列数、边框、背景色等功能。'
      }
    }
  },
  argTypes: {
    unlined: {
      control: 'boolean',
      description: '是否去掉上边线',
      defaultValue: false
    }
  }
} satisfies Meta<typeof YGrid>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    unlined: false
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '📱', text: '手机充值' },
        { icon: '💰', text: '理财' },
        { icon: '🎫', text: '电影票' },
        { icon: '🚗', text: '滴滴出行' },
        { icon: '🍔', text: '美团外卖' },
        { icon: '✈️', text: '机票' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 48rpx; margin-bottom: 16rpx;">{{ item.icon }}</div>
            <div style="font-size: 24rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}

// 4列布局
export const FourColumns: Story = {
  args: {
    unlined: false
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '🏠', text: '房产' },
        { icon: '🚙', text: '汽车' },
        { icon: '📚', text: '教育' },
        { icon: '💊', text: '医疗' },
        { icon: '🎮', text: '游戏' },
        { icon: '🛍️', text: '购物' },
        { icon: '🍕', text: '美食' },
        { icon: '🎵', text: '音乐' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :cell="4"
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 40rpx; margin-bottom: 12rpx;">{{ item.icon }}</div>
            <div style="font-size: 22rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}

// 5列布局
export const FiveColumns: Story = {
  args: {
    unlined: false
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '📧', text: '邮件' },
        { icon: '📞', text: '电话' },
        { icon: '💬', text: '消息' },
        { icon: '📷', text: '相机' },
        { icon: '🎨', text: '设计' },
        { icon: '⚙️', text: '设置' },
        { icon: '📊', text: '统计' },
        { icon: '🔒', text: '安全' },
        { icon: '🌐', text: '网络' },
        { icon: '🔧', text: '工具' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :cell="5"
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 32rpx; margin-bottom: 8rpx;">{{ item.icon }}</div>
            <div style="font-size: 20rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}

// 无边框
export const NoBorder: Story = {
  args: {
    unlined: true
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '📱', text: '手机充值' },
        { icon: '💰', text: '理财' },
        { icon: '🎫', text: '电影票' },
        { icon: '🚗', text: '滴滴出行' },
        { icon: '🍔', text: '美团外卖' },
        { icon: '✈️', text: '机票' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :border="false"
          :bottom-line="false"
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 48rpx; margin-bottom: 16rpx;">{{ item.icon }}</div>
            <div style="font-size: 24rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}

// 自定义背景色
export const CustomBackground: Story = {
  args: {
    unlined: false
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '❤️', text: '红色', bgColor: '#ffebee' },
        { icon: '💚', text: '绿色', bgColor: '#e8f5e8' },
        { icon: '💙', text: '蓝色', bgColor: '#e3f2fd' },
        { icon: '💛', text: '黄色', bgColor: '#fffde7' },
        { icon: '💜', text: '紫色', bgColor: '#f3e5f5' },
        { icon: '🧡', text: '橙色', bgColor: '#fff3e0' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :background-color="item.bgColor"
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 48rpx; margin-bottom: 16rpx;">{{ item.icon }}</div>
            <div style="font-size: 24rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}

// 禁用点击效果
export const NoHover: Story = {
  args: {
    unlined: false
  },
  render: (args) => ({
    components: { YGrid, YGridItem },
    setup() {
      const items = [
        { icon: '📱', text: '手机充值' },
        { icon: '💰', text: '理财' },
        { icon: '🎫', text: '电影票' },
        { icon: '🚗', text: '滴滴出行' },
        { icon: '🍔', text: '美团外卖' },
        { icon: '✈️', text: '机票' }
      ]

      const handleClick = (payload: { index: number }) => {
        console.log('点击了网格项:', payload.index)
      }

      return { args, items, handleClick }
    },
    template: `
      <YGrid v-bind="args">
        <YGridItem 
          v-for="(item, index) in items" 
          :key="index" 
          :hover="false"
          :index="index" 
          @click="handleClick"
        >
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="font-size: 48rpx; margin-bottom: 16rpx;">{{ item.icon }}</div>
            <div style="font-size: 24rpx; color: #333;">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    `
  })
}