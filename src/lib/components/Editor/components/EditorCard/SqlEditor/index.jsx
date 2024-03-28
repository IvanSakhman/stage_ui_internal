import { forwardRef, useEffect, useMemo, useState, useCallback, useImperativeHandle } from 'react'

import { registerCommand, registerSnippets } from '../../../utilities/ace'

import { useEditorStore, useAutoComplete, useEditorConfig } from '../../../store'

import { StyledAce } from './index.styled'

const editorProps = { $blockScrolling: Infinity }

const SqlEditor = forwardRef(({ onChange, value, dimensions, onSelectionChange, availableSnippets }, ref) => {
  const [editorRef, setEditorRef] = useState(null)

  const userEnabledAutoComplete = useAutoComplete()
  const { theme, mode, name, editorWordWrap, showPrintMargin, snippetsEnabled, liveAutoCompletionEnabled } =
    useEditorConfig()

  useEffect(() => {
    if (userEnabledAutoComplete === null) {
      useEditorStore.setState({ showAutocomplete: liveAutoCompletionEnabled })
    }
  }, [userEnabledAutoComplete])

  const editorOptions = useMemo(
    () => ({
      theme: `ace/theme/${theme}`,
      behavioursEnabled: true,
      enableSnippets: snippetsEnabled,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: userEnabledAutoComplete,
      autoScrollEditorIntoView: true
    }),
    [userEnabledAutoComplete, theme]
  )

  useEffect(() => {
    if (availableSnippets && editorRef) {
      registerSnippets(editorRef, availableSnippets, mode)
    }
  }, [availableSnippets, editorRef])

  const handleSelectionChange = useCallback(
    (selection) => {
      const rawSelectedQueryText = editorRef.editor.session.doc.getTextRange(selection.getRange())
      const selectedQueryText = rawSelectedQueryText.length > 1 ? rawSelectedQueryText : null
      onSelectionChange(selectedQueryText)
    },
    [editorRef, onSelectionChange]
  )

  const initEditor = useCallback((editor) => {
    // Disabled commands that require loading more of the lib. Not necessary atm.
    editor.commands.removeCommand('showSettingsMenu')
    editor.commands.removeCommand('modeSelect')

    // Release Cmd/Ctrl+Shift+F for format query action
    editor.commands.bindKey({ win: 'Ctrl+Shift+F', mac: 'Cmd+Shift+F' }, null)

    // Reset Completer in case dot (for table.column) or space (for all) is pressed
    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'insertstring' && editor.completer) {
        if (e.args === '.' || e.args === ' ') {
          editor.completer.showPopup(editor)
        }
      }
    })

    editor.focus()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      // paste: (text: string)
      paste: (text) => {
        if (editorRef) {
          const { editor } = editorRef
          editor.session.doc.replace(editor.selection.getRange(), text)
          const range = editor.selection.getRange()
          onChange(editor.session.getValue())
          editor.selection.setRange(range)
          editor.focus()
        }
      },
      focus: () => {
        if (editorRef) {
          editorRef.editor.focus()
        }
      },
      openShortcuts: () => {
        if (editorRef) {
          return editorRef.editor.prompt({ $type: 'commands' })
        }
      },
      registerCommand: (command) => {
        if (editorRef) {
          registerCommand(editorRef.editor, command)
        }
      }
    }),
    [editorRef, onChange]
  )

  const { height } = dimensions

  return (
    <StyledAce
      ref={setEditorRef}
      mode={mode}
      name={name}
      value={value}
      editorProps={editorProps}
      width={'100%'}
      height={height + 'px'}
      showGutter={true}
      wrapEnabled={editorWordWrap}
      setOptions={editorOptions}
      showPrintMargin={showPrintMargin}
      onLoad={initEditor}
      onChange={onChange}
      onSelectionChange={handleSelectionChange}
    />
  )
})

export default SqlEditor
