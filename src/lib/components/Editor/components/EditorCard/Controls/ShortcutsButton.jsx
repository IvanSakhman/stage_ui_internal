import { memo } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

import Button from '~su/components/Button'

// type Props = {
//  onClick: func;
// }

const ShortcutsButton = ({ onClick }) => (
  <Button
    key="shortcuts-cheatsheet-button"
    tooltip="Open Shortcuts (F1)"
    onClick={onClick}
    icon={<QuestionCircleOutlined />}
  >
    Shortcuts
  </Button>
)

export default memo(ShortcutsButton)
