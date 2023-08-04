import { zip } from 'lodash'
import { message } from 'antd'
import array from '~su/utilities/array'

export default class TableAsChartUtils {
  // constructor({ labels, datasets }: { labels: any; datasets: any })
  constructor({ labels, datasets }) {
    this.labels = labels
    this.datasets = datasets
    this.hasLabeledDatasets = this.withTryCatch(
      () => this.datasets.filter((dataset) => dataset.label).length != 0,
      false
    )
  }

  // columnsFromData(): array
  columnsFromData() {
    return this.withTryCatch(() => {
      return this.labels.map((label) => {
        let column = { title: label }

        if (this.hasLabeledDatasets) {
          column.children = this.datasets.map((dataset) => {
            const { label: datasetLabel } = dataset
            return {
              title: datasetLabel,
              dataIndex: [label, datasetLabel].join('_')
            }
          })
        } else {
          column.dataIndex = label
        }

        return column
      })
    }, [])
  }

  // rowsFromData(): array
  rowsFromData() {
    return this.withTryCatch(() => {
      if (this.hasLabeledDatasets) {
        const paired = zip(...this.datasets.map((dataset) => array.transpose(dataset.data)))
        return paired.map((dataset) => this.collectRowsWithLabel(dataset))
      }

      const paired = zip(...this.datasets.map((dataset) => dataset.data))
      return paired.map((row) => Object.fromEntries(row.map((dataPoint, index) => [this.labels[index], dataPoint])))
    }, [])
  }

  withTryCatch(func, fallbackValue) {
    try {
      return func()
    } catch (error) {
      console.error(error)
      message.error('Could not generate table visualisation.')
      return fallbackValue
    }
  }

  collectRowsWithLabel(dataset) {
    return dataset
      .map((dataPoints, datasetIndex) => {
        return Object.fromEntries(
          dataPoints.map((v, index) => [[this.labels[index], this.datasets[datasetIndex].label].join('_'), v])
        )
      })
      .reduce((memo = {}, rr) => Object.assign(memo, rr))
  }
}
