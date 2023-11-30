import { buildColumns } from '~su/components/SmartTable/utilities'

const columnsConfig = {
  title: {
    sortable: true,
    searchable: true,
    renderComponent: true,
    ellipsis: true,
    width: 'auto',
    fixed: 'left'
  },
  author: {
    title: 'Created By',
    filtrable: true,
    width: 150
  },
  last_editor: {
    title: 'Last Edited By',
    sortable: true,
    filtrable: true,
    width: 190
  },
  schedules_count: { title: 'Schedules', width: 110 },
  outputs_count: { title: 'Outputs', width: 90 },
  updated_at: {
    title: 'Last Updated',
    sortable: true,
    renderComponent: true,
    width: 180
  },
  actions: {
    renderComponent: true,
    width: 140
  }
}

describe('buildColumns', () => {
  it('returns a list of columns with key', () => {
    expect(buildColumns(columnsConfig)).toEqual([
      expect.objectContaining({ key: 'title' }),
      expect.objectContaining({ key: 'author' }),
      expect.objectContaining({ key: 'last_editor' }),
      expect.objectContaining({ key: 'schedules_count' }),
      expect.objectContaining({ key: 'outputs_count' }),
      expect.objectContaining({ key: 'updated_at' }),
      expect.objectContaining({ key: 'actions' })
    ])
  })

  it('copies additional properties if passed', () => {
    expect(buildColumns(columnsConfig)[0]).toEqual(
      expect.objectContaining({ fixed: 'left' }))
  })

  describe('when column is filtrable', () => {
    it('adds filters, filterMultiple: false and filteredValue', () => {
      expect(buildColumns(columnsConfig, new URLSearchParams(), { by_author: ['developer'] })[1]).toEqual(
        expect.objectContaining({
          key: 'author',
          filters: [{ text: 'developer', value: 'developer' }],
          filterMultiple: false,
          filteredValue: []
        })
      )
    })

    describe('when there is filter param present', () => {
      const urlParams = new URLSearchParams('?by_author=developer')

      it('sets filteredValue properly', () => {
        expect(buildColumns(columnsConfig, urlParams)[1]).toEqual(
          expect.objectContaining({
            key: 'author',
            filteredValue: ['developer']
          })
        )
      })
    })
  })

  describe('when column is sortable', () => {
    it('adds sorter: true and sortOrder', () => {
      expect(buildColumns(columnsConfig)[0]).toEqual(expect.objectContaining({
        key: 'title',
        sorter: true,
        sortOrder: false
      }))
    })

    describe('when there is sort param present', () => {
      const urlParams = new URLSearchParams('?order=title:asc')

      it('sets sortOrder properly', () => {
        expect(buildColumns(columnsConfig, urlParams)[0]).toEqual(expect.objectContaining({
          key: 'title',
          sorter: true,
          sortOrder: 'ascend'
        }))
      })
    })
  })

  xdescribe('when column has custom render', () => {
    it('adds render: true', () => {
      expect(buildColumns(columnsConfig)[0]).toEqual(
        expect.objectContaining({
          key: 'title',
          renderComponent: true
        })
      )
    })
  })
})
