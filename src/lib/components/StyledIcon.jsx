import { forwardRef, isValidElement, cloneElement } from 'react'
import { red, blue } from '@ant-design/colors'
import Tooltip from './Tooltip'

const ICON_SIZE = 18

const StyledIcon = forwardRef(({ size = null, icon, type = null, tooltip = null }, _ref) => {
  if (!icon || !isValidElement(icon)) {
    return null
  }
  let color

  // remove colors within https://assembly-tech.atlassian.net/browse/SC-2 task
  switch (type) {
    case 'success':
    case 'progress': {
      color = blue.primary
      break
    }
    case 'fail': {
      color = red[4]
      break
    }
    default:
      color = '#d9d9d9'
  }

  icon = cloneElement(icon, { style: { fontSize: size || ICON_SIZE, verticalAlign: 'middle', color } }, null)

  return tooltip ? (
    <Tooltip size="small" title={tooltip}>
      {icon}
    </Tooltip>
  ) : (
    icon
  )
})

export default StyledIcon
