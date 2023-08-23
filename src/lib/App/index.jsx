import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// actions
import { useLayoutConfig, useBranding } from '~su/store/root-store'
import loadInitialData from './loadInitialData'

// utilities
import { baseUrl as setBaseUrl } from '~su/utilities'

// hooks
import { useNavigate, initializeWebsocketHooks } from '~su/hooks'

// constants
import theme from '~su/constants/theme'

// providers
import { ConfigProvider, App } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import { Layout, RootModal } from '~su/components'
import { GlobalStyles } from './index.styled'

const { useWebsocketConnection } = initializeWebsocketHooks()

let _stageUiAppConfig = {}

const StageUiApp = ({ children, initialConfig, context, loadConfigParams = null, themeOverrides = {} }) => {
  const [isInitialised, setIsInitialised] = useState(false)
  useWebsocketConnection()

  const navigate = useNavigate()
  const layoutConfig = useLayoutConfig()
  const branding = useBranding()
  const brandingToken = branding?.token || {}

  useEffect(() => {
    setBaseUrl(initialConfig.api.baseUrl)
    loadInitialData({
      initialConfig,
      context,
      loadConfigParams,
      translationsConfig: _stageUiAppConfig.translations
    }).then(() => setIsInitialised(true))
  }, [initialConfig, context, loadConfigParams])

  const themeToken = { ...theme.token, ...brandingToken, ...themeOverrides.token }

  return (
    <ConfigProvider theme={{ token: themeToken }}>
      <ThemeProvider>
        <App>
          <Layout
            {...layoutConfig}
            themeOverrides={branding}
            onSideMenuSelect={({ key }) => navigate(key)}
            isLoaded={isInitialised}
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
  themeOverrides: PropTypes.object
}

const provider = (Component) => (props) => {
  // eslint-disable-next-line react/prop-types
  const { config, context, loadConfigParams, themeOverrides, ...componentProps } = props
  return (
    <StageUiApp
      initialConfig={config}
      context={context}
      loadConfigParams={loadConfigParams}
      themeOverrides={themeOverrides}
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
