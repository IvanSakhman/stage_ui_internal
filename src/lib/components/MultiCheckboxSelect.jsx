import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, Menu } from 'antd'

import string from '~su/utilities/string'

const MultiCheckboxSelect = ({ options, currentValue, onChange, disabled, context = null, btnClassName = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onSelectionChange = (event) => {
    onChange(event.selectedKeys.map((key) => parseInt(key)))
  }

  const onSelectClick = (_event) => {}

  const onButtonClick = (_event) => {
    currentValue.length === 0 ? onChange(options.map((option) => option.value)) : onChange([])
  }

  const menu = (
    <Menu
      selectable
      multiple
      selectedKeys={currentValue.map((key) => key.toString())}
      onSelect={onSelectionChange}
      onDeselect={onSelectionChange}
      onClick={onSelectClick}
    >
      {options.map((option) => {
        return <Menu.Item key={option.value}>{option.label}</Menu.Item>
      })}
    </Menu>
  )

  return (
    <Dropdown.Button
      disabled={disabled}
      overlay={menu}
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}
      onClick={onButtonClick}
      className={btnClassName}
    >
      {`${currentValue.length === 0 ? 'Show' : 'Hide'} All ${string.capitalize(context)}`}
    </Dropdown.Button>
  )
}

MultiCheckboxSelect.propTypes = {
  options: PropTypes.array.isRequired,
  currentValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  context: PropTypes.string,
  btnClassName: PropTypes.string
}

export default memo(MultiCheckboxSelect)
