import { conditionalRulesValidator, customArrayValidator } from './validators'

export default ({ type, ...schema }, conditionalRules) => {
  const { pattern, minLength, items } = schema

  const withCorrectedStringAnchors = (value) => {
    // \A and \z anchors are not supported in JS.
    return value.replace('\\A', '^').replace('\\z', '$')
  }

  return [
    { type },
    type === 'array' ? customArrayValidator(items, conditionalRules) : conditionalRulesValidator(conditionalRules),
    pattern ? { pattern: withCorrectedStringAnchors(pattern) } : null,
    type === 'string' && minLength ? { whitespace: true } : null
  ].filter((rule) => rule)
}
