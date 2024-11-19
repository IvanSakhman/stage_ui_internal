import { createGlobalStyle } from 'styled-components'
import { COLORS } from '~su/constants'
import 'antd/dist/reset.css'
import './fonts.css'

// color should be rewritten in scope of https://assembly-tech.atlassian.net/browse/SC-2
export const createGlobalStyles = (projectStyles) => createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    background: ${COLORS.white};
    max-width: 100vw;
    overflow-x: auto;
  }

  ${projectStyles}
`
