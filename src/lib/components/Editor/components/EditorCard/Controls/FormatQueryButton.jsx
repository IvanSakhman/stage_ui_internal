import { memo, useEffect, useState } from 'react'
import { AlignLeftOutlined } from '@ant-design/icons'

import Button from '~su/components/Button'

import { useSelectedText } from '../../../store'

const FormatQueryButton = ({ editor, onFormat }) => {
  const shortcut = 'mod+shift+f'
  const selectedText = useSelectedText()
  const [label, setLabel] = useState(selectedText ? 'Format Selection' : 'Format Query')

  useEffect(() => {
    setLabel(selectedText ? 'Format Selection' : 'Format Query')
  }, [selectedText])

  useEffect(() => {
    if (editor) {
      editor.registerCommand({
        name: 'formatquery',
        description: 'Format Query or Selection',
        exec: onFormat,
        bindKey: shortcut,
        readOnly: true
      })
    }
  }, [editor])

  return (
    <Button tooltip={label} onClick={onFormat} shortcut={shortcut} icon={<AlignLeftOutlined />}>
      {label}
    </Button>
  )
}

export default memo(FormatQueryButton)
