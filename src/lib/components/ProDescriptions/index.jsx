import PropTypes from 'prop-types'
import { Descriptions } from 'antd'

import buildItems from './utilities/buildItems'
import { useTranslation } from '~su/utilities/i18n'

const ProDescriptions = ({ columnCount, record, columns, ...props }) => {
  const { t } = useTranslation()

  const items = buildItems(record, columns).map((item) => ({
    ...item,
    label: t(`descriptions.${item.key}`, item.label)
  }))

  return <Descriptions column={columnCount} items={items} />
}

ProDescriptions.propTypes = {
  columnCount: PropTypes.number,
  record: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object)
}

export default ProDescriptions
