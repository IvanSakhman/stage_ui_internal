import { useEffect } from 'react'

import ActionButtons from '~su/components/ActionButtons'
import PageContainer from '~su/components/PageContainer'
import SmartTable from '~su/components/SmartTable'

import setupActions from './actions'
import setupStore from './store'

const TableView = ({
  store,
  loadData,
  functionActionHandlers, // legacy, use tableProps
  itemPluralName, // legacy, use tableProps
  COLUMNS, // legacy, use tableProps
  GLOBAL_FILTERS_OPTIONS, // legacy, use tableProps
  pageHeader = {},
  tableProps = {},
  children
}) => {
  const { useData, useDataStates, usePagination, useFilters, useViewActions } = store
  const entries = useData()
  const { isLoading } = useDataStates()
  const pagination = usePagination()
  const filters = useFilters()
  const viewActions = useViewActions()

  useEffect(() => {
    loadData(window.location.search)
  }, [])

  const { actionsTranslateOptions, ...pageHeaderProps } = pageHeader
  const containerProps = {
    loading: isLoading,
    header: {
      ...pageHeaderProps,
      extra: <ActionButtons actions={viewActions?.page_header} {...actionsTranslateOptions} />
    }
  }

  // NOTE: backwards compatibility, remove when all places use tableProps
  tableProps = {
    columnsConfig: { columns: COLUMNS },
    globalFiltersOptions: GLOBAL_FILTERS_OPTIONS,
    dataKey: itemPluralName,
    functionActionHandlers,
    ...tableProps
  }
  // NOTE: backwards compatibility, remove when all places use tableProps

  return (
    <PageContainer {...containerProps}>
      {children}
      <SmartTable
        dataSource={entries}
        pagination={pagination}
        bordered
        loading={isLoading}
        actions={viewActions}
        scroll={{ x: 'max-content' }}
        {...tableProps}
        columnsConfig={{
          ...tableProps.columnsConfig,
          filters
        }}
      />
    </PageContainer>
  )
}

TableView.setupActions = setupActions
TableView.setupStore = setupStore

export default TableView
