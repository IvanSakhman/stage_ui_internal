import PropTypes from 'prop-types'

import { StyledLayout } from './index.styled'

const LayoutWrapper = ({ children, className }) => <StyledLayout className={className}>{children}</StyledLayout>

LayoutWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
}

export default LayoutWrapper
