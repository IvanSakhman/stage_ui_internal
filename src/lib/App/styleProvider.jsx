// constants
import theme from '~su/constants/theme'

// providers
import { ConfigProvider, App } from 'antd'
import ThemeProvider from './ThemeProvider'

// components
import { RootModal } from '~su/components'
import { GlobalStyles } from './index.styled'
import PropTypes from 'prop-types'

const StyleProvider = ({ children, brandingToken }) => {
  const themeToken = { ...theme.token, ...brandingToken }

  return (
    <ConfigProvider theme={{ token: themeToken }}>
      <ThemeProvider>
        <App>
          <GlobalStyles />
          <RootModal />
          {children}
        </App>
      </ThemeProvider>
    </ConfigProvider>
  )
}

StyleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  brandingToken: PropTypes.object
}

export default StyleProvider
