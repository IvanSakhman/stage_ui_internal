import { Configuration, FrontendApi } from '@ory/client'
import { useLogoutFlow, useSessionFlow } from './hooks'

export { useLogoutFlow, useSessionFlow }

export default new FrontendApi(
  new Configuration({
    // We will change basePath later with production one
    basePath: 'https://accounts.staging.stage.lv-426.tech',
    baseOptions: {
      withCredentials: true
    }
  })
)
