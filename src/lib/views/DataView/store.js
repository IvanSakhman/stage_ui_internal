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

  const useData = () => useDataStore(useShallow((state) => state[itemPluralName]))

  const useDataStates = () => useDataStore(useShallow(({ isLoading, isLoaded }) => ({ isLoading, isLoaded })))

  const usePagination = () => useDataStore(useShallow(({ pagination }) => pagination))

  const useFiltersSchema = () => useDataStore(useShallow(({ filtersSchema }) => filtersSchema))

  const useViewActions = () => useDataStore(useShallow(({ actions }) => actions))

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
