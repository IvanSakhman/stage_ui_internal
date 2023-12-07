import { applyPagination, applyFilters, applySorter } from '~su/utilities/filtering'
import dayjs from 'dayjs'

describe('filtering utilities', () => {
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
