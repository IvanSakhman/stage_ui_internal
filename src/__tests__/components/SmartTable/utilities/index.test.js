import { testExports, buildColumns } from '~su/components/SmartTable/utilities'
import dayjs from 'dayjs'

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

describe('SmartTable utilities', () => {
  describe('setup utils', () => {
    const { buildFilters, setUpFilters, readAppliedSorter } = testExports

    describe('buildFilters', () => {
      const filtersSchema = {
        properties: {
          by_array_filter_with_enum: {
            type: 'array',
            items: {
              type: 'string',
              not: { type: 'null' },
              enum: [
                'value_one',
                'value_two',
                'value_three'
              ]
            }
          },
          by_array_filter_with_value_enum: {
            type: 'array',
            items: {
              type: 'string',
              not: { type: 'null' },
              valueEnum: [
                ['Value One', 'value_one'],
                ['Value Two', 'value_two'],
                ['Value Three', 'value_three']
              ]
            }
          },
          by_string_filter: { type: 'string', minLength: 1 },
          by_string_filter_with_enum: {
            type: "string",
            minLength: 1,
            enum: ['value_one_string']
          },
          by_boolean_filter: { type: 'boolean', not: { type: 'null' } },
          by_integer_filter: {
            type: 'integer',
            not: { type: 'null' }
          },
          by_integer_filter_with_enums: {
            type: 'integer',
            not: { type: 'null' },
            enum: [11, 10, 7, 4, 1],
            valueEnum: [
              ['eleven', 11],
              ['ten', 10],
              ['seven', 7],
              ['four', 4],
              ['one', 1]
            ]
          }
        }
      }

      it('builds an object of filterName and possible filter values', () => {
        expect(buildFilters(filtersSchema)).toEqual({
          by_array_filter_with_enum: ['value_one', 'value_two', 'value_three'],
          by_array_filter_with_value_enum: [
            ['Value One', 'value_one'],
            ['Value Two', 'value_two'],
            ['Value Three', 'value_three']
          ],
          by_string_filter: undefined,
          by_string_filter_with_enum: ['value_one_string'],
          by_boolean_filter: [true, false],
          by_integer_filter: undefined,
          by_integer_filter_with_enums: [
            ['eleven', 11],
            ['ten', 10],
            ['seven', 7],
            ['four', 4],
            ['one', 1]
          ]
        })
      })
    })

    describe('setUpFilters', () => {
      const filtersSchema = {
        properties: {
          by_size: {
            type: 'string',
            minLength: 1,
            enum: [1, 'small', 'medium', 'large']
          },
          by_kind: {
            type: 'string',
            minLength: 1,
            enum: ['latte', 'cappucino', 'americano']
          },
          by_is_new: {
            type: 'boolean'
          }
        }
      }

      it('returns a list of filters available for column, mapped to an object', () => {
        expect(
          setUpFilters('size', new URLSearchParams(), filtersSchema)
        ).toEqual(
          expect.objectContaining({
            filters: [
              { text: '1', value: '1' },
              { text: 'small', value: 'small' },
              { text: 'medium', value: 'medium' },
              { text: 'large', value: 'large' }
            ]
          })
        )
      })

      describe('when input filters are empty', () => {
        it('returns an empty array', () => {
          expect(setUpFilters('size', new URLSearchParams(), {}).filters).toEqual([])
        })
      })

      describe('when filter type is array', () => {
        it('creates text and value from array items', () => {
          const filtersSchema = {
            properties: {
              by_size: {
                type: 'array',
                minLength: 1,
                items: {
                  type: 'string',
                  valueEnum: [
                    ['small', '0'],
                    ['medium', '1']
                  ]
                }
              }
            }
          }

          expect(
            setUpFilters('size', new URLSearchParams(), filtersSchema)
          ).toEqual(
            expect.objectContaining({
              filters: [
                { text: 'small', value: '0' },
                { text: 'medium', value: '1' }
              ]
            })
          )
        })
      })

      it('returns currently applied filtered value for column', () => {
        expect(
          setUpFilters('size', new URLSearchParams('?by_size=medium'), filtersSchema)
        ).toEqual(
          expect.objectContaining({
            filteredValue: ['medium']
          })
        )
      })

      describe('when filtered value is a valid date', () => {
        it('returns it as dayjs instance', () => {
          const filteredValue = setUpFilters('date', new URLSearchParams('?by_date=2021-07-12'), {}).filteredValue[0]

          expect(dayjs.isDayjs(filteredValue)).toEqual(true)
        })
      })

      describe('when filtered value can give a false positive on a valid date', () => {
        it('does not return it as a dayjs instance', () => {
          const filteredValue = setUpFilters('date', new URLSearchParams('?by_date=0'), {}).filteredValue[0]

          expect(dayjs.isDayjs(filteredValue)).toEqual(false)
        })
      })

      describe('when filters work with boolean values', () => {
        it('returns a list of filters available for column, mapped to an object', () => {
          expect(
            setUpFilters('is_new', new URLSearchParams(), filtersSchema)
          ).toEqual(
            expect.objectContaining({
              filters: [
                { text: 'Yes', value: 'true' },
                { text: 'No', value: 'false' }
              ]
            })
          )
        })

        it('returns currently applied filtered value for column', () => {
          expect(
            setUpFilters('is_new', new URLSearchParams('?by_is_new=false'), filtersSchema)
          ).toEqual(
            expect.objectContaining({
              filteredValue: ['false']
            })
          )
        })
      })
    })

    describe('readAppliedSorter', () => {
      it('returns false when no order applied', () => {
        expect(readAppliedSorter('quantity', new URLSearchParams())).toEqual(false)
      })

      it('returns invert normalized order direction when there is applied order for the column', () => {
        expect(readAppliedSorter('quantity', new URLSearchParams('?order=quantity:asc'))).toEqual('ascend')
      })

      describe('when reading applied sorter that was normalized', () => {
        it('can understand it', () => {
          expect(readAppliedSorter('last_editor', new URLSearchParams('?order=sql_versions.author:desc'))).toEqual(
            'descend'
          )
        })
      })
    })
  })

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
      const filtersSchema = {
        properties: {
          by_author: {
            type: 'string',
            enum: ['developer']
          }
        }
      }

      it('adds filters, filterMultiple: false and filteredValue', () => {
        expect(buildColumns(columnsConfig, new URLSearchParams(), filtersSchema)[1]).toEqual(
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

    describe('when column has custom render', () => {
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
})
