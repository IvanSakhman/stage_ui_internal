import PropTypes from 'prop-types'
import { MoreOutlined } from '@ant-design/icons'
import { COLORS } from '~su/constants'
import ButtonGroup from '~su/components/ButtonGroup'
import Dropdown from '~su/components/Dropdown'
import { filterActionsByCondition } from './utilities'
import ActionButton from './ActionButton'

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
  valueRender: PropTypes.func,
  isDropdown: PropTypes.bool
}

export default ActionButtons
