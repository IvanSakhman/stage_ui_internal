import { storeActions } from '~su/actions'

const setupStoreActions = ({ useDataStore, itemName }) => {
  const { setField, setCollection } = storeActions(useDataStore, itemName)

  return {
    setState: setField,
    setData: setCollection
  }
}

export default setupStoreActions
