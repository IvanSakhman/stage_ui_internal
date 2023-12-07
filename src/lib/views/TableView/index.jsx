import DataView from '../DataView'

const TableView = ({
  functionActionHandlers, // legacy, use tableProps
  itemPluralName, // legacy, use tableProps
  COLUMNS, // legacy, use tableProps
  GLOBAL_FILTERS_OPTIONS, // legacy, use tableProps
  tableProps = {},
  ...rest
}) => {
  // NOTE: TableView is deprecated. Use DataView instead.
  console.warn('[DEPRECATED] v1.54.0: TableView is deprecated. Use DataView instead.')

  // NOTE: backwards compatibility, remove when all places use tableProps
  tableProps = {
    columnsConfig: { columns: COLUMNS },
    globalFiltersOptions: GLOBAL_FILTERS_OPTIONS,
    dataKey: itemPluralName,
    functionActionHandlers,
    ...tableProps
  }
  // NOTE: backwards compatibility, remove when all places use tableProps

  return <DataView dataDisplayComponentProps={tableProps} {...rest} />
}

TableView.setupActions = DataView.setupActions
TableView.setupStore = DataView.setupStore
TableView.useTableViewSetup = DataView.useDataViewSetup

export default TableView
