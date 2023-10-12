import PropTypes from 'prop-types'

// constants
import theme from '~su/constants/theme'

// providers
import { ConfigProvider, App } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import { RootModal, Layout } from '~su/components'
import { GlobalStyles } from './index.styled'

const StyleProvider = ({
  children,
  brandingToken,
  sidebarItems,
  menuProps,
  onSideMenuSelect,
  isLayoutPresent = true,
  isLoaded = false
}) => {
  const themeToken = { ...theme.token, ...brandingToken }

  const main = (
    <>
      <GlobalStyles />
      <RootModal />
      {children}
    </>
  )

  return (
    <ConfigProvider theme={{ token: themeToken }}>
      <ThemeProvider>
        <App>
          {isLayoutPresent ? (
            <Layout
              sidebarItems={sidebarItems}
              menuProps={menuProps}
              isLoaded={isLoaded}
              onSideMenuSelect={onSideMenuSelect}
            >
              {main}
            </Layout>
          ) : (
            main
          )}
        </App>
      </ThemeProvider>
    </ConfigProvider>
  )
}

StyleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  brandingToken: PropTypes.object,
  sidebarItems: PropTypes.arrayOf(PropTypes.object),
  menuProps: PropTypes.object,
  onSideMenuSelect: PropTypes.func.isRequired,
  isLayoutPresent: PropTypes.bool,
  isLoaded: PropTypes.bool
}

export default StyleProvider
