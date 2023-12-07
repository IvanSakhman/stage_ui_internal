import { conditionalRulesValidator, customArrayValidator } from './validators'

export default ({ type, ...schema }, conditionalRules) => {
  const { pattern, items } = schema

  return [
    { type },
    type === 'array' ? customArrayValidator(items, conditionalRules) : conditionalRulesValidator(conditionalRules),
    pattern ? { pattern } : null
  ].filter((rule) => rule)
}
