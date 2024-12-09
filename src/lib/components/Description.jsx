import React from 'react'
import { Descriptions as AntdDescriptions, Typography } from 'antd'

import string from '~su/utilities/string'

import YesNoTag from './YesNoTag'

// type Props = {
//   record?: object
//   items?: object[]
//   bordered?: boolean
//   column: number
//   className?: boolean
// }

const Description = ({ record, items, _bordered = false, layout = 'horizontal', column, _outlined = true }) => {
  const descriptionItem = (item, _index) => {
    let { label, value, options = {} } = item
    const { type = 'secondary', ...restOfOptions } = options

    if (['tags', 'categories'].includes(label)) {
      value = value.join(', ')
    }

    label = string.humanize(label, { titleize: true })

    if (typeof value === 'boolean') {
      value = <YesNoTag yes={value} />
    }

    if (!value || (typeof value === 'string' && value.length === 0)) {
      value = '----'
    }

    return (
      <AntdDescriptions.Item
        key={label}
        label={<Typography.Text type={type}>{label}</Typography.Text>}
        {...restOfOptions}
      >
        {value}
      </AntdDescriptions.Item>
    )
  }

  let descriptivePairs = items

  if (record && !items) {
    descriptivePairs = Object.keys(record).map((name) => {
      return { label: name, value: record[name] }
    })
  }

  return (
    <AntdDescriptions layout={layout} column={column}>
      {descriptivePairs.map(descriptionItem)}
    </AntdDescriptions>
  )
}

export default Description
