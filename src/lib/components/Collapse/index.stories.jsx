import { SettingOutlined } from '@ant-design/icons'
import Collapse from './index.jsx'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const itemsMock = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>
  }
]

export default {
  title: 'Components/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    items: itemsMock,
    defaultActiveKey: ['1'],
    bordered: true,
    accordion: false,
    ghost: false,
    size: 'middle',
    style: { width: 500 }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'The list of items',
      table: {
        type: { summary: 'array' }
      }
    },
    defaultActiveKey: {
      control: 'array',
      description: 'Active key of the Collapse',
      table: {
        type: { summary: 'array' }
      }
    },
    accordion: {
      control: 'boolean',
      description: 'Accordion mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the border is shown or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    ghost: {
      control: 'boolean',
      description: 'Whether the background is ghost or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    size: {
      control: 'select',
      options: ['middle', 'small', 'large'],
      description: 'The size of the Collapse',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'middle' }
      }
    },
    collapsible: {
      control: 'select',
      options: ['header', 'icon', 'disabled'],
      description: 'Specify whether the panels of children be collapsible or the trigger area of collapsible',
      table: {
        type: { summary: 'string' }
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

export const Accordion = {
  args: {
    accordion: true
  }
}

export const WithoutArrow = {
  args: {
    items: itemsMock.map((item) => ({ ...item, showArrow: false }))
  }
}

export const ExtraNode = {
  args: {
    items: itemsMock.map((item) => ({ ...item, extra: <SettingOutlined /> }))
  }
}

export const CollapsibleItem = {
  args: {
    collapsible: 'header'
  }
}
