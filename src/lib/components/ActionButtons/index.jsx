import PropTypes from 'prop-types'
import { filterActionsByCondition } from './utilities'
import ActionButton from './ActionButton'
import ButtonGroup from '../ButtonGroup'

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
  valueRender: PropTypes.func
}

export default ActionButtons
