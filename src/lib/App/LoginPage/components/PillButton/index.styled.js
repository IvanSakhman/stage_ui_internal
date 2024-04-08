import styled, { css } from 'styled-components'
import { Button } from '~su/components'
import { COLORS } from '~su/constants'

export const StyledButton = styled(Button)`
  ${({ $color, $backgroundColor, $borderColor }) => css`
    border-radius: 20px !important;
    color: ${$color || COLORS.text};
    background-color: ${$backgroundColor || COLORS.warmGray};
    ${$borderColor && `border-color: ${$borderColor};`}
    font-weight: 500;

    &:hover,
    &:focus {
      color: ${$color || COLORS.text} !important;
      background-color: ${$backgroundColor || COLORS.warmGray} !important;
      ${$borderColor && `border-color: ${$borderColor} !important;`}
      filter: opacity(0.8);
    }
  `}
`

export const Icon = styled.img`
  ${({ $height, $width, $marginRight }) => css`
    height: ${$height};
    width: ${$width};
    margin-right: ${$marginRight};
  `}
`
