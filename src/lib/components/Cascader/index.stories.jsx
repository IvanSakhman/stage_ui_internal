import { fn } from '@storybook/test'
import Cascader from './index'

const optionsMock = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]

export default {
  title: 'Components/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    options: optionsMock,
    showSearch: false,
    placeholder: 'Please select',
    changeOnSelect: false,
    expandTrigger: 'click',
    placement: 'bottomLeft',
    allowClear: true,
    autoClearSearchValue: true,
    autoFocus: false,
    defaultValue: [],
    disabled: false,
    notFoundContent: 'Not Found',
    variant: 'outlined',
    onChange: fn()
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'The data options of cascade',
      table: {
        type: { summary: 'array' }
      }
    },
    showSearch: {
      description: 'Whether show search input in single mode',
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    placeholder: {
      description: 'The input placeholder'
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'The input size',
      table: {
        type: { summary: 'string' }
      }
    },
    changeOnSelect: {
      control: 'boolean',
      description: '(Work on single select) Change value on each selection if set to true, see above demo for details',
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    expandTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Expand current item when click or hover, one of click hover',
      table: {
        defaultValue: {
          summary: 'string'
        }
      }
    },
    placement: {
      control: 'select',
      options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
      description: 'Use preset popup align config from builtinPlacements',
      table: {
        defaultValue: {
          summary: 'string'
        }
      }
    },
    allowClear: {
      control: 'boolean',
      description: 'Show clear button. Can be set to true or an object { clearIcon?: ReactNode }',
      table: {
        defaultValue: {
          summary: true
        }
      }
    },
    autoClearSearchValue: {
      control: 'boolean',
      description:
        'Whether the current search will be cleared on selecting an item. Only applies when multiple is true',
      table: {
        defaultValue: {
          summary: true
        }
      }
    },
    autoFocus: {
      control: 'boolean',
      description: 'If get focus when component mounted',
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    defaultValue: {
      control: 'array',
      description: 'Initial selected value',
      table: {
        defaultValue: {
          summary: '[]'
        },
        type: { summary: 'string[] | number[]' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether disabled select',
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    notFoundContent: {
      control: 'text',
      description: 'Specify content to show when no result matches',
      table: {
        defaultValue: {
          summary: 'Not Found'
        },
        type: { summary: 'string' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Set visible of cascader popup',
      table: {
        type: { summary: 'boolean' }
      }
    },
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
      description: 'Variants of selector',
      table: {
        defaultValue: {
          summary: 'outlined'
        }
      }
    },
    onChange: {
      control: false,
      description: 'Callback when finishing cascader select',
      table: {
        type: { summary: 'function' }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Support multiple or not',
      table: {
        type: { summary: 'boolean' }
      }
    }
  }
}

export const Basic = {}

export const WithSearch = {
  args: {
    showSearch: true
  }
}

export const WithDefaultValue = {
  args: {
    defaultValue: ['zhejiang', 'hangzhou', 'xihu']
  }
}

export const WithCustomTrigger = {
  args: {
    children: (
      <p>
        This is a <a>custom trigger</a>
      </p>
    )
  }
}

export const WithMultiple = {
  args: {
    style: { width: '250px' },
    multiple: true,
    maxTagCount: 'responsive'
  }
}
