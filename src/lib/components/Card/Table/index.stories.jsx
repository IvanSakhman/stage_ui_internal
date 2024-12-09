import { Typography, Flex } from 'antd'
import Table from './index'

const { Text } = Typography

const dataSourceMock = [
  {
    key: '1',
    name: 'John Doe',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'Jane Doe',
    age: 30,
    address: '20 Downing Street'
  }
]

const columnsMock = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

export default {
  title: 'Components/Card/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    loading: false,
    title: [
      'Contacts',
      <a key="more" href="" target="_self">
        More
      </a>
    ],
    dataSource: dataSourceMock,
    columns: columnsMock,
    headStyle: { width: 500 }
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows a loading indicator while the contents of the card are being fetched',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    title: {
      control: 'object',
      description: 'First item is the title, the rest are extra items',
      table: {
        type: { summary: 'array' }
      }
    },
    dataSource: {
      control: 'object',
      description: 'Data source for the table',
      table: {
        type: { summary: 'array' }
      }
    },
    columns: {
      control: 'object',
      description: 'Columns configuration',
      table: {
        type: { summary: 'array' }
      }
    },
    headStyle: {
      control: 'object',
      description: 'Styles for the table header',
      table: {
        type: { summary: 'object' }
      }
    },
    extraDataDisplay: {
      control: false,
      description: 'Extra data display',
      table: {
        type: { summary: 'ReactNode' }
      }
    }
  }
}

export const Base = {}

export const WithExtraData = {
  args: {
    extraDataDisplay: (
      <Flex justify="center" style={{ padding: '8px' }}>
        <Text>Extra data display here</Text>
      </Flex>
    )
  }
}
