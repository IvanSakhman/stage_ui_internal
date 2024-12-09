import { fn } from '@storybook/test'
import { DownloadOutlined } from '@ant-design/icons'
import Button from './index'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    type: 'primary',
    children: 'Button',
    onClick: fn(),
    iconSize: null,
    iconOnly: false,
    warn: false,
    light: false
  },
  argTypes: {
    onClick: {
      control: false,
      description: 'Set the handler to handle click event',
      table: {
        type: { summary: 'function' }
      }
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    type: {
      control: 'select',
      options: ['primary', 'primary-dashed', 'default', 'dashed', 'text', 'link'],
      description: 'Set button type',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' }
      }
    },
    iconSize: {
      control: 'number',
      description: 'Icon size',
      table: {
        defaultValue: { summary: null },
        type: { summary: 'number' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: "Display only the icon, don't show the text",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    warn: {
      control: 'boolean',
      description: 'Set button to warn style',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    light: {
      control: 'boolean',
      description: 'Set button to light style',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Set button to disabled',
      table: {
        type: { summary: 'boolean' }
      }
    },
    popconfirm: {
      control: 'object',
      description: 'Popconfirm props',
      table: {
        type: { summary: 'object' }
      }
    },
    shortcut: {
      control: 'text',
      description: 'Shortcut text',
      table: {
        type: { summary: 'string' }
      }
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text',
      table: {
        type: { summary: 'string | object' }
      }
    }
  }
}

export const Basic = {}

export const WithIcon = {
  args: {
    icon: <DownloadOutlined />
  }
}

export const WithIconOnly = {
  args: {
    iconOnly: true,
    icon: <DownloadOutlined />
  }
}

export const WithPopconfirm = {
  args: {
    popconfirm: {
      placement: 'top',
      title: 'Are you sure?',
      okText: 'Yes',
      cancelText: 'Cancel',
      onClick: fn(),
      onCancel: fn(),
      onConfirm: fn()
    }
  }
}

export const WithTooltip = {
  args: {
    tooltip: 'Copy',
    shortcut: 'Ctrl + C'
  }
}

export const Reload = {
  render: (args) => (
    <Button.Reload {...args} type="primary-dashed" iconSize={14}>
      Refresh
    </Button.Reload>
  )
}
