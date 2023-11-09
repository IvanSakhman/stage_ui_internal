export const SNIPPETS = {
  heading: {
    text: '### '
  },
  bold: {
    text: '__${1:bold}__'
  },
  italic: {
    text: '_${1:italic}_'
  },
  quote: {
    text: '> ',
    requiresNewLine: true
  },
  code: {
    text: '`${1:code}`'
  },
  link: {
    text: '[${1:link}](${2:url})'
  },
  bulletList: {
    text: '- ',
    requiresNewLine: true,
    supportsContinuity: true
  },
  numberedList: {
    text: 'N. ',
    requiresNewLine: true,
    supportsContinuity: true,
    beforeInsert: (text, editor) => {
      const editorSelection = editor.getSelection()
      const editorModel = editor.getModel()

      const number = editorModel.getValueInRange({ ...editorSelection, startColumn: 1 }) || '0'
      const parsedNumber = parseInt(number)

      return isNaN(parsedNumber) ? text : text.replace('N.', `${parseInt(number) + 1}.`)
    }
  },
  checkList: {
    text: 'N. [ ] ',
    requiresNewLine: true,
    supportsContinuity: true,
    beforeInsert: (text, editor) => {
      const editorSelection = editor.getSelection()
      const editorModel = editor.getModel()

      const number = editorModel.getValueInRange({ ...editorSelection, startColumn: 1 }) || '0'
      const parsedNumber = parseInt(number)

      return isNaN(parsedNumber) ? text : text.replace('N.', `${parseInt(number) + 1}.`)
    }
  }
}

let _continuityContext = null

export const registerSnippets = (monaco) => {
  monaco.languages.registerCompletionItemProvider('markdown', {
    provideCompletionItems: () => {
      return {
        suggestions: Object.entries(SNIPPETS).map(([snippetName, snippet]) => {
          return {
            label: snippetName,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: snippet.text,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }
        })
      }
    }
  })
}

export const setupCommands = (editor) => {
  editor.addCommand(
    3, // Enter
    () => {
      const editorSelection = editor.getSelection()
      const editorModel = editor.getModel()

      const snippetName = _continuityContext.get()

      const preCursor = editorModel.getValueInRange({ ...editorSelection, startColumn: 1 }).replace(/\d+/, 'N')

      if (preCursor === SNIPPETS[snippetName].text) {
        _continuityContext.set(null)

        editor.trigger('', 'deleteAllLeft')
      } else {
        insertSnippet(_continuityContext.get(), editor)
      }
    },
    'continuedSnippet'
  )
}

export const insertSnippet = (snippetName, editor) => {
  const selectedText = getSelectedText(editor)
  const snippet = prepareSnippet(snippetName, selectedText, editor)

  editor.getContribution('snippetController2').insert(snippet)
  editor.focus()
}

// @private

const getSelectedText = (editor) => {
  const editorSelection = editor.getSelection()
  const editorModel = editor.getModel()

  return editorModel.getValueInRange(editorSelection)
}

const prepareSnippet = (snippetName, selectedText, editor) => {
  const snippet = SNIPPETS[snippetName]

  const isMultilineSelection = selectedText.split('\n').length > 1

  let { text, requiresNewLine, supportsContinuity } = snippet

  if (selectedText) {
    const handleSelectionFunction = isMultilineSelection ? handleMultiLineSelection : handleSingleLineSelection

    text = handleSelectionFunction({ text, name: snippetName }, selectedText)
  }

  if (supportsContinuity) {
    continuedSnippet(snippetName, editor)
  }

  if (snippet.beforeInsert) {
    text = snippet.beforeInsert(text, editor)
  }

  return handleNewLineSnippetRequirement({ text, requiresNewLine }, editor.getPosition())
}

const handleSingleLineSelection = ({ text, name }, selectedText) => {
  return text.includes(name) ? text.replace(name, selectedText) : text.concat(selectedText)
}

const handleMultiLineSelection = (snippet, selectedText) => {
  return selectedText
    .split('\n')
    .map((selectedLine, index) => {
      return handleSingleLineSelection(snippet, selectedLine).replace('N', index + 1)
    })
    .join('\n')
}

const handleNewLineSnippetRequirement = ({ requiresNewLine, text }, cursorPosition) => {
  const isFirstColumn = cursorPosition.column === 1
  return requiresNewLine && !isFirstColumn ? `\n${text}` : text
}

const continuedSnippet = (snippetName, editor) => {
  if (_continuityContext) {
    _continuityContext.set(snippetName)
  } else {
    _continuityContext = editor.createContextKey('continuedSnippet', snippetName)
  }
}

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { continuedSnippet }
}

export { testExports }
