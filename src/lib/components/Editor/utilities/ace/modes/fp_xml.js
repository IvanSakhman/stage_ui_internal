import ace from 'ace-builds'

export const generateMacrosRegex = (macros) => {
  const macroCodes = macros.map((macro) => {
    let code = macro.code

    macro.meta.parameters
      .map((parameter, index) => `\${${index + 1}:${parameter}}`)
      .forEach((toBeReplaced) => {
        const regex = toBeReplaced.includes('number') ? '\\d+' : '\\w+'
        code = code.replace(toBeReplaced, regex)
      })

    return code
  })

  return new RegExp(macroCodes.join('|'))
}

// This only defines high-level behaviour of the Mode like folding etc.
ace.define(
  'ace/mode/fp_xml',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/xml', 'ace/mode/fp_xml_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const XmlMode = acequire('ace/mode/xml').Mode
    const FpXmlHighlightRules = acequire('ace/mode/fp_xml_highlight_rules').FpXmlHighlightRules

    const Mode = function () {
      this.HighlightRules = FpXmlHighlightRules
    }

    oop.inherits(Mode, XmlMode) // ACE's way of doing inheritance

    exports.Mode = Mode
  }
)

// This is where we really create the highlighting rules
ace.define(
  'ace/mode/fp_xml_highlight_rules',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/xml_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const XmlHighlightRules = acequire('ace/mode/xml_highlight_rules').XmlHighlightRules

    const FpXmlHighlightRules = function FpXmlHighlightRules() {
      this.$rules = new XmlHighlightRules().getRules() // Use XML's rules as a base

      this.addMacroRule = (macros, session) => {
        this.addRules({
          start: [
            {
              token: 'string.macro',
              regex: generateMacrosRegex(macros)
            },
            ...this.$rules.start
          ]
        })

        session.$mode.$tokenizer = null
        session.bgTokenizer.setTokenizer(session.$mode.getTokenizer())
        session.bgTokenizer.start(0)
      }
    }

    oop.inherits(FpXmlHighlightRules, XmlHighlightRules)

    exports.FpXmlHighlightRules = FpXmlHighlightRules
  }
)
