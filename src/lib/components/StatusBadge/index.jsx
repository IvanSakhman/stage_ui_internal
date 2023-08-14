// NOTE: deprecated. replaced by StateBadge. Please do not use.
// left for backwards compatibility
import { blue } from '@ant-design/colors'

import Tooltip from '~su/components/Tooltip'

import { StyledBadge } from './index.styled'

// type Props = {
//   status: string
//   tooltip?: string
//   size?: string
// }

const StatusBadge = ({ status, tooltip = null, size = null }) => {
  const BADGE_PER_STATE = {
    completed: { status: 'success' },
    failed: { status: 'error' },
    submitted: { color: blue[5] },
    processing: { status: 'processing' }
  }

  const badgeProps = BADGE_PER_STATE[status] || BADGE_PER_STATE.processing
  return (
    <Tooltip arrow={{ pointAtCenter: true }} title={tooltip} size="small" align={{ offset: [-5, 10] }}>
      <StyledBadge {...badgeProps} $size={size} />
    </Tooltip>
  )
}

export default StatusBadge
