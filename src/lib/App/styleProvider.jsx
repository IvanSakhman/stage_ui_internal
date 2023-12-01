import PropTypes from 'prop-types'

// constants
import theme from '~su/constants/theme'

// providers
import { ConfigProvider, App } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import Layout from '~su/components/Layout'
import RootModal from '~su/components/RootModal'

import { GlobalStyles } from './index.styled'

const StyleProvider = ({
  children,
  brandingToken,
  sidebarItems,
  menuProps,
  onSideMenuSelect,
  isLayoutPresent = true,
  isLoaded = false,
  pathname,
  topNavLogo,
  switchOptions
}) => {
  const themeToken = { ...theme.token, ...brandingToken }
  const components = {
    Menu: {
      itemHoverColor: themeToken.sideMenuItemActive,
      darkItemHoverColor: themeToken.sideMenuItemActive
    },
    Radio: {
      buttonColor: themeToken.sideMenuItemDefault,
      buttonBg: themeToken.sideMenuBackground,
      buttonSolidCheckedBg: themeToken.sideMenuItemActive,
      buttonSolidCheckedHoverBg: themeToken.sideMenuItemActive
    }
  }

  const main = (
    <>
      <GlobalStyles />
      <RootModal />
      {children}
    </>
  )

  return (
    <ConfigProvider theme={{ token: themeToken, components }}>
      <ThemeProvider>
        <App>
          {isLayoutPresent ? (
            <Layout
              sidebarItems={sidebarItems}
              menuProps={menuProps}
              isLoaded={isLoaded}
              onSideMenuSelect={onSideMenuSelect}
              pathname={pathname}
              themeOverrides={topNavLogo}
              switchOptions={switchOptions}
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
  onSideMenuSelect: PropTypes.func,
  isLayoutPresent: PropTypes.bool,
  isLoaded: PropTypes.bool,
  pathname: PropTypes.string,
  topNavLogo: PropTypes.object,
  switchOptions: PropTypes.object
}

export default StyleProvider
