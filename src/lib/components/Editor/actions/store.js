import { storeActions } from '~su/actions'
import { useEditorStore, BLANK_STORE } from '../store'

export const resetChangedState = () => {
  useEditorStore.setState({
    hasUnsavedChanges: false,
    isChecked: false,
    isCheckSuccessfull: false
  })
}

export const setChangedState = () => {
  useEditorStore.setState({
    hasUnsavedChanges: true,
    isChecked: false,
    isCheckSuccessfull: false
  })
}

export const setResource = (resource) => {
  useEditorStore.setState({ resource })
}

export const setSnippets = (snippets) => {
  useEditorStore.setState({ snippets, isSnippetsLoaded: true })
}

export const handleQuerySelectionChange = (selectedText) => {
  useEditorStore.setState({ selectedText })
}

export const toggleAutocomplete = () => {
  const { showAutocomplete } = useEditorStore.getState()
  useEditorStore.setState({ showAutocomplete: !showAutocomplete })
}

export const resetStore = () => {
  useEditorStore.setState(BLANK_STORE)
}

export const { setField: setEditorState } = storeActions(useEditorStore, 'editor')
