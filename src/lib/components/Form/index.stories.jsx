import { fn } from '@storybook/test'
import { Input, Button, Typography } from 'antd'
import Form from './index'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldsMock = [
  {
    item: {
      name: 'firstName',
      label: 'First Name',
      rules: [{ required: true }]
    },
    component: <Input placeholder="First Name" />
  },
  {
    item: {
      name: 'lastName',
      label: 'Last Name'
    },
    component: <Input placeholder="Last Name" />
  },
  {
    item: {
      name: 'email',
      label: 'Email',
      rules: [
        { required: true },
        () => ({
          validator(_, value) {
            return emailRegex.test(value) ? Promise.resolve() : Promise.reject(new Error('Invalid email'))
          }
        })
      ]
    },
    component: <Input placeholder="Email" />
  }
]

const onFinish = fn(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
)

export default {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    fields: fieldsMock,
    onFinish,
    disable: false,
    onValuesChange: fn()
  },
  argTypes: {
    fields: {
      description: 'List of fields to render',
      table: {
        type: {
          summary: 'array'
        }
      }
    },
    onFinish: {
      description: 'Finish callback',
      table: {
        type: {
          summary: 'function'
        }
      }
    },
    disable: {
      description: 'Disable form',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    fieldsListName: {
      control: 'text',
      description: "Label for the 'Add' button",
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'null' }
      }
    },
    fieldsListDynamic: {
      control: 'boolean',
      description: 'Dynamic fields',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    globalFields: {
      description: 'List of global fields to render',
      table: {
        type: {
          summary: 'array'
        },
        defaultValue: { summary: 'null' }
      }
    },
    remoteControls: {
      control: 'boolean',
      description: 'Render remote controls',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    onCancel: {
      description: 'Cancel callback',
      table: {
        type: {
          summary: 'function'
        }
      }
    },
    onValuesChange: {
      description: 'Values change callback',
      table: {
        type: {
          summary: 'function'
        },
        defaultValue: { summary: 'null' }
      }
    },
    children: {
      control: false,
      description: 'Additional children',
      table: {
        type: {
          summary: 'node'
        }
      }
    },
    submitDisabledProp: {
      control: 'boolean',
      description: 'Disable submit button',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    controlsProps: {
      control: 'object',
      description: 'Controls props',
      table: {
        type: {
          summary: 'object'
        }
      }
    },
    object: {
      control: 'object',
      description: 'Initial values',
      table: {
        type: {
          summary: 'object'
        }
      }
    }
  }
}

export const Basic = {}

export const Disabled = {
  args: {
    disable: true
  }
}

export const WithRemoteControls = {
  args: {
    remoteControls: true,
    children: (
      <Button htmlType="submit" onClick={onFinish}>
        Remote control
      </Button>
    )
  }
}

export const WithInitialValues = {
  args: {
    object: {
      firstName: 'John',
      lastName: 'Doe'
    }
  }
}

export const WithGlobalFields = {
  args: {
    globalFields: [
      {
        item: {
          name: 'globalField',
          label: 'Global Field'
        },
        component: <Input placeholder="Global Field" />
      }
    ]
  }
}

export const WithCancelButton = {
  args: {
    onCancel: fn()
  }
}

export const WithChildren = {
  args: {
    children: (
      <Typography.Title level={5} style={{ textAlign: 'center' }}>
        With additional children
      </Typography.Title>
    )
  }
}

export const WithDynamicFields = {
  args: {
    fieldsListDynamic: true,
    fieldsListName: 'a new field',
    fields: [
      {
        item: {
          name: 'dynamicField',
          label: 'Dynamic Field'
        },
        component: <Input placeholder="Dynamic Field" />
      }
    ],
    style: { width: 500 }
  }
}
