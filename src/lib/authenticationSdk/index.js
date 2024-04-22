import { Configuration, FrontendApi } from '@ory/client'
import { handleGetFlowError, handleFlowError } from './errors'
import { useLogoutFlow, useSessionFlow } from './hooks'

export { useLogoutFlow, useSessionFlow, handleGetFlowError, handleFlowError }

export default new FrontendApi(
  new Configuration({
    // We will change basePath later with production one
    basePath: 'http://localhost:4000',
    baseOptions: {
      withCredentials: true
    }
  })
)
