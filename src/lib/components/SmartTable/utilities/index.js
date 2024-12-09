import dayjs from 'dayjs'

import date from '~su/utilities/date'
import i18n from '~su/utilities/i18n'
import { normalization } from '~su/utilities/filtering'

const buildFilters = (filtersSchema) => {
  let filters = {}

  if (!filtersSchema.properties) {
    return filters
  }

  Object.entries(filtersSchema.properties).forEach(([filterName, filterProperties]) => {
    const { type, items, valueEnum, enum: enums } = filterProperties

    switch (type) {
      case 'array':
        filters[filterName] = items.valueEnum || items.enum
        break
      case 'boolean':
        filters[filterName] = [true, false]
        break
      default:
        filters[filterName] = valueEnum || enums
    }
  })

  return filters
}

export const setUpFilters = (columnKey, urlParams, filtersSchema) => {
  const filters = buildFilters(filtersSchema)

  const filterKey = `by_${columnKey}`

  const buildFilterOptionLabel = i18n.t

  const filtersOptions =
    filters[filterKey]?.map((value) => {
      return Array.isArray(value)
        ? { text: buildFilterOptionLabel(value[0]), value: value[1].toString() }
        : { text: buildFilterOptionLabel(value), value: value.toString() }
    }) || []

  let filteredValue = urlParams.get(filterKey)

  if (filteredValue?.split('-').length == 3 && date.isValidDateWithFormat(filteredValue, 'YYYY-MM-DD')) {
    filteredValue = dayjs(filteredValue[0], 'YYYY-MM-DD')
  }

  return {
    filters: filtersOptions,
    filteredValue: [filteredValue].filter((value) => value != null)
  }
}

export const readAppliedSorter = (columnKey, urlParams) => {
  const orderParam = urlParams.get('order')

  if (!orderParam) {
    return false
  }

  const [key, order] = orderParam.split(':')

  return (
    normalization.getNormalized({ dict: normalization.NORMALIZED_SORTS, key, invertDict: true }) === columnKey &&
    normalization.getNormalized({ dict: normalization.NORMALIZED_ORDERS, key: order, invertDict: true })
  )
}

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { buildFilters, setUpFilters, readAppliedSorter }
}

export { testExports }

const columnFilterProperties = (columnKey, urlParams, filtersSchema) => {
  return {
    filterMultiple: false,
    ...setUpFilters(columnKey, urlParams, filtersSchema)
  }
}

const columnSortProperties = (columnKey, urlParams) => {
  return {
    sorter: true,
    sortOrder: readAppliedSorter(columnKey, urlParams)
  }
}

export const buildColumns = (columnsConfig, urlParams = new URLSearchParams(), filters = []) => {
  let columns = []

  for (const [key, properties] of Object.entries(columnsConfig)) {
    let column = { key, ...properties }

    if (properties.filtrable) {
      column = {
        ...column,
        ...columnFilterProperties(key, urlParams, filters)
      }
    }

    if (properties.searchable) {
      column = {
        ...column,
        searchable: properties.searchable,
        ...columnFilterProperties(key, urlParams, filters)
      }
    }

    if (properties.sortable) {
      column = { ...column, ...columnSortProperties(key, urlParams) }
    }

    columns.push(column)
  }

  return columns
}

export const getPaginationStyle = (positions) => {
  const position = positions?.[0] || 'topRight'

  const bottomStyle = { marginTop: 0, paddingTop: 16, borderTop: '1px solid #F0F0F0' }
  const leftStyle = { paddingLeft: 16 }
  const rightStyle = { paddingRight: 16 }

  switch (position) {
    case 'topLeft':
      return leftStyle
    case 'topRight':
      return rightStyle
    case 'bottomLeft':
      return { ...leftStyle, ...bottomStyle }
    case 'bottomCenter':
      return bottomStyle
    case 'bottomRight':
      return { ...rightStyle, ...bottomStyle }
    default:
      return {}
  }
}
