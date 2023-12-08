import PropTypes from 'prop-types'

import Card from '../Card'
import List from '../List'

const SmartList = ({ title, onChange, pagination, ...listProps }) => {
  const applyPagination = (page) => {
    return onChange({ current: page }, {}, undefined, { action: 'paginate' })
  }

  pagination = {
    ...pagination,
    ...(onChange && { onChange: applyPagination })
  }

  return (
    <Card title={title} headStyle={{ fontWeight: 'normal', border: 'none' }}>
      <List pagination={pagination} {...listProps} />
    </Card>
  )
}

SmartList.propTypes = {
  title: PropTypes.element,
  onChange: PropTypes.func,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

export default SmartList
