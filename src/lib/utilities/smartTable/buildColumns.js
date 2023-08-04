import { setUpFilters, readAppliedSorter } from './filtering'

const columnFilterProperties = (columnKey, urlParams, filters) => {
  return {
    filterMultiple: false,
    ...setUpFilters(columnKey, urlParams, filters)
  }
}

const columnSortProperties = (columnKey, urlParams) => {
  return {
    sorter: true,
    sortOrder: readAppliedSorter(columnKey, urlParams)
  }
}

const buildColumns = (columnsConfig, urlParams = new URLSearchParams(), filters = []) => {
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

export default buildColumns
