import { memo, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu } from 'antd'

const ToggledSelect = ({ options, currentValue, onChange, disabled, trigger, btnClassName = null }) => {
  const onSelectionChange = (event) => {
    onChange(event.selectedKeys.map((key) => parseInt(key)))
  }

  const onSelectClick = (_event) => {}

  const menu = (
    <Menu
      selectable
      selectedKeys={currentValue.map((value) => value.toString())}
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
    <Dropdown disabled={disabled} overlay={menu}>
      {cloneElement(trigger, { className: btnClassName }, trigger.props.children)}
    </Dropdown>
  )
}

ToggledSelect.propTypes = {
  options: PropTypes.array.isRequired,
  currentValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  trigger: PropTypes.element.isRequired,
  btnClassName: PropTypes.string
}

export default memo(ToggledSelect)
