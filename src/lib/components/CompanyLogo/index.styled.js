import styled, { css } from 'styled-components'
import { COLORS } from '~su/constants'

export const BorderedContainer = styled.div`
  border-bottom: ${({ $inHeader }) => ($inHeader ? 3 : 5)}px solid ${COLORS.primaryLight};
`

export const LogoContainer = styled.div`
  display: flex;

  ${({ $inHeader }) =>
    $inHeader
      ? css`
          margin-bottom: 5px;
          gap: 4px;
        `
      : css`
          margin-bottom: 10px;
          gap: 8px;
        `};
`

export const CompanyName = styled.div`
  font-weight: bold;

  ${({ $inHeader, theme }) =>
    $inHeader
      ? css`
          font-size: 27px;
          line-height: 24px;
          color: ${({ theme }) => theme.topNavTextDefault};
          letter-spacing: 2px;
        `
      : css`
          font-size: 39px;
          line-height: 29px;
          color: ${theme.colorText};
          letter-spacing: 3px;
        `};
`
