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

  describe('when type is string', () => {
    describe('when schema includes minLength', () => {
      it('adds whitespace: true rule', () => {
        expect(buildRules({ type: 'string', minLength: 1 })).toEqual(expect.arrayContaining([{ whitespace: true }]))
      })
    })

    describe('when schema does not include minLength', () => {
      it('does not add whitespace: true rule', () => {
        expect(buildRules({ type: 'string' })).toEqual([{ type: 'string' }, validators.conditionalRulesValidator({})])
      })
    })
  })

  describe('when type is not string', () => {
    describe('when schema includes minLength', () => {
      it('does not add whitespace: true rule', () => {
        expect(buildRules({ type: 'integer', minLength: 1 })).toEqual([{ type: 'integer' }, validators.conditionalRulesValidator({})])
      })
    })
  })
})
