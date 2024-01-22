import PropTypes from 'prop-types'
import { styled } from 'styled-components'

import object from '~su/utilities/object'

import Card from '../Card'
import List from '../List'

const StyledCard = styled(Card)`
  .ant-card-head {
    #-global-filters-form {
      > .ant-row {
        flex-grow: 1;
      }
    }
  }
`

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
    <StyledCard title={title} headStyle={{ fontWeight: 'normal', border: 'none' }}>
      {extraDataDisplay}
      <List pagination={pagination} {...listProps} />
    </StyledCard>
  )
}

SmartList.propTypes = {
  title: PropTypes.element,
  onChange: PropTypes.func,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  extraDataDisplay: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}

export default SmartList
