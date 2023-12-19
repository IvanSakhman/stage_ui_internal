import { conditionalRulesValidator, customArrayValidator } from './validators'

export default ({ type, ...schema }, conditionalRules) => {
  const { pattern, minLength, items } = schema

  return [
    { type },
    type === 'array' ? customArrayValidator(items, conditionalRules) : conditionalRulesValidator(conditionalRules),
    pattern ? { pattern } : null,
    type === 'string' && minLength ? { whitespace: true } : null
  ].filter((rule) => rule)
}
