import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// sdk
import { useSessionFlow } from '~su/sdk'

// actions
import { useLayoutConfig, useBranding, useRedirectsStore } from '~su/store/root-store'
import loadInitialData from './loadInitialData'

// utilities
import { baseUrl as setBaseUrl } from '~su/utilities'

// hooks
import { useNavigate, initializeWebsocketHooks } from '~su/hooks'

// constants
import theme from '~su/constants/theme'
import components from '~su/constants/componentsConfig'
import breakpoints from '~su/constants/breakpointsConfig'

// providers
import { ConfigProvider, App, message } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import { Layout, RootModal } from '~su/components'
import { GlobalStyles } from './index.styled'

const { useWebsocketConnection } = initializeWebsocketHooks()

let _stageUiAppConfig = {}

const StageUiApp = ({ children, initialConfig, context, loadConfigParams = null, themeOverrides = {}, redirects }) => {
  const [isInitialised, setIsInitialised] = useState(false)
  useWebsocketConnection()
  const [messageApi, contextHolder] = message.useMessage()

  const setRedirects = useRedirectsStore((state) => state.setRedirects)

  const navigate = useNavigate()
  const layoutConfig = useLayoutConfig()
  const branding = useBranding()
  const brandingToken = branding?.token || {}
  const isSessionChecked = useSessionFlow(() => window.location.replace(redirects.login), redirects)

  useEffect(() => {
    if (redirects) {
      setRedirects(redirects)
    }
  }, [redirects, setRedirects])

  useEffect(() => {
    setBaseUrl(initialConfig.api.baseUrl)
    loadInitialData(
      {
        initialConfig,
        context,
        loadConfigParams,
        translationsConfig: _stageUiAppConfig.translations
      },
      messageApi
    ).then(() => setIsInitialised(true))
  }, [initialConfig, context, loadConfigParams])

  const themeToken = { ...theme.token, ...breakpoints, ...brandingToken, ...themeOverrides.token }

  return (
    <ConfigProvider theme={{ token: themeToken, components }}>
      <ThemeProvider>
        <App>
          {contextHolder}
          <Layout
            {...layoutConfig}
            themeOverrides={branding}
            onSideMenuSelect={({ key }) => navigate(key)}
            isLoaded={isInitialised && isSessionChecked}
          >
            <GlobalStyles />
            <RootModal />
            {children}
          </Layout>
        </App>
      </ThemeProvider>
    </ConfigProvider>
  )
}

StageUiApp.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  initialConfig: PropTypes.shape({
    api: PropTypes.shape({
      baseUrl: PropTypes.string.isRequired,
      config_path: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  context: PropTypes.string.isRequired,
  loadConfigParams: PropTypes.object,
  themeOverrides: PropTypes.object,
  redirects: PropTypes.shape({
    login: PropTypes.string.isRequired,
    home: PropTypes.string.isRequired
  }).isRequired
}

const provider = (Component) => (props) => {
  // eslint-disable-next-line react/prop-types
  const { config, context, loadConfigParams, themeOverrides, redirects, ...componentProps } = props
  return (
    <StageUiApp
      initialConfig={config}
      context={context}
      loadConfigParams={loadConfigParams}
      themeOverrides={themeOverrides}
      redirects={redirects}
    >
      <Component {...componentProps} />
    </StageUiApp>
  )
}

StageUiApp.configure = (config) => {
  _stageUiAppConfig = config
}

StageUiApp.provider = provider

export default StageUiApp
