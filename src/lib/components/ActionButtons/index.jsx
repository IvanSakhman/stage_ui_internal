import PropTypes from 'prop-types'
import ButtonGroup from '../ButtonGroup'
import Button from '../Button'

import { translateResponseAction, filterActionsByCondition } from './utilities'
import { useState } from 'react'

const ActionButton = ({ action, valueRender, translateOptions }) => {
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
    <Component {...properties} loading={displayLoader}>
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
  translateOptions: PropTypes.object
}

const ActionButtons = ({ actions = [], valueRender = null, ...translateOptions }) => {
  const filteredActions = filterActionsByCondition(actions, translateOptions.record)

  const renderActionButton = (action, index) => {
    return <ActionButton key={index} action={action} valueRender={valueRender} translateOptions={translateOptions} />
  }

  if (filteredActions.length === 1) {
    return renderActionButton(filteredActions[0], 0)
  }

  return <ButtonGroup>{filteredActions.map(renderActionButton)}</ButtonGroup>
}

ActionButtons.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  valueRender: ActionButton.propTypes.valueRender
}

export default ActionButtons
