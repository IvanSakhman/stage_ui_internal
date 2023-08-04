import ace from 'ace-builds'

export const generateMacrosRegex = (macros) => {
  const macroCodes = macros.map((macro) => {
    let code = macro.code

    macro.meta.parameters
      .map((parameter, index) => `\${${index + 1}:${parameter}}`)
      .forEach((toBeReplaced) => {
        code = code.replace(toBeReplaced, '\\d+')
      })

    return code
  })

  return new RegExp(macroCodes.join('|'))
}

// This only defines high-level behaviour of the Mode like folding etc.
ace.define(
  'ace/mode/fp_sql',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/sql', 'ace/mode/fp_sql_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const SqlMode = acequire('ace/mode/sql').Mode
    const FpSqlHighlightRules = acequire('ace/mode/fp_sql_highlight_rules').FpSqlHighlightRules

    const Mode = function () {
      this.HighlightRules = FpSqlHighlightRules
    }

    oop.inherits(Mode, SqlMode) // ACE's way of doing inheritance

    exports.Mode = Mode // eslint-disable-line no-param-reassign
  }
)

// This is where we really create the highlighting rules
ace.define(
  'ace/mode/fp_sql_highlight_rules',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/sql_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const SqlHighlightRules = acequire('ace/mode/sql_highlight_rules').SqlHighlightRules

    const FpSqlHighlightRules = function FpSqlHighlightRules() {
      this.$keywordList = new SqlHighlightRules().$keywordList
      this.$rules = new SqlHighlightRules().getRules() // Use SQl's rules as a base

      this.addMacroRule = (macros, session) => {
        this.addRules({
          start: [
            ...this.$rules.start,
            {
              token: 'string.macro',
              regex: generateMacrosRegex(macros)
            }
          ]
        })

        session.$mode.$tokenizer = null
        session.bgTokenizer.setTokenizer(session.$mode.getTokenizer())
        session.bgTokenizer.start(0)
      }
    }

    oop.inherits(FpSqlHighlightRules, SqlHighlightRules)

    exports.FpSqlHighlightRules = FpSqlHighlightRules
  }
)
