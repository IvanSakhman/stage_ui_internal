import string from '~su/utilities/string'

const { capitalize, pluralize } = string

export default (store, itemName = '', normalizeForUI = null, messageApi) => {
  const collectionName = pluralize(itemName)

  const setItem = (itemValues, newRecord, showMessage = true) => {
    const { [collectionName]: storedCollection } = store.getState()
    let messageCopy

    if (newRecord) {
      setCollection([itemValues])
      messageCopy = `${capitalize(itemName)} added`
    } else {
      const updatedCollection = storedCollection.map((item) => {
        if (item.id === itemValues.id) {
          const updatedRecord = { ...item, ...itemValues }

          return normalizeForUI ? normalizeForUI(updatedRecord) : updatedRecord
        }
        return item
      })

      store.setState({ [collectionName]: updatedCollection })
      messageCopy = `${capitalize(itemName)} updated`
    }
    showMessage && messageApi && messageApi.success(messageCopy)
  }

  // removeItem = (item: object, callback?: Function)
  const removeItem = (item, callback = null) => {
    let { [collectionName]: storedCollection } = store.getState()
    const { count } = store.getState()

    storedCollection = storedCollection.filter(({ id }) => id !== item.id)

    store.setState({ [collectionName]: storedCollection, count: count - 1 })
    if (callback) {
      callback()
    }
  }

  // setCollection = (itemsList: object[])
  const setCollection = (itemsList, isReset) => {
    const { [collectionName]: storedCollection, ...collectionState } = store.getState()
    let extras = {}

    if (Object.keys(itemsList).includes(collectionName)) {
      let { [collectionName]: items, ...rest } = itemsList

      itemsList = items
      extras = rest
    }

    if (normalizeForUI) {
      itemsList = itemsList.map((item) => normalizeForUI(item))
    }

    const collectionToStore = isReset ? itemsList : [...storedCollection, ...itemsList]

    store.setState({
      ...collectionState,
      [collectionName]: collectionToStore,
      ...extras
    })
  }

  // setField = (field: any, value: any)
  const setField = (field, value) => {
    const collectionState = store.getState()

    store.setState({
      ...collectionState,
      [field]: value
    })
  }

  return { setItem, removeItem, setCollection, setField }
}

export const buildCollectionState = ({ itemName, additionalFields, isPaginated, isFilterable }) => ({
  [pluralize(itemName)]: [],
  isLoaded: false,
  isLoading: false,
  ...additionalFields,
  ...(isPaginated ? defaultPagination : {}),
  ...(isFilterable ? defaultFilters : {})
})

export const buildEditableCollectionState = ({ itemName, ItemClass, ...rest }) => ({
  ...buildCollectionState({ itemName, ...rest }),
  [`new${capitalize(itemName)}`]: new ItemClass(),
  isSaving: false
})

// @private
const defaultPagination = {
  pagination: {
    current: null,
    total_items: null,
    per_page: null
  }
}
const defaultFilters = {
  filtersSchema: { type: 'object', properties: {}, required: [] }
}
