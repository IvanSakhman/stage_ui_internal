import { renderHook } from '@testing-library/react-hooks'
import useDataViewSetup from '~su/views/DataView/hooks'
import { message } from '~mocks/appHooks'

describe('useDataViewSetup hook', () => {
  const itemName = 'item'
  const itemPluralName = 'items'
  const isPaginated = true
  const isFilterable = true
  const additionalFields = { foo: 'bar', actions: { bar: 'foo' } }
  const collectionApiPath = 'test_path'

  const props = { itemName, itemPluralName, isPaginated, isFilterable, additionalFields, collectionApiPath, message }

  const { result } = renderHook(() => useDataViewSetup(props))
  const { store, loadData } = result.current

  describe('setupStore', () => {
    it('creates a store', () => {
      expect(store.useDataStore.getState()).toEqual({
        items: [],
        isLoading: false,
        isLoaded: false,
        foo: 'bar',
        actions: { bar: 'foo' },
        filters: {},
        pagination: {
          current: null,
          per_page: null,
          total_items: null
        }
      })
    })

    it('returns an object', () => {
      expect(typeof store).toEqual('object')
    })

    it('store has all functions', () => {
      expect(store).toEqual({
        useData: expect.any(Function),
        useDataStates: expect.any(Function),
        useDataStore: expect.any(Function),
        useFilters: expect.any(Function),
        usePagination: expect.any(Function),
        useViewActions: expect.any(Function),
      })
    })
  })

  describe('setupActions', () => {
    it('returns an loadData function', () => {
      expect(typeof loadData).toEqual('function')
    })

    it('setupActions without errors', () => {
      expect(message.error).not.toBeCalled()
    })
  })
})
