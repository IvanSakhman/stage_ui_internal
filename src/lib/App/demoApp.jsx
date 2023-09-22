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
import { ConfigProvider, App, message } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import { Layout, RootModal } from '~su/components'
import { GlobalStyles } from './index.styled'

const { useWebsocketConnection } = initializeWebsocketHooks()

let _stageUiAppConfig = {}

const DemoStageUiApp = ({
  children,
  initialConfig,
  context,
  loadConfigParams = null,
  themeOverrides = {},
  brandingData = {},
  navItems = [],
  isLayoutPresent = true,
  isLoaded
}) => {
  const [isInitialised, setIsInitialised] = useState(false)
  useWebsocketConnection()
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()
  const layoutConfigDefault = useLayoutConfig()
  const brandingDefault = useBranding()

  const branding = { ...brandingDefault, ...brandingData }
  const brandingToken = branding?.token || {}

  const layoutConfig = {
    ...layoutConfigDefault,
    sidebarItems: layoutConfigDefault?.sidebarItems?.concat(navItems)
  }

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

  const themeToken = { ...theme.token, ...brandingToken, ...themeOverrides.token }

  return isLoaded ? (
    <ConfigProvider theme={{ token: themeToken }}>
      <ThemeProvider>
        <App>
          {contextHolder}
          {isLayoutPresent ? (
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
          ) : (
            <>
              <GlobalStyles />
              <RootModal />
              {children}
            </>
          )}
        </App>
      </ThemeProvider>
    </ConfigProvider>
  ) : null
}

DemoStageUiApp.propTypes = {
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
  brandingData: PropTypes.object,
  navItems: PropTypes.array,
  isLayoutPresent: PropTypes.bool
}

const provider = (Component) => (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    config,
    context,
    loadConfigParams,
    themeOverrides,
    brandingData,
    navItems,
    isLayoutPresent,
    isLoaded,
    ...componentProps
  } = props
  return (
    <DemoStageUiApp
      initialConfig={config}
      context={context}
      loadConfigParams={loadConfigParams}
      themeOverrides={themeOverrides}
      brandingData={brandingData}
      navItems={navItems}
      isLayoutPresent={isLayoutPresent}
      isLoaded={isLoaded}
    >
      <Component {...componentProps} />
    </DemoStageUiApp>
  )
}

DemoStageUiApp.configure = (config) => {
  _stageUiAppConfig = config
}

DemoStageUiApp.provider = provider

export default DemoStageUiApp
