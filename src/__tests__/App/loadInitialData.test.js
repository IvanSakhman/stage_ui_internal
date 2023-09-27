import { message } from '~mocks/appHooks'
import { initializeApi } from '~su/actions'
import api from '~su/utilities/fetchJson'

import loadInitialData, { testExports } from '~su/App/loadInitialData'

jest.mock('~su/store/actions', () => ({
  init: jest.fn()
}))

import { init } from '~su/store/actions'

jest.mock('~su/utilities', () => {
  return {
    ...jest.requireActual('~su/utilities'),
    i18n: {
      addResources: jest.fn()
    }
  }
})

import { i18n } from '~su/utilities'

const initialConfig = {
  api: {
    baseUrl: 'baseUrl',
    config_path: '/config',
    translations_path: '/translations'
  }
}

describe('App/loadInitialData', () => {
  describe('buildRequestParams', () => {
    const { buildRequestParams } = testExports

    it('builds params for loadCollection call', () => {
      const requestParams = buildRequestParams('test_path', 'test_context')
      expect(requestParams).toEqual({
        path: 'test_path',
        search: expect.any(URLSearchParams),
        headers: {},
        onError: expect.any(Function)
      })

      expect(requestParams.search.toString()).toEqual(new URLSearchParams({ context: 'test_context' }).toString())

      expect(() => requestParams.onError({ message: 'test' })).toThrow('test')
    })

    describe('when with additional loadConfigParams', () => {
      it('includes them in the search', () => {
        const requestParams = buildRequestParams('test_path', 'test_context', { test_framework: 'jest' })

        expect(requestParams.search.toString()).toEqual(new URLSearchParams({ test_framework: 'jest', context: 'test_context' }).toString())
      })

      describe('when it is null', () => {
        it('does not include them', () => {
          const requestParams = buildRequestParams('test_path', 'test_context', null)
          expect(requestParams.search.toString()).toEqual(new URLSearchParams({ context: 'test_context' }).toString())
        })
      })
    })

    describe('when in development', () => {
      const env = process.env

      beforeEach(() => {
        jest.resetModules()
        process.env = { ...env, NODE_ENV: 'development' }
      })

      afterEach(() => {
        process.env = env
      })

      it('adds Prefer header with context', () => {
        const requestParams = buildRequestParams('test_path', 'test_context')

        expect(requestParams.headers).toEqual({ Prefer: 'example=test_context' })
      })
    })
  })

  describe('loadConfig', () => {
    const { loadConfig, buildRequestParams } = testExports
    let configResponse = null
    const apiActions = initializeApi(api, message)()
    const requestParams = buildRequestParams('/config', 'test_context')

    beforeAll(() => {
      configResponse = {
        success: true,
        data: { layout: { menuProps: {} }, api: {} },
        actions: [],
        message: 'loaded'
      }
    })

    beforeEach(() => {
      message.error = jest.fn()
      api.get = jest.fn().mockResolvedValue(configResponse)
    })

    it('fetches config from API with context parameter', () => {
      const spy = jest.spyOn(api, 'get')

      loadConfig(apiActions, requestParams, initialConfig.api.baseUrl, message)

      expect(spy).toHaveBeenCalledWith('/config?context=test_context', {})

      spy.mockRestore()
    })

    it('inits the store', async () => {
      await loadConfig(apiActions, requestParams, initialConfig.api.baseUrl, message)

      expect(init).toHaveBeenCalledWith(configResponse.data, 'baseUrl', message)
    })

    it('returns a promise', async () => {
      await expect(loadConfig(apiActions, requestParams, initialConfig.api.baseUrl, message)).resolves.not.toThrow()
    })

    describe('when there is error', () => {
      beforeAll(() => {
        configResponse = {
          success: false,
          errors: { parameter: 'missing parameter context', another: 'error raised' },
          message: 'Bad Request'
        }
      })

      it('shows the error message', async () => {
        try {
          await loadConfig(apiActions, requestParams, initialConfig.api.baseUrl, message)
        } catch {
          expect(message.error).toBeCalledWith(configResponse.message)
        }
      })

      it('throws an error', async () => {
        await expect(loadConfig(apiActions, requestParams, initialConfig.api.baseUrl, message)).rejects.toThrow(
          configResponse.message
        )
      })
    })
  })

  describe('loadTranslations', () => {
    const { loadTranslations, buildRequestParams } = testExports
    let translationsResponse = null
    const apiActions = initializeApi(api, message)()
    const requestParams = buildRequestParams('/translations', 'test_context')

    beforeAll(() => {
      translationsResponse = {
        success: true,
        data: { pages: { help: { title: 'Help' } } },
        actions: [],
        message: 'loaded'
      }
    })

    beforeEach(() => {
      message.error = jest.fn()
      api.get = jest.fn().mockResolvedValue(translationsResponse)
    })

    describe('without translations config', () => {
      it('does not attempt to fetch the translations', () => {
        const spy = jest.spyOn(api, 'get')

        loadTranslations(apiActions, requestParams)

        expect(spy).not.toHaveBeenCalledWith('/translations?context=test_context', {})

        spy.mockRestore()
      })

      it('returns a promise', async () => {
        await expect(loadTranslations(apiActions, requestParams)).resolves.not.toThrow()
      })
    })

    describe('with translations config', () => {
      const translationsConfig = { namespace: 'test' }

      it('fetches translations from API with context parameter', () => {
        const spy = jest.spyOn(api, 'get')

        loadTranslations(apiActions, requestParams, translationsConfig)

        expect(spy).toHaveBeenCalledWith('/translations?context=test_context', {})

        spy.mockRestore()
      })

      it('saves the i18n resources', async () => {
        await loadTranslations(apiActions, requestParams, translationsConfig)

        expect(i18n.addResources).toHaveBeenCalledWith(translationsResponse.data, translationsConfig.namespace)
      })

      it('returns a promise', async () => {
        await expect(loadTranslations(apiActions, requestParams, translationsConfig)).resolves.not.toThrow()
      })

      describe('when there is error', () => {
        beforeAll(() => {
          translationsResponse = {
            success: false,
            errors: { parameter: 'missing parameter context', another: 'error raised' },
            message: 'Bad Request'
          }
        })

        it('shows the error message', async () => {
          try {
            await loadTranslations(apiActions, requestParams, translationsConfig)
          } catch {
            expect(message.error).toBeCalledWith(translationsResponse.message)
          }
        })

        it('throws an error', async () => {
          await expect(loadTranslations(apiActions, requestParams, translationsConfig)).rejects.toThrow(
            translationsResponse.message
          )
        })
      })
    })
  })

  describe('loadInitialData', () => {
    it('calls loadConfig and loadTranslations', async () => {
      api.get = jest.fn().mockResolvedValue({ success: true })

      const apiSpy = jest.spyOn(api, 'get')

      await loadInitialData({ initialConfig, context: 'test_context', translationsConfig: { namespace: 'test' }}, message)

      expect(apiSpy).toHaveBeenCalledTimes(2)

      expect(apiSpy).toHaveBeenCalledWith('/config?context=test_context', {})
      expect(apiSpy).toHaveBeenCalledWith('/translations?context=test_context', {})

      apiSpy.mockRestore()
    })
  })
})
