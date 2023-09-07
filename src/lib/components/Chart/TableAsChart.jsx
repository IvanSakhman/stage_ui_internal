import { useRef, forwardRef, useImperativeHandle } from 'react'
import html2canvas from 'html2canvas'

import { useMessage } from '~su/hooks'

import Table from '../Table'

import TableAsChartUtils from './tableAsChartUtils'

// type Props = {
//   id: string
//   type: string
//   data: any
//   options: any
//   width: string
//   height: string
// }

const TableAsChart = forwardRef((props, ref) => {
  const { _id, _height, ...chartProps } = props
  const tableContainer = useRef(null)
  const message = useMessage()

  const chartConfiguration = JSON.parse(JSON.stringify(chartProps))
  const tableAsChartUtils = new TableAsChartUtils(chartConfiguration.data, message)

  useImperativeHandle(
    ref,
    () => ({
      getCanvas: () => html2canvas(tableContainer.current.querySelector('table')).then((canvas) => canvas)
    }),
    []
  )

  return (
    <div ref={tableContainer} style={{ overflow: 'scroll', maxHeight: '100%', maxWidth: '100%' }}>
      <Table
        columns={tableAsChartUtils.columnsFromData()}
        dataSource={tableAsChartUtils.rowsFromData().map((row, index) => ({ ...row, key: index }))}
        bordered
      />
    </div>
  )
})

export default TableAsChart
