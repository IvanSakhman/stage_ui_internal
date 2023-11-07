import objectUtilities from '~su/utilities/object';

const { invert, compact, isEmpty, isObject, findNested, flattenObject, pick, omit } = objectUtilities

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

  describe('isObject', () => {
    describe('when value is null or undefined', () => {
      it('returns false', () => {
        expect(isObject(null)).toEqual(false)
        expect(isObject(undefined)).toEqual(false)
      })
    })

    describe('when value is function', () => {
      it('returns false', () => {
        expect(isObject(() => null)).toEqual(false)
      })
    })

    describe('when value is string or number', () => {
      it('returns false', () => {
        expect(isObject('test')).toEqual(false)
        expect(isObject(1)).toEqual(false)
      })
    })

    describe('when value is an array', () => {
      it('returns false', () => {
        expect(isObject([])).toEqual(false)
        expect(isObject([1, 2, 3])).toEqual(false)
      })
    })

    describe('when value is object', () => {
      it('returns true', () => {
        expect(isObject({})).toEqual(true)
        expect(isObject({ a: 1, b: 2, c: 'test' })).toEqual(true)
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

  describe('pick', () => {
    const object = { a: 1, b: 2, c: 3 }

    it('returns object keys that are included in the list', () => {
      expect(pick(object, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    describe('when list contains a key that is missing in object', () => {
      it('ignores it', () => {
        expect(pick(object, ['b', 'd'])).toEqual({ b: 2 })
      })
    })
  })

  describe('omit', () => {
    const object = { a: 1, b: 2, c: 3 }

    it('returns object keys that are not included in the list', () => {

      expect(omit(object, ['a', 'c'])).toEqual({ b: 2 })
    })

    describe('when list contains a key that is missing in object', () => {
      it('ignores it', () => {
        expect(omit(object, ['b', 'd'])).toEqual({ a: 1, c: 3 })
      })
    })
  })
})
