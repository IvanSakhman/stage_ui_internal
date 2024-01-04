import styled, { css } from 'styled-components'
import { COLORS } from '~su/constants'

export const BorderedContainer = styled.div`
  border-bottom: ${({ $variant }) => ($variant === 'card' ? 5 : 3)}px solid ${COLORS.primaryLight};
`

export const LogoContainer = styled.div`
  display: flex;

  ${({ $variant }) =>
    $variant === 'card'
      ? css`
          margin-bottom: 10px;
          gap: 8px;
        `
      : css`
          margin-bottom: 5px;
          gap: 4px;
        `};
`

export const CompanyName = styled.div`
  font-weight: bold;

  ${({ $variant, theme }) =>
    $variant === 'card'
      ? css`
          font-size: 39px;
          line-height: 29px;
          color: ${theme.colorText};
          letter-spacing: 3px;
        `
      : css`
          font-size: 27px;
          line-height: 24px;
          color: ${({ theme }) => theme.topNavTextDefault};
          letter-spacing: 2px;
        `};
`
