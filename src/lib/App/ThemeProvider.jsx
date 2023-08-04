import { ThemeProvider } from 'styled-components'
import { theme } from 'antd'

export default ({ children }) => {
  const { token } = theme.useToken()

  return <ThemeProvider theme={token}>{children}</ThemeProvider>
}
