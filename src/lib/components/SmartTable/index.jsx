import { SearchOutlined } from '@ant-design/icons'

import Table from '../Table'
import TableSearchBox from './SearchBox'
import GlobalFilters from './GlobalFilters'

import string from '~su/utilities/string'
import smartTable from '~su/utilities/smartTable'

const SmartTable = ({ columnsConfig, _applySearch, pagination, globalFiltersOptions, dataKey, ...rest }) => {
  let urlParams = new URLSearchParams(window.location.search)

  const columns = smartTable.buildColumns(columnsConfig.columns, urlParams, columnsConfig.filters).map((column) => {
    if (column.searchable) {
      column.filterIcon = (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      column.filterDropdown = (filterDropdownProps) => {
        return <TableSearchBox columnKey={column.key} {...filterDropdownProps} />
      }
    }

    return column
  })

  const applyURLSearch = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      urlParams = smartTable.applyFilters(urlParams, filters)
      if (urlParams.toString() === window.location.search.replace('?', '')) {
        return
      }
    }

    urlParams = smartTable.applyPagination(urlParams, pagination)
    urlParams = smartTable.applyFilters(urlParams, filters)
    urlParams = smartTable.applySorter(urlParams, sorter)

    window.location.hash = dataKey
    window.location.search = urlParams
  }

  const applyGlobalFilter = (filters) => {
    applyURLSearch(
      { current: 1, total: pagination.total_items, pageSize: pagination.per_page },
      filters,
      {},
      { action: 'filter' }
    )
  }

  const paginationProps = {
    position: ['topRight'],
    style: { position: 'absolute', right: 16, zIndex: 1 },
    showSizeChanger: false,
    current: pagination.current,
    total: pagination.total_items,
    pageSize: pagination.per_page
  }

  return (
    <Table
      columnsConfig={columnsConfig}
      columns={columns}
      title={
        globalFiltersOptions ? (
          <GlobalFilters
            applyFilters={applyGlobalFilter}
            filters={columnsConfig.filters}
            urlParams={urlParams}
            globalFiltersOptions={globalFiltersOptions}
            dataKey={dataKey}
          />
        ) : (
          <span style={{ lineHeight: '32px' }}>{string.humanize(dataKey, { titleize: true })}</span>
        )
      }
      pagination={paginationProps}
      onChange={applyURLSearch}
      {...rest}
    />
  )
}

export default SmartTable
