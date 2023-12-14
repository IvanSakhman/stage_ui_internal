import ButtonGroup from '../ButtonGroup'
import Button from '../Button'

import { translateResponseAction, filterActionsByCondition } from './utilities'

const ActionButtons = ({ actions = [], valueRender = null, ...translateOptions }) => {
  const filteredActions = filterActionsByCondition(actions, translateOptions.record)

  const renderActionButton = (action, index) => {
    const { display, properties } = translateResponseAction(action, translateOptions)
    let Component = Button

    if (properties?.type == 'reload') {
      delete properties.type
      Component = Button.Reload
    }

    return (
      <Component key={index} {...properties}>
        {valueRender ? valueRender() : display}
      </Component>
    )
  }

  if (filteredActions.length === 1) {
    return renderActionButton(filteredActions[0], 0)
  }

  return <ButtonGroup>{filteredActions.map(renderActionButton)}</ButtonGroup>
}

export default ActionButtons
