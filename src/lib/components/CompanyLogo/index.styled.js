import styled, { css } from 'styled-components'
import { COLORS } from '~su/constants'

const nameLengthBreakpoint = 15

export const Container = styled.div`
  ${({ $companyNameLength, $inHeader, theme }) =>
    $inHeader
      ? css`
          padding-bottom: 0.2em;
          border-bottom: 0.15em solid ${COLORS.primaryLight};
          font-size: 27px;
          color: ${theme.topNavTextDefault};
        `
      : css`
          padding-bottom: 0.3em;
          border-bottom: 0.25em solid ${COLORS.primaryLight};
          font-size: ${$companyNameLength > nameLengthBreakpoint ? '1.5cqw' : '1.8cqw'};
          color: ${theme.colorText};
        `}
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
  line-height: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
`

export const Logo = styled.img`
  height: 0.8em;
  width: auto;
`
