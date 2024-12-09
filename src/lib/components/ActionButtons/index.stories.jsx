import { fn } from '@storybook/test'
import ActionButtons from './index'

const basicActionMock = {
  name: 'action',
  display: 'Action',
  type: 'function',
  options: {}
}

const linkActionMock = {
  name: 'link',
  display: 'Link',
  type: 'link',
  options: {
    type: 'link',
    href: '',
    target: '_self'
  }
}

const reloadActionMock = {
  name: 'reload',
  display: 'Reload',
  type: 'function',
  options: {
    type: 'reload'
  }
}

const mockFunction = async () => await new Promise((resolve) => setTimeout(resolve, 2000))

const functionHandlersMock = {
  action: fn(mockFunction),
  reload: fn(mockFunction),
  confirm: fn()
}

export default {
  title: 'Components/ActionButtons',
  component: ActionButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    actions: [basicActionMock, linkActionMock, reloadActionMock],
    functionHandlers: functionHandlersMock
  },
  argTypes: {
    actions: {
      control: 'object',
      description: 'Array of actions that will be displayed as buttons.',
      table: {
        defaultValue: { summary: '[]' },
        summary: 'array'
      }
    },
    valueRender: {
      control: false,
      description: 'Function that will be called to render the button content.',
      table: {
        defaultValue: { summary: 'null' },
        summary: 'function'
      }
    },
    functionHandlers: {
      control: 'object',
      description:
        'Object with functions that will be called when the action is triggered. The key is the action name and the value is the function that will be called.',
      table: {
        type: {
          summary: 'object'
        }
      }
    }
  }
}

export const Basic = {}
