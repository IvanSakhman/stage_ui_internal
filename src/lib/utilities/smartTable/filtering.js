import dayjs from 'dayjs'

import object from '../object'
import date from '../date'
import i18n from '../i18n'

const NORMALIZED_ORDERS = { ascend: 'asc', descend: 'desc' }
const NORMALIZED_SORTS = {
  // NOTE: Used by QueryPanel only - this script should be able to receive the normalisations.
  last_editor: 'sql_versions.author'
}

const getNormalized = ({ dict, key, invertDict = false }) => {
  return (invertDict ? object.invert(dict)[key] : dict[key]) || key
}

// Display
export const setUpFilters = (columnKey, urlParams, filters) => {
  const filterKey = `by_${columnKey}`

  const buildFilterOptionLabel = i18n.t

  const filtersOptions =
    filters[filterKey]?.map((value) => {
      return Array.isArray(value)
        ? { text: buildFilterOptionLabel(value[0]), value: value[1].toString() }
        : { text: buildFilterOptionLabel(value), value: value.toString() }
    }) || []

  let filteredValue = [urlParams.get(filterKey)].filter((val) => val !== null) || null

  if (filteredValue[0]?.split('-').length == 3 && date.isValidDateWithFormat(filteredValue[0], 'YYYY-MM-DD')) {
    filteredValue[0] = dayjs(filteredValue[0], 'YYYY-MM-DD')
  }

  return {
    filters: filtersOptions,
    filteredValue
  }
}

export const readAppliedSorter = (columnKey, urlParams) => {
  const orderParam = urlParams.get('order')

  if (!orderParam) {
    return false
  }

  const [key, order] = orderParam.split(':')

  return (
    getNormalized({ dict: NORMALIZED_SORTS, key, invertDict: true }) === columnKey &&
    getNormalized({ dict: NORMALIZED_ORDERS, key: order, invertDict: true })
  )
}
// Display

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
  if (Object.keys(sorter).length > 0) {
    sorter.order
      ? urlParams.set(
          'order',
          `${getNormalized({
            dict: NORMALIZED_SORTS,
            key: sorter.columnKey
          })}:${getNormalized({
            dict: NORMALIZED_ORDERS,
            key: sorter.order
          })}`
        )
      : urlParams.delete('order')
  }

  return urlParams
}
// Apply
