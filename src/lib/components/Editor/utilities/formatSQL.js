import { format } from 'sql-formatter'

const FORMAT_OPTIONS = {
  language: 'trino'
}

// formatSQL = (query: any, selectedText: string)
export const formatSQL = (queryText, selectedText) => {
  let formattedQueryText = ''

  if (selectedText) {
    const formattedSelectedQueryText = refineSQL(format(prepareSQL(selectedText), FORMAT_OPTIONS))

    formattedQueryText = queryText.replace(selectedText, formattedSelectedQueryText)
  } else {
    formattedQueryText = refineSQL(format(prepareSQL(queryText), FORMAT_OPTIONS))
  }

  return formattedQueryText
}

// sqlFormatter does not understand certain values we handle
// => e.g. dependent query macro with # {{Query#1}}, the # will be replaced with HASH which later is replaced back in refineSQL
const SQL_PREPARE_STATEMENTS = [
  { rule: 'HashReplacementHackForFormatter', match: /(\{{2}[a-zA-Z0-9]*)(#)([a-zA-Z0-9]*\}{2})/, replace: '$1HASH$3' }
]
export const prepareSQL = (sqlText) => {
  SQL_PREPARE_STATEMENTS.forEach((refinement) => {
    sqlText = sqlText.replace(refinement.match, refinement.replace)
  })

  return sqlText
}

// sqlFormatter provides some changes we might are not happy with:
// => e.g. the macros from {{macro}} to { { macro } }
//
// The following rules try to deal with that
const FORMAT_REFINEMENTS = [
  { rule: 'LeftMacroParens', match: /(=){1}(\{{2})/g, replace: '$1 $2' },
  { rule: 'MacroWithHash', match: /(\{{2}[a-zA-Z0-9]*)(HASH)([a-zA-Z0-9]*\}{2})/g, replace: ' $1#$3' },
  { rule: 'PrestoConcatOperator', match: /\|\s\|/g, replace: '||' },
  { rule: 'PrestoLambdaFunctionOperatofr', match: /\-\s\>/g, replace: '->' },
  { rule: 'PrestoArraySubscript', match: /\s\[(.*)\]/g, replace: '[$1]' },
  { rule: 'DigitsCommaSeparated', match: /\n(\s{1,2})+(\d+)/g, replace: ' $2' },
  { rule: 'SpaceBeforeEndOfComment', match: /(^\s\*\/)/gm, replace: '*/' }
]

// refineSQL = (sqlText: string)
export const refineSQL = (sqlText) => {
  FORMAT_REFINEMENTS.forEach((refinement) => {
    sqlText = sqlText.replace(refinement.match, refinement.replace)
  })

  return sqlText
}
