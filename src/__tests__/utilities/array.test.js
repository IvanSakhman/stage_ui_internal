import arrayUtilities from '~su/utilities/array';

const { transpose, zip, compact } = arrayUtilities

describe('Array Utilities', () => {
  describe('transpose', () => {
    it('transposes the matrix', () => {
      const arr = [[1, 2, 3], [1, 2, 3]]
      expect(transpose(arr)).toEqual(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ]
      )
    })
  })

  describe('zip', () => {
    it('zips 2 arrays together', () => {
      const a = ['integer', 'string'],
        b = [1, 'foo']

      expect(zip(a, b)).toEqual([
        ['integer', 1],
        ['string', 'foo']
      ])
    })
  })

  describe('compact', () => {
    it('removes falsey values', () => {
      const a = ['integer', null, 'string', false]

      expect(compact(a)).toEqual(['integer', 'string'])
    })
  })
});
