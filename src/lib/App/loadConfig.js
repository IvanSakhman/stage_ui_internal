import { initializeApi } from '~su/actions'
import { api } from '~su/utilities'
import { init } from '~su/store/actions'

export default ({ initialConfig, context, loadConfigParams }) => {
  const apiActions = initializeApi(api)()
  let { baseUrl, config_path } = initialConfig.api

  const search = new URLSearchParams(loadConfigParams || {})
  if (context) {
    search.set('context', context)
  }

  let headers = {}
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    headers = { Prefer: `example=${context}` }
  }

  return apiActions('config', { setData: (data) => init(data, baseUrl) }).loadCollection({
    path: config_path,
    search,
    headers,
    onError: ({ message }) => {
      throw new Error(message)
    }
  })
}
