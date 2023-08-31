import { initializeApi } from '~su/actions'
import { api, i18n, object } from '~su/utilities'
import { init } from '~su/store/actions'

const buildRequestParams = (path, context, loadConfigParams) => {
  const search = new URLSearchParams(loadConfigParams || {})
  if (context) {
    search.set('context', context)
  }

  let headers = {}
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    headers = { Prefer: `example=${context}` }
  }

  return {
    path,
    search,
    headers,
    onError: ({ message }) => {
      throw new Error(message)
    }
  }
}

const loadConfig = (apiActions, requestParams, baseUrl, messageApi) => {
  return apiActions('config', { setData: (data) => init(data, baseUrl, messageApi) }).loadCollection(requestParams)
}

const loadTranslations = (apiActions, requestParams, translationsConfig) => {
  if (object.isEmpty(translationsConfig)) {
    return Promise.resolve()
  }

  return apiActions('translations', {
    setData: (data) => i18n.addResources(data, translationsConfig?.namespace)
  }).loadCollection(requestParams)
}

export default ({ initialConfig, context, loadConfigParams, translationsConfig }, messageApi) => {
  const apiActions = initializeApi(api, messageApi)()
  let { baseUrl, config_path, translations_path } = initialConfig.api

  return loadConfig(apiActions, buildRequestParams(config_path, context, loadConfigParams), baseUrl, messageApi).then(
    () => loadTranslations(apiActions, buildRequestParams(translations_path, context), translationsConfig)
  )
}

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { buildRequestParams, loadConfig, loadTranslations }
}

export { testExports }
