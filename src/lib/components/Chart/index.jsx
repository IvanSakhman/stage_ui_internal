import { useRef, forwardRef, useImperativeHandle } from 'react'
import { saveAs } from 'file-saver'

import ChartJSChart from './ChartJSChart'
import TableAsChart from './TableAsChart'

// type Props = {
//   id: string
//   type: string
//   data: any
//   options: any
//   className: string
//   onRendered: Function
// }

const Chart = forwardRef((props, ref) => {
  const { id, className, ...chartProps } = props
  const chart = useRef(null)

  useImperativeHandle(
    ref,
    () => ({
      saveAs: (chartTitle) => {
        return chart.current.getCanvas().then((canvas) => {
          return canvas.toBlob((blob) => {
            return saveAs(blob, `${chartTitle}.png`)
          })
        })
      }
    }),
    []
  )

  const ChartNode = chartProps.type === 'table' ? TableAsChart : ChartJSChart

  return (
    <div id={id} style={{ height: 250 }} className={className}>
      <ChartNode ref={chart} {...chartProps} />
    </div>
  )
})

export default Chart
