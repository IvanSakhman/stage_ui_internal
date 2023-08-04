import localforage from 'localforage'
import localForageUtilities from '~su/utilities/localForage'

const { setItem, getItem, removeItem } = localForageUtilities

describe('localForage utilities', () => {
  beforeEach(() => localforage.clear())

  describe('setItem', () => {
    it('sets the item in local storage', () => {
      localforage.getItem('test:set').then((val) => expect(val).toBe(null))

      setItem('test:set', 'I was set!')

      localforage.getItem('test:set').then((val) => expect(val).toBe('I was set!'))
    })
  })

  describe('getItem', () => {
    it('gets the item from local storage', () => {
      getItem('test:set', (val) => expect(val).toBe(null))

      localforage.setItem('test:set', 'I was set for get!')

      getItem('test:set', (val) => expect(val).toBe('I was set for get!'))
    })
  })

  describe('removeItem', () => {
    it('removes the item from local storage', () => {
      setItem('test:set', 'I am doomed!')

      getItem('test:set', (val) => expect(val).toBe('I am doomed!'))

      removeItem('test:set')

      getItem('test:set', (val) => expect(val).toBe(null))
    })
  })
})
