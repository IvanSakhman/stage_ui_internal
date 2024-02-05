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
  sideMenuChildren,
  contentContainerStyles,
  isSideMenuCollapsible,
  showSideMenu,
  shouldTransformItems
}) => {
  const themeToken = { ...theme.token, ...brandingToken }
  const components = {
    Menu: {
      itemHoverColor: themeToken.sideMenuItemActive,
      darkItemHoverColor: themeToken.sideMenuItemActive,
      itemSelectedColor: themeToken.sideMenuItemActive,
      itemDisabledColor: themeToken.sideMenuItemDefault,
      itemHoverBg: 'transparent'
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
              sideMenuChildren={sideMenuChildren}
              contentContainerStyles={contentContainerStyles}
              isSideMenuCollapsible={isSideMenuCollapsible}
              showSideMenu={showSideMenu}
              shouldTransformItems={shouldTransformItems}
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
  sideMenuChildren: PropTypes.node,
  contentContainerStyles: PropTypes.string,
  isSideMenuCollapsible: PropTypes.bool,
  showSideMenu: PropTypes.bool,
  shouldTransformItems: PropTypes.bool
}

export default StyleProvider
