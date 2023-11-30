import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
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
    return useDataStore((state) => state[itemPluralName])
  }

  const useDataStates = () => {
    return useDataStore((state) => {
      return {
        isLoading: state.isLoading,
        isLoaded: state.isLoaded
      }
    }, shallow)
  }

  const usePagination = () => {
    return useDataStore((state) => state.pagination)
  }

  const useFilters = () => {
    return useDataStore((state) => state.filters)
  }

  const useViewActions = () => {
    return useDataStore((state) => state.actions)
  }

  return {
    useDataStore,
    useData,
    useDataStates,
    usePagination,
    useFilters,
    useViewActions
  }
}

export default setupStore
