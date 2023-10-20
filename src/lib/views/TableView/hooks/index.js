import { useRef } from 'react'

import setupActions from '../actions'
import setupStore from '../store'

const useTableViewSetup = ({
  itemName,
  itemPluralName,
  isPaginated = true,
  isFilterable = true,
  additionalFields = { actions: {} },
  collectionApiPath,
  apiPlaceholders,
  message
}) => {
  // Added to avoid the execution of the setupStore function on re-renders.
  // Previously we used the useMemo hook but useRef works better with eslint.
  const store = useRef(
    setupStore({
      itemName,
      itemPluralName,
      isPaginated,
      isFilterable,
      additionalFields
    })
  )

  const { useDataStore } = store.current

  const { loadData } = setupActions(
    {
      useDataStore,
      itemName,
      itemPluralName,
      collectionApiPath,
      apiPlaceholders
    },
    message
  )

  return { store: store.current, loadData }
}

export default useTableViewSetup
