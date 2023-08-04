import { columnConfig, buildFromResults, normalizeResults } from '~su/components/ResultsTable/utilities/tableSupport'

describe('tableSupport', () => {
  describe('normalizeResults', () => {
    describe('when results is an array of arrays', () => {
      const result = [
        ['test_a', 'test_b'],
        ['1_a', '1_b'],
        ['1_a', '1_b'],
        ['2_a', '2_b'],
        [null, '2_b'],
        ['3_a', '3_b']
      ]

      it('changes to objects and adds keys', () => {
        expect(normalizeResults(result)).toEqual([
          { key: 0, test_a: '1_a', test_b: '1_b' },
          { key: 1, test_a: '1_a', test_b: '1_b' },
          { key: 2, test_a: '2_a', test_b: '2_b' },
          { key: 3, test_a: null, test_b: '2_b' },
          { key: 4, test_a: '3_a', test_b: '3_b' }
        ])
      })
    })

    describe('when results is an array of objects', () => {
      const result = [
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '2_a', test_b: '2_b' },
        { test_a: null, test_b: '2_b' },
        { test_a: '3_a', test_b: '3_b' }
      ]

      it('returns with added keys', () => {
        expect(normalizeResults(result)).toEqual([
          { key: 0, test_a: '1_a', test_b: '1_b' },
          { key: 1, test_a: '1_a', test_b: '1_b' },
          { key: 2, test_a: '2_a', test_b: '2_b' },
          { key: 3, test_a: null, test_b: '2_b' },
          { key: 4, test_a: '3_a', test_b: '3_b' }
        ])
      })
    })

    describe('when results is empty', () => {
      it('returns empty array', () => {
        expect(buildFromResults([])).toEqual([])
      })
    })

    describe('when results is null', () => {
      it('returns empty array', () => {
        expect(buildFromResults(null)).toEqual([])
      })
    })

    describe('when results is undefined', () => {
      it('returns empty array', () => {
        expect(buildFromResults()).toEqual([])
      })
    })

  })

  describe('buildFromResults', () => {
    describe('when results is an array of objects', () => {
      const result = [
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '2_a', test_b: '2_b' },
        { test_a: null, test_b: '2_b' },
        { test_a: '3_a', test_b: '3_b' }
      ]

      it('is able to properly find column names', () => {
        expect(buildFromResults(result)).toEqual([
          expect.objectContaining({ title: 'test_a' }),
          expect.objectContaining({ title: 'test_b' })
        ])
      })
    })

    describe('when results is empty', () => {
      it('returns empty array', () => {
        expect(buildFromResults([])).toEqual([])
      })
    })

    describe('when results is null', () => {
      it('returns empty array', () => {
        expect(buildFromResults(null)).toEqual([])
      })
    })

    describe('when results is undefined', () => {
      it('returns empty array', () => {
        expect(buildFromResults()).toEqual([])
      })
    })
  })

  describe('columnConfig', () => {
    const result = [
      { test_a: '1_a', test_b: '1_b' },
      { test_a: '1_a', test_b: '1_b' },
      { test_a: '2_a', test_b: '2_b' },
      { test_a: null, test_b: '2_b' },
      { test_a: '3_a', test_b: '3_b' }
    ]
    const column = columnConfig('test_a')

    it('returns a list of columns with title, key, and custom normalizing render', () => {
      expect(column).toEqual({
        title: 'test_a',
        key: 'test_a',
        render: expect.any(Function),
        width: 200
      })
    })

    describe('normalizing column value', () => {
      const result = [
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '1_a', test_b: '1_b' },
        { test_a: '2_a', test_b: false },
        { test_a: null, test_b: 1 },
        { test_a: '3_a', test_b: true }
      ]

      it('changes it to string', () => {
        const test_a_column = columnConfig('test_a')
        const test_b_column = columnConfig('test_b')

        expect(
          result.map((result_row) => test_a_column.render(result_row.test_a))
        ).toEqual(['1_a', '1_a', '2_a', null, '3_a'])

        expect(
          result.map((result_row) => test_b_column.render(result_row.test_b))
        ).toEqual(['1_b', '1_b', 'false', '1', 'true'])
      })
    })

  })
})
