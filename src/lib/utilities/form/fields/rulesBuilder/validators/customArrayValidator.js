import conditionalRulesValidator from './conditionalRulesValidator'

export default (items, conditionalRules) => (formInstance) => ({
  validator(rule, value) {
    if (!value) {
      value = []
    }

    if (!Array.isArray(value)) {
      return Promise.resolve()
    }

    if (items?.pattern) {
      const itemPattern = new RegExp(items.pattern)

      for (const item of value) {
        let valid = itemPattern.test(item)
        if (!valid) {
          return Promise.reject(`'${item}' does not match ${itemPattern}`) // TODO: use translation
        }
      }
    }

    return conditionalRulesValidator(conditionalRules)(formInstance).validator(rule, value)
  }
})
