import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  DoughnutController,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Tooltip,
  Colors
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  DoughnutController,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  CategoryScale,
  LinearScale,
  Colors
)

Tooltip.positioners.cursor = (_elements, eventPosition) => {
  const { x, y } = eventPosition
  return { x, y }
}

Chart.register(Filler, Legend, Tooltip)

// type Props = {
//   id: string
//   type: string
//   data: any
//   options: any
//   width: string
//   height: string
// }

Chart.register({
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = options.color
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
})

const ChartJSChart = forwardRef((props, ref) => {
  const { _id, ...chartProps } = props
  const canvas = useRef(null)

  const chartConfiguration = JSON.parse(JSON.stringify(chartProps))

  useEffect(() => {
    let { options, data } = chartConfiguration

    if (chartConfiguration.type === 'scatter') {
      options.scales = { xAxes: [{ type: 'category', labels: data.labels }] }
    }

    const chart = new Chart(canvas.current.getContext('2d'), {
      type: chartConfiguration.type,
      data: chartConfiguration.data,
      options: {
        ...options,
        maintainAspectRatio: false,
        plugins: {
          filler: { propagate: true },
          legend: { position: 'bottom', align: 'center' },
          tooltip: { position: 'cursor' },
          customCanvasBackgroundColor: { color: '#fff' }
        }
      }
    })

    return () => {
      return chart.destroy()
    }
  }, [chartConfiguration, canvas, props.height, props.width])

  useImperativeHandle(
    ref,
    () => ({
      getCanvas: () => new Promise((resolve, _) => resolve(canvas.current))
    }),
    []
  )

  return <canvas ref={canvas} width={props.width} height={props.height}></canvas>
})

export default ChartJSChart
