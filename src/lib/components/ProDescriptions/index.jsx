import { Descriptions } from 'antd'

import buildItems from './utilities/buildItems'

export default ({ columnCount, record, columns, ...props }) => {
  const renderItem = (item, index) => {
    const { value, ...itemProps } = item

    return (
      <Descriptions.Item key={index} {...itemProps}>
        {value}
      </Descriptions.Item>
    )
  }

  return <Descriptions column={columnCount}>{buildItems(record, columns).map(renderItem)}</Descriptions>
}
