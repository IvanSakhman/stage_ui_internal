import setupStore from '~su/views/DataView/store'
import { renderHook } from '@testing-library/react-hooks'

describe('DataView store', () => {
  it('returns a function', () => {
    expect(typeof setupStore).toEqual('function')
  })

  describe('setupStore', () => {
    const itemName = 'item'
    const itemPluralName = 'items'
    const isPaginated = true
    const isFilterable = true
    const additionalFields = { foo: 'bar', actions: { bar: 'foo' } }

    const props = {itemName, itemPluralName, isPaginated, isFilterable, additionalFields}
    const store = setupStore(props)

    it('creates a store', () => {
      expect(setupStore(props).useDataStore.getState()).toEqual({
        items: [],
        isLoading: false,
        isLoaded: false,
        foo: 'bar',
        actions: { bar: 'foo' },
        filtersSchema: { type: 'object', properties: {}, required: [] },
        pagination: {
          current: null,
          per_page: null,
          total_items: null
        }
      })
    })

    it('returns an object', () => {
      expect(typeof setupStore(props)).toEqual('object')
    })

    describe('returned object', () => {
      const store = setupStore(props)

      it('has a useDataStore function', () => {
        expect(typeof store.useDataStore).toEqual('function')
      })

      it('has a useData function', () => {
        expect(typeof store.useData).toEqual('function')
      })

      it('has a useDataStates function', () => {
        expect(typeof store.useDataStates).toEqual('function')
      })

      it('has a usePagination function', () => {
        expect(typeof store.usePagination).toEqual('function')
      })

      it('has a useFiltersSchema function', () => {
        expect(typeof store.useFiltersSchema).toEqual('function')
      })

      it('has a useViewActions function', () => {
        expect(typeof store.useViewActions).toEqual('function')
      })
    })

    describe('useData', () => {
      beforeEach(() => {
        store.useDataStore.setState({items: [{id: 1, name: 'foo'}]})
      })

      it('returns items', () => {
        const { result } = renderHook(() => store.useData())
        expect(result.current).toEqual([{id: 1, name: 'foo'}])
      })
    })

    describe('useDataStates', () => {
      beforeEach(() => {
        store.useDataStore.setState({isLoading: true, isLoaded: true})
      })

      it('returns states', () => {
        const { result } = renderHook(() => store.useDataStates())
        expect(result.current).toEqual({isLoading: true, isLoaded: true})
      })
    })

    describe('usePagination', () => {
      beforeEach(() => {
        store.useDataStore.setState({pagination: {current: 1, per_page: 10, total_items: 100}})
      })

      it('returns pagination', () => {
        const { result } = renderHook(() => store.usePagination())
        expect(result.current).toEqual({current: 1, per_page: 10, total_items: 100})
      })
    })

    describe('useFiltersSchema', () => {
      beforeEach(() => {
        store.useDataStore.setState({ filtersSchema: { type: 'object', properties: { by_string_filter_with_enum: { type: "string", minLength: 1, enum: ['value_one_string'] } }, required: [] } })
      })

      it('returns filters', () => {
        const { result } = renderHook(() => store.useFiltersSchema())
        expect(result.current).toEqual({ type: 'object', properties: { by_string_filter_with_enum: { type: "string", minLength: 1, enum: ['value_one_string'] } }, required: [] })
      })
    })

    describe('useViewActions', () => {
      it('returns actions', () => {
        const { result } = renderHook(() => store.useViewActions())
        expect(result.current).toEqual({bar: 'foo'})
      })
    })
  })
})
