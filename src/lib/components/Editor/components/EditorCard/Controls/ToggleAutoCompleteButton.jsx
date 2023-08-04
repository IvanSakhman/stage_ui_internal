import { memo, useEffect, useState } from 'react'
import { EditOutlined, EditFilled } from '@ant-design/icons'

import Button from '~su/components/Button'

import { useAutoComplete } from '../../../store'
import { toggleAutocomplete } from '../../../actions'

const ToggleAutoCompleteButton = () => {
  const enabled = useAutoComplete()
  const [tooltipMessage, setTooltipMessage] = useState(`Live Autocomplete ${enabled ? 'Enabled' : 'Disabled'}`)
  const [Icon, setIcon] = useState(enabled ? EditFilled : EditOutlined)

  useEffect(() => {
    setTooltipMessage(`Live Autocomplete ${enabled ? 'Enabled' : 'Disabled'}`)
    setIcon(enabled ? EditFilled : EditOutlined)
  }, [enabled])

  return (
    <Button tooltip={tooltipMessage} onClick={toggleAutocomplete} icon={<Icon />}>
      Autocomplete
    </Button>
  )
}

export default memo(ToggleAutoCompleteButton)
