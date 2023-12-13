import { initializeApi } from '~su/actions'
import { api, string } from '~su/utilities'

import { getApiConfig } from '~su/store/root-store'

const extractFiltersSchema = (json_schema) => {
  if (!json_schema?.properties?.filters) {
    return null
  }

  const { filters, order } = json_schema.properties

  filters.properties.order = order

  return filters
}

const setupApiActions = (
  { setState, setData, itemName, itemPluralName, collectionApiPath, apiPlaceholders = {} },
  messageApi
) => {
  const apiActions = initializeApi(api, messageApi)(getApiConfig)

  const { loadCollection } = apiActions(itemName, {
    setState,
    setData
  })

  const loadData = (urlSearch = '') => {
    const apiConfig = getApiConfig()

    // flush the store
    setData({ [itemPluralName]: [], pagination: {}, filtersSchema: { type: 'object', properties: {}, required: [] } })

    // construct path
    const path = string.replacePlaceholders(`${apiConfig[collectionApiPath]}${urlSearch}`, apiPlaceholders)

    const onSuccess = ({ json_schema }) => {
      setState('filtersSchema', extractFiltersSchema(json_schema))
    }

    loadCollection({ path, onSuccess })
  }

  return {
    loadData
  }
}

export default setupApiActions
