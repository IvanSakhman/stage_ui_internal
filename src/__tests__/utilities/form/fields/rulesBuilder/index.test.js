jest.mock('~su/utilities/form/fields/rulesBuilder/validators', () => {
  return {
    customArrayValidator: (_items, _conditionalRules) => 'customArrayValidator',
    conditionalRulesValidator: (_conditionalRules) => 'conditionalRulesValidator'
  }
})

import * as validators from '~su/utilities/form/fields/rulesBuilder/validators'

import buildRules from '~su/utilities/form/fields/rulesBuilder'

describe('Dynamic Fields rulesBuilder', () => {
  it('includes a type rule', () => {
    expect(buildRules({ type: 'string' })).toEqual(expect.arrayContaining([{ type: 'string' }]))
  })

  describe('when type is array', () => {
    it('includes customArrayValidator', () => {
      expect(buildRules({ type: 'array', items: {} })).toEqual(
        expect.arrayContaining([validators.customArrayValidator({}, null)])
      )
    })
  })

  describe('when type is not an array', () => {
    it('includes customArrayValidator', () => {
      expect(buildRules({ type: 'string' })).toEqual(expect.arrayContaining([validators.conditionalRulesValidator({})]))
    })
  })

  describe('when schema includes pattern', () => {
    it('returns pattern rule', () => {
      expect(buildRules({ type: 'string', pattern: '.*' })).toEqual(expect.arrayContaining([{ pattern: '.*' }]))
    })
  })
})
