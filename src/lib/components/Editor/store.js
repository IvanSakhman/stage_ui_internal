import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

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

export const useResource = () =>
  useEditorStore(
    useShallow(({ resource }) => ({
      resource
    }))
  )
export const useEditorConfig = () => useEditorStore(useShallow(({ config: { editor } }) => editor))

export const useSnippets = () => useEditorStore(useShallow(({ snippets }) => snippets))

export const useSelectedText = () => useEditorStore(useShallow(({ selectedText }) => selectedText))

export const useAutoComplete = () => useEditorStore(useShallow(({ showAutocomplete }) => showAutocomplete))

export const useEditorStates = () =>
  useEditorStore(
    useShallow(({ isLoadingSnippets, isSnippetsLoaded, isRunning, isSaving, hasUnsavedChanges }) => ({
      isLoadingSnippets,
      isSnippetsLoaded,
      isRunning,
      isSaving,
      hasUnsavedChanges
    }))
  )
