import string from '../string'
import ActionButtons from '~su/components/ActionButtons'

export const buildColumnTitle = (properties, key) => {
  return properties?.title || string.humanize(key, { capitalize: true })
}

export const extendRenderWithActions = (actions, column, functionActionHandlers) => {
  const columnActions = actions[column.key]

  if (columnActions) {
    column.render = (value, record, _index) => (
      <ActionButtons
        actions={columnActions}
        record={record}
        dynamicDisplayValueName={column.key}
        functionHandlers={functionActionHandlers}
        size="small"
      />
    )
  }

  return column
}

const buildColumn = (properties, column) => {
  const { key } = column

  column.title ||= buildColumnTitle(properties, key)

  if (properties) {
    column = {
      width: properties.width,
      ellipsis: properties.ellipsis,
      ...column
    }

    if (properties.renderComponent) {
      column = { ...column, renderComponent: properties.renderComponent }
    }

    if (properties.render) {
      column = { ...column, render: properties.render }
    }
  }

  return column
}

const buildColumns = (columnsConfig, columns = []) => {
  if (columns.length > 0) {
    return columns.map((column) => {
      return buildColumn(columnsConfig[column.key], column)
    })
  }

  for (const [key, properties] of Object.entries(columnsConfig)) {
    let column = buildColumn(properties, { key })

    columns.push(column)
  }

  return columns
}

export default buildColumns
