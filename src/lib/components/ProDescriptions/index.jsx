import PropTypes from 'prop-types'
import { Descriptions } from 'antd'

import buildItems from './utilities/buildItems'
import { useTranslation } from '~su/utilities/i18n'

const ProDescriptions = ({ columnCount, record, columns, ...props }) => {
  const { t } = useTranslation()

  const renderItem = (item) => {
    const { value, key, label, ...itemProps } = item

    return (
      <Descriptions.Item key={key} {...itemProps} label={t(`descriptions.${key}`, label)}>
        {value}
      </Descriptions.Item>
    )
  }

  return <Descriptions column={columnCount}>{buildItems(record, columns).map(renderItem)}</Descriptions>
}

ProDescriptions.propTypes = {
  columnCount: PropTypes.number,
  record: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object)
}

export default ProDescriptions
