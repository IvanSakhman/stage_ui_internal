import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import Breadcrumb from './index'

const mockItems = [
  {
    title: 'Home'
  },
  {
    title: (
      <a href="#" target="_self">
        Application Center
      </a>
    )
  },
  {
    title: (
      <a href="#" target="_self">
        Application List
      </a>
    )
  },
  {
    title: 'An Application'
  }
]

const dropdownItemsMock = [
  {
    key: '1',
    label: (
      <a href="" target="_self">
        Application List
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a href="" target="_self">
        Layout
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a href="" target="_self">
        Navigation
      </a>
    )
  }
]

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    items: mockItems
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Breadcrumb items',
      table: {
        type: { summary: 'array' }
      }
    },
    separator: {
      control: 'text',
      description: 'Custom separator',
      table: {
        defaultValue: { summary: '/' },
        type: { summary: 'string' }
      }
    }
  }
}

export const Basic = {}

export const WithSeparator = {
  args: {
    separator: '>'
  }
}

export const WithDropdown = {
  args: {
    items: mockItems.map((item, index) => (index === 2 ? { ...item, menu: { items: dropdownItemsMock } } : item))
  }
}

export const WithIcon = {
  args: {
    items: [
      {
        title: <HomeOutlined />
      },
      {
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        )
      },
      {
        title: 'Application'
      }
    ]
  }
}
