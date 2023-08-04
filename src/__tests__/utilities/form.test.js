import { getFormErrors } from '~su/utilities/form';

describe('Form Utilities', () => {
  describe('getFormErrors', () => {
    it('returns errors for simple errors object', () => {
      const errors = { simple: ['Error message'] }

      expect(getFormErrors(errors))
        .toEqual([{ name: ['simple'], errors: ['Error message'] }])
    })

    it('returns errors for errors object with nested properties', () => {
      const errors = { nested: { simple: ['Error message'] } }

      expect(getFormErrors(errors))
        .toEqual([{ name: ['nested', 'simple'], errors: ['Error message'] }])
    })
  })
});
