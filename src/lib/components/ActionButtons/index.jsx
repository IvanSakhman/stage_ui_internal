import PropTypes from 'prop-types'
import { MoreOutlined } from '@ant-design/icons'
import ButtonGroup from '~su/components/ButtonGroup'
import { COLORS } from '~su/constants'
import Dropdown from '../Dropdown'
import Button from '../Button'

import { translateResponseAction, filterActionsByCondition } from './utilities'
import { useState } from 'react'

const dropdownProperties = {
  type: 'text',
  block: true,
  iconSize: 12,
  style: {
    justifyContent: 'start',
    gap: '4px'
  }
}

const ActionButton = ({ action, valueRender, translateOptions, isDropdown = false }) => {
  const { display, properties } = translateResponseAction(action, translateOptions)
  const [displayLoader, setDisplayLoader] = useState(false)

  let Component = Button

  if (properties?.type == 'reload') {
    delete properties.type
    Component = Button.Reload
  }

  if (action.type === 'function' && action.showLoader) {
    const originalOnClick = properties.onClick
    properties.onClick = (record) => {
      setDisplayLoader(true)
      originalOnClick(record).then(() => setDisplayLoader(false))
    }
  }

  return (
    <Component {...properties} {...(isDropdown ? dropdownProperties : {})} loading={displayLoader}>
      {valueRender ? valueRender() : display}
    </Component>
  )
}

ActionButton.propTypes = {
  action: PropTypes.shape({
    type: PropTypes.oneOf(['link', 'function', 'request']).isRequired,
    showLoader: PropTypes.bool
  }),
  valueRender: PropTypes.func,
  isDropdown: PropTypes.bool,
  translateOptions: PropTypes.object
}

const ActionButtons = ({ actions = [], valueRender = null, isDropdown = false, ...translateOptions }) => {
  const filteredActions = filterActionsByCondition(actions, translateOptions.record)

  const renderActionButton = (action, index) => {
    return (
      <ActionButton
        key={index}
        action={action}
        valueRender={valueRender}
        translateOptions={translateOptions}
        isDropdown={isDropdown}
      />
    )
  }

  if (isDropdown) {
    return (
      <Dropdown
        icon={<MoreOutlined style={{ color: COLORS.primary }} />}
        autohide={false}
        trigger={['click']}
        buttonProps={{
          type: 'text',
          style: {
            color: COLORS.primary
          }
        }}
        isActionButtons
      >
        {filteredActions.map(renderActionButton)}
      </Dropdown>
    )
  }

  if (filteredActions.length === 1) {
    return renderActionButton(filteredActions[0], 0)
  }

  return <ButtonGroup>{filteredActions.map(renderActionButton)}</ButtonGroup>
}

ActionButtons.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  valueRender: ActionButton.propTypes.valueRender,
  isDropdown: PropTypes.bool
}

export default ActionButtons
