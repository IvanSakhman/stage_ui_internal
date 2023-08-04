import objectUtilities from '~su/utilities/object';

const { invert, compact, isEmpty, findNested, flattenObject } = objectUtilities

describe('Object Utilities', () => {
  describe('invert', () => {
    it('inverts keys and values', () => {
      const obj = { a: 'abab', b: 'baba' }
      expect(invert(obj)).toEqual({ abab: 'a', baba: 'b' })
    })
  })

  describe('flattenObject', () => {
    it('flattens object properties', () => {
      const mockObject = {
        name: [
          "is required"
        ],
        code_parameters: {
          table_name: [
            "is missing"
          ]
        }
      }

      expect(flattenObject(mockObject)).toEqual({
        name: ["is required"],
        table_name: ["is missing"]
      })
    })

    it('flattens properly object with string value', () => {
      const mockObject = {
        name: "is required"
      }

      expect(flattenObject(mockObject)).toEqual({
        name: "is required"
      })
    })
  })

  describe('compact', () => {

    it('removes falsey values from object', () => {
      const obj = { a: 'abab', b: null, c: 0, d: false, e: true, f: undefined, g: 10 }

      expect(compact(obj)).toEqual({ a: 'abab', e: true, g: 10 })
    })

    it('does not mutate the original', () => {
      const obj = { a: 'abab', b: null, c: 0, d: false, e: true, f: undefined, g: 10 }

      compact(obj)

      expect(obj).toEqual({ a: 'abab', b: null, c: 0, d: false, e: true, f: undefined, g: 10 })
    })
  })

  describe('isEmpty', () => {
    describe('when value is null', () => {
      it('returns true', () => {
        expect(isEmpty(null)).toEqual(true)
      })
    })

    describe('when value is empty object', () => {
      it('returns true', () => {
        expect(isEmpty({})).toEqual(true)
      })
    })

    describe('when value is object with keys', () => {
      it('returns true', () => {
        expect(isEmpty({ a: 1, b: 2, c: 'test' })).toEqual(false)
      })
    })
  })

  describe('findNested', () => {
    const obj = {
      a: { b: { c: 'foo' } },
      b: 'bar'
    }

    it('can find nested key when path is an array', () => {
      expect(findNested(obj, ['a', 'b', 'c'])).toEqual('foo')
    })

    it('can find nested key when path is a dot separated string', () => {
      expect(findNested(obj, 'a.b.c')).toEqual('foo')
    })
  })
});
