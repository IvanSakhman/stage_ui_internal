import string from '../string'
import ActionButtons from '~su/components/ActionButtons'

export const buildColumnTitle = (properties, key) => {
  return properties?.title || string.humanize(key, { capitalize: true })
}

export const extendRenderWithActions = (
  actions,
  column,
  functionActionHandlers,
  keyPrefix = '',
  isDropdown = false
) => {
  const columnActions = actions[column.key]

  if (columnActions) {
    const customRender = column.render
    if (isDropdown) {
      column.width = '1%'
    }

    column.render = (value, record, index) => (
      <ActionButtons
        actions={columnActions}
        record={record}
        dynamicDisplayValueName={column.key}
        valueRender={customRender ? () => customRender(value, record, index) : null}
        functionHandlers={functionActionHandlers}
        keyPrefix={keyPrefix}
        isDropdown={isDropdown}
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
