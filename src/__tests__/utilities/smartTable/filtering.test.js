import {
  setUpFilters,
  readAppliedSorter,
  applyPagination,
  applyFilters,
  applySorter
} from '~su/utilities/smartTable/filtering'
import dayjs from 'dayjs'

describe('QueriesView filtering utilities', () => {
  describe('to display', () => {
    describe('setUpFilters', () => {
      it('returns a list of filters available for column, mapped to an object', () => {
        expect(
          setUpFilters('size', new URLSearchParams(), {
            by_size: [1, 'small', 'medium', 'large'],
            by_kind: ['latte', 'cappucino', 'americano'],
            by_is_new: [true, false]
          })
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
          expect(
            setUpFilters('size', new URLSearchParams(), {}).filters
          ).toEqual([])
        })
      })

      describe('when filter is an array', () => {
        it('creates text and value from array items', () => {
          expect(
            setUpFilters('size', new URLSearchParams(), {
              by_size: [
                ['small', '0'],
                ['medium', '1']
              ]
            })
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
          setUpFilters('size', new URLSearchParams('?by_size=medium'), {
            by_size: ['small', 'medium', 'large'],
            by_kind: ['latte', 'cappucino', 'americano']
          })
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
            setUpFilters('is_new', new URLSearchParams(), {
              by_size: [1, 'small', 'medium', 'large'],
              by_kind: ['latte', 'cappucino', 'americano'],
              by_is_new: [true, false]
            })
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
            setUpFilters('is_new', new URLSearchParams('?by_is_new=false'), {
              by_size: ['small', 'medium', 'large'],
              by_kind: ['latte', 'cappucino', 'americano'],
              by_is_new: [true, false]
            })
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

  describe('to submit', () => {
    describe('applyPagination', () => {
      it('sets page in urlParams', () => {
        let urlParams = new URLSearchParams()

        urlParams = applyPagination(urlParams, { current: 2 })

        expect(urlParams.get('page')).toEqual('2')
      })

      describe('when urlParams have page param', () => {
        const urlParams = new URLSearchParams('?page=3')

        describe('when it is the same', () => {
          it('does not update it', () => {
            const spy = jest.spyOn(urlParams, 'set')

            applyPagination(urlParams, { current: 3 })
            expect(spy).not.toHaveBeenCalled()

            spy.mockRestore()
          })
        })

        describe('when it is different', () => {
          it('updates it', () => {
            const spy = jest.spyOn(urlParams, 'set')

            applyPagination(urlParams, { current: 4 })
            expect(spy).toHaveBeenCalledWith('page', 4)

            spy.mockRestore()
          })
        })
      })
    })

    describe('applyFilters', () => {
      it('sets filters in urlParams', () => {
        let urlParams = new URLSearchParams()
        urlParams = applyFilters(urlParams, { size: ['medium'], kind: ['americano'] })

        expect(urlParams.get('by_size')).toEqual('medium')
        expect(urlParams.get('by_kind')).toEqual('americano')
      })

      describe('when filters to be applied are integers', () => {
        let urlParams = new URLSearchParams()
        urlParams = applyFilters(urlParams, { size: 0, kind: 1 })

        expect(urlParams.get('by_size')).toEqual('0')
        expect(urlParams.get('by_kind')).toEqual('1')
      })

      describe('when filters to be applied include nullified key', () => {
        it('removes it', () => {
          let urlParams = new URLSearchParams()

          urlParams = applyFilters(urlParams, { size: ['medium'], kind: null })

          expect(urlParams.get('by_size')).toEqual('medium')
          expect(urlParams.get('by_kind')).toEqual(null)
        })
      })

      describe('when filters to be applied include a dayjs instance', () => {
        it('formats that dayjs to a desired format', () => {
          let urlParams = new URLSearchParams()
          urlParams = applyFilters(urlParams, { date: dayjs('2021-06-10T13:06:47.035Z') })

          expect(urlParams.get('by_date')).toEqual('2021-06-10')
        })
      })
    })

    describe('applySorter', () => {
      it('sets order in urlParams', () => {
        let urlParams = new URLSearchParams()
        urlParams = applySorter(urlParams, { columnKey: 'quantity', order: 'descend' })

        expect(urlParams.get('order')).toEqual('quantity:desc')
      })

      describe('when order column to set needs to be normalized', () => {
        it('sets it with normalized key', () => {
          let urlParams = new URLSearchParams()
          urlParams = applySorter(urlParams, { columnKey: 'last_editor', order: 'ascend' })

          expect(urlParams.get('order')).toEqual('sql_versions.author:asc')
        })
      })

      describe('when sorter does not have order property', () => {
        it('removes order', () => {
          let urlParams = new URLSearchParams('?order=quantity:asc')

          urlParams = applySorter(urlParams, { columnKey: 'quantity', order: null })

          expect(urlParams.get('order')).toEqual(null)
        })
      })

      describe('when sorter object is empty', () => {
        it('does not change the params', () => {
          let urlParams = new URLSearchParams('?order=quantity:asc')
          const setSpy = jest.spyOn(urlParams, 'set'),
            deleteSpy = jest.spyOn(urlParams, 'delete')

          urlParams = applySorter(urlParams, {})

          expect(setSpy).not.toHaveBeenCalled()
          expect(deleteSpy).not.toHaveBeenCalled()

          expect(urlParams.get('order')).toEqual('quantity:asc')

          setSpy.mockRestore()
          deleteSpy.mockRestore()
        })
      })
    })
  })
})
