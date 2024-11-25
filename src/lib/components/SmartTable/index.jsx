import PropTypes from 'prop-types'
import { SearchOutlined } from '@ant-design/icons'

import Card from '../Card'
import TableSearchBox from './SearchBox'

import string from '~su/utilities/string'
import object from '~su/utilities/object'
import { buildColumns } from './utilities'

const SmartTable = ({
  title,
  columnsConfig,
  pagination,
  filtersSchema,
  urlParams,
  dataKey = '',
  keyPrefix,
  onChange,
  ...rest
}) => {
  const columns = buildColumns(columnsConfig.columns, urlParams, filtersSchema).map((column) => {
    if (column.searchable) {
      column.filterIcon = (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      column.filterDropdown = (filterDropdownProps) => {
        return <TableSearchBox columnKey={column.key} {...filterDropdownProps} />
      }
    }

    return column
  })

  const paginationProps = object.isEmpty(pagination)
    ? false
    : {
        position: ['topRight'],
        style: { position: 'absolute', right: 16, top: -60, zIndex: 1 },
        showSizeChanger: false,
        ...pagination
      }

  const handleChange = (pagination, filters, sorter, extra) => {
    switch (extra.action) {
      case 'paginate':
        sorter = undefined
        break
      case 'filter':
        pagination = { current: 1, ...pagination }
        sorter = undefined
        break
      case 'sort':
        pagination = { current: 1, ...pagination }
        sorter = [sorter.columnKey, sorter.order].join(':')
        break
    }

    return onChange(pagination, filters, sorter, extra)
  }

  return (
    <Card.Table
      keyPrefix={keyPrefix}
      headStyle={{ fontWeight: 'normal' }}
      columnsConfig={columnsConfig}
      columns={columns}
      title={[title || <span style={{ lineHeight: '32px' }}>{string.humanize(dataKey, { titleize: true })}</span>]}
      pagination={paginationProps}
      onChange={onChange ? handleChange : null}
      {...rest}
    />
  )
}

SmartTable.propTypes = {
  title: PropTypes.element,
  columnsConfig: PropTypes.shape({
    columns: PropTypes.object
  }).isRequired,
  filtersSchema: PropTypes.object,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dataKey: PropTypes.string,
  keyPrefix: PropTypes.string,
  onChange: PropTypes.func,
  urlParams: PropTypes.instanceOf(URLSearchParams)
}

export default SmartTable
