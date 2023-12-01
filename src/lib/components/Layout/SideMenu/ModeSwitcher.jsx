import PropTypes from 'prop-types'
import { RadioGroup, RadioButton } from './index.styled'

const ModeSwitcher = ({ defaultValue, items, handleChange }) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onChange={handleChange}
      style={{ margin: '1rem 0 0.5rem 1.75rem' }}
      buttonStyle="solid"
    >
      {items.map(({ value, label }) => (
        <RadioButton key={value} value={value}>
          {label}
        </RadioButton>
      ))}
    </RadioGroup>
  )
}

ModeSwitcher.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  handleChange: PropTypes.func,
  defaultValue: PropTypes.string
}

export default ModeSwitcher
