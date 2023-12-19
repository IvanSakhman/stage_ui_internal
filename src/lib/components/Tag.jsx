import PropTypes from 'prop-types'
import { styled } from 'styled-components'

import { Tag as AntdTag } from 'antd'

const applySizes = ({ $size }) => {
  switch ($size) {
    case 'large': {
      return `
        font-size: 0.85rem;
        line-height: 1.5rem;
      `
    }
    default: {
      return ``
    }
  }
}

const StyledTag = styled(AntdTag)`
  ${(props) => applySizes(props)}
`

const Tag = ({ size = 'default', ...props }) => <StyledTag $size={size} {...props} />

Tag.propTypes = {
  size: PropTypes.oneOf(['large', 'default', null])
}

export default Tag
