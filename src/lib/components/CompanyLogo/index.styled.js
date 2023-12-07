import styled from 'styled-components'
import { COLORS } from '~su/constants'

export const BorderedContainer = styled.div`
  border-bottom: 5px solid ${COLORS.primaryLight};
`

export const LogoContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 8px;
`

export const CompanyName = styled.div`
  font-size: 39px;
  line-height: 29px;
  color: ${({ theme }) => theme.colorText};
  font-weight: bold;
  letter-spacing: 3px;
`
