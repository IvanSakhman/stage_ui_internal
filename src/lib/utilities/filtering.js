import dayjs from 'dayjs'

import object from './object'

const NORMALIZED_ORDERS = { ascend: 'asc', descend: 'desc' }
const NORMALIZED_SORTS = {
  // NOTE: Used by QueryPanel only - this script should be able to receive the normalisations.
  last_editor: 'sql_versions.author'
}

const getNormalized = ({ dict, key, invertDict = false }) => {
  return (invertDict ? object.invert(dict)[key] : dict[key]) || key
}

export const normalization = { getNormalized, NORMALIZED_ORDERS, NORMALIZED_SORTS }

// Apply
export const applyPagination = (urlParams, pagination) => {
  const currentPage = urlParams.get('page')
  if (currentPage != pagination.current) {
    urlParams.set('page', pagination.current)
  }

  return urlParams
}

export const applyFilters = (urlParams, filters) => {
  for (const filter in filters) {
    const filterName = `by_${filter}`

    let filterFilters = filters[filter]
    if (dayjs.isDayjs(filterFilters)) {
      filterFilters = filterFilters.format('YYYY-MM-DD')
    }

    filterFilters?.toString().length > 0 ? urlParams.set(filterName, filterFilters) : urlParams.delete(filterName)
  }

  return urlParams
}

export const applySorter = (urlParams, sorter) => {
  if (!sorter) {
    return urlParams
  }

  const [columnKey, order] = sorter.split(':')

  const normalizedColumnKey = () => getNormalized({ dict: NORMALIZED_SORTS, key: columnKey })
  const normalizedOrder = () => getNormalized({ dict: NORMALIZED_ORDERS, key: order })

  order ? urlParams.set('order', `${normalizedColumnKey()}:${normalizedOrder()}`) : urlParams.delete('order')

  return urlParams
}
// Apply
