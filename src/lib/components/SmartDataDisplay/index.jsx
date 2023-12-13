import PropTypes from 'prop-types'

import GlobalFilters from '~su/components/GlobalFilters'

import SmartTable from '~su/components/SmartTable'
import SmartList from '~su/components/SmartList'

import canWorkInBrowser from '~su/utilities/canWorkInBrowser'

import { useSearchParams } from '~su/hooks'

import { applyPagination, applyFilters, applySorter } from '~su/utilities/filtering'

const SmartDataDisplay = ({
  pagination,
  filtersSchema,
  globalFiltersOptions,
  dataKey = '',
  shouldApplyURLSearch = true,
  displayDataIn = 'table',
  dataDisplayComponentProps = {},
  ...rest
}) => {
  let urlParams = useSearchParams()

  let DataDisplayComponent
  switch (displayDataIn) {
    case 'table':
      DataDisplayComponent = SmartTable
      dataDisplayComponentProps = {
        bordered: true,
        scroll: { x: 'max-content' },
        filtersSchema,
        urlParams,
        ...dataDisplayComponentProps
      }
      break
    case 'list':
      DataDisplayComponent = SmartList
      break
  }

  const applyURLSearch = (pagination, filters, sorter, extra) => {
    if (canWorkInBrowser()) {
      if (extra.action !== 'paginate') {
        urlParams = applyFilters(urlParams, filters)
        urlParams = applySorter(urlParams, sorter)
      }

      urlParams = applyPagination(urlParams, pagination)

      if (urlParams.toString() === window.location.search.replace('?', '')) {
        return
      }

      window.location.hash = dataKey
      window.location.search = urlParams
    }
  }

  const applyGlobalFilter = (filters, sorter) => {
    applyURLSearch({ current: 1 }, filters, sorter, { action: 'filter' })
  }

  const optionalProps = {
    ...(shouldApplyURLSearch && {
      onChange: applyURLSearch
    })
  }

  return (
    <DataDisplayComponent
      title={
        globalFiltersOptions ? (
          <GlobalFilters
            applyFilters={applyGlobalFilter}
            filtersSchema={filtersSchema}
            urlParams={urlParams}
            globalFiltersOptions={globalFiltersOptions}
            dataKey={dataKey}
          />
        ) : null
      }
      pagination={pagination}
      {...dataDisplayComponentProps}
      {...optionalProps}
      {...rest}
    />
  )
}

SmartDataDisplay.propTypes = {
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  filtersSchema: PropTypes.object,
  globalFiltersOptions: PropTypes.object,
  dataKey: PropTypes.string,
  shouldApplyURLSearch: PropTypes.bool,
  displayDataIn: PropTypes.string,
  dataDisplayComponentProps: PropTypes.object
}

export default SmartDataDisplay
