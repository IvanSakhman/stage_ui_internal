import { capitalize, isNil, map } from 'lodash'
import ace from 'ace-builds'
import AceEditor from 'react-ace'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/mode-sql'
import 'ace-builds/src-min-noconflict/mode-xml'
import 'ace-builds/src-min-noconflict/theme-sqlserver'
import 'ace-builds/src-min-noconflict/theme-eclipse'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-prompt'
import 'ace-builds/src-min-noconflict/ext-settings_menu'

import string from '~su/utilities/string'

import './ace/modes/fp_sql'
import './ace/modes/fp_xml'

const langTools = ace.acequire('ace/ext/language_tools')
const snippetsModule = ace.acequire('ace/snippets')

// By default Ace will try to load snippet files for the different modes and fail.
// We don't need them, so we use these placeholders until we define our own.

// defineDummySnippets = (mode: string)
const defineDummySnippets = (mode) => {
  ace.define(`ace/snippets/${mode}`, ['require', 'exports', 'module'], (require, exports) => {
    exports.snippetText = ''
    exports.scope = mode
  })
}

;['sql', 'fp_sql', 'fp_xml', 'html-tag'].forEach((mode) => defineDummySnippets(mode))

// the bigger number means the higher order in autocomplete dropdown
const completionScores = {
  sqlKeyword: 200,
  table: 100,
  tableColumn: 100,
  column: 50,
  snippet: 3,
  macro: 2,
  dependentQuery: 1
}

// buildTableColumnKeywords = (tableColumns: any[], tableName: string)
const buildTableColumnKeywords = (tableColumns, tableName) => {
  const keywords = []

  tableColumns.forEach((column) => {
    const { name: column_name, type: data_type } = column
    keywords.push({
      name: `${tableName}.${column_name}`,
      value: `${tableName}.${column_name}`,
      score: completionScores.tableColumn,
      meta: capitalize(data_type)
    })
  })
  return keywords
}

// type Schema = [
//   {
//     id: number
//     columns: [
//       {
//         name: string
//         type: string
//         comment: string
//       }
//     ]
//     name: string
//   }
// ]

const buildKeywordsFromSchema = (schema) => {
  const tableKeywords = []
  const columnKeywords = {}
  const tableColumnKeywords = {}

  schema.forEach((table) => {
    const { name, columns } = table

    tableKeywords.push({
      name: name,
      value: name,
      score: completionScores.table,
      meta: 'Table'
    })
    tableColumnKeywords[name] = buildTableColumnKeywords(columns, name)
    columns.forEach((column) => {
      const { name: columnName, type } = column
      columnKeywords[columnName] = capitalize(type)
    })
  })

  return {
    table: tableKeywords,
    column: map(columnKeywords, (v, k) => ({
      name: k,
      value: k,
      score: completionScores.column,
      meta: v
    })),
    tableColumn: tableColumnKeywords
  }
}

const CODE_AND_DOC_SEPARATOR = 'docHTML:'
const DESCRIPTION_NEWLINE_HACK = '!NEWLINE!'
const createSnippets = (snippets) => {
  snippets = Array.isArray(snippets) ? snippets : [snippets]
  return snippets
    .map(({ name, code, meta }) => {
      let snippet = code
        .split('\n')
        .map((c) => '\t' + c)
        .join('\n')

      if (meta?.parameters && meta?.defaults) {
        meta.parameters.forEach((parameter, index) => {
          if (meta.defaults[index]) {
            snippet = snippet.replace(`\${${index + 1}:${parameter}}`, meta.defaults[index])
          }
        })
      }

      if (meta?.description) {
        snippet = [snippet, meta.description.replaceAll('\n', DESCRIPTION_NEWLINE_HACK)].join(CODE_AND_DOC_SEPARATOR)
      }

      return ['snippet ' + name, snippet].join('\n')
    })
    .join('\n')
}

const schemaCompleterKeywords = {}
// updateSchemaCompleter = (editorKey: string, Schema = null)
export const updateSchemaCompleter = (editorKey, schema = null) => {
  schemaCompleterKeywords[editorKey] = isNil(schema) ? null : buildKeywordsFromSchema(schema)
}

const addSnippetsToSnippetMap = (session, createdSnippets, scope) => {
  const snippetManager = snippetsModule.snippetManager,
    modeSnippets = snippetManager.files[session.$mode.$id] || {}

  modeSnippets.scope = scope
  modeSnippets.snippetText = createdSnippets

  modeSnippets.snippet = snippetManager.parseSnippetFile(modeSnippets.snippetText, modeSnippets.scope)

  snippetManager.register(modeSnippets.snippet, modeSnippets.scope)
}

// registerSnippets = (editorRef: any, snippets: object, mode: string)
export const registerSnippets = (editorRef, snippets, mode) => {
  const createdSnippets = createSnippets(snippets)
  const { session } = editorRef.editor

  addSnippetsToSnippetMap(session, createdSnippets, mode)

  const macros = snippets.filter((snippet) => snippet.meta?.types?.includes('macro'))
  if (macros.length > 0) {
    if (mode === 'fp_xml') {
      addSnippetsToSnippetMap(session, createdSnippets, 'html-tag')
    }

    session.setMode(`ace/mode/${mode}`, function () {
      session.$mode.$highlightRules.addMacroRule(macros, session)
    })
  }
}

const snippetCompleter = langTools.snippetCompleter
snippetCompleter.identifierRegexpsOrig = snippetCompleter.identifierRegexpsOrig || snippetCompleter.identifierRegexps
snippetCompleter.identifierRegexps = [snippetCompleter.identifierRegexpsOrig, /#/]
snippetCompleter.getCompletionsOrig = snippetCompleter.getCompletionsOrig || snippetCompleter.getCompletions
snippetCompleter.getCompletions = function (editor, session, pos, prefix, callback) {
  // uses function because otherwise it looses this
  return this.getCompletionsOrig(editor, session, pos, prefix, (err, completions) => {
    if (completions) {
      completions.forEach((c) => {
        switch (c.caption[0]) {
          case '#': {
            c.meta = 'dependent query'
            c.score = completionScores.dependentQuery
            break
          }
          case '{': {
            c.meta = 'macro'
            c.score = completionScores.macro
            break
          }
          default: {
            c.score = completionScores.snippet
          }
        }
      })
    }
    callback(err, completions)
  })
}
snippetCompleter.getDocTooltipOrig = snippetCompleter.getDocTooltipOrig || snippetCompleter.getDocTooltip
snippetCompleter.getDocTooltip = function (item) {
  if (item.type == 'snippet' && !item.docHTML) {
    const [snippet, docHTML] = item.snippet.split(CODE_AND_DOC_SEPARATOR)

    if (docHTML) {
      item.snippet = snippet

      item.docHTML = [
        '<b>',
        string.escapeHTML(item.caption),
        '</b>',
        '<hr></hr>',
        string.escapeHTML(item.snippet),
        '<hr/>',
        string.escapeHTML(docHTML).replaceAll(DESCRIPTION_NEWLINE_HACK, '\n')
      ].join('')
    }
  }

  return snippetCompleter.getDocTooltipOrig(item)
}

const customKeyWordCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    if (session.$mode.completer) {
      return session.$mode.completer.getCompletions(editor, session, pos, prefix, callback)
    }
    const state = editor.session.getState(pos.row)

    const completeUP = prefix === prefix.toUpperCase()
    const completeLOW = prefix === prefix.toLowerCase()

    let keywordCompletions = session.$mode.getCompletions(state, session, pos, prefix)
    keywordCompletions = keywordCompletions.map((obj) => {
      const copy = { ...obj }
      if (completeUP) {
        copy.value = obj.value.toUpperCase()
      }
      if (completeLOW) {
        copy.value = obj.value.toLowerCase()
      }
      copy.score = completionScores.sqlKeyword
      return copy
    })

    return callback(null, keywordCompletions)
  }
}
langTools.keyWordCompleter = customKeyWordCompleter

langTools.schemaCompleter = {
  identifierRegexps: [/[a-zA-Z_0-9.\-\u00A2-\uFFFF\{]/],
  // getCompletions: (Editor: any, session: any, pos: any, prefix: any, callback: any)
  getCompletions: (editor, session, pos, prefix, callback) => {
    const { table, column, tableColumn } = schemaCompleterKeywords[editor.id] || {
      table: [],
      column: [],
      tableColumn: []
    }

    if (prefix.length === 0 || table.length === 0) {
      callback(null, [])
      return
    }

    if (prefix[prefix.length - 1] === '.') {
      const tableName = prefix.substring(0, prefix.length - 1)
      callback(null, table.concat(tableColumn[tableName]))
      return
    }
    callback(null, table.concat(column))
  }
}

langTools.setCompleters([
  snippetCompleter,
  langTools.keyWordCompleter,
  langTools.textCompleter,
  langTools.schemaCompleter
])

export const registerCommand = (editor, command) => {
  command.bindKey = { win: command.bindKey.replace('mod', 'Ctrl'), mac: command.bindKey.replace('mod', 'Cmd') }

  editor.commands.addCommand(command)
  editor.commands.bindKey(command.bindKey, command.name)
}

export { AceEditor, langTools, snippetsModule }
