import PropTypes from 'prop-types'
import { StyledRadioGroup, RadioButton } from './index.styled'

const RadioGroup = ({ items, handleChange, ...rest }) => {
  return (
    <StyledRadioGroup onChange={handleChange} {...rest}>
      {items.map(({ value, label }) => (
        <RadioButton key={value} value={value}>
          {label}
        </RadioButton>
      ))}
    </StyledRadioGroup>
  )
}

RadioGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func
}

export default RadioGroup
