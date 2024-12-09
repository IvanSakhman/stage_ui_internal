import PropTypes from 'prop-types'
import { COLORS } from '~su/constants'
import { Row, Col } from './index'

const colStyle = {
  color: COLORS.white,
  padding: '16px',
  textAlign: 'center'
}

const rowStyle = {
  marginTop: '16px'
}

export default {
  title: 'Components/Grid/Row',
  component: Row,
  tags: ['autodocs'],
  args: {
    justify: 'start',
    align: 'top',
    wrap: true,
    gutter: 0
  },
  argTypes: {
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      description: 'Horizontal alignment of the row',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'start' }
      }
    },
    align: {
      control: 'select',
      options: ['top', 'middle', 'bottom'],
      description: 'Vertical alignment of the row',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' }
      }
    },
    wrap: {
      control: 'boolean',
      description: 'Auto wrap line',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    gutter: {
      description:
        'Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}. Or you can use array to make horizontal and vertical spacing work at the same time [horizontal, vertical]',
      table: {
        defaultValue: { summary: '0' }
      }
    },
    rows: {
      table: {
        disable: true
      }
    }
  }
}

const RowTemplate = {
  render: ({ rows, ...args }) => (
    <>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex} style={rowIndex !== 0 ? rowStyle : {}} {...args}>
          {row.cols.map((col, colIndex) => (
            <Col
              key={colIndex}
              style={{ ...colStyle, backgroundColor: col.backgroundColor ? col.backgroundColor : COLORS.primary }}
              {...col}
            >
              {col.children || `col-${col.span}`}
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}

export const Basic = {
  ...RowTemplate,
  args: {
    rows: [
      { cols: [{ span: 24 }] },
      { cols: [{ span: 12 }, { span: 12, backgroundColor: COLORS.secondary }] },
      { cols: [{ span: 8 }, { span: 8, backgroundColor: COLORS.secondary }, { span: 8 }] },
      {
        cols: [
          { span: 6 },
          { span: 6, backgroundColor: COLORS.secondary },
          { span: 6 },
          { span: 6, backgroundColor: COLORS.secondary }
        ]
      }
    ]
  }
}

const gutterColChild = <div style={{ backgroundColor: COLORS.primary, padding: '8px 0' }}>col-6</div>
const gutterCol = { span: 6, backgroundColor: COLORS.white, children: gutterColChild }

export const Gutter = {
  ...RowTemplate,
  args: {
    gutter: 16,
    rows: [
      {
        cols: [gutterCol, gutterCol, gutterCol, gutterCol]
      }
    ]
  }
}

export const ResponsiveGutter = {
  ...RowTemplate,
  args: {
    gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
    rows: [
      {
        cols: [gutterCol, gutterCol, gutterCol, gutterCol]
      }
    ]
  }
}

export const VerticalGutter = {
  ...RowTemplate,
  args: {
    gutter: [16, 24],
    rows: [
      {
        cols: [gutterCol, gutterCol, gutterCol, gutterCol, gutterCol, gutterCol, gutterCol, gutterCol]
      }
    ]
  }
}

export const Justify = {
  ...RowTemplate,
  args: {
    justify: 'space-around',
    rows: [{ cols: [{ span: 4 }, { span: 4 }, { span: 4 }, { span: 4 }] }]
  }
}

const DemoBox = ({ height, children }) => <p style={{ height: `${height}px` }}>{children}</p>

DemoBox.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}

export const Align = {
  ...RowTemplate,
  args: {
    align: 'top',
    rows: [
      {
        cols: [
          { span: 4, children: <DemoBox height={100}>col-6</DemoBox> },
          { span: 4, children: <DemoBox height={50}>col-6</DemoBox> },
          { span: 4, children: <DemoBox height={120}>col-6</DemoBox> },
          { span: 4, children: <DemoBox height={80}>col-6</DemoBox> }
        ]
      }
    ]
  }
}
