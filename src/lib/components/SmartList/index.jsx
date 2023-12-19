import PropTypes from 'prop-types'

import object from '~su/utilities/object'

import Card from '../Card'
import List from '../List'

const SmartList = ({ title, onChange, pagination, extraDataDisplay, ...listProps }) => {
  const applyPagination = (page) => {
    return onChange({ current: page }, {}, undefined, { action: 'paginate' })
  }

  pagination = object.isEmpty(pagination)
    ? false
    : {
        ...pagination,
        ...(onChange && { onChange: applyPagination })
      }

  return (
    <Card title={title} headStyle={{ fontWeight: 'normal', border: 'none' }}>
      {extraDataDisplay}
      <List pagination={pagination} {...listProps} />
    </Card>
  )
}

SmartList.propTypes = {
  title: PropTypes.element,
  onChange: PropTypes.func,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  extraDataDisplay: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}

export default SmartList
