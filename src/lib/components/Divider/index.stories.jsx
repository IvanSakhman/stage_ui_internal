import Divider from './index'

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    style: { width: 500 },
    dashed: false,
    plain: false,
    variant: 'solid',
    orientation: 'center'
  },
  argTypes: {
    style: {
      table: {
        disable: true
      }
    },
    dashed: {
      control: 'boolean',
      description: 'Whether line is dashed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    plain: {
      control: 'boolean',
      description: 'You can use non-heading style of divider text by setting the plain property.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The style of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' }
      }
    },
    orientation: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The orientation of the text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' }
      }
    }
  }
}

export const Basic = {}

export const WithText = {
  args: {
    children: 'Text'
  }
}

export const WithoutHeaderStyle = {
  args: {
    plain: true,
    children: 'Text'
  }
}

export const WithOrientation = {
  args: {
    orientation: 'left',
    children: 'Text'
  }
}

export const Vertical = {
  render: () => (
    <>
      Text
      <Divider type="vertical" />
      <a href="#" target="_self">
        Link
      </a>
      <Divider type="vertical" />
      <a href="" target="_self">
        Link
      </a>
    </>
  )
}
