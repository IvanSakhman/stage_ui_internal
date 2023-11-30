import PropTypes from 'prop-types'

import { List as AntdList } from 'antd'

import ActionButtons from '../ActionButtons'
import { Col } from '../Grid'

import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'

const List = ({ actions = {}, functionActionHandlers, itemsConfig, pagination = false, ...props }) => {
  const { t } = useTranslation()

  const renderItemActions = (item) => {
    return [
      actions.table_row ? (
        <ActionButtons
          key={item.id}
          actions={actions.table_row.actions}
          record={item}
          functionHandlers={functionActionHandlers}
          size="small"
        />
      ) : null
    ].filter((action) => action)
  }

  const renderItem = (item) => {
    return (
      <AntdList.Item actions={renderItemActions(item)}>
        {itemsConfig.map(({ render: colRender, ...colProps }, index) => {
          return (
            <Col key={index} {...colProps}>
              {colRender(item, t)}
            </Col>
          )
        })}
      </AntdList.Item>
    )
  }

  return (
    <AntdList
      renderItem={renderItem}
      pagination={{ ...pagination, total: pagination.total_items, pageSize: pagination.per_page }}
      {...props}
    />
  )
}

List.propTypes = {
  actions: PropTypes.object,
  functionActionHandlers: PropTypes.object,
  itemsConfig: PropTypes.arrayOf(PropTypes.shape({ render: PropTypes.func.isRequired })),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      current: PropTypes.number.isRequired,
      total_items: PropTypes.number.isRequired,
      per_page: PropTypes.number.isRequired
    })
  ])
}

export default withScopedTranslations(List, 'list')
