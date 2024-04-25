import PropTypes from 'prop-types'

// constants
import theme from '~su/constants/theme'

// providers
import { ConfigProvider, App } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import RootModal from '~su/components/RootModal'

import { GlobalStyles } from './index.styled'

const StyleProvider = ({ children, brandingToken }) => {
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
        <App>{main}</App>
      </ThemeProvider>
    </ConfigProvider>
  )
}

StyleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  brandingToken: PropTypes.object
}

export default StyleProvider
