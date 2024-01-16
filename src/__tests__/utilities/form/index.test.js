import formUtils from '~su/utilities/form'

const { getFormErrors, normalizeEmptyToUndef, valueFromValueEnum } = formUtils

describe('Form Utilities', () => {
  describe('getFormErrors', () => {
    it('returns errors for simple errors object', () => {
      const errors = { simple: ['Error message'] }

      expect(getFormErrors(errors)).toEqual([{ name: ['simple'], errors: ['Error message'] }])
    })

    it('returns errors for errors object with nested properties', () => {
      const errors = { nested: { simple: ['Error message'] } }

      expect(getFormErrors(errors)).toEqual([{ name: ['nested', 'simple'], errors: ['Error message'] }])
    })

    describe('when key includes numbers', () => {
      const errors = { nested: { 0: { simple: ['Error message'] } } }

      it('returns the numbers as ints', () => {
        expect(getFormErrors(errors)).toEqual([{ name: ['nested', 0, 'simple'], errors: ['Error message'] }])
      })
    })
  })

  describe('normalizeEmptyToUndef', () => {
    it('returns undefined when value is an empty string', () => {
      expect(normalizeEmptyToUndef('')).toEqual(undefined)
      expect(normalizeEmptyToUndef('not_empty')).toEqual('not_empty')
    })
  })

  describe('valueFromValueEnum', () => {
    const valueEnums = [['fatal', 11]]

    describe('when valueEnum was found', () => {
      it('returns it', () => {
        expect(valueFromValueEnum(valueEnums, 11)).toEqual('fatal')
      })
    })

    describe('when valueEnum was not found', () => {
      it('returns the value', () => {
        expect(valueFromValueEnum(valueEnums, 1)).toEqual(1)
      })
    })
  })
})
