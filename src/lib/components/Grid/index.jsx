import PropTypes from 'prop-types'
import { Row, Col, Grid } from 'antd'

// https://ant.design/components/grid#col
const ColSizeType = PropTypes.shape({
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offset: PropTypes.number,
  order: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number,
  span: PropTypes.number
})

const ColTypes = PropTypes.shape({
  ...ColSizeType.propTypes,
  xs: PropTypes.oneOfType([PropTypes.number, ColSizeType]),
  sm: PropTypes.oneOfType([PropTypes.number, ColSizeType]),
  md: PropTypes.oneOfType([PropTypes.number, ColSizeType]),
  lg: PropTypes.oneOfType([PropTypes.number, ColSizeType]),
  xl: PropTypes.oneOfType([PropTypes.number, ColSizeType]),
  xxl: PropTypes.oneOfType([PropTypes.number, ColSizeType])
})

Col.types = ColTypes

export { Row, Col, Grid }
