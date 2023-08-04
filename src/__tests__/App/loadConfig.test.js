import api from '~su/utilities/fetchJson'
import displayMessage from '~su/utilities/displayMessage'

import loadConfig from '~su/App/loadConfig'

jest.mock('~su/store/actions', () => ({
  init: jest.fn()
}))

import { init } from '~su/store/actions'

const initialConfig = {
  api: {
    baseUrl: 'baseUrl',
    config_path: '/config'
  }
}

describe('Root api', () => {
  let response = null

  describe('loadConfig', () => {
    beforeAll(() => {
      response = {
        success: true,
        data: { layout: { menuProps: {} }, api: {} },
        actions: [],
        message: 'loaded'
      }
    })

    beforeEach(() => {
      displayMessage.error = jest.fn()
      api.get = jest.fn().mockResolvedValue(response)
    })

    it('fetches config from API with context parameter', () => {
      const spy = jest.spyOn(api, 'get')

      loadConfig({
        initialConfig,
        context: 'test'
      })
      expect(spy).toHaveBeenCalledWith('/config?context=test', {})

      spy.mockRestore()
    })

    describe('when with additional loadConfigParams', () => {
      it('fetches config from API with context parameter and the additional params', () => {
        const spy = jest.spyOn(api, 'get')

        loadConfig({
          initialConfig,
          context: 'test',
          loadConfigParams: {
            test_framework: 'jest'
          }
        })
        expect(spy).toHaveBeenCalledWith('/config?test_framework=jest&context=test', {})

        spy.mockRestore()
      })

      describe('when it is null', () => {
        it('fetches config from API with context parameter', () => {
          const spy = jest.spyOn(api, 'get')

          loadConfig({
            initialConfig,
            context: 'test',
            loadConfigParams: null
          })
          expect(spy).toHaveBeenCalledWith('/config?context=test', {})

          spy.mockRestore()
        })
      })
    })

    it('inits the store', async () => {
      await loadConfig({ initialConfig, context: 'test' })

      expect(init).toHaveBeenCalledWith(response.data, 'baseUrl')
    })

    it('returns a promise with success flag true', async () => {
      await expect(loadConfig({ initialConfig, context: 'test' })).resolves.not.toThrow()
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

      it('fetches the config with Prefer header', () => {
        const spy = jest.spyOn(api, 'get')

        loadConfig({
          initialConfig,
          context: 'test'
        })
        expect(spy).toHaveBeenCalledWith('/config?context=test', { Prefer: 'example=test' })

        spy.mockRestore()

      })
    })

    describe('when there is error', () => {
      beforeAll(() => {
        response = {
          success: false,
          errors: { parameter: 'missing parameter context', another: 'error raised' },
          message: 'Bad Request'
        }
      })

      it('shows the error message', async () => {
        try {
          await loadConfig({ initialConfig }).catch()
        } catch {
          expect(displayMessage.error).toBeCalledWith(response.message)
        }
      })

      it('returns a promise with success flag false', async () => {
        await expect(loadConfig({ initialConfig, context: 'test' })).rejects.toThrow(response.message)
      })
    })
  })
})
