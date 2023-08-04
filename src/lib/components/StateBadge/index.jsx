// NOTE: replaces StatusBadge

import Tooltip from '../Tooltip'

import { COLORS } from '~su/constants'

import { string } from '~su/utilities'

import { StyledBadge } from './index.styled'

export default ({ state, configuration = {}, size = null, offsetX = -5, offsetY = 10 }) => {
  const BADGE_PER_STATE = Object.assign(
    {
      completed: { status: 'success' },
      failed: { status: 'error' },
      submitted: { color: COLORS.info },
      processing: { status: 'processing' }
    },
    configuration
  )

  const badgeProps = BADGE_PER_STATE[state] || BADGE_PER_STATE.processing
  return (
    <Tooltip arrowPointAtCenter title={string.humanize(state)} size="small" align={{ offset: [offsetX, offsetY] }}>
      <StyledBadge {...badgeProps} $size={size} />
    </Tooltip>
  )
}
