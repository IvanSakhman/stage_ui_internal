import AutoComplete from './index'

const optionsMock = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const enumsMock = ['option1', 'option2', 'option3', '-1']
const valueEnumMock = [
  ['Option 1', 'option1'],
  ['Option 2', 'option2'],
  ['Option 3', 'option3'],
  ['All Options', '-1']
]
const allLabel = 'All Options'

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    placeholder: 'Type something',
    style: { width: 200 },
    options: optionsMock,
    enums: enumsMock,
    valueEnum: valueEnumMock,
    allLabel
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Options of input',
      table: {
        type: { summary: 'string[] | { label: string, value: string }[]' }
      }
    },
    enums: {
      control: 'object',
      description: 'Enums of input',
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: 'string[]' }
      }
    },
    valueEnum: {
      control: 'object',
      description: 'Value enums of input',
      table: {
        defaultValue: { summary: null },
        type: { summary: 'string[][]' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of input',
      table: {
        type: { summary: 'string' }
      }
    },
    allLabel: {
      control: 'text',
      description: 'The label for all options',
      table: {
        defaultValue: { summary: null },
        type: { summary: 'string' }
      }
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'borderless'],
      description: 'Variants of input',
      table: {
        defaultValue: { summary: 'outlined' },
        type: { summary: 'string' }
      }
    },
    status: {
      control: 'select',
      options: ['error', 'warning'],
      description: 'Status of input',
      table: {
        type: { summary: '"error" | "warning"' }
      }
    },
    style: {
      table: {
        disable: true
      }
    }
  }
}

export const Basic = {}
