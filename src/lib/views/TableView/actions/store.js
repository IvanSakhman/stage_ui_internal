import { storeActions } from '~su/actions'

const setupStoreActions = ({ useDataStore, itemName }, messageApi) => {
  const { setField, setCollection } = storeActions(useDataStore, itemName, null, messageApi)

  return {
    setState: setField,
    setData: setCollection
  }
}

export default setupStoreActions
