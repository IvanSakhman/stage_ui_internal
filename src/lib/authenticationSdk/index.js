import { Configuration, FrontendApi } from '@ory/client'

import authHooks from './hooks'

export { authHooks }

export default ({ basePath } = {}) => {
  if (!basePath) {
    return null
  }

  return new FrontendApi(
    new Configuration({
      basePath: basePath,
      baseOptions: {
        withCredentials: true
      }
    })
  )
}
