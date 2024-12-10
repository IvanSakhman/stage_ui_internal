import { fn } from '@storybook/test'
import { Space } from 'antd'
import Checkbox from './index'

const plainOptionsMock = ['Apple', 'Pear', 'Orange']

const optionsMock = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]

const optionsWithDisabledMock = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    checked: false,
    defaultChecked: false,
    disabled: false,
    indeterminate: false,
    autoFocus: false,
    onChange: fn()
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Specifies whether the checkbox is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Specifies the initial state: whether or not the checkbox is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'If disable checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    indeterminate: {
      control: 'boolean',
      description: 'The indeterminate checked state of checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    autoFocus: {
      control: 'boolean',
      description: 'If get focus when component mounted',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    onChange: {
      description: 'The callback function that is triggered when the state changes',
      table: {
        type: { summary: 'function' }
      }
    }
  }
}

export const Basic = {}

export const DefaultChecked = {
  args: {
    checked: true,
    defaultChecked: true
  }
}

export const Disabled = {
  args: {
    disabled: true
  }
}

export const Indeterminate = {
  args: {
    indeterminate: true
  }
}

export const Group = {
  render: () => (
    <Space direction="vertical" size="middle">
      <Checkbox.Group options={plainOptionsMock} defaultValue={['Apple']} />
      <Checkbox.Group options={optionsMock} defaultValue={['Pear']} />
      <Checkbox.Group options={optionsWithDisabledMock} disabled defaultValue={['Apple']} />
    </Space>
  )
}
