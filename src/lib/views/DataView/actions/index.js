import setupStoreActions from './store'
import setupApiActions from './api'

const setupActions = ({ useDataStore, itemName, itemPluralName, collectionApiPath, apiPlaceholders }, messageApi) => {
  const { setState, setData } = setupStoreActions({ useDataStore, itemName }, messageApi)
  const { loadData } = setupApiActions(
    {
      setState,
      setData,
      itemName,
      itemPluralName,
      collectionApiPath,
      apiPlaceholders
    },
    messageApi
  )

  return {
    loadData
  }
}

export default setupActions
