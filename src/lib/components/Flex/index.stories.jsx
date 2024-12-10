import { COLORS } from '~su/constants'
import Flex from './index'

const getChildren = ({ length, width }) =>
  Array.from({ length }).map((_, i) => (
    <div key={i} style={{ width, height: 54, backgroundColor: i % 2 ? COLORS.secondary : COLORS.primary }} />
  ))

export default {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  args: {
    vertical: false,
    wrap: 'nowrap'
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'If true, the children will be stacked vertically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Align the children horizontally',
      table: {
        type: { summary: 'string' }
      }
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end'],
      description: 'Align the children vertically',
      table: {
        type: { summary: 'string' }
      }
    },
    gap: {
      control: 'text',
      description:
        'Set the gap between elements, which has three preset sizes: small, middle, large, You can also customize the gap size. Can be a number or a string'
    },
    wrap: {
      control: 'select',
      options: [true, false, 'nowrap', 'wrap', 'wrap-reverse'],
      description: 'Auto wrap line.',
      table: {
        defaultValue: { summary: 'nowrap' }
      }
    }
  }
}

export const Basic = {
  args: {
    children: getChildren({ length: 4, width: '25%' })
  }
}

export const Vertical = {
  args: {
    children: getChildren({ length: 4, width: '25%' }),
    vertical: true
  }
}

export const WithAlign = {
  args: {
    children: getChildren({ length: 4, width: '20%' }),
    justify: 'space-around',
    align: 'center',
    style: {
      width: '100%',
      height: 120,
      borderRadius: 6,
      border: `1px solid ${COLORS.primary}`
    }
  }
}

export const WithGap = {
  args: {
    children: getChildren({ length: 4, width: '20%' }),
    gap: 'middle'
  }
}

export const WithCustomGap = {
  args: {
    children: getChildren({ length: 4, width: '20%' }),
    gap: '10px'
  }
}

export const WithWrap = {
  args: {
    children: getChildren({ length: 8, width: '20%' }),
    wrap: true
  }
}
