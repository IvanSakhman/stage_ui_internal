import arrayUtilities from '~su/utilities/array'

const { transpose, zip, compact, groupItemsBy, insert } = arrayUtilities

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

  describe('groupItemsBy', () => {
    describe('when array items are not objects', () => {
      it('throws', () => {
        const a = ['integer', 'test', 'integer']

        expect(() => groupItemsBy(a, 'integer')).toThrow(`array.groupItemsBy: ${a} does not contain objects`)
      })
    })

    describe('when array items are objects', () => {
      it('groups them by specified key', () => {
        const a = [
          {
            to_group_by: 'one',
            other_prop: 'yes'
          },
          {
            to_group_by: 'two',
            other_prop: 'yes'
          },
          {
            to_group_by: 'one',
            other_prop: 'yes'
          }
        ]

        expect(groupItemsBy(a, 'to_group_by')).toEqual({
          one: [a[0], a[2]],
          two: [a[1]]
        })
      })
    })
  })

  describe('insert', () => {
    it('inserts a value at specified index and returns modified array', () => {
      const a = [1, 2, 3, 4]

      expect(insert(a, 5, 2)).toEqual([1, 2, 5, 3, 4])
    })

    describe('when insert position is negative', () => {
      it('does not insert', () => {
        const a = [1, 2, 3, 4]

        expect(insert(a, 5, -1)).toEqual(a)
      })
    })

    describe('when insert position outside of the array', () => {
      it('does not insert', () => {
        const a = [1, 2, 3, 4]

        expect(insert(a, 5, a.length + 1)).toEqual(a)
      })
    })
  })
})
