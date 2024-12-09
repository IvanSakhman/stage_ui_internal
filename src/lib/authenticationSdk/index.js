import { Configuration, FrontendApi } from '@ory/client'
import sessionStore from './store'

export { sessionStore }

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
