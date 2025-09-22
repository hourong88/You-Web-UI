import type { Meta, StoryObj } from '@storybook/vue3'
import { YTabs } from '../../../you-ui-core/src'

const meta: Meta<typeof YTabs> = {
  title: 'Components/YTabs',
  component: YTabs,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => ({
      template: '<div style="width: 400px; padding: 20px;"><story/></div>'
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Tab items array'
    },
    currentTab: {
      control: 'text',
      description: 'Current active tab value'
    },
    field: {
      control: 'text',
      description: 'Field name for tab value'
    },
    badgeField: {
      control: 'text',
      description: 'Field name for badge count'
    },
    width: {
      control: 'text',
      description: 'Tab width'
    },
    height: {
      control: 'text',
      description: 'Tab height'
    },
    fontSize: {
      control: 'text',
      description: 'Font size'
    },
    activeColor: {
      control: 'color',
      description: 'Active tab color'
    },
    inactiveColor: {
      control: 'color',
      description: 'Inactive tab color'
    },
    sliderColor: {
      control: 'color',
      description: 'Slider color'
    },
    sliderHeight: {
      control: 'text',
      description: 'Slider height'
    },
    sliderRadius: {
      control: 'text',
      description: 'Slider border radius'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { name: 'Tab 1', value: 'tab1' },
      { name: 'Tab 2', value: 'tab2' },
      { name: 'Tab 3', value: 'tab3' }
    ],
    currentTab: 'tab1',
    field: 'value'
  },
}

export const WithBadges: Story = {
  args: {
    tabs: [
      { name: 'Messages', value: 'messages', badge: 5 },
      { name: 'Notifications', value: 'notifications', badge: 12 },
      { name: 'Settings', value: 'settings' }
    ],
    currentTab: 'messages',
    field: 'value',
    badgeField: 'badge'
  },
}

export const CustomColors: Story = {
  args: {
    tabs: [
      { name: 'Home', value: 'home' },
      { name: 'Profile', value: 'profile' },
      { name: 'Settings', value: 'settings' }
    ],
    currentTab: 'home',
    field: 'value',
    activeColor: '#007AFF',
    inactiveColor: '#999999',
    sliderColor: '#007AFF'
  },
}

export const CustomSize: Story = {
  args: {
    tabs: [
      { name: 'Small', value: 'small' },
      { name: 'Medium', value: 'medium' },
      { name: 'Large', value: 'large' }
    ],
    currentTab: 'medium',
    field: 'value',
    width: '120px',
    height: '50px',
    fontSize: '16px'
  },
}

export const WithDisabled: Story = {
  args: {
    tabs: [
      { name: 'Active', value: 'active' },
      { name: 'Disabled', value: 'disabled', disabled: true },
      { name: 'Normal', value: 'normal' }
    ],
    currentTab: 'active',
    field: 'value'
  },
}

export const ManyTabs: Story = {
  args: {
    tabs: [
      { name: 'Tab 1', value: 'tab1' },
      { name: 'Tab 2', value: 'tab2' },
      { name: 'Tab 3', value: 'tab3' },
      { name: 'Tab 4', value: 'tab4' },
      { name: 'Tab 5', value: 'tab5' },
      { name: 'Tab 6', value: 'tab6' }
    ],
    currentTab: 'tab3',
    field: 'value'
  },
}