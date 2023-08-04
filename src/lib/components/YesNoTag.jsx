import React from 'react'
import { Tag } from 'antd'

// type Props = {
//   yes: boolean
// }

const YesNoTag = ({ yes }) => {
  return (
    <Tag key={yes ? 'yes' : 'no'} color={yes ? 'green' : 'red'}>
      {yes ? 'YES' : 'NO'}
    </Tag>
  )
}

export default YesNoTag
