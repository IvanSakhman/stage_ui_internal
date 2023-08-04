import { message } from 'antd';
import TableAsChartUtils from '~su/components/Chart/tableAsChartUtils'

describe('TableAsChart utilities', () => {
  const grouped = {
    "labels": ["2019", "2020", "2021"],
    "datasets": [
      {
        "label": "happiness_score",
        "data": [
          ["100", "200", "-10"],
          ["20", "10", "0"],
          ["12"]
        ]
      },
      {
        "label": "month",
        "data": [
          ["Jan", "Feb", "March"],
          ["Jan", "Feb", "March"],
          ["Jan", "Feb", "March"]
        ]
      }
    ]
  }

  const notGrouped = {
    "labels": ["happiness_score", "month"],
    "datasets": [
      { "data": ["100", "200", "-10"] },
      { "data": ["Jan", "Feb", "Mar", "Apr"] }
    ]
  }

  const invalid = {
    "labels": {},
    "datasets": {}
  }

  describe('columnsFromData', () => {
    describe('when datasets have a label', () => {
      it('returns main labels as parents with children', () => {
        expect(new TableAsChartUtils(grouped).columnsFromData()).toEqual(
          [
            { title: '2019', children: [{ title: 'happiness_score', dataIndex: '2019_happiness_score' }, { title: 'month', dataIndex: '2019_month' }] },
            { title: '2020', children: [{ title: 'happiness_score', dataIndex: '2020_happiness_score' }, { title: 'month', dataIndex: '2020_month' }] },
            { title: '2021', children: [{ title: 'happiness_score', dataIndex: '2021_happiness_score' }, { title: 'month', dataIndex: '2021_month' }] },
          ]
        )
      })
    })

    describe('when datasets does not have a label', () => {
      it('returns main labels', () => {
        expect(new TableAsChartUtils(notGrouped).columnsFromData()).toEqual(
          [
            { title: 'happiness_score', dataIndex: 'happiness_score' },
            { title: 'month', dataIndex: 'month' }
          ]
        )
      })
    })

    describe('when datasets could not be mapped', () => {
      beforeEach(() => {
        message.error = jest.fn();
      })

      it('triggers a message and returns an empty array', () => {
        const consoleSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
        expect(new TableAsChartUtils(invalid).columnsFromData()).toEqual([])

        expect(consoleSpy).toBeCalledWith(new TypeError('this.datasets.filter is not a function'))
        expect(consoleSpy).toBeCalledWith(new TypeError('this.labels.map is not a function'))
        expect(message.error).toBeCalledWith('Could not generate table visualisation.')

        consoleSpy.mockRestore();
      })
    })
  })

  describe('rowsFromData', () => {
    describe('when datasets have a label', () => {
      it('it collects data per row', () => {
        expect(new TableAsChartUtils(grouped).rowsFromData()).toEqual(
          [
            { "2019_happiness_score": "100", "2019_month": "Jan", "2020_happiness_score": "20", "2020_month": "Jan", "2021_happiness_score": "12", "2021_month": "Jan" },
            { "2019_happiness_score": "200", "2019_month": "Feb", "2020_happiness_score": "10", "2020_month": "Feb", "2021_happiness_score": undefined, "2021_month": "Feb" },
            { "2019_happiness_score": "-10", "2019_month": "March", "2020_happiness_score": "0", "2020_month": "March", "2021_happiness_score": undefined, "2021_month": "March" }
          ]
        )
      })
    })

    describe('when datasets does not have a label', () => {
      it('list of objects', () => {
        expect(new TableAsChartUtils(notGrouped).rowsFromData()).toEqual(
          [
            { happiness_score: "100", month: "Jan" },
            { happiness_score: "200", month: "Feb" },
            { happiness_score: "-10", month: "Mar" },
            { happiness_score: undefined, month: "Apr" },
          ]
        )
      })
    })

    describe('when datasets could not be mapped', () => {
      beforeEach(() => {
        message.error = jest.fn();
      })

      it('triggers a message and returns an empty array', () => {
        const consoleSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
        expect(new TableAsChartUtils(invalid).rowsFromData()).toEqual([])

        expect(consoleSpy).toBeCalledWith(new TypeError('this.datasets.filter is not a function'))
        expect(consoleSpy).toBeCalledWith(new TypeError('this.datasets.map is not a function'))
        expect(message.error).toBeCalledWith('Could not generate table visualisation.')

        consoleSpy.mockRestore();
      })
    })
  })
})
