import { Button, theme } from 'antd'
import styled from 'styled-components'

const { useToken } = theme

const applyStylesBasedOn = (props) => {
  const { token } = useToken()

  if (props.$primaryDashed) {
    return `
      color: ${token.colorPrimary};
      background: initial;
      border: 1px dashed;
      &:hover {
        border-style: solid;
        border-color: ${token.colorPrimaryBorderHover};
      }
    `
  }

  const warnHoverStyles = `
    &:hover, &:focus {
      color: ${token.colorWarning} !important;
      border-color: ${token.colorWarningBorderHover} !important;
      background-color: ${token.colorWarningBgHover} !important;
    }
  `

  if (props.$light) {
    return `
      &:not(:hover) {
        color: ${token.colorTextSecondary};
        border-color: ${token.colorBorder};
        background-color: transparent;
      }
      ${props.$warn ? warnHoverStyles : null}
    `
  }

  if (props.$warn) {
    return `
      color: ${token.colorWarning};
      border-color: ${token.colorWarningBorder};
      background-color: ${token.colorWarningBg};

      ${warnHoverStyles}
    `
  }
}

export const StyledButton = styled(Button)`
  ${(props) => applyStylesBasedOn(props)}
`
