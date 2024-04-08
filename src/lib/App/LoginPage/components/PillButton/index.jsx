import PropTypes from 'prop-types'
import { StyledButton, Icon } from './index.styled'

const PillButton = ({
  onClick,
  icon,
  label,
  alt = '',
  type = 'primary',
  size = 'large',
  color,
  backgroundColor,
  borderColor
}) => (
  <StyledButton
    type={type}
    size={size}
    onClick={onClick}
    block
    $color={color}
    $backgroundColor={backgroundColor}
    $borderColor={borderColor}
  >
    {icon && <Icon src={icon} alt={alt} height="24px" width="auto" $marginRight={label ? '0.5rem' : 0} />}
    {label}
  </StyledButton>
)

PillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any,
  alt: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'default']),
  size: PropTypes.oneOf(['large', 'default', 'small']),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string
}

export default PillButton
