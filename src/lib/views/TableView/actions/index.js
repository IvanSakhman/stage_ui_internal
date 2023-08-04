import setupStoreActions from './store'
import setupApiActions from './api'

const setupActions = ({ useDataStore, itemName, itemPluralName, collectionApiPath, apiPlaceholders }) => {
  const { setState, setData } = setupStoreActions({ useDataStore, itemName })
  const { loadData } = setupApiActions({
    setState,
    setData,
    itemName,
    itemPluralName,
    collectionApiPath,
    apiPlaceholders
  })

  return {
    loadData
  }
}

export default setupActions
