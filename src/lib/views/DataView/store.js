import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import { buildCollectionState } from '~su/actions'

const setupStore = ({ itemName, itemPluralName, isPaginated, isFilterable, additionalFields }) => {
  const useDataStore = create((_set, _get) =>
    buildCollectionState({
      itemName,
      isPaginated,
      isFilterable,
      additionalFields
    })
  )

  const useData = () => {
    return useDataStore(useShallow((state) => state[itemPluralName]))
  }

  const useDataStates = () => useDataStore(useShallow(({ isLoading, isLoaded }) => ({ isLoading, isLoaded })))

  const usePagination = () => {
    return useDataStore(useShallow((state) => state.pagination))
  }

  const useFiltersSchema = () => {
    return useDataStore(useShallow((state) => state.filtersSchema))
  }

  const useViewActions = () => {
    return useDataStore(useShallow((state) => state.actions))
  }

  return {
    useDataStore,
    useData,
    useDataStates,
    usePagination,
    useFiltersSchema,
    useViewActions
  }
}

export default setupStore
