import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Editor, { useMonaco } from '@monaco-editor/react'

import PanedCard from '~su/components/PanedCard'

import Toolbar from './Toolbar'
import Preview from './Preview'

import { setupCommands, registerSnippets } from './utilities'

const MarkdownEditor = ({ value, onChange, dimensions }) => {
  const [editor, setEditor] = useState(null)

  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      registerSnippets(monaco)
      setEditor(monaco.editor.getEditors()[0])
    }
  }, [monaco])

  useEffect(() => {
    if (editor) {
      setupCommands(editor)
    }
  }, [editor])

  const panes = {
    editor: () => (
      <Editor
        height={dimensions.height}
        defaultLanguage="markdown"
        onChange={onChange}
        value={value}
        options={{
          minimap: { enabled: false },
          overviewRulerLanes: 0,
          wordWrap: 'on',
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          }
        }}
      />
    ),
    preview: () => <Preview value={value} dimensions={dimensions} />
  }

  return (
    <PanedCard
      initialVisiblePanes={['editor']}
      panes={panes}
      renderTitle={(visiblePanes) => <Toolbar editor={editor} disabled={!visiblePanes.includes('editor')} />}
    />
  )
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  dimensions: PropTypes.shape({
    height: PropTypes.string.isRequired
  }).isRequired
}

MarkdownEditor.Preview = Preview

export default MarkdownEditor
