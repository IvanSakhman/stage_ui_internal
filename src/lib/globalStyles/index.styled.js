import { createGlobalStyle } from 'styled-components'
import { COLORS } from '~su/constants'
import 'antd/dist/reset.css'
import './fonts.css'

// color should be rewritten in scope of https://assembly-tech.atlassian.net/browse/SC-2
export const createGlobalStyles = (projectStyles) => createGlobalStyle`
  body {
    background: ${COLORS.white};
  }

  ${projectStyles}
`
