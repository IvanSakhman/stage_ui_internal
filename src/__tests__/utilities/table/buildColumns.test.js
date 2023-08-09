import buildColumns, { buildColumnTitle } from '~su/utilities/table/buildColumns'

const columnsConfig = {
  title: {
    sortable: true,
    searchable: true,
    renderComponent: true,
    ellipsis: true,
    width: 'auto'
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

const recycleBinColumns = {
  id: {
    title: 'ID'
  },
  title: {
    ellipsis: true,
    width: 'auto'
  },
  author: {
    title: 'Created By'
  },
  last_editor: {
    title: 'Last Edited By'
  },
  deleted_at: {
    title: 'Deleted At',
    render: (deleted_at) => format(deleted_at)
  },
  actions: {
    renderComponent: true,
    width: 100
  }
}

describe('buildColumns utils', () => {
  describe('buildColumnTitle', () => {
    describe('when column properties have title property', () => {
      it('uses it', () => {
        expect(buildColumnTitle({ title: 'Fake Title' }, 'fake_column')).toEqual('Fake Title')
      })
    })

    describe("when column properties don't have title property", () => {
      it('humanizes the key', () => {
        expect(buildColumnTitle({}, 'column_name')).toEqual('Column name')
      })
    })
  })

  describe('buildColumns', () => {
    describe('with columns passed', () => {
      const columns = [
        { key: 'title', sorter: true },
        { key: 'author', filteredValue: ['developer'] },
        { key: 'last_editor', sorter: true },
        { key: 'schedules_count' },
        { key: 'outputs_count' },
        { key: 'updated_at', sorter: true },
        { key: 'actions' }
      ]

      it('iterates over them, returning received column data with added base: title, width, ellipsis', () => {
        expect(buildColumns(columnsConfig, columns)).toEqual([
          expect.objectContaining({
            title: 'Title',
            key: 'title',
            renderComponent: true,
            width: 'auto',
            ellipsis: true
          }),
          expect.objectContaining({
            title: 'Created By',
            key: 'author',
            width: 150
          }),
          expect.objectContaining({
            title: 'Last Edited By',
            key: 'last_editor',
            width: 190
          }),
          expect.objectContaining({
            title: 'Schedules',
            key: 'schedules_count',
            width: 110
          }),
          expect.objectContaining({
            title: 'Outputs',
            key: 'outputs_count',
            width: 90
          }),
          expect.objectContaining({
            title: 'Last Updated',
            key: 'updated_at',
            width: 180
          }),
          expect.objectContaining({
            title: 'Actions',
            key: 'actions',
            width: 140
          })
        ])
      })

      describe('when column has renderComponent flag', () => {
        it('returns it', () => {
          expect(buildColumns(columnsConfig, columns)[0]).toEqual(
            expect.objectContaining({ key: 'title', renderComponent: true })
          )

          expect(buildColumns(columnsConfig)[5]).toEqual(
            expect.objectContaining({ key: 'updated_at', renderComponent: true })
          )

          expect(buildColumns(columnsConfig)[6]).toEqual(
            expect.objectContaining({ key: 'actions', renderComponent: true })
          )
        })
      })

      describe('when column has custom render', () => {
        it('it returns render function', () => {
          const recycleBinColumnsConfig = [
            { key: 'id' },
            { key: 'title' },
            { key: 'author' },
            { key: 'last_editor' },
            { key: 'deleted_at' },
            { key: 'actions' }
          ]

          expect(buildColumns(recycleBinColumns, recycleBinColumnsConfig)[4]).toEqual(
            expect.objectContaining({ key: 'deleted_at', render: expect.any(Function) })
          )
        })
      })
    })

    describe('without columns passed', () => {
      it('creates a new columns array with added base: key, title, width, ellipsis', () => {
        expect(buildColumns(columnsConfig)).toEqual([
          expect.objectContaining({
            title: 'Title',
            key: 'title',
            renderComponent: true,
            width: 'auto',
            ellipsis: true
          }),
          expect.objectContaining({
            title: 'Created By',
            key: 'author',
            width: 150
          }),
          expect.objectContaining({
            title: 'Last Edited By',
            key: 'last_editor',
            width: 190
          }),
          expect.objectContaining({
            title: 'Schedules',
            key: 'schedules_count',
            width: 110
          }),
          expect.objectContaining({
            title: 'Outputs',
            key: 'outputs_count',
            width: 90
          }),
          expect.objectContaining({
            title: 'Last Updated',
            key: 'updated_at',
            width: 180
          }),
          expect.objectContaining({
            title: 'Actions',
            key: 'actions',
            width: 140
          })
        ])
      })

      describe('when column has renderComponent flag', () => {
        it('returns it', () => {
          expect(buildColumns(columnsConfig)[0]).toEqual(
            expect.objectContaining({ key: 'title', renderComponent: true })
          )

          expect(buildColumns(columnsConfig)[5]).toEqual(
            expect.objectContaining({ key: 'updated_at', renderComponent: true })
          )

          expect(buildColumns(columnsConfig)[6]).toEqual(
            expect.objectContaining({ key: 'actions', renderComponent: true })
          )
        })
      })

      describe('when column has custom render', () => {
        it('it returns render function', () => {
          expect(buildColumns(recycleBinColumns)[4]).toEqual(
            expect.objectContaining({ key: 'deleted_at', render: expect.any(Function) })
          )
        })
      })
    })
  })
})
