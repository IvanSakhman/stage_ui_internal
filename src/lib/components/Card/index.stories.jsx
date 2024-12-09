import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import Card from './Base'

const mockImageSrc =
  'https://images.unsplash.com/photo-1724805053809-3c09736b2ade?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const mockAvatarSrc =
  'https://images.unsplash.com/photo-1701728667207-54b43dbdab97?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    loading: false,
    hoverable: false,
    size: 'default'
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
      table: {
        type: { summary: 'ReactNode ' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading indicator while the contents of the card are being fetched',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Size of card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' }
      }
    },
    hoverable: {
      control: 'boolean',
      description: 'Lift up when hovering card',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    extra: {
      control: false,
      description: 'Content to render in the top-right corner of the card',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    children: {
      control: false,
      description: 'Card content',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    cover: {
      control: false,
      description: 'Card cover',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    type: {
      control: false,
      description: 'Card style type, can be set to inner or not set',
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

export const Base = {
  args: {
    title: 'Default size card',
    extra: (
      <a href="" target="_self">
        More
      </a>
    ),
    style: { width: 300 },
    children: (
      <>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </>
    )
  }
}

export const CustomizedContent = {
  args: {
    hoverable: true,
    style: { width: 240 },
    cover: <img alt="example" src={mockImageSrc} />,
    children: <Card.Meta title="Ice cream" description="https://unsplash.com/" />
  }
}

export const InnerCard = {
  args: {
    title: 'Card title',
    style: { width: 500 },
    children: (
      <>
        <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
          Inner Card content
        </Card>
        <Card
          style={{
            marginTop: 16
          }}
          type="inner"
          title="Inner Card title"
          extra={<a href="#">More</a>}
        >
          Inner Card content
        </Card>
      </>
    )
  }
}

export const Configurable = {
  args: {
    style: { width: 300 },
    cover: <img alt="example" src={mockImageSrc} />,
    actions: [<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />],
    children: (
      <Card.Meta avatar={<Avatar src={mockAvatarSrc} />} title="Card title" description="This is the description" />
    )
  }
}
