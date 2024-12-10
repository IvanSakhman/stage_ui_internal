import PropTypes from 'prop-types'
import Button from '../../Button'

import { translateResponseAction } from '../utilities'
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

export default ActionButton
