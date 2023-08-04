import React, { memo } from 'react'

import Toolbar from './Toolbar'

import StyledTable from './index.styled'

import buildColumns, { buildColumnTitle, extendRenderWithActions } from '~su/utilities/table/buildColumns'

const Table = ({
  columns,
  columnsConfig = null,
  title,
  pagination = false,
  actions = [],
  functionActionHandlers,
  ...rest
}) => {
  if (title) {
    if (Array.isArray(title)) {
      title = <Toolbar>{React.Children.toArray(title)}</Toolbar>
    }

    rest = { ...rest, title: () => title }
  }

  if (columnsConfig) {
    const RenderColumn = columnsConfig.RenderColumn

    columns = buildColumns(columnsConfig.columns, columns).map((column) => {
      if (column.renderComponent) {
        column.render = (value, record) => <RenderColumn columnKey={column.key} value={value} record={record} />
      }

      return column
    })
  }

  return (
    <StyledTable
      childrenColumnName="antdNestedTableRows"
      rowKey={({ id, key }) => id || key}
      columns={columns.map((column) => {
        const { key } = column
        column.title ||= buildColumnTitle(columnsConfig?.[key], key)

        if (actions.table_row) {
          column = extendRenderWithActions(actions.table_row, column, functionActionHandlers)
        }

        return { key, dataIndex: key, ...column }
      })}
      pagination={pagination}
      {...rest}
    />
  )
}

export default memo(Table)
