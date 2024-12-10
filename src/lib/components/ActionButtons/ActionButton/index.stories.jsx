import { fn } from '@storybook/test'
import ActionButton from './index'

const mockFunction = async () => await new Promise((resolve) => setTimeout(resolve, 2000))

export default {
  title: 'Components/ActionButtons/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    translateOptions: {
      functionHandlers: {
        action: fn(mockFunction)
      }
    }
  },
  argTypes: {
    action: {
      control: 'object',
      description: 'Action object that will be displayed as a button.',
      table: {
        type: {
          summary: 'object'
        }
      }
    },
    valueRender: {
      control: false,
      description: 'Function that will be called to render the button content.',
      table: {
        type: {
          summary: 'function'
        }
      }
    },
    translateOptions: {
      control: 'object',
      description: 'Object with options that will be used to translate the action.',
      table: {
        type: {
          summary: 'object'
        }
      }
    }
  }
}

export const Basic = {
  args: {
    action: {
      name: 'action',
      display: 'Action',
      type: 'function',
      options: {}
    }
  }
}

export const WithLoader = {
  args: {
    action: {
      ...Basic.args.action,
      showLoader: true
    }
  }
}

export const WithPopconfirm = {
  args: {
    action: {
      ...Basic.args.action,
      name: 'confirm',
      options: {
        type: 'primary',
        danger: true,
        popconfirm: {
          title: 'Are you sure you want to run this function?'
        }
      }
    }
  }
}

export const Link = {
  args: {
    action: {
      name: 'link',
      display: 'Link',
      type: 'link',
      options: {
        type: 'link',
        href: '',
        target: '_self'
      }
    }
  }
}

export const Reload = {
  args: {
    action: {
      name: 'action',
      display: 'Reload',
      type: 'function',
      options: {
        type: 'reload'
      }
    }
  }
}

export const Disabled = {
  args: {
    action: {
      ...Basic.args.action,
      options: {
        disabled: true
      }
    }
  }
}
