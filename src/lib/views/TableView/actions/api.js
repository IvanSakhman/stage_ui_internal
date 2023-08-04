import { initializeApi } from '~su/actions'
import { api, string } from '~su/utilities'

import { buildFilters } from '../utilities/buildFilters'

import { getApiConfig } from '~su/store/root-store'

const setupApiActions = ({ setState, setData, itemName, itemPluralName, collectionApiPath, apiPlaceholders = {} }) => {
  const apiActions = initializeApi(api)(getApiConfig)

  const { loadCollection } = apiActions(itemName, {
    setState,
    setData
  })

  const loadData = (urlSearch = '') => {
    const apiConfig = getApiConfig()

    // flush the store
    setData({ [itemPluralName]: [], pagination: {}, filters: {} })

    // construct path
    const path = string.replacePlaceholders(`${apiConfig[collectionApiPath]}${urlSearch}`, apiPlaceholders)

    const onSuccess = ({ json_schema }) => {
      setState('filters', buildFilters(json_schema))
    }

    loadCollection({ path, onSuccess })
  }

  return {
    loadData
  }
}

export default setupApiActions
