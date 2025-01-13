import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'

import Toolbar from './Toolbar'

import StyledTable from './index.styled'

import buildColumns, { buildColumnTitle, extendRenderWithActions } from '~su/utilities/table/buildColumns'

const Table = ({
  columns,
  columnsConfig = null,
  title,
  pagination = false,
  actions = {},
  hasDropdownActions = false,
  keyPrefix,
  functionActionHandlers,
  ...rest
}) => {
  const { t } = useTranslation(keyPrefix && { keyPrefix })

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
      if (keyPrefix) {
        column.title = t(column.title)
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
        column.title ||= t(`columns.${key}`, column.title || buildColumnTitle(columnsConfig?.[key], key))

        if (actions.table_row) {
          column = extendRenderWithActions(
            actions.table_row,
            column,
            functionActionHandlers,
            keyPrefix,
            hasDropdownActions
          )
        }

        return { key, dataIndex: key, ...column }
      })}
      pagination={pagination ? { ...pagination, total: pagination.total_items, pageSize: pagination.per_page } : false}
      {...rest}
    />
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  columnsConfig: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      current: PropTypes.number.isRequired,
      total_items: PropTypes.number.isRequired,
      per_page: PropTypes.number.isRequired
    })
  ]),
  actions: PropTypes.shape({ table_row: PropTypes.object }),
  hasDropdownActions: PropTypes.bool,
  keyPrefix: PropTypes.string,
  functionActionHandlers: PropTypes.object
}

export default memo(withScopedTranslations(Table, 'table'))
