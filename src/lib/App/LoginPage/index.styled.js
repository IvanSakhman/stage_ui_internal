import styled from 'styled-components'
import { Row, Col, Typography, Divider, Flex } from '~su/components'
import { COLORS } from '~su/constants'

const { Title, Text } = Typography

export const Container = styled(Flex)`
  min-height: 100vh;
  background-color: ${COLORS.ternaryDark};
`

export const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 1156px;
  padding: 58px 0 32px 0;
`

export const HeaderLogo = styled.img`
  width: 204px;
  height: auto;
  padding-bottom: 90px;
  object-fit: contain;
`

export const StyledRow = styled(Row)`
  width: 100%;
`

export const HeroImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`

export const Pattern = styled.img`
  height: 110%;
  width: auto;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 0;
`

export const Message = styled(Title)`
  position: absolute;
  top: -86px;
  right: 16px;
  font-size: 108px !important;
  font-weight: bold !important;
  color: ${COLORS.dangerDark} !important;
  z-index: 2;
`

export const FormContainer = styled(Col)`
  padding: 32px;
  background-color: ${COLORS.white};
`

export const Providers = styled(Flex)`
  width: 100%;
  margin: 32px 0;
`

export const Footer = styled(Flex)`
  padding-top: 64px;
  width: 100%;
`

export const FooterLogo = styled.img`
  width: 64px;
  height: auto;
  object-fit: contain;
`

export const StyledDivider = styled(Divider)`
  margin-top: 16px;
  border-color: ${COLORS.primaryLight};
`

export const Copyright = styled(Text)`
  font-size: 16px;
  color: ${COLORS.white};
`

export const StyledLink = styled.a`
  font-size: 16px;
  color: ${COLORS.primaryLight};
  text-decoration: underline;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`
