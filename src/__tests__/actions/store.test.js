import { buildCollectionState, buildEditableCollectionState } from '~su/actions/store'

describe('Common store actions', () => {
  describe('buildCollectionState', () => {
    it('returns default collection state', () => {
      expect(buildCollectionState({ itemName: 'run' })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
      })
    })

    it('returns collection state with additionalFields', () => {
      expect(buildCollectionState({ itemName: 'run', additionalFields: { field: 'field' } })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        field: 'field',
      })
    })

    it('returns paginated collection state', () => {
      expect(buildCollectionState({ itemName: 'run', isPaginated: true })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        pagination: {
          current: null,
          total_items: null,
          per_page: null
        }
      })
    })

    it('returns filterable collection state', () => {
      expect(buildCollectionState({ itemName: 'run', isFilterable: true })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        filters: {}
      })
    })
  })

  describe('buildEditableCollectionState', () => {
    class Run {}

    it('returns default collection state', () => {
      expect(buildEditableCollectionState({ itemName: 'run', ItemClass: Run })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        isSaving: false,
        newRun: new Run(),
      })
    })

    it('returns collection state with additionalFields', () => {
      expect(buildEditableCollectionState({ itemName: 'run', ItemClass: Run, additionalFields: { field: 'field' } })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        field: 'field',
        isSaving: false,
        newRun: new Run(),
      })
    })

    it('returns paginated collection state', () => {
      expect(buildEditableCollectionState({ itemName: 'run', ItemClass: Run, isPaginated: true })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        pagination: {
          current: null,
          total_items: null,
          per_page: null
        },
        isSaving: false,
        newRun: new Run()
      })
    })

    it('returns filterable collection state', () => {
      expect(buildEditableCollectionState({ itemName: 'run', ItemClass: Run, isFilterable: true })).toEqual({
        runs: [],
        isLoaded: false,
        isLoading: false,
        filters: {},
        newRun: new Run(),
        isSaving: false
      })
    })
  })
});
