import { createWithEqualityFn as create } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

// type State = {
//   isLoading: boolean
//   isRunning: boolean
//   isSaving: boolean
//   isChecking: boolean
//   isChecked: boolean
//   hasUnsavedChanges: boolean
//   query: object
//   snippets: object[]
//   selectedText: string
//   showAutocomplete: boolean
// }

export const BLANK_STORE = {
  isRunning: false,
  isSaving: false,
  hasUnsavedChanges: false,
  resource: {},
  selectedText: '',
  showAutocomplete: null,
  config: {
    editor: {
      theme: 'sqlserver',
      mode: 'fp_sql',
      name: 'query-ace-Editor',
      allowCsvDownload: false,
      editorWordWrap: true,
      showPrintMargin: false,
      snippetsEnabled: true,
      liveAutoCompletionEnabled: false
    }
  }
}
export const useEditorStore = create((_set, _get) => ({
  ...BLANK_STORE,
  isLoadingSnippets: false,
  isSnippetsLoaded: true,
  snippets: []
}))

export const useResource = () => {
  return useEditorStore((s) => {
    return s.resource
  }, shallow)
}

export const useEditorConfig = () => {
  return useEditorStore((s) => {
    return s.config.editor
  }, shallow)
}

export const useSnippets = () => {
  return useEditorStore((s) => s.snippets)
}

export const useSelectedText = () => {
  return useEditorStore((s) => s.selectedText)
}

export const useAutoComplete = () => {
  return useEditorStore((s) => s.showAutocomplete)
}

export const useEditorStates = () => {
  return useEditorStore(
    (s) => ({
      isLoadingSnippets: s.isLoadingSnippets,
      isSnippetsLoaded: s.isSnippetsLoaded,
      isRunning: s.isRunning,
      isSaving: s.isSaving,
      hasUnsavedChanges: s.hasUnsavedChanges
    }),
    shallow
  )
}
