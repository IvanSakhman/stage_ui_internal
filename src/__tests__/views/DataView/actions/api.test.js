import { message } from 'antd'
import { api } from '~su/utilities'

import setupApiActions from '~su/views/DataView/actions/api'

import stageUiStore from '~su/store'

describe('DataView API Actions', () => {
  const setState = jest.fn()
  const setData = jest.fn()

  it('provides loadData apiAction', () => {
    const apiActions = setupApiActions({}, message)

    expect(Object.keys(apiActions)).toContainEqual('loadData')
    expect(typeof apiActions.loadData).toEqual('function')
  })

  describe('loadData', () => {
    const dataViewConfig = {
       setState,
       setData,
       itemName: 'test_resource',
       itemPluralName: 'test_resources',
       collectionApiPath: 'load_test_resources',
       apiPlaceholders: { id: 1 }
    }

    let json_schema = {
      properties: {
        filters: {
          type: 'object',
          required: [],
          properties: {
            by_array_filter_with_enum: {
              type: 'array',
              items: { type: 'string', not: { type: 'null' }, enum: ['value_one', 'value_two', 'value_three'] }
            }
          }
        }
      }
    }

    const { loadData } = setupApiActions(dataViewConfig, message)
    let response = null

    beforeAll(() => {
      response = {
        success: true,
        message: 'Data Loaded',
        actions: {},
        data: {},
        json_schema
      }
    })

    beforeEach(() => {
      stageUiStore.useConfigStore.getState().update({
        api: { [dataViewConfig.collectionApiPath]: `/testing/${dataViewConfig.itemPluralName}/:id` }
      })

      api.get = jest.fn().mockResolvedValue(response)
    })

    it('flushes the store', async () => {
      await loadData()

      expect(setData).toHaveBeenCalledWith(
        { [dataViewConfig.itemPluralName]: [], pagination: {}, filtersSchema: { type: 'object', properties: {}, required: [] } }
      )
    })

    it('loads a collection', async () => {
      await loadData()

      expect(api.get).toBeCalledWith(`/testing/${dataViewConfig.itemPluralName}/1`, {})
    })

    describe('on success', () => {
      it('sets data in store', async () => {
        await loadData()

        expect(setData).toHaveBeenCalledWith(response.data, true)
      })

      it('sets actions in store', async () => {
        await loadData()

        expect(setState).toHaveBeenCalledWith('actions', response.actions)
      })

      it('sets filtersSchema in store', async () => {
        await loadData()

        expect(setState).toHaveBeenCalledWith('filtersSchema', json_schema.properties.filters)
      })

      describe('when json_schema properties include order', () => {
        beforeEach(() => {
          response.json_schema = {
            properties: {
              ...json_schema.properties,
              order: {
                type: 'string', minLength: 1,
                enum: ['created_at:asc', 'crated_at:desc'],
                valueEnum: [
                  ['Newest', 'published_at:desc'], ['Oldest', 'published_at:asc']
                ]
              }
            }
          }
        })

        it('sets it together with filters in filtersSchema', async () => {
          await loadData()

          expect(setState).toHaveBeenCalledWith('filtersSchema', {
            ...response.json_schema.properties.filters,
            properties: {
              ...response.json_schema.properties.filters.properties,
              order: response.json_schema.properties.order
            }
          })
        })
      })

      describe('when json_schema is not provided', () => {
        beforeEach(() => {
          response.json_schema = undefined
        })

        it('does not throw', () => {
          expect(() => loadData()).not.toThrow()
        })
      })

      describe('when json_schema is empty', () => {
        beforeEach(() => {
          response.json_schema = {}
        })

        it('does not throw', () => {
          expect(() => loadData()).not.toThrow()
        })
      })

      describe('when json_schema properties do not include filters ', () => {
        beforeEach(() => {
          response.json_schema = { properties: {} }
        })

        it('does not throw', () => {
          expect(() => loadData()).not.toThrow()
        })
      })
    })
  })
})
