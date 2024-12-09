import { COLORS } from '~su/constants'
import { Row, Col } from './index'

const colStyle = {
  backgroundColor: COLORS.primary,
  color: COLORS.white,
  padding: '16px'
}

const getDescriptionForResponsive = (breakpoint) =>
  `screen ${breakpoint}, could be a span value or an object containing above props`

export default {
  title: 'Components/Grid/Col',
  component: Col,
  tags: ['autodocs'],
  args: {
    style: colStyle
  },
  argTypes: {
    span: {
      control: {
        type: 'number',
        min: 1,
        max: 24
      },
      description: 'The number of columns to occupy'
    },
    push: {
      control: {
        type: 'number',
        min: 0,
        max: 24
      },
      description: 'By using push class you can easily change column order.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    pull: {
      control: {
        type: 'number',
        min: 0,
        max: 24
      },
      description: 'By using pull class you can easily change column order.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    order: {
      control: {
        type: 'number',
        min: 1,
        max: 4
      },
      description: 'The order of the column',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    offset: {
      control: {
        type: 'number',
        min: 0,
        max: 24
      },
      description: 'The number of columns to offset',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    },
    flex: {
      description: 'Can be a number or a string like "auto", "100px", "1 1 auto", etc.'
    },
    xs: {
      description: 'screen < 576px and also default setting, could be a span value or an object containing above props'
    },
    sm: {
      description: getDescriptionForResponsive('≥ 576px')
    },
    md: {
      description: getDescriptionForResponsive('≥ 768px')
    },
    lg: {
      description: getDescriptionForResponsive('≥ 992px')
    },
    xl: {
      description: getDescriptionForResponsive('≥ 1200px')
    },
    xxl: {
      description: getDescriptionForResponsive('≥ 1600px')
    },
    style: {
      table: {
        disable: true
      }
    }
  }
}

export const Basic = {
  args: {
    span: 24
  },
  render: (args) => (
    <Row>
      <Col {...args}>col-{args.span}</Col>
    </Row>
  )
}

export const Offset = {
  args: {
    span: 6,
    offset: 6
  },
  render: (args) => (
    <Row>
      <Col {...args}>col-6</Col>
      <Col {...args}>col-6</Col>
    </Row>
  )
}

export const GridSort = {
  args: { push: 6, pull: 18 },
  render: ({ push, pull, ...args }) => (
    <>
      <Row>
        <Col {...args} span={18} push={push}>
          col-18 col-push-{push}
        </Col>
        <Col {...args} span={6} pull={pull} style={{ ...args.style, backgroundColor: COLORS.secondary }}>
          col-6 col-pull-{pull}
        </Col>
      </Row>
    </>
  )
}

export const Order = {
  args: {
    span: 6
  },
  render: (args) => (
    <Row>
      <Col {...args} order={4}>
        1 col-order-4
      </Col>
      <Col {...args} order={3}>
        2 col-order-3
      </Col>
      <Col {...args} order={2}>
        3 col-order-2
      </Col>
      <Col {...args} order={1}>
        4 col-order-1
      </Col>
    </Row>
  )
}

export const FlexStretchWithNumber = {
  args: {
    flex: 2
  },
  render: (args) => (
    <Row>
      <Col {...args}>{args.flex} / 5</Col>
      <Col {...args} flex={3} style={{ ...args.style, backgroundColor: COLORS.secondary }}>
        3 / 5
      </Col>
    </Row>
  )
}

export const FlexStretchWithString = {
  args: {
    flex: '100px'
  },
  render: (args) => (
    <Row>
      <Col {...args}>{args.flex}</Col>
      <Col {...args} flex="auto" style={{ ...args.style, backgroundColor: COLORS.secondary }}>
        Auto
      </Col>
    </Row>
  )
}

export const ResponsiveFlex = {
  args: {
    xs: { flex: '100%' },
    sm: { flex: '50%' },
    md: { flex: '40%' },
    lg: { flex: '20%' },
    xl: { flex: '10%' }
  },
  render: (args) => (
    <Row>
      {new Array(10).fill(0).map((_, index) => {
        const key = `col-${index}`
        return (
          <Col
            key={key}
            {...args}
            {...(index % 2 === 0 ? { style: { ...args.style, backgroundColor: COLORS.secondary } } : {})}
          >
            Col
          </Col>
        )
      })}
    </Row>
  )
}
