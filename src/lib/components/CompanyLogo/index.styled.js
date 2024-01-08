import styled, { css } from 'styled-components'
import { COLORS } from '~su/constants'

const nameLengthBreakpoint = 15

export const Container = styled.div`
  border-bottom: 0.25em solid ${COLORS.primaryLight};
  font-size: ${({ companyNameLength }) => (companyNameLength > nameLengthBreakpoint ? '1.5cqw' : '1.8cqw')};
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
  margin-bottom: 0.3em;
  line-height: 0.8em;
  color: ${({ theme }) => theme.colorText};
  font-weight: bold;
  text-transform: uppercase;
`

export const Logo = styled.img`
  height: 0.8em;
  width: auto;
`
